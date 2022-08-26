const { exec, spawn } = require("child_process")

module.exports = (req, res, next) => {
	req.config = JSON.parse(JSON.stringify(process.env || {}))

	req.config.services = (req.config.services || '').split(',')

	exec('cd ../macrobank && git rev-parse --abbrev-ref HEAD', (err, stdout, stderr) => {
		req.config.current_dev_branch = typeof stdout === 'string' ? stdout.trim() : null

		next()
	})
}