import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import NotFound from '@/pages/404.vue'
import Main from '@/pages/Main.vue'
import Home from '@/pages/Home.vue'
import List from '@/pages/nav1/List.vue'
import Questionnaire from '@/pages/Questionnaire.vue'
import CreateQuestionaire from '@/pages/CreateQuestionaire.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      hidden: true
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      hidden: true
    },
    {
    	path: '/404',
    	component: NotFound,
    	name: 'NotFound',
    	hidden: true
    },
    {
    	path: '/',
    	component: Home,
    	name: '导航一',
    	children: [
	    	{
	    		path: '/main', 
	    		component: Main,
	    		name: '主页'
	    	},
	    	{
	    		path: '/list',
	    		component: List,
	    		name: '用户列表'
	    	}
    	]
    },
    {
    	path: '/',
    	component: Home,
    	name: '问卷模块',
    	children: [
    		{
    			path: '/questionnaire', 
	    		component: Questionnaire, 
	    		name: '问卷列表'
    		},
    		{
    			path: '/createquestionaire',
    			component: CreateQuestionaire,
    			name: '新建问卷',
    			hidden: true
    		}
    	]
    }
  ]
})
