const buildDeviceResultItem = () => {
  const container = document.createElement("div");
  container.classList.add("CH-parsed__item");
  const title = createTitleContainer();
  const value = createValueContainer();
  container.appendChild(title);
  container.appendChild(value);
  return container;
};

export default buildDeviceResultItem;

const createTitleContainer = () => {
  const titleContainer = document.createElement("div");
  titleContainer.classList.add("CH-parsed__title");
  const icon = document.createElement("i");
  icon.classList.add(["icon", "download-icon"]);
  titleContainer.innerText = "CPU:";
  titleContainer.prepend(icon);

  return titleContainer;
};

const createValueContainer = () => {
  const valueContainer = document.createElement("div");
  valueContainer.classList.add("CH-parsed__value");
  const value = document.createElement("span");
  value.innerText = "AppleM1 Pro";
  valueContainer.appendChild(value);
  return valueContainer;
};

// <div className="CH-parsed__item">
//     <div className="CH-parsed__title">
//         <i className="icon download-icon"></i>CPU:
//     </div>
//     <div className="CH-parsed__value">
//         <span>Apple M1 Pro</span>
//     </div>
// </div>
