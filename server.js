const express = require('express')
const routes = require('./controllers')
const { engine } = require('express-handlebars')

const app = express()
const PORT = process.env.PORT || 3001

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(routes)

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`))