<template>
  <mdb-container>
    <mdb-row>
      <mdb-card class="product-card" color="elegant-color">
        <mdb-card-body class="operation-container">
          <mdb-btn color="danger" class="operation" @click.native="modal = true">Delete</mdb-btn>
          <mdb-btn color="info" class="operation">Edit</mdb-btn>
        </mdb-card-body>
        <mdb-card-image v-bind:src="image" class="product-image" waves></mdb-card-image>
        <mdb-card-body class="text-center" cascade>
          <mdb-card-title class="product-name"><strong>{{product.name}}</strong></mdb-card-title>
          <div class="product-meta">
            <i class="fa fa-star-o" aria-hidden="true">{{avgRating}}</i>
          </div>
          <div class="product-meta">
            <div v-if="product.category">{{product.category.name}}</div>
            <div>{{product.platform.name}}</div>
          </div>
          <br><br>
          <h4 class="white-text"><strong>Description</strong></h4>
          <mdb-card-text class="white-text">
            <p class="product-description">{{product.description}}</p>
          </mdb-card-text>
        </mdb-card-body>
      </mdb-card>
    </mdb-row>

    <mdb-row>
      <mdb-card class="comment-form" color="elegant-color" id="add-edit-comment-form">
        <mdb-card-title class="comment-card-title">
          {{isEditing === -1 ? 'Add a' : 'Update'}} comment
          <mdb-btn
            v-if="isEditing === -1"
            class="operation"
            :color="comment.user !== '' && comment.text !== '' ? 'success' : ''"
            @click.native.prevent="addComment"
          >
            Add
          </mdb-btn>
          <mdb-btn
            v-else
            class="operation"
            :color="comment.user !== '' && comment.text !== '' ? 'success' : ''"
            @click.native.prevent="editCommentSave"
          >
            Save
          </mdb-btn>
        </mdb-card-title>
        <mdb-card-body>
          <label for="userNameForm" class="grey-text">Your name</label>
          <input v-model="comment.user" type="text" id="userNameForm" class="form-control black-text">
          <br>
          <label for="commentForm" class="grey-text">Your comment</label>
          <textarea v-model="comment.text" type="text" id="commentForm" class="form-control black-text" rows="3"></textarea>
          <br>
          <label class="grey-text">Your rating</label>
          <star-rating v-model="comment.rating" :star-size="40"></star-rating>
        </mdb-card-body>
      </mdb-card>
    </mdb-row>

    <mdb-row>
      <mdb-card class="comment-form" color="elegant-color" v-for="comment in product.comments" :key="comment.id">
        <mdb-card-title class="comment-card-title">
          {{comment.user}}
          <mdb-btn class="operation"
            color="danger"
            @click.native.prevent="deleteComment(comment.id)"
          >
            Delete
          </mdb-btn>
          <mdb-btn class="operation"
            color="info"
            @click.native.prevent="editCommentInit(comment.id)"
          >
            Edit
          </mdb-btn>
        </mdb-card-title>
        <mdb-card-body style="padding-top: 0;">
          <star-rating :rating="comment.rating" :read-only="true" :star-size="20"></star-rating>
          <div class="comment-text">
          {{comment.text}}
          </div>
        </mdb-card-body>
      </mdb-card>
    </mdb-row>

    <mdb-modal v-if="modal" @close="modal = false">
      <mdb-modal-header>
        <mdb-modal-title>Warning!</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>Are you sure you want to delete this
        {{$route.params.type === 'games' ? 'game' : 'console'}}?
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="info" @click.native="modal = false">Cancel</mdb-btn>
        <mdb-btn color="danger" @click.native="deleteProduct">Delete</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </mdb-container>
</template>

<script>
import { mdbCard, mdbCardImage, mdbCardBody, mdbCardTitle, mdbCardText,
  mdbContainer, mdbRow, mdbView, mdbMask, mdbBtn, mdbModal, mdbModalHeader,
  mdbModalTitle, mdbModalBody, mdbModalFooter } from 'mdbvue'
import StarRating from 'vue-star-rating'
import VueScrollTo from 'vue-scrollto'

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
    StarRating,
    VueScrollTo,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter
  },
  data () {
    return {
      product: {
        category: {},
        platform: {},
        comments: []
      },
      comment: {
        user: '',
        text: '',
        rating: 1
      },
      isEditing: -1,
      modal: false
    }
  },
  computed: {
    image: function () {
      return this.product.image_url === ''
        ? '/static/default_product.png'
        : 'http://localhost:3000' + this.product.image_url
    },
    avgRating: function () {
      let sum = 0
      for (let i = 0; i < this.product.comments.length; ++i) {
        sum += this.product.comments[i].rating
      }
      let mean = sum * 1.0 / this.product.comments.length
      return (sum === 0 ? 0 : Math.round(mean * 10) / 10)
    }
  },
  methods: {
    fetchProduct () {
      this.$http.get(`http://localhost:3000/api/${this.$route.params.type}/${this.$route.params.id}`)
        .then(function (response) {
          this.product = response.body.data
        })
    },
    addComment () {
      if (this.comment.user === '' || this.comment.text === '') {
        return
      }
      let newComment = {
        user: this.comment.user,
        text: this.comment.text,
        rating: this.comment.rating,
        product_id: this.$route.params.id
      }
      this.product.comments.push(newComment)
      this.$http.post(`http://localhost:3000/api/comments`, newComment)
        .then(function (response) {
          newComment.id = response.body.data.id
        })
      this.comment.user = ''
      this.comment.text = ''
      this.comment.rating = 1
    },
    deleteComment (id) {
      this.product.comments = this.product.comments.filter((product) => {
        return product.id !== id
      })
      this.$http.delete(`http://localhost:3000/api/comments/${id}`)
    },
    editCommentInit (id) {
      this.isEditing = id
      let comm = this.product.comments.find(comment => {
        return comment.id === id
      })
      this.comment = {
        user: comm.user,
        text: comm.text,
        rating: comm.rating
      }
      VueScrollTo.scrollTo('#add-edit-comment-form')
    },
    editCommentSave () {
      if (this.comment.user === '' || this.comment.text === '') {
        return
      }
      for (let i = 0; i < this.product.comments.length; ++i) {
        if (this.product.comments[i].id === this.isEditing) {
          this.product.comments[i].user = this.comment.user
          this.product.comments[i].text = this.comment.text
          this.product.comments[i].rating = this.comment.rating

          this.$http.put(`http://localhost:3000/api/comments/${this.isEditing}`, {
            user: this.comment.user,
            text: this.comment.text,
            rating: this.comment.rating
          })
          break
        }
      }
      this.isEditing = -1
      this.comment.user = ''
      this.comment.text = ''
      this.comment.rating = 1
    },
    deleteProduct () {
      this.$http.delete(`http://localhost:3000/api/${this.$route.params.type}/${this.$route.params.id}`)
        .then(function (response) {
          this.$router.push({ path: `/${this.$route.params.type}` })
        })
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
  color: black;
}

.comment-text {
  white-space: pre-line;
}

.comment-card-title {
  margin-bottom: 0;
  padding-left: 0.5em;
}
</style>

<style scoped>
.product-image {
  margin-left: auto;
  margin-right: auto;
}
</style>
