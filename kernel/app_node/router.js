const { exec, spawn } = require("child_process")

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.render('home', {title: 'Greetings form Handlebars'})
})

module.exports = router