import { mapDeviceTypeToLegacy } from "./mapDeviceTypeToLegacy";
import { TApiResponseData } from "../api/api";

export const LEGACY_PROPERTIES_MAPPING = {
  browser: {
    name: "browsername",
    version: "browservendor",
  },
  cpu: {
    architecture: undefined,
  },
  device: {
    model: "hardwaremodel",
    type: "devicetype",
    vendor: "hardwarevendor",
  },
  engine: {
    name: "layoutengine",
    version: undefined,
  },
  os: {
    name: "platformname",
    version: "platformversion",
  },
};

export const LEGACY_METHODS_MAPPING = {
  getBrowser: () => LEGACY_PROPERTIES_MAPPING.browser,
  getCPU: () => LEGACY_PROPERTIES_MAPPING.cpu,
  getDevice: () => LEGACY_PROPERTIES_MAPPING.device,
  getEngine: () => LEGACY_PROPERTIES_MAPPING.engine,
  getOS: () => LEGACY_PROPERTIES_MAPPING.os,
  getResult: () => {
    return {
      os: LEGACY_METHODS_MAPPING.getOS(),
      browser: LEGACY_METHODS_MAPPING.getBrowser(),
      cpu: LEGACY_METHODS_MAPPING.getCPU(),
      device: LEGACY_METHODS_MAPPING.getDevice(),
      engine: LEGACY_METHODS_MAPPING.getEngine(),
    };
  },
};

const extendWithLegacyProps = (target: TApiResponseData) => {
  const temp = { ...target };

  for (const [prop, propValue] of Object.entries(LEGACY_PROPERTIES_MAPPING)) {
    if (!temp[prop]) temp[prop] = {};
    temp[prop] = Object.assign(temp[prop], createLegacyData(temp, propValue));
  }

  for (const [methodName, methodFunction] of Object.entries(
    LEGACY_METHODS_MAPPING,
  )) {
    temp[methodName] = createLegacyMethod(temp, methodFunction);
  }
  return temp;
};

const createLegacyData = (
  donor: TApiResponseData,
  target: { [key: string]: string | undefined },
) => {
  const donorValues = { ...donor.device };
  const result = {};
  for (const [UALegacyName, FODParamName] of Object.entries(target)) {
    if (!result[UALegacyName]) result[UALegacyName] = "";

    if (FODParamName === undefined) result[UALegacyName] = undefined;

    if (
      FODParamName &&
      donorValues[FODParamName] &&
      donorValues[FODParamName].toLowerCase() === "unknown"
    ) {
      result[UALegacyName] = undefined;
      continue;
    }

    if (FODParamName === "devicetype") {
      result[UALegacyName] = mapDeviceTypeToLegacy(donorValues[FODParamName]);
      continue;
    }
    result[UALegacyName] = donorValues[FODParamName];
  }
  return result;
};

const createLegacyMethod = (
  donor: TApiResponseData,
  method: () => TApiResponseData,
) => {
  const methodResultingObject = method();
  if (methodResultingObject.browser) {
    const result = {};
    for (const [key, value] of Object.entries(methodResultingObject)) {
      if (!result[key]) result[key] = {};
      result[key] = createLegacyData(donor, value);
    }
    return () => result;
  }

  return () => createLegacyData(donor, methodResultingObject);
};

export default extendWithLegacyProps;
