const mongoose = require('mongoose'),
	  DB_URL = 'mongodb://localhost:27017/vue-oc';

mongoose.connect(DB_URL)

mongoose.connection.on('connected', () => { 
	console.log('connect success')
})

const Schema = mongoose.Schema;
const UserSchema = new Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	logindate: {type: Date},
	birth: {type: Date},
	sex: {type: String},
	desc: {type: String}
})

const User = module.exports = mongoose.model('User', UserSchema)
// const user = new User({
// 	username: '王迪',
// 	userpwd: 'helloworld',
// 	userage: '25',
// 	logindate: new Date()
// })

// user.save( (err, res) => {
// 	// body...
// 	if(err) {
// 		console.log(`Err: ${err}`);
// 	} else {
// 		console.log(`Res: ${res}`);
// 	}
// })

// User.find({username: '王迪', _id: '59aff9126625030c049f358c'}, (err, res) => {
// 	if(err) {
// 		console.log(`Err: ${err}`);
// 	} else {
// 		// console.log(`Res: ${res}`);
// 		console.log(res[0])
// 	}
// })




      