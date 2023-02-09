'use strict';

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var ECustomError;
(function (ECustomError) {
  ECustomError["DOM_NOT_FOUND"] = "UAParser is not running in the browser context (no DOM available), you must pass header map as a parameter to do the explicit device detection.";
  ECustomError["REQUIRED_RESOURCE_KEY"] = "Resource key required. Configure one at https://configure.51degrees.com/S6fGMDKw";
  ECustomError["EMPTY_RESOURCE_KEY"] = "Empty resource key provided. Configure one at https://configure.51degrees.com/S6fGMDKw";
  ECustomError["INCOMPLETE_HEADER_MAP"] = "Incomplete header map. Must include either User-Agent or Sec-CH-UA header.";
  ECustomError["ATTEMPT_TO_USE_USER_AGENT"] = "You are trying to use the legacy UAParser and pass User-Agent string as a parameter, please refer to the new API: await UAParser([resource-key][, header-map]).  Configure a resource key at https://configure.51degrees.com";
  ECustomError["INVALID_RESOURCE_KEY"] = "Invalid resource key. Configure one at https://configure.51degrees.com/S6fGMDKw";
  ECustomError["HEADERS_NOT_HASHMAP"] = "Invalid header map. Header map object must be a valid hash map.";
  ECustomError["INVALID_HEADERS_VALUE"] = "Invalid header map. Header values must be of type string.";
  ECustomError["PROMISE_MISUSE"] = "You are likely using a legacy API. The new UAParser call returns a promise that must be awaited.";
})(ECustomError || (ECustomError = {}));
var ECustomWarnings;
(function (ECustomWarnings) {
  ECustomWarnings["USING_DEFAULT_KEY"] = "Resource key not provided. Using default resource key";
})(ECustomWarnings || (ECustomWarnings = {}));

var PROMISE_PROXY_HANDLING = {
  get: function get(target, prop) {
    if (prop === "then" || prop === "catch") return target[prop].bind(target);
    if (target instanceof Promise) throw new Error(ECustomError.PROMISE_MISUSE);
    return Reflect.get(target, prop);
  }
};

var DEPRECATED_METHODS = ["getUA", "setUA"];
var RESULT_PROXY_HANDLING = {
  get: function get(target, prop) {
    if (DEPRECATED_METHODS.includes(prop)) throw new Error("".concat(prop, " is a UAParser result deprecated method, consider using `result.device` that contains comprehensive device data."));
    return Reflect.get(target, prop);
  }
};

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
var mapDeviceTypeToLegacy = function mapDeviceTypeToLegacy(type) {
  return ELegacyDeviceType[type];
};

var LEGACY_PROPERTIES_MAPPING = {
  browser: {
    name: "browsername",
    version: "browservendor"
  },
  cpu: {
    architecture: undefined
  },
  device: {
    model: "hardwaremodel",
    type: "devicetype",
    vendor: "hardwarevendor"
  },
  engine: {
    name: "layoutengine",
    version: undefined
  },
  os: {
    name: "platformname",
    version: "platformversion"
  }
};
var LEGACY_METHODS_MAPPING = {
  getBrowser: function getBrowser() {
    return LEGACY_PROPERTIES_MAPPING.browser;
  },
  getCPU: function getCPU() {
    return LEGACY_PROPERTIES_MAPPING.cpu;
  },
  getDevice: function getDevice() {
    return LEGACY_PROPERTIES_MAPPING.device;
  },
  getEngine: function getEngine() {
    return LEGACY_PROPERTIES_MAPPING.engine;
  },
  getOS: function getOS() {
    return LEGACY_PROPERTIES_MAPPING.os;
  },
  getResult: function getResult() {
    return {
      os: LEGACY_METHODS_MAPPING.getOS(),
      browser: LEGACY_METHODS_MAPPING.getBrowser(),
      cpu: LEGACY_METHODS_MAPPING.getCPU(),
      device: LEGACY_METHODS_MAPPING.getDevice(),
      engine: LEGACY_METHODS_MAPPING.getEngine()
    };
  }
};
var extendWithLegacyProps = function extendWithLegacyProps(target) {
  var temp = _objectSpread2({}, target);
  for (var _i = 0, _Object$entries = Object.entries(LEGACY_PROPERTIES_MAPPING); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i2 = _slicedToArray(_Object$entries[_i], 2),
      prop = _Object$entries$_i2[0],
      propValue = _Object$entries$_i2[1];
    if (!temp[prop]) temp[prop] = {};
    temp[prop] = Object.assign(temp[prop], createLegacyData(temp, propValue));
  }
  for (var _i2 = 0, _Object$entries2 = Object.entries(LEGACY_METHODS_MAPPING); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i2 = _slicedToArray(_Object$entries2[_i2], 2),
      methodName = _Object$entries2$_i2[0],
      methodFunction = _Object$entries2$_i2[1];
    temp[methodName] = createLegacyMethod(temp, methodFunction);
  }
  return temp;
};
var createLegacyData = function createLegacyData(donor, target) {
  var donorValues = _objectSpread2({}, donor.device);
  var result = {};
  for (var _i3 = 0, _Object$entries3 = Object.entries(target); _i3 < _Object$entries3.length; _i3++) {
    var _Object$entries3$_i2 = _slicedToArray(_Object$entries3[_i3], 2),
      UALegacyName = _Object$entries3$_i2[0],
      FODParamName = _Object$entries3$_i2[1];
    if (!result[UALegacyName]) result[UALegacyName] = "";
    if (FODParamName === undefined) result[UALegacyName] = undefined;
    if (FODParamName && donorValues[FODParamName] && donorValues[FODParamName].toLowerCase() === "unknown") {
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
var createLegacyMethod = function createLegacyMethod(donor, method) {
  var methodResultingObject = method();
  if (methodResultingObject.browser) {
    var result = {};
    for (var _i4 = 0, _Object$entries4 = Object.entries(methodResultingObject); _i4 < _Object$entries4.length; _i4++) {
      var _Object$entries4$_i2 = _slicedToArray(_Object$entries4[_i4], 2),
        _key = _Object$entries4$_i2[0],
        value = _Object$entries4$_i2[1];
      if (!result[_key]) result[_key] = {};
      result[_key] = createLegacyData(donor, value);
    }
    return function () {
      return result;
    };
  }
  return function () {
    return createLegacyData(donor, methodResultingObject);
  };
};

var createInjectionInstance = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(key) {
    var script;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          script = document.createElement("script");
          script.type = "text/javascript";
          script.async = true;
          script.src = "https://cloud.51degrees.com/api/v4/".concat(key, ".js?cloud.client.product=ua-parser");
          document.head.appendChild(script);
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            script.onload = function () {
              // @ts-ignore
              fod.complete(function (data) {
                var mappedToLegacy = extendWithLegacyProps(data);
                var proxy = new Proxy(mappedToLegacy, RESULT_PROXY_HANDLING);
                resolve(proxy);
              });
            };
            script.onerror = function () {
              reject("UAParser-51D device detection failed to load javascript resource");
            };
          }));
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          throw new Error("Injection request failed: ".concat(_context.t0));
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function createInjectionInstance(_x) {
    return _ref.apply(this, arguments);
  };
}();

var api = {
  getJSONRequest: function getJSONRequest(resourceKey, headers) {
    return request(new URL("https://cloud.51degrees.com/api/v4/".concat(resourceKey, ".json?cloud.client.product=ua-parser")), headers);
  }
};
var request = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url, headers) {
    var getParams, response, data, http, https, agent, config;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          getParams = "&" + new URLSearchParams(headers).toString();
          if (!(typeof window !== "undefined" && Object.keys(window).length > 0)) {
            _context.next = 17;
            break;
          }
          _context.prev = 2;
          _context.next = 5;
          return fetch(url + getParams);
        case 5:
          response = _context.sent;
          _context.next = 8;
          return response.json();
        case 8:
          data = _context.sent;
          return _context.abrupt("return", {
            status: response.status,
            response: data
          });
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](2);
          throw new Error("Request failed: ".concat(_context.t0));
        case 15:
          _context.next = 36;
          break;
        case 17:
          if (!process.mainModule) {
            _context.next = 21;
            break;
          }
          _context.t1 = require("http");
          _context.next = 24;
          break;
        case 21:
          _context.next = 23;
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('http')); });
        case 23:
          _context.t1 = _context.sent;
        case 24:
          http = _context.t1;
          if (!process.mainModule) {
            _context.next = 29;
            break;
          }
          _context.t2 = require("https");
          _context.next = 32;
          break;
        case 29:
          _context.next = 31;
          return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('https')); });
        case 31:
          _context.t2 = _context.sent;
        case 32:
          https = _context.t2;
          agent = url.protocol === "http:" ? http : https;
          config = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname + url.search + getParams
          };
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            agent.get(config, function (res) {
              var chunks = "";
              res.on("data", function (chunk) {
                chunks += chunk;
              });
              res.on("end", function () {
                resolve({
                  status: res.statusCode,
                  response: JSON.parse(chunks)
                });
              });
            }).on("error", function (error) {
              reject(new Error("Request failed: ".concat(error)));
            });
          }));
        case 36:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 12]]);
  }));
  return function request(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var createAPIInstance = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(key, headers) {
    var _yield$api$getJSONReq2, status, response, mappedToLegacy;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return api.getJSONRequest(key, headers);
        case 3:
          _yield$api$getJSONReq2 = _context.sent;
          status = _yield$api$getJSONReq2.status;
          response = _yield$api$getJSONReq2.response;
          if (!(status === 200)) {
            _context.next = 11;
            break;
          }
          mappedToLegacy = extendWithLegacyProps(response);
          return _context.abrupt("return", new Proxy(mappedToLegacy, RESULT_PROXY_HANDLING));
        case 11:
          throw new Error(response.errors.at(0));
        case 12:
          _context.next = 17;
          break;
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          throw _context.t0;
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 14]]);
  }));
  return function createAPIInstance(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * UAParser detects device data either from the current browser context or from the passed `headerMap` parameter.  Note: if you are running on the server side in the Node.js environment - you must pass the headerMap parameter.  It can be either taken from the current request or from the stored data.
 *  @param key - Required to use the 51Degrees Cloud service that UAParser relies on internally.  Configure one at {@link https://configure.51degrees.com/S6fGMDKw}
 *  @param headers - an optional param Map of HTTP headers containing User-Agent Client Hints and/or User-Agent.  if omitted UAParser will assume browser context and try to do detection from within the DOM.
 *  @returns a Result object with a nested .device object containing all the detected device properties.
 */

var UAParser = function UAParser(key, headers) {
  if (!key) throw Error(ECustomError.REQUIRED_RESOURCE_KEY);
  if (key.length <= 0) throw Error(ECustomError.EMPTY_RESOURCE_KEY);
  if (/\s/g.test(key)) throw Error(ECustomError.ATTEMPT_TO_USE_USER_AGENT);
  if (key.length < 4) throw Error(ECustomError.INVALID_RESOURCE_KEY);
  if (typeof window !== "undefined") {
    if (!headers) {
      return new Proxy(createInjectionInstance(key), PROMISE_PROXY_HANDLING);
    }
  } else {
    if (!headers) throw new Error(ECustomError.DOM_NOT_FOUND);
  }
  if (Object.keys(headers).length <= 0) throw Error(ECustomError.INCOMPLETE_HEADER_MAP);
  if (Object.keys(headers).length <= 0) throw Error(ECustomError.HEADERS_NOT_HASHMAP);
  if (Object.keys(headers).some(function (k) {
    return typeof headers[k] !== "string";
  })) throw Error(ECustomError.INVALID_HEADERS_VALUE);
  if (!Object.keys(headers).some(function (k) {
    return k.toLowerCase() === "user-agent" || k.toLowerCase().includes("sec-ch");
  })) throw Error(ECustomError.INCOMPLETE_HEADER_MAP);
  return new Proxy(createAPIInstance(key, headers), PROMISE_PROXY_HANDLING);
};

(function (window, undefined$1) {
  if (typeof exports !== "undefined") {
    // nodejs env
    if (typeof module !== "undefined" && module.exports) {
      exports = module.exports = UAParser;
    }
    exports.UAParser = UAParser;
  } else {
    // requirejs env (optional)
    // @ts-ignore
    if (typeof define === "function" && define.amd) {
      // @ts-ignore
      define(function () {
        return UAParser;
      });
    } else if (typeof window !== "undefined") {
      // browser env
      // @ts-ignore
      window.UAParser = UAParser;
    }
  }
})((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window);
