"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapDeviceTypeToLegacy = exports.ELegacyDeviceType = void 0;
var ELegacyDeviceType = {
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
exports.ELegacyDeviceType = ELegacyDeviceType;
var mapDeviceTypeToLegacy = function mapDeviceTypeToLegacy(type) {
  return ELegacyDeviceType[type];
};
exports.mapDeviceTypeToLegacy = mapDeviceTypeToLegacy;
//# sourceMappingURL=mapDeviceTypeToLegacy.js.map