import { ECustomError } from "../utils/errors";
const PROMISE_PROXY_HANDLING = {
  get: (target, prop) => {
    if (prop === "then" || prop === "catch") return target[prop].bind(target);
    if (target instanceof Promise) throw new Error(ECustomError.PROMISE_MISUSE);
    return Reflect.get(target, prop);
  }
};
export default PROMISE_PROXY_HANDLING;
//# sourceMappingURL=promiseProxy.js.map