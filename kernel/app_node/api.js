const { exec, spawn } = require("child_process")

const express = require('express')
const router = express.Router()

let messages = []

const setMessage = (io, { message = '', status = 'success', ls_status = 'stdout', setMessages = true, resetMessages = false, emit = 'command message' } = {}) => {
	const params = {
		status,
		message
	}

	if (resetMessages) {
		messages = []
	} else if (setMessages) {
		messages.push(params)
	}

	console.log(`${ ls_status }: ${ message }`)

	io.emit(emit, params)
}

const runCommand = (command = '', options = {}) => {
	return spawn('cmd /c chcp 65001>nul && ' + command, {
		shell: true,
		...options
	})
}

module.exports = ({ io }) => {

	io.on('connection', (socket) => {
		console.log('a user connected')

		io.emit('command message', messages)

		socket.on('disconnect', () => {
			console.log('user disconnected')
		})
	})

	router.post('/deploy', async (req, res) => {
		const {
			state
		} = req.body

		const ls = runCommand('cd .. && dir')

		ls.stdout.on("data", data => {
			setMessage(io, {
				message: `${ data }`,
			})
		})

		ls.stderr.on("data", data => {
			setMessage(io, {
				message: `${ data }`,
				status: 'error',
				ls_status: 'stderr',
			})
		})

		ls.on('error', (error) => {
			setMessage(io, {
				message: `${ error }`,
				status: 'error',
				ls_status: 'error',
			})
		})


		ls.on("close", code => {
			setMessage(io, {
				message: 'Выполнено!',
				ls_status: 'emit close',
				resetMessages: true,
			})

			res.status(200).json({})
		})
	})

	router.post('/switch-branch', async (req, res) => {
		let {
			branch = 'dev'
		} = req.body

		if (branch === 'master') {
			branch = 'dev'
		}

		exec(`cd ../macrobank && git checkout ${ branch }`, (err, stdout, stderr) => {
			if (err) {
				setMessage(io, {
					message: `${ err.message }`,
					status: 'error',
					ls_status: 'error',
					resetMessages: true,
				})

				res.status(500).json({ message: err.message })
			} else {
				setMessage(io, {
					message: stderr,
					resetMessages: true,
				})

				res.status(200).json({ branch })
			}
		})
	})

	return router
}