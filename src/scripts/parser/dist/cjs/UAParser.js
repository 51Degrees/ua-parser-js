"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;
var _promiseProxy = _interopRequireDefault(
  require("./proxies/promiseProxy.js")
);
var _errors = require("./utils/errors/index.js");
var _createInjectionInstance = _interopRequireDefault(
  require("./instance/createInjectionInstance.js")
);
var _createAPIInstance = _interopRequireDefault(
  require("./instance/createAPIInstance.js")
);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var UAParser = function UAParser(key, headers) {
  if (!key) throw Error(_errors.ECustomError.REQUIRED_RESOURCE_KEY);
  if (key.length <= 0) throw Error(_errors.ECustomError.EMPTY_RESOURCE_KEY);
  if (/\s/g.test(key))
    throw Error(_errors.ECustomError.ATTEMPT_TO_USE_USER_AGENT);
  if (key.length < 4) throw Error(_errors.ECustomError.INVALID_RESOURCE_KEY);
  if (typeof window !== "undefined") {
    if (!headers) {
      return new Proxy(
        (0, _createInjectionInstance["default"])(key),
        _promiseProxy["default"]
      );
    }
  } else {
    if (!headers) throw new Error(_errors.ECustomError.DOM_NOT_FOUND);
  }
  if (Object.keys(headers).length <= 0)
    throw Error(_errors.ECustomError.INCOMPLETE_HEADER_MAP);
  if (Object.keys(headers).length <= 0)
    throw Error(_errors.ECustomError.HEADERS_NOT_HASHMAP);
  if (
    Object.keys(headers).some(function (k) {
      return typeof headers[k] !== "string";
    })
  )
    throw Error(_errors.ECustomError.INVALID_HEADERS_VALUE);
  if (
    !Object.keys(headers).some(function (k) {
      return (
        k.toLowerCase() === "user-agent" || k.toLowerCase().includes("sec-ch")
      );
    })
  )
    throw Error(_errors.ECustomError.INCOMPLETE_HEADER_MAP);
  return new Proxy(
    (0, _createAPIInstance["default"])(key, headers),
    _promiseProxy["default"]
  );
};
var _default = UAParser;
exports["default"] = _default;
//# sourceMappingURL=UAParser.js.map
