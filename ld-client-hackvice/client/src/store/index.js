import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: []
  },
  mutations: {
    fetch_posts ({state}, payload) {
      state.posts = payload
    }
  },
  actions: {
    FETCH_POSTS ( commit , payload) {
      axios({
        method: 'get',
        url: '/posts'
      })
        .then(({ data }) => {
          commit('fetch_posts', data)
        })
        .catch(err => {
          console.log(err, 'errrorr')
        })
    },
    FETCH_DETAIL ( commit , payload) {
      return axios({
        method: 'get',
        url: `/posts/${payload}`
      })
    },
    ADD_COMMENT ( commit , payload) {
      return axios({
        method: 'PATCH',
        url: `/posts/${payload.id}`,
        data: {
          comments: payload.comments
        }
      })
    }
  },
  modules: {
  }
})
