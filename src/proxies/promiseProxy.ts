import { ECustomError } from "../utils/errors";
import { TApiResponseData } from "../api/api";

const PROMISE_PROXY_HANDLING = {
  get: (
    target: Promise<TApiResponseData>,
    prop: string,
  ) => {
    if (prop === "then" || prop === "catch")
      return target[prop].bind(target);
    if (target instanceof Promise)
      throw new Error(ECustomError.PROMISE_MISUSE);
    return Reflect.get(target, prop);
  },
};

export default PROMISE_PROXY_HANDLING;
