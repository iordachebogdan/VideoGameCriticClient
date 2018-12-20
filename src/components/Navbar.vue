<template>
  <nav id="nav" role="navigation">
    <a href="#nav" title="Show navigation">Show navigation</a>
    <a href="#" title="Hide navigation">Hide navigation</a>
    <ul>
        <li><a href="/">Home</a></li>
        <li>
            <a href="/">Games</a>
            <input type="checkbox"/>
            <ul>
                <li><a href="/">PlayStation</a></li>
                <li><a href="/">Xbox</a></li>
                <li><a href="/">PC</a></li>
                <li><a href="/">Nintendo</a></li>
            </ul>
        </li>
        <li>
            <a href="/">Consoles</a>
            <input type="checkbox"/>
            <ul>
                <li><a href="/">PlayStation</a></li>
                <li><a href="/">Xbox</a></li>
                <li><a href="/">Nintendo</a></li>
            </ul>
        </li>
        <li><a href="/">About</a></li>
    </ul>
</nav>
</template>

<script>
export default {
  name: 'Navbar'
}

window.addEventListener('load', function () {
  console.log('Hello')
})
</script>

<style type="text/css">

ul {
  list-style-type: none;
}

#nav > a {
  display:  none;
}
#nav li {
  position: relative;
}

#nav > ul {
  height:  3.75em;
}
#nav > ul > li {
  width:  25%;
  height: 100%;
  float: left;
}

#nav li ul {
  display:  none;
  position:  absolute;
  top: 100%;
}
#nav li input[type="checkbox"]:checked~ul {
  display: block;
}

@media only screen and ( max-width: 40em ) {
  #nav {
    position: relative;
  }
  #nav > a {
  }
  #nav:not( :target ) > a:first-of-type,
  #nav:target > a:last-of-type {
    display: block;
  }

  #nav > ul {
    height: auto;
    display:  none;
    position:  absolute;
    left: 0;
    right: 0;
  }
  #nav:target > ul {
    display:  block;
  }
  #nav > ul > li {
    width: 100%;
    float: none;
  }

  #nav li ul {
    position: static;
  }
}

</style>
