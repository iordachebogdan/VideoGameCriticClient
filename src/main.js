import Vue from 'vue'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/build/css/mdb.css'
import App from './App.vue'
import Router from 'vue-router'
import vueResource from 'vue-resource'
import Home from './components/Home'

Vue.use(Router)
Vue.use(vueResource)

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
