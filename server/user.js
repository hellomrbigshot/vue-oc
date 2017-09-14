const express = require('express')
const User = require('./db')
let user = express();

// 登录接口
user.post('/login', (req, res) => {
	User.find({username: req.body.username, password: req.body.password}, (err, res_1) => {
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
			let time = new Date().Format('yyyy-MM-dd hh:mm:ss');
			console.log(time);

			User.update({username: req.body.username},{logintime: time}, err_2 => {
				if(err_2) {
					res.json({
						errno: 0,
						msg: msg
					})
				}
				res.json({
					errno: 1,
					msg: '登陆成功',
					user_id: res_1[0]._id
				})
			})
		}
	})
})
// 获取账号信息接口
user.get('/getAccountInfo', (req, res) => {
	let id = req.query.user_id;
	User.find({_id: id}, (err, user_arr) => {
		if(user_arr.length) {
			res.json({
				errno: 1,
				msg: '获取信息成功',
				user_info: user_arr[0]
			})
		} else {
			res.json({
				errno: 0,
				msg: '暂无该用户信息'
			})
		}
	})
})
// 注册接口
user.post('/register', (req, res) => {
	User.find({username: req.body.username}).exec((err, user_arr) => {
		if(user_arr.length == 0) {
			// 注册
			let user = new User({
				username: req.body.username,
				password: req.body.password
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
// 编辑登录信息接口
user.post('/updateAccountInfo', (req, res) => {
	let update_obj = {};
	User.update({_id: req.query.user_id}, req.body, {multi: true}, function (err) {
		if (err) {
			res.json({
				errno: 0,
				msg: '编辑失败'+err
			})
			return false;
		}
		res.json({
			errno: 1,
			msg: '编辑成功'
		})
	})
})
module.exports = user;