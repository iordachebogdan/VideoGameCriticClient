import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Products from '@/components/Products'
import Product from '@/components/Product'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:type',
      name: 'products',
      component: Products,
      beforeEnter: (to, from, next) => {
        if (to.params.type === 'games' || to.params.type === 'consoles') {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/:type/:id',
      name: 'product',
      component: Product,
      beforeEnter: (to, from, next) => {
        if (to.params.type === 'games' || to.params.type === 'consoles') {
          next()
        } else {
          next(false)
        }
        console.log('hello')
      }
    }
  ],
  mode: 'history'
})
