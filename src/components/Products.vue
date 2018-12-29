<template>
  <div>
    <div v-if="isGame">
      <div
        v-for="category in categories"
        :key="category.id"
        class="custom-control custom-checkbox custom-control-inline"
      >
        <input type="checkbox" class="custom-control-input" :id="category.id" :value="category.id" v-model="activeCategories">
        <label class="custom-control-label" :for="category.id">{{category.name}}</label>
      </div>
    </div>
    <div v-for="product in products" :key="product.id">
      {{product.name}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'products',
  data () {
    return {
      products: [],
      categories: [],
      activeCategories: [],
      isGame: false
    }
  },
  methods: {
    urlBuilder () {
      let url = 'http://localhost:3000/api/' + this.$route.params.type
      let first = true
      if (this.$route.query.platform) {
        url += '?platform_id=' + this.$route.query.platform
        first = false
      }
      if (this.$route.query.categories) {
        for (let i = 0; i < this.$route.query.categories.length; ++i) {
          if (first) {
            url += '?'
            first = false
          } else {
            url += '&'
          }
          url += 'category_ids[]=' + this.$route.query.categories[i]
        }
      }
      return url
    },
    fetchProducts () {
      this.$http.get(this.urlBuilder())
        .then(function (response) {
          this.products = response.body.data
        })
    },
    fetchCategories () {
      this.$http.get('http://localhost:3000/api/categories')
        .then(function (response) {
          this.categories = response.body.data
        })
    }
  },
  created: function () {
    this.fetchProducts()
    this.fetchCategories()
    if (this.$route.params.type === 'games') {
      this.isGame = true
    }
    if (this.$route.query.categories) {
      for (let i = 0; i < this.$route.query.categories.length; ++i) {
        this.activeCategories.push(parseInt(this.$route.query.categories[i]))
      }
    }
  },
  watch: {
    activeCategories: function (newCategories) {
      let queryConfig = {}
      if (this.$route.query.platform) {
        queryConfig.platform = this.$route.query.platform
      }
      if (newCategories.length !== 0) {
        queryConfig.categories = newCategories
      }
      this.$router.push(
        queryConfig === {}
          ? { path: `/${this.$route.params.type}` }
          : { path: `/${this.$route.params.type}`, query: queryConfig }
      )
    }
  }
}
</script>

<style>
</style>
