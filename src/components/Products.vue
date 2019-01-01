<template>
  <div>
    <mdb-container v-if="isGame" class="category-filter">
      <mdb-collapse :toggleText="['Filter by category']" :toggleClass="['btn btn-purple']">
        <div class="category-container">
          <div
            v-for="category in categories"
            :key="category.id"
            class="custom-control custom-checkbox custom-control-inline"
          >
            <input type="checkbox" class="custom-control-input" :id="category.id" :value="category.id" v-model="activeCategories">
            <label class="custom-control-label" :for="category.id">{{category.name}}</label>
          </div>
        </div>
      </mdb-collapse>
    </mdb-container>

    <mdb-container>
      <mdb-input label="Type to search" type="text" class="search-bar" v-model="filterInput" />
    </mdb-container>

    <div class="products-container">
      <mdb-card class="d-inline-block card-container" color="grey darken-2" v-for="product in filterBy(productCollection, filterInput)" :key="product.id">
        <mdb-card-image v-bind:src="product.image" class="product-image" waves></mdb-card-image>
        <mdb-card-body class="product-body">
          <mdb-card-title class="card-title-fnt">{{product.name}}</mdb-card-title>
          <i class="fa fa-star-o" aria-hidden="true">{{product.avgRating}}</i>
          <mdb-btn color="purple darken-2" class="product-button" @click="goTo(product.id)">More</mdb-btn>
        </mdb-card-body>
      </mdb-card>
    </div>
  </div>
</template>

<script>
import { mdbCard, mdbCardImage, mdbCardBody, mdbCardTitle, mdbCardText, mdbBtn,
  mdbCollapse, mdbContainer, mdbInput } from 'mdbvue'

export default {
  name: 'products',
  components: {
    mdbCard,
    mdbCardImage,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbBtn,
    mdbCollapse,
    mdbContainer,
    mdbInput
  },
  data () {
    return {
      products: [],
      categories: [],
      activeCategories: [],
      isGame: false,
      filterInput: ''
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
    },
    getAvgRating (product) {
      let sum = 0
      for (let i = 0; i < product.comments.length; ++i) {
        sum += product.comments[i].rating
      }
      let mean = sum * 1.0 / product.comments.length
      return (sum === 0 ? 0 : Math.round(mean * 10) / 10)
    },
    filterBy (list, value) {
      return list.filter(function (product) {
        return product.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      })
    },
    goTo (id) {
      this.$router.push({ path: `/${this.$route.params.type}/${id}` })
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
  computed: {
    productCollection: function () {
      let vm = this
      return this.products.map(function (product) {
        return {
          id: product.id,
          name: product.name,
          avgRating: vm.getAvgRating(product),
          image: product.image_url === ''
            ? 'static/default_product.png'
            : 'http://localhost:3000' + product.image_url
        }
      })
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
.products-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.card-container {
  width: 13em;
  min-width: 10em;
  margin: 3%;
  height: 21em;
}

.product-button {
  position: absolute;
  bottom: 1em;
  right:  1em;
  width:  50%;
  height:  12%;
  padding: 0em;
  font-size: 10px;
}

.category-filter {
  margin-left: 0;
  margin-top: 1em;
}

.category-container {
  display:  inline-block;
  background-color: #3b465e;
  color: white;
  font-size: 1.2em;
  border-radius: 10px;
  padding: 0.5em;
}

.form-control:focus {
  color: white;
}
</style>

<style scoped>
.card-title-fnt {
  font-size: 1.2em;
}

.product-image {
  height: 13em;
  width:  100%;
  margin-top: 0;
}
</style>
