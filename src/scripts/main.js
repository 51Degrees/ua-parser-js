import "../assets/theme.scss";
import buildDeviceResultItem from "./buildDeviceResultItem.js";

const element = buildDeviceResultItem();
const container = document.getElementById("parser-result");
container.appendChild(element);
console.log(element);
