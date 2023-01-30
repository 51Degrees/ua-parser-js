"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DEPRECATED_METHODS = void 0;
var DEPRECATED_METHODS = ["getCPU", "getResult", "getBrowser", "getDevice", "getEngine", "getOS", "getUA", "setUA"];
exports.DEPRECATED_METHODS = DEPRECATED_METHODS;
var RESULT_PROXY_HANDLING = {
  get: function get(target, prop) {
    if (DEPRECATED_METHODS.includes(prop)) throw new Error("Method ".concat(prop, " deprecated. Use result object properties directly. result.device contains new 51Degrees data points."));
    return Reflect.get(target, prop);
  }
};
var _default = RESULT_PROXY_HANDLING;
exports["default"] = _default;
//# sourceMappingURL=resultProxy.js.map