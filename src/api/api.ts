const api = {
  getJSONRequest: (resourceKey: string, headers?: {}): Promise<IAPIResponse> =>
    request(
      new URL(
        `https://cloud.51degrees.com/api/v4/${resourceKey}.json?cloud.client.product=ua-parser`,
      ),
      headers,
    ),
};

const request = async (url: URL, headers?: {}): Promise<IAPIResponse> => {
  const getParams = "&" + new URLSearchParams(headers).toString();
  if (typeof window !== "undefined" && Object.keys(window).length > 0) {
    try {
      const response = await fetch(url + getParams);
      const data = await response.json();
      return {
        status: response.status,
        response: data,
      };
    } catch (error) {
      throw new Error(`Request failed: ${error}`);
    }
  } else {
    const http = process.mainModule ? require("http") : await import('http');
    const https = process.mainModule ? require("https") : await import('https');

    const agent = url.protocol === "http:" ? http : https;
    const config = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search + getParams,
    };
    return new Promise<IAPIResponse>((resolve, reject) => {
      agent
        .get(config, (res) => {
          let chunks = "";
          res.on("data", (chunk) => {
            chunks += chunk;
          });
          res.on("end", () => {
            resolve({
              status: res.statusCode,
              response: JSON.parse(chunks),
            });
          });
        })
        .on("error", (error) => {
          reject(new Error(`Request failed: ${error}`));
        });
    });
  }
};

export interface IAPIResponse {
  status: number;
  response: TApiResponseData;
}

export type TApiResponseData = {
  [key: string]: any;
};

export default api;
