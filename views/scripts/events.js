const deploy = (state) => {
	const wrapper = document.body.querySelector('.messages')

	wrapper.innerHTML = ''

	sendRequests('/api/deploy', { state })
		.catch((err) => {
			console.error('err', err)
		})
}

const switchBranch = () => {
	const wrapper = document.body.querySelector('.messages')

	wrapper.innerHTML = ''

	const input = document.getElementById('switcher')

	const branch = input.value

	sendRequests('/api/switch-branch', { branch })
		.then((response) => response.json())
		.then((data) => {
			const branch = data.branch
			const label = document.body.querySelector('label[data-branch]')

			if (!branch || !label) {
				return
			}

			label.textContent = `Текущая ветка: ${ branch }`
		})
		.catch((err) => {
			console.error('err', err)
		})
}

window.addEventListener('load', () => {
	const buttons = document.body.querySelectorAll('button')

	buttons.forEach((el) => {
		if (el.dataset.deploy !== undefined) {
			el.addEventListener('click', () => deploy(el.dataset.state))
		}

		console.log('el.dataset', el.dataset)

		if (el.dataset.switch !== undefined) {
			console.log('ep')
			el.addEventListener('click', switchBranch)
		}
	})
})