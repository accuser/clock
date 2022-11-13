/**
 * @param {HTMLTimeElement} clock - the target <time> element 
 * @param {HTMLTemplateElement} template - dot matrix template
 */
const start = (clock, template = clock.children[0]) => {
	for (let i = 0; i < 8; i++) {
		clock.appendChild(template.content.cloneNode(true));
	}

	template.remove();

	/**
   * @param {Date} datetime - the datetime to render
   */
	const tick = (datetime = new Date()) => {
		clock.setAttribute('datetime', datetime.toISOString());

		const separator = datetime.getMilliseconds() < 500 ? ':' : ' ';

		const digits = [
			datetime.getHours(),
			datetime.getMinutes(),
			datetime.getSeconds()
		]
			.map((value) => value.toString().padStart(2, '0'))
			.join(separator);

		for (let i = 0; i < 8; i++) {
			clock.children.item(i).setAttribute('data', digits[i]);
		} 
	};

	setInterval(tick, 100);
};

module.exports = start;
