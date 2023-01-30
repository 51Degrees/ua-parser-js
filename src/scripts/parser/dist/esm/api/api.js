const api = {
  getJSONRequest: (resourceKey, headers) => request(new URL(`https://cloud.51degrees.com/api/v4/${resourceKey}.json?json-values-only=true `), headers)
};
const request = async (url, headers) => {
  if (typeof window !== "undefined") {
    try {
      const response = await fetch(url, {
        headers: headers
      });
      const data = await response.json();
      return {
        status: response.status,
        response: data
      };
    } catch (error) {
      throw new Error(`Request failed: ${error}`);
    }
  } else {
    const http = require("http");
    const https = require("https");
    const agent = url.protocol === "http:" ? http : https;
    const config = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: "POST",
      headers: headers
    };
    return new Promise((resolve, reject) => {
      agent.get(config, res => {
        let chunks = "";
        res.on("data", chunk => {
          chunks += chunk;
        });
        res.on("end", () => {
          resolve({
            status: res.statusCode,
            response: JSON.parse(chunks)
          });
        });
      }).on("error", error => {
        reject(new Error(`Request failed: ${error}`));
      });
    });
  }
};
export default api;
//# sourceMappingURL=api.js.map