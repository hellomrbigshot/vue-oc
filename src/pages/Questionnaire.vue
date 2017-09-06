<template>
	<div>
		<div>
			<h2 style="display: inline-block" class="title">问卷列表</h2>
			<el-button icon="plus" type="primary" class="top-button" @click="jumpToCreatePage">新建模板</el-button>
		</div>
		<el-table
		:data="questionnaire_list"
		style="width: 100%"
		max-height="250">
			<el-table-column
				prop="name"
				label="名称"
				min-width="150">
			</el-table-column>
			<el-table-column
			prop="create_time"
			label="创建时间"
			min-width="50">
			</el-table-column>
			<el-table-column
			label="操作"
			min-width="50">
			<template scope="scope">
				<el-button
				@click.native.prevent="deleteRow(scope.$index, questionnaire_list)"
				type="text"
				size="small">
				删除
				</el-button>
				<el-button
				@click.native.prevent="editRow(scope.$index, questionnaire_list)"
				type="text"
				size="small">
				编辑
				</el-button>
			</template>
		</el-table-column>
		</el-table>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				questionnaire_list: [],
			}
		},
		mounted: function () {
			this.getQuestionnaire()
		},
		methods: {
			getQuestionnaire () {
				this.questionnaire_list = JSON.parse(sessionStorage.getItem('questionnaire_list')) || []
			},
			jumpToCreatePage () {
				this.$router.push('/createquestionaire')
			},
			deleteRow (index, arr) {
				arr.splice(index, 1);
				this.$message.success("删除成功");
			},
			editRow (index, arr) {

			}
		},
	}
</script>
<style lang="scss" scoped>
	.title {
		margin: 20px;
	}
	.el-form {
		margin: 20px;
	}
	.top-button {
		// margin-left: 60%;
		float: right;
		margin-right: 20px;
		margin-top: 20px;
	}
</style>