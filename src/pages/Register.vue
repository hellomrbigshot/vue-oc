<template>
	<el-form :model="registerForm" :rules="rules" ref="registerForm" label-position="left" class="demo-ruleForm register-container">
		<h3 class="title">注册账号</h3>
		<el-form-item prop="account">
			<el-input type="text" auto-complete="off" placeholder="账号" v-model="registerForm.account"></el-input>
		</el-form-item>
		<el-form-item prop="checkPass">
			<el-input type="password" auto-complete="off" placeholder="密码" v-model="registerForm.checkPass"></el-input>
		</el-form-item>
		<el-form-item prop="repeatCheckPass">
			<el-input type="password" auto-complete="off" placeholder="确认密码" v-model="registerForm.repeatCheckPass"></el-input>
		</el-form-item>
		<el-form-item style="width:100%">
			<el-button type="primary" style="width: 100%" @click="submitForm('registerForm')">注册</el-button>
		</el-form-item>
		<el-form-item style="width:100%">
			<el-button style="width: 100%" @click="resetForm('registerForm')">重置</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
	export default {
		data () {
			 var validatePass = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入密码'));
		        } else {
		          if (this.registerForm.repeatCheckPass !== '') {
		            this.$refs.registerForm.validateField('repeatCheckPass');
		          }
		          callback();
		        }
		      };
			var validatePass2 = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请再次输入密码'));
		        } else if (value !== this.registerForm.checkPass) {
		          callback(new Error('两次输入密码不一致!'));
		        } else {
		          callback();
		        }
		      };
			return {
				registerForm: {
					account: '',
					checkPass: '',
					repeatCheckPass: ''
				},
				rules: {
					account: [
						{ required: true, message: '请输入账号', trigger: 'blur' }
					],
					checkPass: [
						{ validator: validatePass, trigger: 'blur'}
					],
					repeatCheckPass: [
						{ validator: validatePass2, trigger: 'blur' }

					]
				},
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
		          if (valid) {
		          	let registerParams = {username: this.registerForm.account, password: this.registerForm.checkPass};
		          	this.axios.post('/api/register', registerParams).then(response => {
		          		let {data, status} = response;
		            	if(data.errno == '1') {
		            		this.$notify({
		            			title: '成功',
		            			message: data.msg,
		            			type: 'success'
		            		})
		            		sessionStorage.setItem('oc_user', JSON.stringify(registerParams));
		            		this.$router.push({path: '/login'})
		            	} else {
		            		this.$notify({
		            			title: '错误',
		            			message: data.msg,
		            			type: 'error'
		            		})
		            	}
		          	})
		          } else {

		          }
		        })
			},
			resetForm(formName) {
		    	this.$refs[formName].resetFields();
		    }
		}
	}
</script>
<style lang="scss" scoped>
	.register-container {
	    box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
	    -webkit-border-radius: 5px;
	    border-radius: 5px;
	    -moz-border-radius: 5px;
	    background-clip: padding-box;
	    margin-bottom: 20px;
	    background-color: #F9FAFC;
	    margin: 80px auto;
	    border: 2px solid #8492A6;
	    width: 350px;
	    padding: 35px 35px 15px 35px;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
    .register-link {
    	float: right;
    }
  }
</style>