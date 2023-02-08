import { TApiResponseData } from "../api/api";

export const DEPRECATED_METHODS = ["getUA", "setUA"];

const RESULT_PROXY_HANDLING = {
  get: (target: TApiResponseData, prop: string) => {
    if (DEPRECATED_METHODS.includes(prop))
      throw new Error(
        `${prop} is a UAParser result deprecated method, consider using \`result.device\` that contains comprehensive device data.`,
      );
    return Reflect.get(target, prop);
  },
};

export default RESULT_PROXY_HANDLING;
