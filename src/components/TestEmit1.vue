<template>
	<el-form class="emit-form" label-width="80px">
		<el-form-item label="子组件1">
			<el-input v-model="emitData"></el-input>
		</el-form-item>
		<!-- <el-form-item>
			<el-button type="primary" @click="sendData">EmitData</el-button>
		</el-form-item> -->
		<el-form-item label="测试Vuex">
			<el-button size="small" @click="substractOne" icon="minus"></el-button>
			<span>{{ count }}</span>
			<el-button size="small" @click="addOne" icon="plus"></el-button>
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
		computed: {
			count () {
				// body...
				return this.$store.state.a
			}
		},
		mounted: function () {
			
		},
		methods: {
			sendData () {
				console.log('haha');
			},
			addOne　() {
				this.$store.dispatch('addNum');
			},
			substractOne () {
				this.$store.dispatch('substractNum');
			}
		},
		watch: {
			emitData: function (newVal, oldVal) {
				bus.$emit('emitData', this.emitData);
			}
		}
	}
</script>
<style scoped lang="scss">
	.emit-form {
		margin: 20px;
	}
</style>