<template>
	<el-form :model="accountForm" :rules="rules" ref="accountForm" label-position="left" label-width="80px" style="width: 500px">
		<el-form-item prop="account" label="账号">
			<el-input type="text" v-model="accountForm.account" disabled></el-input>
		</el-form-item>
		<el-form-item style="width:100%" label="性别">
			<el-radio-group v-model="accountForm.sex">
			    <el-radio :label="male">male</el-radio>
			    <el-radio :label="female">female</el-radio>
			  </el-radio-group>
		</el-form-item>
		<el-form-item style="width:100%" label="个人简介">
			<el-input type="textarea" v-model="accountForm.desc"></el-input>
		</el-form-item>
		<el-form-item prop="password" label="密码">
			<el-input type="password" auto-complete="off" v-model="accountForm.password"></el-input>
		</el-form-item>
		<el-form-item prop="password" label="确认密码">
			<el-input type="password" auto-complete="off" v-model="accountForm.repeat_password"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" style="width: 100%" @click="submitForm('accountForm')">确认修改</el-button>
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
		          if (this.accountForm.repeat_password !== '') {
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
				accountForm: {
					account: '',
					password: '',
					sex: '',
					desc: ''
				},
				rules: {
					account: [
						{ required: true, message: '请输入账号', trigger: 'blur' }
					],
					password: [
						{ validator: validatePass, trigger: 'blur'}
					],
					repeatCheckPass: [
						{ validator: validatePass2, trigger: 'blur' }

					]
				},
			}
		},
		mounted: function () {
			
		},
		methods: {
			submitForm(name) {
				this.$refs[name].validate(valid => {
					if(valid) {

					} else {
						this.$message.error("表单验证失败");
					}
				})
			}
		}
	}
</script>