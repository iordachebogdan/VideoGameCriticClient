<template>
  <div id="app">
    <div class="overlay"></div>
    <mdb-navbar class="navbar-dark mdb-color darken-1 sticky-top" dark>
      <mdb-navbar-brand href="/">
        Video Game Critic
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav>
          <mdb-nav-item href="#" clearfix><router-link to="/" tag="a">Home</router-link></mdb-nav-item>
          <mdb-dropdown tag="li" class="nav-item">
            <mdb-dropdown-toggle tag="a" navLink color="mdb-color-darken-1" slot="toggle" waves-fixed>Games</mdb-dropdown-toggle>
            <mdb-dropdown-menu>
              <mdb-dropdown-item><router-link to="/games">All</router-link></mdb-dropdown-item>
              <mdb-dropdown-item
                v-for="platform in platforms"
                :key="platform.id"
              >
                <router-link v-bind:to="{ path: '/games', query: {platform: platform.id}}">{{platform.name}}</router-link>
              </mdb-dropdown-item>
            </mdb-dropdown-menu>
          </mdb-dropdown>
          <mdb-dropdown tag="li" class="nav-item">
            <mdb-dropdown-toggle tag="a" navLink color="mdb-color-darken-1" slot="toggle" waves-fixed>Consoles</mdb-dropdown-toggle>
            <mdb-dropdown-menu>
              <mdb-dropdown-item><router-link to="/consoles">All</router-link></mdb-dropdown-item>
              <mdb-dropdown-item
                v-for="platform in platforms"
                :key="platform.id"
              >
                <router-link v-bind:to="{ path: '/consoles', query: {platform: platform.id}}">{{platform.name}}</router-link>
              </mdb-dropdown-item>
            </mdb-dropdown-menu>
          </mdb-dropdown>
        </mdb-navbar-nav>

        <mdb-btn color="success" class="add-button" @click.native="goToAdd">Add product</mdb-btn>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
import {mdbNavbar, mdbNavbarBrand, mdbNavItem, mdbDropdown, mdbDropdownToggle,
  mdbDropdownMenu, mdbDropdownItem, mdbNavbarNav, mdbNavbarToggler, mdbBtn,
  mdbBtnGroup, mdbIcon} from 'mdbvue'

export default {
  name: 'App',
  components: {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavItem,
    mdbDropdown,
    mdbDropdownToggle,
    mdbDropdownMenu,
    mdbDropdownItem,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbBtn,
    mdbBtnGroup,
    mdbIcon
  },
  data () {
    return {
      platforms: []
    }
  },
  methods: {
    fetchPlatforms () {
      this.$http.get('http://localhost:3000/api/platforms')
        .then(function (response) {
          this.platforms = response.body.data
        })
    },
    goToAdd () {
      this.$router.push({ path: '/add' })
    }
  },
  created: function () {
    this.fetchPlatforms()
  }
}
</script>

<style scoped>
a a {
  color: white;
  display: block;
  padding-bottom: 0.3em;
}

.overlay {
  position:fixed;
  background:url('/static/footer_lodyas.png');
  animation:100s scroll infinite linear;
  top:0;
  left:0;
  width:100%;
  height:100%;
  z-index: -1;
}

@keyframes scroll {
  100%{
    background-position:0px -3000px;
  }
}

.add-button {
  padding: 0.9em;
}
</style>
