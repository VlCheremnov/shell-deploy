const addedMessages = (messages = []) => {
	const wrapper = document.body.querySelector('.messages')

	if (!Array.isArray(messages)) {
		messages = [messages]
	}

	messages.forEach(({ status = 'success', message }) => {
		const div = document.createElement('div')

		div.classList = status

		div.textContent = `${ message }`

		wrapper.appendChild(div)
	})
}

const socket = io()

socket.on('command message', (messages) => {
	addedMessages(messages)
})