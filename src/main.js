import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import Home from './components/Home'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
