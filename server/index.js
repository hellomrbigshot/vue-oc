const express = require('express')
const bodyParser = require('body-parser')
const user = require('./user.js')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', user);
app.listen(port, () => {
	console.log(`success listening ${port}`)
})