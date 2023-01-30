export const DEPRECATED_METHODS = ["getCPU", "getResult", "getBrowser", "getDevice", "getEngine", "getOS", "getUA", "setUA"];
const RESULT_PROXY_HANDLING = {
  get: (target, prop) => {
    if (DEPRECATED_METHODS.includes(prop)) throw new Error(`Method ${prop} deprecated. Use result object properties directly. result.device contains new 51Degrees data points.`);
    return Reflect.get(target, prop);
  }
};
export default RESULT_PROXY_HANDLING;
//# sourceMappingURL=resultProxy.js.map