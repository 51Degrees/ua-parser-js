export const DEPRECATED_METHODS = ["getCPU", "getResult", "getBrowser", "getDevice", "getEngine", "getOS", "getUA", "setUA"];
const RESULT_PROXY_HANDLING = {
  get: (target, prop) => {
    // TODO: move this error message to the ECustomError, and replace $prop dynamically
    if (DEPRECATED_METHODS.includes(prop)) throw new Error(`Method ${prop} deprecated. Use result object properties directly. result.device contains new 51Degrees data points.`);
    return Reflect.get(target, prop);
  }
};

// Refactor
// export const DEPRECATED_METHODS = new Set([
//   "getCPU",
//   "getResult",
//   "getBrowser",
//   "getDevice",
//   "getEngine",
//   "getOS",
//   "getUA",
//   "setUA",
// ]);
//
// const RESULT_PROXY_HANDLING = {
//   get: (target: TApiResponseData, prop: string) => {
//     if (DEPRECATED_METHODS.has(prop))
//       throw new Error(
//           ECustomError.METHOD_DEPRECATED.replace('$prop', prop),
//       );
//     return Reflect.get(target, prop);
//   },
// };

export default RESULT_PROXY_HANDLING;
//# sourceMappingURL=resultProxy.js.map