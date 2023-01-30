import api from "../api/index.js";
import RESULT_PROXY_HANDLING from "../proxies/resultProxy.js";
import extendWithLegacyProps from "../utils/extendWithLegacyProps.js";
const createAPIInstance = async (key, headers) => {
  try {
    const { status, response } = await api.getJSONRequest(key, headers);
    if (status === 200) {
      const mappedToLegacy = extendWithLegacyProps(response);
      return new Proxy(mappedToLegacy, RESULT_PROXY_HANDLING);
    } else {
      throw new Error(response.errors.at(0));
    }
  } catch (error) {
    throw error;
  }
};
export default createAPIInstance;
//# sourceMappingURL=createAPIInstance.js.map
