import {getuser} from '@api/back/user'

export default {
  namespaced: true,
  state:{
	 userform: [],
	 usercreat: {
	   date: '2016-05-02',
	   name: '',
	   password: '',
	   username: '',
	   region: '',
	   other: ''
	 },
  },
  
  actions: {
    getlist ({ dispatch,commit }, {
      username = '',
      password = ''
    } = {}) {
      return new Promise((resolve, reject) => {
        // 开始请求登录接口
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
		  this.state.userform=value.userform,
		  console.log(this.state.userform)
	  }
	  
  }
}
