<template>
    <div class="main">
        <div class="absolute">
          <navigation/>
          <list/>
        </div>
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
      tData: null,

    };
  },
  components: {
    searchbar: SearchBar,
    tmap: Tmap,
    list: List,
    navigation: Navigation
  },
  methods: {},
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  .absolute {
    position: absolute;
    margin: 10px;
  }
  .absolute * {
    margin-bottom: 10px;
  }
  .map {
    z-index: -100;
  }
}
</style>