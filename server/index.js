const express = require('express')
const bodyParser = require('body-parser')
const User = require('./db')
const path = require('path')

const app = express()

const port = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')));
app.post('/api/login', (req, res) => {
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
})

app.post('/api/register', (req, res) => {
	User.find({username: req.body.username}).exec((err, user_arr) => {
		if(user_arr.length == 0) {
			// 注册
			let user = new User({
				username: req.body.username,
				userpwd: req.body.password
			});
			user.save((save_err, save_res) => {
				if (save_err) {
					res.json({
						errno: 0,
						msg: '注册失败'+save_err
					})
					return false;
				}
				res.json({
					errno: 1,
					msg: '注册成功'
				})
			})
		} else {
			res.json({
				errno: 0,
				msg: '注册失败，该用户已存在'
			})
		}
	})
})

app.listen(port, () => {
	console.log(`success listening ${port}`)
})