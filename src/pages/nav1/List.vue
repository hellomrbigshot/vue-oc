<template>
	<div>list</div>
</template>
<script>
	import { bus } from '../../bus.js'
	export default {
		data () {
			return {
				list: []
			}
		},
		mounted: function () {
			this.getList()
		},
		methods: {
			getList () {
				
			}
		}
	}
</script>