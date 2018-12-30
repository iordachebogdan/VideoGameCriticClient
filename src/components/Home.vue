<template>
  <div class="bg">
    <div class="title-box">
      <h1>Welcome to</h1>
      <h1>
        <span style="color: #4285F4;">Video</span>
        <span style="color: #ff4444;">Game</span>
        <span style="color: #00C851;">Critic</span>
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lobster');

.bg {
  /* The image used */
  background-image: url("/static/super-smash-bros.-hd-wallpapers-33732-3073557.jpg");

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

h1 {
  text-align:center;
  color:#FFF;
  font:80px Lobster;
  text-shadow: 0px 4px 3px rgba(0,0,0,0.4),
             0px 8px 13px rgba(0,0,0,0.1),
             0px 18px 23px rgba(0,0,0,0.1);
}

.title-box {
  float: left;
  margin-top: 10%;
  margin-left: 10%;
}
</style>
