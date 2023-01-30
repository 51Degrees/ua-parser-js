const ELegacyDeviceType = {
  Console: "console",
  Desktop: "desktop",
  EReader: "embedded",
  IoT: "embedded",
  MediaHub: "smarttv",
  Mobile: "mobile",
  NotMobile: null,
  Router: "embedded",
  SmallScreen: "embedded",
  SmartPhone: "mobile",
  SmartSpeaker: "embedded",
  SmartWatch: "wearable",
  Tablet: "tablet",
  Tv: "smarttv"
};
const mapDeviceTypeToLegacy = type => ELegacyDeviceType[type];
export { mapDeviceTypeToLegacy, ELegacyDeviceType };
//# sourceMappingURL=mapDeviceTypeToLegacy.js.map