import RESULT_PROXY_HANDLING from "../proxies/resultProxy";
import { TApiResponseData } from "../api/api";
import extendWithLegacyProps from "../utils/extendWithLegacyProps";

const createInjectionInstance = async (
  key: string
): Promise<TApiResponseData> => {
  try {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = `https://cloud.51degrees.com/api/v4/${key}.js?cloud.client.product=ua-parser`;
    document.head.appendChild(script);
    return new Promise<TApiResponseData>((resolve, reject) => {
      script.onload = () => {
        // @ts-ignore
        fod.complete((data) => {
          const mappedToLegacy = extendWithLegacyProps(data);
          const proxy = new Proxy(mappedToLegacy, RESULT_PROXY_HANDLING);
          resolve(proxy);
        });
      };
      script.onerror = () => {
        reject(
          "UAParser-51D device detection failed to load javascript resource"
        );
      };
    });
  } catch (error) {
    throw new Error(`Injection request failed: ${error}`);
  }
};

export default createInjectionInstance;
