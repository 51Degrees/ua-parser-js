"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;
var _errors = require("../utils/errors/index.js");
var PROMISE_PROXY_HANDLING = {
  get: function get(target, prop) {
    if (prop === "then" || prop === "catch") return target[prop].bind(target);
    if (target instanceof Promise)
      throw new Error(_errors.ECustomError.PROMISE_MISUSE);
    return Reflect.get(target, prop);
  },
};
var _default = PROMISE_PROXY_HANDLING;
exports["default"] = _default;
//# sourceMappingURL=promiseProxy.js.map
