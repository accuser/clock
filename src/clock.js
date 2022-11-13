/**
 * @param {HTMLTimeElement} clock
 */
const start = (clock) => {
  /** @type {HTMLTemplateElement} */
  const template = clock.children[0];

  for (i = 0; i < 8; i++) {
    clock.appendChild(template.content.cloneNode(true));
  }

  template.remove();

  /**
   * @param {Date} datetime
   * @param {string} time
   */
  const tick = (datetime = new Date()) => {
    clock.setAttribute("datetime", datetime.toISOString());

    const separator = datetime.getMilliseconds() < 500 ? ":" : " "

    const digits = [
      datetime.getHours(),
      datetime.getMinutes(),
      datetime.getSeconds(),
    ]
      .map((value) => value.toString().padStart(2, "0"))
      .join(separator);

    for (i = 0; i < 8; i++) {
      clock.children.item(i).setAttribute("data", digits[i]);
    }
  };

  setInterval(tick, 100);
};
