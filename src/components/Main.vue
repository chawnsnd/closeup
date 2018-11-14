<template>
    <div class="main">
        <div class="absolute">
          <navigation/>
          <list/>
        </div>
        <dbinsert />
        <recommand v-if="showRecommandComponent" v-bind:pois = recommandPois />
        <tmap class="absolute" />
        <starpoint v-if="showStarPointModal" v-bind:poi = starPointPoi @close="showStarPointModal=false" class="modal"/>
    </div>
</template>

<script>
import SearchBar from "./SearchBar";
import Tmap from "./Tmap";
import List from "./List";
import DbInsert from "./DbInsert";
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
      showStarPointModal: false,
      starPointPoi: null,
      showRecommandComponent: false,
      recommandPois: []
    };
  },
  components: {
    "searchbar": SearchBar,
    "tmap": Tmap,
    "list": List,
    "navigation": Navigation,
    "recommand": Recommand,
    "starpoint": StarPoint,
    "dbinsert": DbInsert
  },
  methods: {
    showRecommand(pois){
      this.showRecommandComponent = true;
      this.recommandPois = pois;
    },
    showStarPoint(poi){
      this.showStarPointModal = true;
      this.starPointPoi = poi
    }
  },
  mounted() {
    this.eventBus.$on("recommandFlag", this.recommandFlag);
    this.eventBus.$on('showStarPoint', this.showStarPoint);
    this.eventBus.$on('showRecommandComponent', this.showRecommand);
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
  .dbinsert{
    position: absolute;
    left: 50%;
    transform: translateX(-50%)
  }
}
</style>