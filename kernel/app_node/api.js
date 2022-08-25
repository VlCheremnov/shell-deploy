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

module.exports = ({ io }) => {

	io.on('connection', (socket) => {
		console.log('a user connected')

		io.emit('command message', messages)

		socket.on('disconnect', () => {
			console.log('user disconnected')
		})
	})

	router.post('/deploy', async (req, res) => {
		const ls = spawn("ping", ["erp.macrobank.pro"])

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

	return router
}