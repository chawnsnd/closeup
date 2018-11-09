<template>
    <div class="main">
        <div class="absolute">
          <navigation/>
          <list/>
        </div>
        <recommand />
        <tmap class="absolute" />
        <starpoint v-if="showStarpointModal" @close="showStarpointModal=false" class="modal"/>
    </div>
</template>

<script>
import SearchBar from "./SearchBar";
import Tmap from "./Tmap";
import List from "./List";
import Navigation from "./Navigation";
import Recommand from "./Recommand";
import StarPoint from "./StarPoint";

export default {
  data() {
    return {
      map: null,
      markerLayer: null,
      tData: null,
      // recommandFlag: false,
      showStarpointModal: true
    };
  },
  components: {
    "searchbar": SearchBar,
    "tmap": Tmap,
    "list": List,
    "navigation": Navigation,
    "recommand": Recommand,
    "starpoint": StarPoint
  },
  methods: {
    // recommandFlag(){
    //   this.recommandFlag = true;
    // }
    closeStarPoint(){
      this.showStarpointModal = false;
    }
  },
  mounted() {
    this.eventBus.$on("recommandFlag", this.recommandFlag);
    this.eventBus.$on('closeStarpoint', this.closeStarPoint);
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
}
</style>