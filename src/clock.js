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
	const formatTime = (datetime) => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const separator = prefersReducedMotion || datetime.getMilliseconds() < 500 ? ':' : ' ';

		return [datetime.getHours(), datetime.getMinutes(), datetime.getSeconds()]
			.map((value) => value.toString().padStart(2, '0'))
			.join(separator);
	};

	const time = formatTime(new Date());

	for (let i = 0; i < time.length; i++) {
		clock.appendChild(template.content.cloneNode(true));
	}

	template.remove();

	/**
	 * Render the current time.
	 */
	const tick = (datetime = new Date()) => {
		const date = formatDate(datetime);
		const time = formatTime(datetime);

		clock.setAttribute('datetime', date);

		// Update accessible text for screen readers
		const accessibleTime = datetime.toLocaleTimeString('en-GB', {
			hour: 'numeric',
			minute: '2-digit',
			second: '2-digit'
		});

		clock.children.item(0).textContent = accessibleTime;

		for (let i = 0; i < time.length; i++) {
			clock.children.item(i + 1).setAttribute('data', time[i]);
		}
	};

	setInterval(tick, 100);
};
