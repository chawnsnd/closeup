<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  // data() {
  //   return{
  //     SOCKET_URL: "ws://ec2-13-59-71-223.us-east-2.compute.amazonaws.com:49152/",
  //     socket: null
  //   }
  // },
  // methods: {

  // },
  // created() {
  //   this.socket = new WebSocket("ws://ec2-13-59-71-223.us-east-2.compute.amazonaws.com:49152/");
  // },
  // destroyed(){
  //   this.socket.close();
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
