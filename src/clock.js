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
	 * Format the date.
	 *
	 * @param {Date} datetime - datetime to format
	 * @return {string} the formatted datetime
	 */
	const formatDate = (datetime) => datetime.toISOString();

	/**
	 * Format the time.
	 *
	 * @param {Date} datetime - datetime to format
	 * @return {string} the formatted datetime
	 */
	const formatTime = (datetime) => {
		const separator = datetime.getMilliseconds() < 500 ? ':' : ' ';

		return [datetime.getHours(), datetime.getMinutes(), datetime.getSeconds()]
			.map((value) => value.toString().padStart(2, '0'))
			.join(separator);
	};

	/**
	 * Render the current time.
	 */
	const tick = (datetime = new Date()) => {
		const date = formatDate(datetime);
		const time = formatTime(datetime);

		clock.setAttribute('datetime', date);

		for (let i = 0; i < time.length; i++) {
			clock.children.item(i).setAttribute('data', time[i]);
		}
	};

	setInterval(tick, 100);
};
