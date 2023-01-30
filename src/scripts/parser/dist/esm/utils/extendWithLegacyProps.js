export const LEGACY_PROPERTIES_MAPPING = {
  browser: {
    name: "BrowserName",
    version: "BrowserVersion"
  },
  cpu: {
    architecture: "Unknown"
  },
  device: {
    model: "HardwareModel",
    type: "DeviceType",
    vendor: "HardwareVendor"
  },
  engine: {
    name: "LayoutEngine",
    version: "Unknown"
  },
  os: {
    name: "PlatformName",
    version: "PlatformVersion"
  }
};
const extendWithLegacyProps = target => {
  const temp = {
    ...target
  };
  Object.keys(LEGACY_PROPERTIES_MAPPING).forEach(cKey => {
    if (!temp[cKey]) temp[cKey] = {};
    Object.keys(LEGACY_PROPERTIES_MAPPING[cKey]).forEach(eKey => {
      const mappedPropName = LEGACY_PROPERTIES_MAPPING[cKey][eKey].toLowerCase();
      temp[cKey][eKey] = temp.device[mappedPropName] || undefined;
    });
  });
  return temp;
};
export default extendWithLegacyProps;
//# sourceMappingURL=extendWithLegacyProps.js.map