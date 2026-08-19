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
	const formatTime = (datetime) => datetime.toLocaleTimeString('en-GB', { hour12: false });

	/**
	 * Format the time to the minute, for the accessible text. Announcing every
	 * second would flood assistive technology, so the text is deliberately no
	 * more precise than the rate at which it is refreshed.
	 *
	 * @param {Date} datetime - datetime to format
	 * @return {string} the formatted datetime
	 */
	const formatMinute = (datetime) =>
		datetime.toLocaleTimeString('en-GB', {
			hour12: false,
			hour: '2-digit',
			minute: '2-digit',
		});

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

			const minute = formatMinute(datetime);

			if (minute !== lastMinute) {
				clock.children.item(0).textContent = minute;
				lastMinute = minute;
			}

			for (let i = 0; i < time.length; i++) {
				clock.children.item(i + 1).setAttribute('data', time[i]);
			}

			lastTime = time;
		}

		// Sleep until the next second boundary rather than waking every frame
		setTimeout(tick, 1000 - (Date.now() % 1000));
	};

	tick();
};
