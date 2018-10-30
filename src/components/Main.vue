<template>
    <div class="main">
        <searchbar class="absolute" />
        <navigation class="absolute" />
        <list class="absolute" />
        <tmap class="absolute" />
    </div>
</template>

<script>
import SearchBar from "./SearchBar";
import Tmap from "./Tmap";
import List from "./List";
import Navigation from "./Navigation";

export default {
  data() {
    return {
      map: null,
      markerLayer: null,
      placeA: null,
      placeB: null,
      tData: null
    };
  },
  components: {
    "searchbar": SearchBar,
    "tmap": Tmap,
    "list": List,
    "navigation": Navigation
  },
  methods: {
  },
  mounted() {
    var name = "junwoongCha";
    var exampleSocket = new WebSocket("ws://ec2-13-59-71-223.us-east-2.compute.amazonaws.com:49152");
    exampleSocket.onopen = function(event){
      exampleSocket.send(name);
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  .absolute{
    position: absolute;
  }
  .searchbar {
    margin: 10px 0 0 10px;
  }
  .navigation {
    margin: 80px 0 0 10px;
  }
  .btn {
    margin: 150px 0 0 10px;
  }
  .list {
    margin: 220px 0 0 10px;
  }
  .map {
    z-index: -100;
  }
}
</style>