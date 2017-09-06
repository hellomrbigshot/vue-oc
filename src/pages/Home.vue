<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="1">&nbsp;</el-col>
			<el-col :span="21" class="logo">
				<i class="text">VUE OC</i>
			</el-col>
			<el-col :span="2" class="userinfo">
				<el-dropdown trigger="click">
			      <span class="el-dropdown-link userinfo-name">
			        {{ login_user }}
			      </span>
			      <el-dropdown-menu slot="dropdown" >
			        <el-dropdown-item @click.native="">信息设置</el-dropdown-item>
			        <el-dropdown-item divided @click.native="loginout">退出登录</el-dropdown-item>
			      </el-dropdown-menu>
			    </el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside>
				<el-menu :default-active="$route.path" theme="dark" unique-opened router>
					<template v-for="(item, index) in $router.options.routes" v-if="!item.hidden" >
						<el-submenu :index="index+''" :key="index">
							<template slot="title">
								{{item.name}}
							</template>
							<el-menu-item v-for="(child, i) in item.children" :index="child.path" v-if="!child.hidden" :key="i">{{child.name}}</el-menu-item>
						</el-submenu>
					</template>
				</el-menu>
			</aside>
			<article class="content-container">
				<div >
					<el-col :span="24" class="breadcrum-container">
						<strong class="breadcrum-left">{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrum-right">
							<el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index">{{item.name}}</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<router-view></router-view>
					</el-col>
				</div>
			</article>
		</el-col>
	</el-row>
</template>
<script>
	export default({
		data() {
			return {
				router_paths: {},
				route_matched: [],
				login_user: ''
			}
		},
		mounted: function () {
			this.initPage()
		},
		methods: {
			initPage() {
				this.router_paths = this.$router.options;
				this.route_matched = this.$route.matched;
				this.login_user = JSON.parse(sessionStorage.getItem('oc_user')).username || '';
			},
			loginout() {
				var _this = this;
				this.$confirm('确定退出吗?', '提示', {
					type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('oc_user');
					_this.$router.push('/login');
				}).catch(() => {})
			}
		}
	})
</script>
<style scoped lang="scss">
	.container {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: #1F2D3D;
			color: #C0CCDA;
			
			.userinfo-name {
				color: #C0CCDA;
				&:hover{
					cursor: pointer
				}
			}
			.text {
				font-size: 20px;
				// color: #20A0FF;
			}
			
		}
		.main {
			background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				width: 230px;
			}
			.content-container {
				background: #f1f2f7;
				position: absolute;
				right: 0px;
				top: 0px;
				bottom: 0px;
				left: 230px;
				overflow-y: auto;
				padding: 20px;
				.breadcrum-container {
					margin-bottom: 15px;
					.breadcrum-left {
						float: left;
						width: 200px;
						color: #475669;
					}
					.breadcrum-right {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>