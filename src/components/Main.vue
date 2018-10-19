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
    search(param) {
      var place = param[0];
      if (param[1] === "A") this.placeA = place;
      else this.placeB = place;
      this.setCenter(place.lon, place.lat);
      this.setMarker(place.lon, place.lat);
    },
    setCenter(lon = 126.986072, lat = 37.570028) {
      this.map.setCenter(
        new Tmap.LonLat(lon.toString(), lat.toString()).transform(
          "EPSG:4326",
          "EPSG:3857"
        ),
        15
      );
      this.setMarker(lon, lat);
    },
    setMarker(lon, lat) {
      this.markerLayer.removeMarker(this.marker);
      var lonlat = new Tmap.LonLat(lon, lat).transform(
        "EPSG:4326",
        "EPSG:3857"
      ); //좌표 설정
      var size = new Tmap.Size(24, 38); //아이콘 크기 설정
      var offset = new Tmap.Pixel(-(size.w / 2), -size.h); //아이콘 중심점 설정
      this.marker = new Tmap.Marker(lonlat, icon); //마커 생성
      this.markerLayer.addMarker(this.marker); //레이어에 마커 추가
      var positions = [{
            title: this.placeA.name,
            lonlat: new Tmap.LonLat(this.placeA.lon, this.placeA.lat).transform("EPSG:4326", "EPSG:3857"),
            icon: new Tmap.Icon("../resource/image/pin_b_m_a.png", size, offset)
        },
        {
            title: this.placeB.name, 
            lonlat: new Tmap.LonLat(this.placeB.lon, this.placeB.lat).transform("EPSG:4326", "EPSG:3857"),
            icon: new Tmap.Icon("../resource/image/pin_b_m_b.png", size, offset)
        }
      ];

      for (var i = 0; i < positions.length; i++) {
        //for문을 통하여 배열 안에 있는 값을 마커 생성
        var lonlat = positions[i].lonlat; //좌표값
        var icon = positions[i].icon;
        var marker = new Tmap.Marker(lonlat, icon); //마커 생성
        this.markerLayer.addMarker(marker); //마커 레이어에 마커 추가
      }
    }
  },
  mounted() {
    this.eventBus.$on("search", this.search);
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