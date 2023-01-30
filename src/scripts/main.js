import "../assets/theme.scss";
import "./select.js";
import buildDeviceResultItem from "./buildDeviceResultItem.js";
import buildCurrentUADHeader from "@/scripts/buildCurrentUADHeaders.js";
import UAParser from "@/scripts/parser/dist/bundles/ua-parser-51d-js.esm.js";

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
    values: ["hardwarename", "hardwarevendor"],
  },
  {
    label: "Model",
    icon: "gear-icon",
    values: ["hardwaremodel"],
  },
];

const getHeadersFromTextArea = async () => {
  const el = document.getElementById("headers-list");
  const elVal = el.value;
  const lines = elVal.split("\n");
  const headers = lines.reduce((acc, line) => {
    const [prop, value] = line.split(":");
    acc[prop] = "";
    acc[prop] = value.replace(/['"]+/g, "").replace(`\\`).trim();
    return acc;
  }, {});

  const parsedData = await UAParser("AQQ-BCqfIeuOA4ji2kg", headers);
  drawParsedResult(parsedData);
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
      console.log(`${key}: ${value}`);
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
  const highEntropyHeaders = await navigator.userAgentData.getHighEntropyValues(
    ["architecture", "bitness", "model", "platformVersion", "fullVersionList"]
  );

  const mappedHeaders = {};

  mappedHeaders["sec-ch-ua"] = createSecCHUAFromUAD(highEntropyHeaders.brands);
  mappedHeaders["sec-ch-arch"] = `x${highEntropyHeaders["bitness"]}`;
  mappedHeaders["sec-ch-ua-full-version"] = getFullPlatformVersion(
    highEntropyHeaders.fullVersionList
  );
  mappedHeaders["sec-ch-ua-platform"] = highEntropyHeaders["platform"];
  mappedHeaders["sec-ch-ua-platform-version"] =
    highEntropyHeaders["platformVersion"];

  mappedHeaders["user-agent"] = navigator.userAgent;

  return mappedHeaders;
};

const createSecCHUAFromUAD = (values) => {
  return values
    .reduce((acc, v) => {
      acc.push(`${v.brand};v=${v.version}`);
      return acc;
    }, [])
    .join(", ");
};

const getFullPlatformVersion = (values) => {
  return values[2].version;
};
const drawUADHeaders = async () => {
  const headers = await getMyHeaders();
  buildCurrentUADHeader("headers-listing", headers);
};

drawUADHeaders().then();
