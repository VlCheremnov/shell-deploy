const handlebars = require('express-handlebars')
const path = require("path")

module.exports = ({ app, ext = '.hbs', defaultLayout = 'index' } = {}) => {
    app.engine(
      ext,
      handlebars.engine({
          defaultLayout,
          extname: ext,
          layoutsDir: path.join(__dirname, '../../views/layouts')
      })
    )

    app.set('view engine', ext)
    app.set('views', path.join(__dirname, '../../views/pages'))
}
