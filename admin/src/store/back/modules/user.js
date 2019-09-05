import {getuser,creatuser} from '@api/back/user'

export default {
  namespaced: true,
  state:{
	 uesrcreatdialogFormVisible:false,//创建框显示
	 userform:[],
	 usercreat: {
	   name: '',
	   password: '',
	   user: '',
	   region: '',
	   other: '',
	 },
  },
  getters:{
	  getuserform:state => { return state.userform },
	  getusercreat:state => { return state.usercreat },
	  getuesrcreatdialogFormVisible:state=>{return state.uesrcreatdialogFormVisible}
  },
  actions: {
	  //创建用户
	  creatformvisible({commit}){
		 commit('creatformvisible')
		  
		  
	  },
			//请求创建接口
    creatuser ({ dispatch,commit }, {
      name = '',
      password = '',
	  user = '',
	  region='',
	  other=''
    } ={}) {
      return new Promise((resolve, reject) => {
        // 开始请求创建接口
       getuser({
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

  getlist ({ dispatch,commit }, {
      username = '',
      password = ''
    } = {}) {
      return new Promise((resolve, reject) => {
        // 开始请求查询接口
       getuser({
          username,
          password
        })
          .then(async res => {
            // 结束
			commit('freshlist',res)
            resolve()
          })
          .catch(err => {
            console.log('err: ', err)
            reject(err)
          })
      })
    },

  },
  mutations:{
	  freshlist(state,value){
state.userform=value.userform
	  },
	  creatformvisible(state){
		  
		   state.uesrcreatdialogFormVisible=!state.uesrcreatdialogFormVisible
	  },
	  clearcreatlist(state){
		  state.usercreat.name='',
		  state.usercreat.password='',
		  state.usercreat.user='',
		state.usercreat.region='',
		state.usercreat.other=''
		  
	  }
  }
}
