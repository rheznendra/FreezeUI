;(() => {
	/**
	 * Generates a unique ID for each freeze element.
	 */
	const generateUniqueId = () =>
		'freeze-ui-' + Math.random().toString(36).substr(2, 9)

	/**
	 * Freezes the UI
	 * options = {
	 *   selector: '.class-name' -> Choose an element where to limit the freeze or leave empty to freeze the whole body. Make sure the element has position relative or absolute,
	 *   text: 'Magic is happening' -> Choose any text to show or use the default "Loading". Be careful for long text as it will break the design.
	 * }
	 */
	window.FreezeUI = (options = {}) => {
		const freezeHtml = document.createElement('div')
		const uniqueId = generateUniqueId()

		freezeHtml.classList.add('freeze-ui')
		freezeHtml.setAttribute('data-text', options.text || 'Loading')
		freezeHtml.setAttribute('data-id', uniqueId)

		let parent = document.querySelector(options.selector) || document.body
		if (parent !== document.body) {
			freezeHtml.style.position = 'absolute'
		}
		parent.appendChild(freezeHtml)
	}

	/**
	 * Unfreezes the UI.
	 * selector -> The selector of the element to remove. This will remove the first matching element.
	 */
	window.UnFreezeUI = (options = {}) => {
		const selector = options.selector
			? `${options.selector} .freeze-ui`
			: '.freeze-ui'
		let element = document.querySelector(selector)

		if (element) {
			element.classList.add('is-unfreezing')
			setTimeout(() => {
				if (element) {
					element.classList.remove('is-unfreezing')
					element.parentElement.removeChild(element)
				}
			}, 250)
		}
	}
})()
