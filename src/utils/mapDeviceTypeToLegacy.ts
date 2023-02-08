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
  Tv: "smarttv",
};

type TLegacyDeviceTypeValue =
  | "console"
  | "desktop"
  | "embedded"
  | "smarttv"
  | "mobile"
  | null
  | "wearable"
  | "tablet";

type T51DegDeviceTypeValue = keyof typeof ELegacyDeviceType;

const mapDeviceTypeToLegacy = (
  type: T51DegDeviceTypeValue,
): TLegacyDeviceTypeValue => ELegacyDeviceType[type];

export { mapDeviceTypeToLegacy, ELegacyDeviceType };
