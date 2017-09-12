<template>
	<el-form :model="accountForm" :rules="rules" ref="accountForm" label-position="left" label-width="80px" style="width: 500px">
		<el-form-item>
			<!-- <el-input type="text" v-model="accountForm.account" disabled></el-input> -->
			你好 {{ accountForm.username }}，请完善你的个人信息
		</el-form-item>
		<el-form-item style="width:100%" label="性别">
			<el-radio-group v-model="accountForm.sex">
			    <el-radio label="male">male</el-radio>
			    <el-radio label="female">female</el-radio>
			    <el-radio label="other">unknown</el-radio>
			  </el-radio-group>
		</el-form-item>
		<el-form-item style="width:100%" label="生日">
			<el-date-picker
		      v-model="accountForm.birth"
		      :default-value="accountForm.birth"
		      type="date"
		      placeholder="选择日期" @change="birthChange">
		    </el-date-picker>
		</el-form-item>
		<el-form-item style="width:100%" label="个人简介">
			<el-input type="textarea" v-model="accountForm.desc"></el-input>
		</el-form-item>
		<el-form-item prop="oldPassword" label="原密码">
			<el-input type="password" auto-complete="off" v-model="accountForm.oldPassword"></el-input>
		</el-form-item>
		<el-form-item prop="newPassword" label="密码">
			<el-input type="password" auto-complete="off" v-model="accountForm.newPassword"></el-input>
		</el-form-item>
		<el-form-item prop="repeatPass" label="确认密码">
			<el-input type="password" auto-complete="off" v-model="accountForm.repeatPass"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" style="width: 100%" @click="submitForm('accountForm')">确认修改</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
	export default {
		data () {
			var validateOldPassword = (rule, value, callback) => {
				if (value === '' && this.accountForm.newPassword !== '') {
					callback(new Error('请输入原密码'));
		          	return false;
				}
				if (value !== '' && value !== this.oldAccountInfo.password) {
					callback(new Error('原密码输入有误'));
		          	return false;
				}
				if (this.accountForm.password !== '') {
		            this.$refs.accountForm.validateField('newPassword');
		        }
		        callback();
			};
			var validateNewPass = (rule, value, callback) => {
		        if (value === '' && this.accountForm.repeatPass !== '') {
		          callback(new Error('请输入密码'));
		          return false;
		        } 
		        if (value == this.oldAccountInfo.password) {
		        	callback(new Error('新密码不能与原密码一致'));
		          return false;
		        }  
		        if (this.accountForm.repeatPass !== '') {
		            this.$refs.accountForm.validateField('repeatPass');
		        }
		        callback();
		    };
			var validateRepeatPass = (rule, value, callback) => {
		        if (value === '' && this.accountForm.newPassword) {
		          callback(new Error('请再次输入密码'));
		          return false;
		        }
		        if (value !== this.accountForm.newPassword) {
		          callback(new Error('两次输入密码不一致!'));
		          return false;
		        }
		        callback();
		      };
			return {
				accountForm: {
					username: '',
					oldPassword: '',
					newPassword: '',
					repeatPass: '',
					sex: '',
					desc: '',
					birth: ''
				},
				accountId: JSON.parse(sessionStorage.getItem('oc_user')).user_id,
				oldAccountInfo: {

				},
				rules: {
					account: [
						{ required: true, message: '请输入账号', trigger: 'blur' }
					],
					newPassword: [
						{ validator: validateNewPass, trigger: 'blur'}
					],
					repeatPass: [
						{ validator: validateRepeatPass, trigger: 'blur' }

					],
					oldPassword: [
						{validator: validateOldPassword, trigger: 'blur'}
					]
				},
			}
		},
		mounted: function () {
			this.getAccountInfo();
		},
		methods: {
			getAccountInfo() {
				this.axios.get('/api/getAccountInfo?user_id='+this.accountId).then(response => {
					let {data, status} = response;
					this.oldAccountInfo = JSON.parse(JSON.stringify(data.user_info));
					this.accountForm = Object.assign(this.accountForm, data.user_info);
				})
			},
			submitForm(name) {
				this.$refs[name].validate(valid => {
					if(valid) {
						let _this = this,
							update_obj = {},
							arr = ['desc', 'sex', 'birth'];
						if(this.accountForm.newPassword) {
							update_obj.password = this.accountForm.newPassword;
						} 
						arr.forEach(function (ele) {
								if(_this.accountForm[ele]) {
								update_obj[ele] = _this.accountForm[ele];
							}
						})
						this.axios.post('/api/updateAccountInfo?user_id='+this.accountId, update_obj).then(response => {
							let {data, status} = response;
							if(data.errno == '1') {
								this.$notify({
			            			title: '成功',
			            			message: data.msg,
			            			type: 'success'
			            		})
			            		this.getAccountInfo();
			            	} else {
			            		this.$notify({
			            			title: '错误',
			            			message: data.msg,
			            			type: 'error'
			            		})
			            	}
						})
					} else {
						this.$message.error("表单验证失败");
					}
				})
			},
			birthChange(date) {
				this.accountForm.birth = date;
			}
		}
	}
</script>