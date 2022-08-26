const deploy = (state) => {
	const wrapper = document.body.querySelector('.messages')

	wrapper.innerHTML = ''

	fetch('/api/deploy', {
		method: 'POST',
		body: JSON.stringify({
			state
		})
	}).catch((err) => {
		console.error('err', err)
	})
}

window.addEventListener('load', () => {
	const buttons = document.body.querySelectorAll('button')

	buttons.forEach((el) => {
		if (el.dataset.deploy !== undefined) {
			el.addEventListener('click', () => deploy(el.dataset.state))
		}

		if (el.dataset.switch !== undefined) {

		}
	})
})