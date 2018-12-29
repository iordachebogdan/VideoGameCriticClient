<template>
  <div id="app">
    <!--Navbar-->
    <mdb-navbar class="indigo" dark>
      <!-- Navbar brand -->
      <mdb-navbar-brand href="https://mdbootstrap.com/">
        Video Game Critic
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav>
          <mdb-nav-item href="#">Home</mdb-nav-item>
          <mdb-dropdown tag="li" class="nav-item">
            <mdb-dropdown-toggle tag="a" navLink color="indigo" slot="toggle" waves-fixed>Games</mdb-dropdown-toggle>
            <mdb-dropdown-menu>
              <mdb-dropdown-item>All</mdb-dropdown-item>
              <mdb-dropdown-item
                v-for="platform in platforms"
                :key="platform.id"
              >
                {{platform.name}}
              </mdb-dropdown-item>
            </mdb-dropdown-menu>
          </mdb-dropdown>
          <mdb-dropdown tag="li" class="nav-item">
            <mdb-dropdown-toggle tag="a" navLink color="indigo" slot="toggle" waves-fixed>Consoles</mdb-dropdown-toggle>
            <mdb-dropdown-menu>
              <mdb-dropdown-item>All</mdb-dropdown-item>
              <mdb-dropdown-item
                v-for="platform in platforms"
                :key="platform.id"
              >
                {{platform.name}}
              </mdb-dropdown-item>
            </mdb-dropdown-menu>
          </mdb-dropdown>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <router-view/>
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

<style>
</style>
