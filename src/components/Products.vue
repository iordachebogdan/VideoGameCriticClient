<template>
  <div>
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
      products: []
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
      console.log(url)
      return url
    },
    fetchProducts () {
      this.$http.get(this.urlBuilder())
        .then(function (response) {
          this.products = response.body.data
        })
    }
  },
  created: function () {
    this.fetchProducts()
  }
}
</script>

<style>
</style>
