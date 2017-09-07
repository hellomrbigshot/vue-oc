<template>
	<el-form :model="logForm" :rules="rules" ref="logForm" label-position="left" class="demo-ruleForm login-container">
		<h3 class="title">登录OC</h3>
		<el-form-item prop="account">
			<el-input type="text" auto-complete="off" placeholder="账号" v-model="logForm.account"></el-input>
		</el-form-item>
		<el-form-item prop="checkPass">
			<el-input type="password" auto-complete="off" placeholder="密码" v-model="logForm.checkPass"></el-input>
		</el-form-item>
		<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
		<el-form-item style="width:100%">
			<el-button type="primary" style="width: 100%" @click="submitForm('logForm')">登录</el-button>
		</el-form-item>
		<el-form-item style="width:100%">
			<router-link to="{ path: '/register' }">注册账号</router-link>
			<!-- <el-button type="default" style="width:100%" @click="$router.push({path: '/register'})">注册</el-button> -->
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				logining: false,
				logForm: {
					account: '',
					checkPass: ''
				},
				rules: {
					account: [
						{ required: true, message: '请输入账号', trigger: 'blur' }
					],
					checkPass: [
						{ required: false, message: '请输入密码', trigger: 'blur'}
					]
				},
				checked: true
			}
		},
		methods: {
			submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            let loginParams = { username: this.logForm.account, password: this.logForm.checkPass };
		            this.axios.post('/api/login',loginParams).then(response => {
		            	this.logining = false;
		            	let {data, status} = response;
		            	if(data.errno == '1') {
		            		sessionStorage.setItem('oc_user', JSON.stringify(loginParams));
		            		this.$router.push({path: '/main'})
		            	} else {
		            		this.$notify({
		            			title: '错误',
		            			message: data.msg,
		            			type: 'error'
		            		})
		            	}
		            }).catch(err => console.log(err))
		          } else {
		            return false;
		          }
		        });
	      },
	      resetForm(formName) {
	        this.$refs[formName].resetFields();
	      }
		}
	}
</script>
<style lang="scss" scoped>
	.login-container {
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
  }
</style>