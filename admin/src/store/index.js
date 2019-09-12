import Vue from 'vue'
import Vuex from 'vuex'

import d2admin from './modules/d2admin'
import back from './back'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        d2admin,
        back
    }
})