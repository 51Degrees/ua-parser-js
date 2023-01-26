const buildDeviceResultItem = (label, values, icon) => {
  const container = document.createElement("div");
  container.classList.add("CH-parsed__item");
  const title = createTitleContainer(label, icon);
  const value = createValueContainer(values);
  container.appendChild(title);
  container.appendChild(value);
  return container;
};

export default buildDeviceResultItem;

const createTitleContainer = (label, icon) => {
  const titleContainer = document.createElement("div");
  titleContainer.classList.add("CH-parsed__title");
  const iconElement = document.createElement("i");
  iconElement.classList.add(["icon", icon]);
  titleContainer.innerText = `${label}:`;
  titleContainer.prepend(iconElement);
  return titleContainer;
};

const createValueContainer = (values) => {
  const valueContainer = document.createElement("div");
  valueContainer.classList.add("CH-parsed__value");
  values.forEach((value) => {
    const valueElement = document.createElement("span");
    valueElement.innerText = value;
    valueContainer.appendChild(valueElement);
  });
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
