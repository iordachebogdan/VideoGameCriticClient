<template>
  <div id="app">
    <!--Navbar-->
    <mdb-navbar class="indigo" dark>
      <!-- Navbar brand -->
      <mdb-navbar-brand href="/">
        Video Game Critic
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav>
          <mdb-nav-item href="#" clearfix><router-link to="/" tag="a">Home</router-link></mdb-nav-item>
          <mdb-dropdown tag="li" class="nav-item">
            <mdb-dropdown-toggle tag="a" navLink color="indigo" slot="toggle" waves-fixed>Games</mdb-dropdown-toggle>
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
            <mdb-dropdown-toggle tag="a" navLink color="indigo" slot="toggle" waves-fixed>Consoles</mdb-dropdown-toggle>
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
      </mdb-navbar-toggler>
    </mdb-navbar>
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
import {mdbNavbar, mdbNavbarBrand, mdbNavItem, mdbDropdown, mdbDropdownToggle,
  mdbDropdownMenu, mdbDropdownItem, mdbNavbarNav, mdbNavbarToggler} from 'mdbvue'

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
    mdbNavbarToggler
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
</style>
