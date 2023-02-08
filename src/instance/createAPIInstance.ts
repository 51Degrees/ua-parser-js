import api from "../api";
import RESULT_PROXY_HANDLING from "../proxies/resultProxy";
import { TApiResponseData } from "../api/api";
import extendWithLegacyProps from "../utils/extendWithLegacyProps";

const createAPIInstance = async (
  key: string,
  headers?: {},
): Promise<TApiResponseData> => {
  try {
    const { status, response } = await api.getJSONRequest(
      key,
      headers,
    );
    if (status === 200) {
      const mappedToLegacy =
        extendWithLegacyProps(response);
      return new Proxy(
        mappedToLegacy,
        RESULT_PROXY_HANDLING,
      );
    } else {
      throw new Error(response.errors.at(0));
    }
  } catch (error) {
    throw error;
  }
};
export default createAPIInstance;
