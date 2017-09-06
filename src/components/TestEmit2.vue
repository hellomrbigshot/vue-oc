<template>
	<el-form class="emit-form" label-width="80px">
		<el-form-item label="子组件2">
			<el-input v-model="emitData"></el-input>
		</el-form-item>
	</el-form>
</template>
<script type="text/javascript">
	import { bus } from '../bus.js'
	export default {
		data () {
			return {
				emitData: '',
			}
		},
		props: [],
		mounted: function () {
			bus.$on('emitData', (text) => this.emitData = text);
		},
		methods: {
			sendData () {
				console.log('haha');
			}
		}
	}
</script>
<style scoped lang="scss">
	.emit-form {
		margin: 20px;
	}
