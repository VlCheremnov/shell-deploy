const { exec, spawn } = require("child_process")

module.exports = (req, res, next) => {
	exec('cd ../macrobank && git rev-parse --abbrev-ref HEAD', (err, stdout, stderr) => {
		req.current_dev_branch = typeof stdout === 'string' ? stdout.trim() : null
		next()
	})
}