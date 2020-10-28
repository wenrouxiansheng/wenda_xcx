import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		access_token: false,
		has_login: false,
		member: {},
	},
	mutations: {
		login(state) {
			
		}
	},
	getters: {

	},
	actions: {

	}
})

export default store
