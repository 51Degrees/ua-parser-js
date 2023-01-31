const buildErrorMessage = (target, msg) => {
  target.innerHTML = "";
  const container = document.createElement("div");
  container.classList.add("error-block");
  const icon = document.createElement("i");
  icon.classList.add("icon", "error-icon");
  const title = document.createElement("b");
  title.textContent = "Ooops...";
  const message = document.createElement("p");
  message.textContent = msg;

  container.append(icon, title, message);

  target.append(container);
};

export default buildErrorMessage;

// <div className="error-block">
//   <i className="icon error-icon"></i>
//   <b>Ooops...</b>
//   <p>
//     Incomplete header map. Must include either User-Agent or Sec-CH-UA
//     header.
//   </p>
// </div>
