const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const cookieSecretKey = 'H2FGak54djlghk351HJKsgHB5SK'

module.exports = ({ app } = {}, { limit = '30mb' } = {}) => {
    app.use(bodyParser.urlencoded({ limit, extended: true, parameterLimit: 100000 }))
    app.use(bodyParser.json({ limit, extended: true, parameterLimit: 100000 }))
    app.use(bodyParser.raw({ limit, extended: true, parameterLimit: 100000 }))

    app.use(cookieParser(cookieSecretKey))
}
