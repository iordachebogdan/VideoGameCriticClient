<template>
  <mdb-container>
    <alert v-if="alertMessage" :message="alertMessage" :color="alertColor"/>

    <form @submit.prevent="addProduct">
      <mdb-card class="form-card">
        <h3>What would you like to add?</h3>
        <select class="browser-default custom-select" v-model="type">
          <option value="game">Game</option>
          <option value="console">Console</option>
        </select>

        <h3 :class="{ required: incompleteSubmit && platform === '' }">Platform</h3>
        <select class="browser-default custom-select" v-model="platform">
          <option disabled value="">Please select one</option>
          <option v-for="platform in platforms" :value="platform.id" :key="platform.id">
            {{platform.name}}
          </option>
        </select>

        <h3 v-if="type === 'game'" :class="{ required: incompleteSubmit && category === '' }">Select a category</h3>
        <select v-if="type === 'game'" class="browser-default custom-select" v-model="category">
          <option disabled value="">Please select one</option>
          <option v-for="category in categories" :value="category.id" :key="category.id">
            {{category.name}}
          </option>
        </select>

        <div class="form-group">
          <label for="nameForm" :class="{ required: incompleteSubmit && name === '' }">Name</label>
          <input v-model="name" type="text" id="nameForm" class="form-control black-text">
        </div>

        <div class="form-group">
          <label for="descriptionForm" :class="{ required: incompleteSubmit && description === '' }">Description</label>
          <textarea v-model="description" class="form-control black-text" id="descriptionForm" rows="5"></textarea>
        </div>

        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroupFileAddon01"
              :class="{ required: incompleteSubmit && image === '' }">
              Upload
            </span>
          </div>
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"
              ref="image" @change="handleFileUpload"
            >
            <label class="custom-file-label" for="inputGroupFile01">
              {{image ? image.name : 'Choose image'}}
            </label>
          </div>
        </div>

        <div class="text-center">
          <mdb-btn>Submit</mdb-btn>
        </div>
      </mdb-card>
    </form>
  </mdb-container>
</template>

<script>
import alert from './Alert'
import { mdbContainer, mdbCard, mdbBtn } from 'mdbvue'

export default {
  name: 'add',
  components: {
    alert,
    mdbContainer,
    mdbCard,
    mdbBtn
  },
  data () {
    return {
      alertMessage: '',
      alertColor: 'danger',
      categories: [],
      platforms: [],
      type: 'game',
      platform: '',
      category: '',
      name: '',
      description: '',
      image: '',
      incompleteSubmit: false
    }
  },
  methods: {
    addProduct: function () {
      if (this.platform === '' || this.name === '' ||
          this.description === '' || this.image === '') {
        this.incompleteSubmit = true
        this.alertMessage = 'All fields are required!'
        return
      }
      if (this.type === 'game') {
        if (this.category === '') {
          this.incompleteSubmit = true
          this.alertMessage = 'All fields are required!'
          return
        }
        let formData = new FormData()
        formData.append('name', this.name)
        formData.append('description', this.description)
        formData.append('category_id', this.category)
        formData.append('platform_id', this.platform)
        formData.append('image', this.image)
        this.$http.post('http://localhost:3000/api/games',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(function (response) {
          this.$router.push({
            path: '/games',
            query: {
              alert_message: 'Game added successfully',
              alert_color: 'success'
            }
          })
        }, function (response) {
          this.alertMessage = 'Could not save game'
        })
      } else {
        let formData = new FormData()
        formData.append('name', this.name)
        formData.append('description', this.description)
        formData.append('platform_id', this.platform)
        formData.append('image', this.image)
        this.$http.post('http://localhost:3000/api/consoles',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(function (response) {
          this.$router.push({
            path: '/consoles',
            query: {
              alert_message: 'Console added successfully',
              alert_color: 'success'
            }
          })
        }, function (response) {
          this.alertMessage = 'Could not save console'
        })
      }
    },
    fetchCategories () {
      this.$http.get('http://localhost:3000/api/categories')
        .then(function (response) {
          this.categories = response.body.data
        }, function (response) {
          this.alertMessage = (response.body.message
            ? response.body.message
            : response.status + ' ' + response.statusText)
          this.alertColor = 'danger'
        })
    },
    fetchPlatforms () {
      this.$http.get('http://localhost:3000/api/platforms')
        .then(function (response) {
          this.platforms = response.body.data
        }, function (response) {
          this.alertMessage = (response.body.message
            ? response.body.message
            : response.status + ' ' + response.statusText)
          this.alertColor = 'danger'
        })
    },
    handleFileUpload () {
      this.image = this.$refs.image.files[0]
    }
  },
  created: function () {
    this.fetchPlatforms()
    this.fetchCategories()
  }
}
</script>

<style scoped>
.required {
  color: red;
  font-weight: bold;
}

.form-card {
  margin-top: 2em;
  margin-bottom: 2em;
  padding: 2em;
}

h3 {
  font-size: 1.2em;
  font-weight: 400;
  display: block;
}

select {
  margin-bottom: 1em;
  width: 50%;
}

input[type="text"] {
  width: 50%;
}

.input-group {
  margin-bottom: 1.5em;
}
</style>
