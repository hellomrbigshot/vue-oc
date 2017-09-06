const express = require('express')
const bodyParser = require('body-parser')
const User = require('./db')

const app = express()

const port = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/api/login', (req, res) => {
	// if(req.body.username == 'admin' && req.body.password == '123456') {
	// 	res.json({
	// 		errno: 1,
	// 		msg: '登陆成功'
	// 	})
	// } else {
	// 	res.json({
	// 		errno: 0,
	// 		msg: '登录失败'
	// 	})
	// }
	User.find({username: req.body.username, userpwd: req.body.password}, (err, res_1) => {
		if(err) {
			res.json({
				errno: 0,
				msg: err
			})
			return false;
		} 
		if(res_1.length == 0) {
			res.json({
				errno: 0,
				msg: '登陆失败，用户名或密码错误'
			})
		} else {
			res.json({
				errno: 1,
				msg: '登陆成功'
			})
		}
	})
	// res.on(err, err => {
	// 	console.log(err)
	// })
})

app.listen(port, () => {
	console.log(`success listening ${port}`)
})