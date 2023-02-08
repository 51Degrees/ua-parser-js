import UAParser  from "./UAParser";

((window, undefined) => {
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
      define(() => UAParser);
    } else if (typeof window !== "undefined") {
      // browser env
      // @ts-ignore
      window.UAParser = UAParser;
    }
  }
})(typeof window === 'object' && window);
