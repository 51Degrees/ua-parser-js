"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.LEGACY_PROPERTIES_MAPPING = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var LEGACY_PROPERTIES_MAPPING = {
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
exports.LEGACY_PROPERTIES_MAPPING = LEGACY_PROPERTIES_MAPPING;
var extendWithLegacyProps = function extendWithLegacyProps(target) {
  var temp = _objectSpread({}, target);
  Object.keys(LEGACY_PROPERTIES_MAPPING).forEach(function (cKey) {
    if (!temp[cKey]) temp[cKey] = {};
    Object.keys(LEGACY_PROPERTIES_MAPPING[cKey]).forEach(function (eKey) {
      var mappedPropName = LEGACY_PROPERTIES_MAPPING[cKey][eKey].toLowerCase();
      temp[cKey][eKey] = temp.device[mappedPropName] || undefined;
    });
  });
  return temp;
};
var _default = extendWithLegacyProps;
exports["default"] = _default;
//# sourceMappingURL=extendWithLegacyProps.js.map