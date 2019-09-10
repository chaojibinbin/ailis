import {
	getuser,
	creatuser,
	edituser,
	deleteuserapi
} from '@api/back/user'
import util from '@/libs/util.js'
import router from '@/router'

export default {
	namespaced: true,
	state: {
		uesrcreatdialogFormVisible: false, //创建框显示
		userform: [],
		usercreat: {
			name: '',
			password: '',
			user: '',
			region: '',
			other: '',
		},
	},
	getters: {
		getuserform: state => {
			return state.userform
		},
		getusercreat: state => {
			return state.usercreat
		},
		getuesrcreatdialogFormVisible: state => {
			return state.uesrcreatdialogFormVisible
		}
	},
	actions: {
		//创建用户
		creatformvisible({
			commit
		}) {

			commit('creatformvisible')


		},
		//请求创建接口
		creatuser({
			dispatch,
			commit
		}, {
			name = '',
			password = '',
			user = '',
			region = '',
			other = ''
		} = {}) {
			
			return new Promise((resolve, reject) => {
				// 开始请求创建接口
				creatuser({
						name,
						password,
						user,
						region,
						other
					})
					.then(async res => {
						
						commit('clearcreatlist')
						commit('creatformvisible')
						// 结束
						resolve()
					})
					.catch(err => {
						console.log('err: ', err)
						reject(err)
					})
			})
		},

		//查询用户

		getlist({
			dispatch,
			commit
		}) {
			return new Promise((resolve, reject) => {
				// 开始请求查询接口
				getuser()
					.then(async res => {
						// 结束

						commit('freshlist', res)
						resolve()
					})
					.catch(err => {
						console.log('err: ', err)
						reject(err)
					})
			})
		},
		//修改用户
		edituser2({commit,dispatch},{name='',password='',user='',region='',other='',uuid=''}={}){

			if(uuid == util.cookies.get('uuid')){

		
				return new Promise((resolve, reject) => {
					// 开始请求修改接口
				
					edituser({
							name,
							password,
							user,
							region,
							other,
							uuid
						})
						.then(async res => {
							// 结束
							util.cookies.remove('access_token')
							util.cookies.remove('uuid')
							// 清空 vuex 用户信息
							//await dispatch('@store/modules/d2admin/user/set', {}, { root: true })
							// 跳转路由
							router.push({
							  name: 'login'
							})
							resolve()
						})
						.catch(err => {
							console.log('err: ', err)
							reject(err)
						})
				})
				
			}else{
				
				
				return new Promise((resolve, reject) => {
					// 开始请求修改接口
					edituser({
							name,
							password,
							user,
							region,
							other,
							uuid
						})
						.then(async res => {
							// 结束
							await dispatch('getlist')
							
							resolve()
						})
						.catch(err => {
							console.log('err: ', err)
							reject(err)
						})
				})
				
				
			}

		},
		//删除用户
		deleteuser({commit,dispatch},{name='',password='',user='',region='',other='',uuid=''}={}){
			
			// console.log(uuid);
			// console.log(util.cookies.get('uuid'))
			if(uuid == util.cookies.get('uuid')){
			return new Promise((resolve, reject) => {
				
				// 开始请求删除接口
				deleteuserapi({
						name,
						password,
						user,
						region,
						other,
						uuid
					})
					.then(async res => {
						// 结束
				
						util.cookies.remove('access_token')
						util.cookies.remove('uuid')
						// 清空 vuex 用户信息
						await dispatch('d2admin/user/set', {}, { root: true })
						// 跳转路由
						router.push({
						  name: 'login'
						})
						resolve()
					})
					.catch(err => {
						console.log('err: ', err)
						reject(err)
					})
			})
			}else{
			return new Promise((resolve, reject) => {
				
				// 开始请求删除接口
				deleteuserapi({
						name,
						password,
						user,
						region,
						other,
						uuid
					})
					.then(async res => {
						// 结束
						
						resolve()
					})
					.catch(err => {
						console.log('err: ', err)
						reject(err)
					})
			})	
				
			}
		}

	},
	mutations: {
		freshlist(state, value) {
			state.userform = value.data
		},
		creatformvisible(state) {

			state.uesrcreatdialogFormVisible = !state.uesrcreatdialogFormVisible
		},
		clearcreatlist(state) {
			state.usercreat.name = '',
				state.usercreat.password = '',
				state.usercreat.user = '',
				state.usercreat.region = '',
				state.usercreat.other = ''

		}
	}
}
