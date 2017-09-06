<template>
	<div class="main-form">
		<h2 class="title">Element-ui form Test</h2>
		<el-form class="el-form" ref="form1" label-width="80px" :model="form1" :rules="mainRules">
			<el-form-item label="Title" prop="title">
				<el-input v-model="form1.title" ></el-input>
			</el-form-item>
			<el-form-item label="Option" prop="company">
				<el-select v-model="form1.company" placeholder="请选择" >
					<el-option label="乐其" value="Leqee"></el-option>
					<el-option label="拼多多" value="PDD"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('form1')">确定</el-button>
			</el-form-item>
		</el-form>
		<test-emit-1></test-emit-1>
		<test-emit-2></test-emit-2>
		<hello-form :type="type" :value="value" @onchange="alertHello">
			<el-form-item label="Title" prop="title">
				<el-input v-model="form1.title" ></el-input>
			</el-form-item>
		</hello-form>
	</div>
</template>
<script type="text/javascript">
	import TestEmit1 from '../components/TestEmit1'
	import TestEmit2 from '../components/TestEmit2'
	import HelloForm from '../components/HelloForm'
	import { bus } from '../bus.js'
	export default({
		data() {
			return {
				form1: {
					title: '',
					company: ''
				},
				mainRules: {
					title: { required: true, message: '请输入名称', trigger: 'blur' },
					company: { required: true, message: '请选择公司', trigger: 'blur' },
				},
				a: '',
				type: 'old',
				value: 'form1'
			}
		},
		mounted: function () {
			bus.$on('emitData', (text) => {this.form1.title = text})
		},
		methods: {
			submitForm(formName) {
				console.log(true);
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(true);
						bus.$emit('haha', this.form1);
					} else {
						console.log(false);
						return false;
					}
				})
			},
			alertHello (data) {
				console.log(data)
			}
		},
		components: {
			'test-emit-1': TestEmit1,
			'test-emit-2': TestEmit2,
			'hello-form': HelloForm,
		}
	})
</script>
<style lang="scss" scoped>
	.title {
		margin: 20px;
	}
	.el-form {
		margin: 20px;
	}
</style>