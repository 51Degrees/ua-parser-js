import { EAPIErrors } from "./errors";
import { IAPIResponse } from "../api/api";

const INVALID_RESOURCE_KEY_RESPONSE_MOCK: IAPIResponse = {
  status: 400,
  response: { errors: ["Invalid Resource key"] },
};
const NON_EXISING_ON_SERVER_RESPONSE_MOCK: IAPIResponse = {
  status: 400,
  response: {
    errors: [EAPIErrors.NON_EXISING_ON_SERVER_ERROR],
  },
};
const INTERNAL_SERVER_ERROR_RESPONSE_MOCK: IAPIResponse = {
  status: 500,
  response: {
    errors: [EAPIErrors.INTERNAL_SERVER_ERROR],
  },
};
const REQUEST_LIMIT_REACHED_RESPONSE_MOCK: IAPIResponse = {
  status: 429,
  response: {
    errors: [EAPIErrors.REQUEST_LIMIT_REACHED_ERROR],
  },
};

const MISSING_USER_AGENT_RESPONSE_MOCK: IAPIResponse = {
  status: 404,
  response: {
    errors: [EAPIErrors.MISSING_USER_AGENT_ERROR],
  },
};
const HAPPY_CASE_DEFAULT_KEY_DATA_MOCK = {
  device: {
    hardwarevendor: "Unknown",
    hardwaremodel: "Unknown",
    hardwarename: ["Desktop", "Emulator"],
    platformname: "Windows",
    platformversion: "10.0",
    layoutengine: "Blink",
    browservendor: "Google",
    browsername: "Chrome",
    browserversion: "108",
    devicetype: "Desktop",
    "setheaderbrowseraccept-ch":
      "Sec-CH-UA,Sec-CH-UA-Full-Version-List,Sec-CH-UA-Mobile,Sec-CH-UA-Platform",
    "setheaderhardwareaccept-ch":
      "Sec-CH-UA-Model,Sec-CH-UA-Mobile",
    "setheaderplatformaccept-ch":
      "Sec-CH-UA-Platform,Sec-CH-UA-Platform-Version",
  },
  javascriptProperties: [
    "device.javascripthardwareprofile",
  ],
};
const HAPPY_CASE_DEFAULT_KEY_RESPONSE_MOCK: IAPIResponse = {
  status: 200,
  response: HAPPY_CASE_DEFAULT_KEY_DATA_MOCK,
};

const HAPPY_CASE_USER_KEY_MOCK =
  HAPPY_CASE_DEFAULT_KEY_RESPONSE_MOCK;

export {
  INVALID_RESOURCE_KEY_RESPONSE_MOCK,
  NON_EXISING_ON_SERVER_RESPONSE_MOCK,
  INTERNAL_SERVER_ERROR_RESPONSE_MOCK,
  MISSING_USER_AGENT_RESPONSE_MOCK,
  REQUEST_LIMIT_REACHED_RESPONSE_MOCK,
  HAPPY_CASE_USER_KEY_MOCK,
  HAPPY_CASE_DEFAULT_KEY_DATA_MOCK,
  HAPPY_CASE_DEFAULT_KEY_RESPONSE_MOCK,
};
