<template>
    <div class="main">
        <div class="absolute">
          <navigation/>
          <list/>
        </div>
        <dbinsert/>
        <searching v-if="showSearchingComponent" />
        <recommand v-if="showRecommandComponent" v-bind:pois = recommandPois />
        <tmap class="absolute"/>
        <starpoint v-if="showStarPointModal" v-bind:poi = starPointPoi @close="showStarPointModal=false" class="modal"/>
    </div>
</template>

<script>
import SearchBar from "./SearchBar";
import Tmap from "./Tmap";
import List from "./List";
import DbInsert from "./DbInsert";
import Searching from "./Searching";
import Navigation from "./Navigation";
import Recommand from "./Recommand";
import StarPoint from "./StarPoint";

export default {
  data() {
    return {
      map: null,
      markerLayer: null,
      tData: null,
      showStarPointModal: false,
      starPointPoi: null,
      showRecommandComponent: false,
      showSearchingComponent: false,
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
    "dbinsert": DbInsert,
    "searching": Searching
  },
  methods: {
    setCenter(lon, lat){
      var lonLat = new Tmap.LonLat(lon, lat);
      this.map.setCenter(lonLat, 15);
    },
    showRecommand(pois){
      this.showRecommandComponent = true;
      this.recommandPois = pois;
    },
    showStarPoint(poi){
      this.showStarPointModal = true;
      this.starPointPoi = poi
    },
    showSearching(bool){
      this.showSearchingComponent = bool
    }
  },
  mounted() {
    this.eventBus.$on("recommandFlag", this.recommandFlag);
    this.eventBus.$on('showStarPoint', this.showStarPoint);
    this.eventBus.$on('showRecommandComponent', this.showRecommand);
    this.eventBus.$on('showSearching', this.showSearching);
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
  .searching{
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%)
  }
}
</style>