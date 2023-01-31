import "../assets/theme.scss";
import "./select.js";
import buildDeviceResultItem from "./buildDeviceResultItem.js";
import buildCurrentUADHeader from "@/scripts/buildCurrentUADHeaders.js";
import UAParser from "@/scripts/parser/bundle.esm.js";
import buildErrorMessage from "./buildErrorMessage.js";

const EXPECTED_RESULTS = [
  {
    label: "Browser",
    icon: "browser-icon",
    values: ["browsername", "browserversion"],
  },
  {
    label: "Engine",
    icon: "gear-icon",
    values: ["layoutengine"],
  },
  {
    label: "OS",
    icon: "point-icon",
    values: ["platformname", "platformversion"],
  },
  {
    label: "Type",
    icon: "laptop-icon",
    values: ["devicetype"],
  },
  {
    label: "Hardware",
    icon: "gear-icon",
    values: ["hardwarevendor", "hardwarename"],
  },
  {
    label: "Model",
    icon: "gear-icon",
    values: ["hardwaremodel"],
  },
];

const getHeadersFromTextArea = async () => {
  try {
    const el = document.getElementById("headers-list");
    const elVal = el.value;
    const lines = elVal.split("\n");
    const headers = lines.reduce((acc, line) => {
      const [prop, value] = line.split(":");
      if (!prop && !value) throw new Error("Headers field empty.");
      acc[prop] = "";
      if (!value)
        throw new Error(
          "Some header value empty, maybe you forgot to add : between header and value"
        );
      acc[prop] = value.replace(/['"]+/g, "").replace(`\\`).trim();
      return acc;
    }, {});
    const parsedData = await UAParser("AQQ-BCqfIeuOA4ji2kg", headers);
    drawParsedResult(parsedData);
  } catch (e) {
    const container = document.getElementById("parser-result");
    buildErrorMessage(container, e);
  }
};

const getParserResult = async () => {
  const parsedData = await UAParser("AQQ-BCqfIeuOA4ji2kg");
  drawParsedResult(parsedData);
};

const drawParsedResult = (parsedData) => {
  const container = document.getElementById("parser-result");
  container.innerHTML = "";
  EXPECTED_RESULTS.forEach((r) => {
    const values = r.values
      .flatMap((v) => {
        return parsedData.device[v];
      })
      .filter((v) => v !== undefined && v !== null)
      .filter((v) => {
        if (Array.isArray(v)) return v;
        return v.toLowerCase() !== "unknown";
      });

    if (values.length <= 0) return;
    const el = buildDeviceResultItem(r.label, values, r.icon);
    container.appendChild(el);
  });
};

getParserResult().then();

const grabHeadersButton = document.getElementById("grab-textarea");
grabHeadersButton.addEventListener("click", getHeadersFromTextArea);

const setHeaderValueToTextArea = async (event) => {
  const value = event.target.value;
  const el = document.getElementById("headers-list");
  el.value = value;
  await getHeadersFromTextArea();
};

const userAgentSelector = document.getElementById("user-agent-selector");
userAgentSelector.addEventListener("change", setHeaderValueToTextArea);

const copyToClipboard = async () => {
  const headers = await getMyHeaders();
  const content = Object.entries(headers)
    .map((v) => {
      const [key, value] = v;
      return `${key}: ${value}`;
    })
    .join("\n");

  navigator.clipboard.writeText(content).then(() => {
    alert("Copied to clipboard");
  });
};
const copyToClipboardButton = document.getElementById("copy-to-clipboard");
copyToClipboardButton.addEventListener("click", copyToClipboard);

const getMyHeaders = async () => {
  const mappedHeaders = {};

  if (navigator.userAgentData) {
    const highEntropyHeaders =
      await navigator.userAgentData.getHighEntropyValues([
        "architecture",
        "bitness",
        "model",
        "platformVersion",
        "fullVersionList",
      ]);

    if (stringFromBrandVersions(highEntropyHeaders.brands))
      mappedHeaders["Sec-CH-UA"] = `${stringFromBrandVersions(
        highEntropyHeaders.brands
      )}`;

    if (highEntropyHeaders["architecture"])
      mappedHeaders[
        "Sec-CH-UA-Arch"
      ] = `"${highEntropyHeaders["architecture"]}"`;

    if (highEntropyHeaders["bitness"])
      mappedHeaders["Sec-CH-UA-Bitness"] = `"${highEntropyHeaders["bitness"]}"`;

    if (typeof highEntropyHeaders["mobile"] !== undefined)
      mappedHeaders["Sec-CH-UA-Mobile"] = `?${
        highEntropyHeaders["mobile"] ? 1 : 0
      }`;

    if (stringFromBrandVersions(highEntropyHeaders.fullVersionList))
      mappedHeaders["Sec-CH-UA-Full-Version-List"] = `${stringFromBrandVersions(
        highEntropyHeaders.fullVersionList
      )}`;

    if (highEntropyHeaders["platform"])
      mappedHeaders[
        "Sec-CH-UA-Platform"
      ] = `"${highEntropyHeaders["platform"]}"`;

    if (highEntropyHeaders["platformVersion"])
      mappedHeaders[
        "Sec-CH-UA-Platform-Version"
      ] = `"${highEntropyHeaders["platformVersion"]}"`;
  }
  mappedHeaders["User-Agent"] = navigator.userAgent;

  return mappedHeaders;
};

const stringFromBrandVersions = (values) => {
  return values
    .reduce((acc, v) => {
      acc.push(`"${v.brand}";v="${v.version}"`);
      return acc;
    }, [])
    .join(", ");
};

const drawUADHeaders = async () => {
  const headers = await getMyHeaders();
  buildCurrentUADHeader("headers-listing", headers);
};

drawUADHeaders().then();
