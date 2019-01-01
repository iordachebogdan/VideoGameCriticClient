<template>
  <mdb-container>
    <mdb-row>
      <mdb-card class="product-card" color="elegant-color">
        <mdb-card-body class="operation-container">
          <mdb-btn color="danger" class="operation">Delete</mdb-btn>
          <mdb-btn color="info" class="operation">Edit</mdb-btn>
        </mdb-card-body>
        <mdb-card-image v-bind:src="image" class="product-image" waves></mdb-card-image>
        <mdb-card-body class="text-center" cascade>
          <mdb-card-title class="product-name"><strong>{{product.name}}</strong></mdb-card-title>
          <div class="product-meta">
            <i class="fa fa-star-o" aria-hidden="true">{{product.avgRating}}</i>
          </div>
          <div class="product-meta">
            <div v-if="product.category">{{product.category.name}}</div>
            <div>{{product.platform.name}}</div>
          </div>
          <h4 class="white-text"><strong>Description</strong></h4>
          <mdb-card-text class="white-text">
            <p class="product-description">{{product.description}}</p>
          </mdb-card-text>
        </mdb-card-body>
      </mdb-card>
    </mdb-row>

    <mdb-row>
      <mdb-card class="comment-form" color="elegant-color">
        <mdb-card-title>
          Add a comment
          <mdb-btn class="operation">Add</mdb-btn>
        </mdb-card-title>
        <mdb-card-body>
          <label for="userNameForm" class="grey-text">Your name</label>
          <input type="text" id="userNameForm" class="form-control">
          <br>
          <label for="commentForm" class="grey-text">Your comment</label>
          <textarea type="text" id="commentForm" class="form-control" rows="3"></textarea>
          <br>
          <label class="grey-text">Your rating</label>
          <star-rating v-model="rating" :star-size="40"></star-rating>
        </mdb-card-body>
      </mdb-card>
    </mdb-row>
  </mdb-container>
</template>

<script>
import { mdbCard, mdbCardImage, mdbCardBody, mdbCardTitle, mdbCardText,
  mdbContainer, mdbRow, mdbView, mdbMask, mdbBtn } from 'mdbvue'
import StarRating from 'vue-star-rating'

export default {
  name: 'product',
  components: {
    mdbCard,
    mdbCardImage,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbContainer,
    mdbRow,
    mdbView,
    mdbMask,
    mdbBtn,
    StarRating
  },
  data () {
    return {
      product: {
        category: {},
        platform: {}
      },
      rating: 1
    }
  },
  computed: {
    image: function () {
      return this.product.image_url === ''
        ? '/static/default_product.png'
        : 'http://localhost:3000' + this.product.image_url
    }
  },
  methods: {
    fetchProduct () {
      this.$http.get(`http://localhost:3000/api/${this.$route.params.type}/${this.$route.params.id}`)
        .then(function (response) {
          this.product = response.body.data
          this.product.avgRating = this.getAvgRating(this.product)
        })
    },
    getAvgRating (product) {
      let sum = 0
      for (let i = 0; i < product.comments.length; ++i) {
        sum += product.comments[i].rating
      }
      let mean = sum * 1.0 / product.comments.length
      return (sum === 0 ? 0 : Math.round(mean * 10) / 10)
    }
  },
  created: function () {
    this.fetchProduct()
  }
}
</script>

<style>
.product-card {
  margin: 2em;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}

.product-image {
  margin-left: auto;
  margin-right: auto;
}

.product-meta {
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-weight: 400;
}

.product-name {
  font-size: 2em;
}

.product-meta > * {
  width: 50%;
}

.product-description {
  font-size: 1.3em;
  text-align: left;
  margin-left: 1em;
  margin-right: 1em;
}

.operation {
  width: 5em;
  padding:  0.2em;
  float: right;
}

.operation-container {
  padding: 0;
}

.comment-form {
  margin-bottom: 2em;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  padding: 0.5em;
}
</style>

<style scoped>
.product-image {
  margin-left: auto;
  margin-right: auto;
}
</style>
