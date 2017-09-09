<template>
	<el-form :model="accountForm" :rules="rules" ref="accountForm" label-position="left">
		<el-form-item prop="account">
			<el-input type="text" auto-complete="off" placeholder="账号" v-model="accountForm.account"></el-input>
		</el-form-item>
		<el-form-item prop="checkPass">
			<el-input type="password" auto-complete="off" placeholder="密码" v-model="accountForm.password"></el-input>
		</el-form-item>
		<el-form-item style="width:100%">
			<el-button type="primary" style="width: 100%" @click="submitForm('accountForm')">修改信息</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
	export default {
		data () {
			return {
				accountForm: {
					account: '',
					password: ''
				},
				rules: {

				}
			}
		}
	}
</script>