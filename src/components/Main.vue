<template>
    <div class="main">
        <div class="absolute">
          <navigation/>
          <list/>
        </div>
        <recommand />
        <tmap class="absolute" />
        <starpoint-modal />
    </div>
</template>

<script>
import SearchBar from "./SearchBar";
import Tmap from "./Tmap";
import List from "./List";
import Navigation from "./Navigation";
import Recommand from "./Recommand";
import StarPointModal from "./StarPointModal";

export default {
  data() {
    return {
      map: null,
      markerLayer: null,
      tData: null,
      recommandFlag: false,
    };
  },
  components: {
    "searchbar": SearchBar,
    "tmap": Tmap,
    "list": List,
    "navigation": Navigation,
    "recommand": Recommand,
    "starpoint-modal": StarPointModal
  },
  methods: {
    recommandFlag(){
      this.recommandFlag = true;
    }
  },
  mounted() {
    this.eventBus.$on("recommandFlag", this.recommandFlag);
  }
};
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  .absolute{
    position: absolute;
    margin: 10px;
  }
  .absolute * {
    margin-bottom: 10px;
  }
  .map {
    z-index: -100;
  }
  .recommand{
    float: right;
    margin: 10px 10px 0 0;
  }
  .starpoint{
    z-index: 100;
  }
}
</style>