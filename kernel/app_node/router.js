const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.render('home', { dev_branch: req.current_dev_branch })
})

module.exports = router