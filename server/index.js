const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const port = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/api/login', (req, res) => {
	if(req.body.username == 'admin' && req.body.password == '123456') {
		res.json({
			errno: 1,
			msg: '登陆成功'
		})
	} else {
		res.json({
			errno: 0,
			msg: '登录失败'
		})
	}
	res.on(err, err => {
		console.log(err)
	})
})

app.listen(port, () => {
	console.log(`success listening ${port}`)
})