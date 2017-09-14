const mongoose = require('mongoose'),
      common = require('./common')
	  DB_URL = 'mongodb://localhost:27017/vue-oc';

mongoose.connect(DB_URL)

mongoose.connection.on('connected', () => { 
	console.log('connect success')
})

const Schema = mongoose.Schema;
const UserSchema = new Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	logintime: {type: Date, default: new Date().Format('yyyy-MM-dd hh:mm:ss')},
	birth: {type: Date, default: '2000-01-01'},
	sex: {type: String, default: 'other'},
	desc: {type: String, default: ''}
})

const User = module.exports = mongoose.model('User', UserSchema)




      