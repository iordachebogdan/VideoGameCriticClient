import Vue from 'vue'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/build/css/mdb.css'
import App from './App.vue'
import router from './router'
import vueResource from 'vue-resource'

Vue.use(vueResource)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
