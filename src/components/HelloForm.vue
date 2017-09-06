<template>
	<div>
		<p>{{ newStr }}</p>
		<el-button type="primary" @click="submitForm2">确定</el-button>
		<!-- <slot></slot> -->
	</div>
</template>
<script>
	const str = 'This is ';
	export default {
		data () {
			return {

			}
		},
		props:['type', 'value'],
		methods: {
			submitForm2 () {
				console.log(true);
				this.$emit('onchange', 'hello');
			}
		},
		computed: {
			newStr: function () {
				return `${str}${this.value}`
			}
		}
	}
</script>