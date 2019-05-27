const express = require('express')
const bodyParser = require('body-parser');
const MockMiddleware = require('../dist/index')
const path = require('path')
const app = express()
app.use(bodyParser.json())
app.use(MockMiddleware(path.join(process.cwd(), 'test/mock')))
app.use('/', (req, res, next) => {
	res.json(req.$test)
})
app.listen(8088, error => {

})