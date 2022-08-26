require('dotenv').config()

const express = require('express')
const path = require("path")
const http = require('http')

const app = express()
const server = http.createServer(app)

// Переменные окружения
const {
	port
} = process.env

// Подключаем сокеты
const { Server } = require("socket.io")
const io = new Server(server)

const main = () => {
	try {
		// Статика
		app.use('/assets', express.static(path.join(__dirname, '../views/assets')))
		app.use('/scripts', express.static(path.join(__dirname, '../views/scripts')))

		// Парсер
		require(path.join(__dirname, '/app_node/parser'))({ app })
		// ****

		// HBS
		require(path.join(__dirname, '/app_node/handlebars'))({ app })
		// ****

		// ПО
		app.use(require(path.join(__dirname, '/app_node/middleware/verification')))

		// Роутер
		const router = require(path.join(__dirname, '/app_node/router'))
		app.use(`/`, router)
		// ****

		// Апи
		const api = require(path.join(__dirname, '/app_node/api'))({ io })
		app.use(`/api`, api)
		// ****

		server.listen(port, () => {
			console.log(`Example app listening on port ${ port }`)
		})
	} catch (err) {
		console.log('err', err)
	}
}

main()
