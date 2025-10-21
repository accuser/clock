/**
 * @param {HTMLTimeElement} clock - the target <time> element
 * @param {HTMLTemplateElement} template - dot matrix template
 */
const start = (clock, template = clock.children[1]) => {
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
	const formatTime = (datetime) => datetime.toLocaleTimeString('en-GB', { "hour12": false });

	const time = formatTime(new Date());

	for (let i = 0; i < time.length; i++) {
		clock.appendChild(template.content.cloneNode(true));
	}

	template.remove();

	/**
	 * Render the current time.
	 */
	let lastTime = '';
	let lastMinute = '';

	const tick = () => {
		const datetime = new Date();
		const date = formatDate(datetime);
		const time = formatTime(datetime);

		// Only update DOM if the time has actually changed
		if (time !== lastTime) {
			clock.setAttribute('datetime', date);

			// Only update accessible text when the minute changes (not every second)
			const currentMinute = time.substring(0, 5); // "HH:MM"
			if (currentMinute !== lastMinute) {
				clock.children.item(0).textContent = time;
				lastMinute = currentMinute;
			}

			for (let i = 0; i < time.length; i++) {
				clock.children.item(i + 1).setAttribute('data', time[i]);
			}

			lastTime = time;
		}

		requestAnimationFrame(tick);
	};

	requestAnimationFrame(tick);
};
