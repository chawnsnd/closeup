<template>
    <div class="main">
        <search-bar v-bind:person="'A'" class="firstSearch" />
        <search-bar v-bind:person="'B'" class="secondSearch" />
        <div class="btn" @click="recommendPlace">약속장소 추천</div>
        <div id="map_div" class="map">
        </div>
    </div>
</template>

<script>
import SearchBar from "./SearchBar";

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
    "search-bar": SearchBar
  },
  methods: {
    initTmap() {
      this.map = new Tmap.Map({
        div: "map_div",
        width: window.innerWidth,
        height: window.innerHeight
      });
      this.markerLayer = new Tmap.Layer.Markers(); //마커 레이어 생성
      this.map.addLayer(this.markerLayer); //map에 마커 레이어 추가
    },
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
            icon: new Tmap.Icon("/src/resource/image/pin_b_m_a.png", size, offset)
        },
        {
            title: this.placeB.name, 
            lonlat: new Tmap.LonLat(this.placeB.lon, this.placeB.lat).transform("EPSG:4326", "EPSG:3857"),
            icon: new Tmap.Icon("/src/resource/image/pin_b_m_b.png", size, offset)
        }
      ];

      for (var i = 0; i < positions.length; i++) {
        //for문을 통하여 배열 안에 있는 값을 마커 생성
        var lonlat = positions[i].lonlat; //좌표값
        var icon = positions[i].icon;
        var marker = new Tmap.Marker(lonlat, icon); //마커 생성
        this.markerLayer.addMarker(marker); //마커 레이어에 마커 추가
      }
    },
    recommendPlace(){
      this.tData = new Tmap.TData();//REST API 에서 제공되는 경로, 교통정보, POI 데이터를 쉽게 처리할 수 있는 클래스입니다.
		
      var s_lonLat = new Tmap.LonLat(this.placeA.lon, this.placeA.lat); //시작 좌표입니다.   
      var e_lonLat = new Tmap.LonLat(this.placeB.lon, this.placeB.lat); //도착 좌표입니다.
      var optionObj = {
          reqCoordType:"WGS84GEO", //요청 좌표계 옵셥 설정입니다.
          resCoordType:"EPSG3857"  //응답 좌표계 옵셥 설정입니다.
              }
      
      this.tData.getRoutePlan(s_lonLat, e_lonLat, optionObj);//경로 탐색 데이터를 콜백 함수를 통해 XML로 리턴합니다.
      console.log(this.tdata)
      
      this.tData.events.register("onComplete", this.tData, this.onCompleteRecommend);//데이터 로드가 성공적으로 완료되었을 때 발생하는 이벤트를 등록합니다.
    },
    onCompleteRecommend(e){
      var trafficColors = {
        extractStyles:false
      };   
      var kmlForm = new Tmap.Format.KML(trafficColors).read(this.tData.responseXML);
      var vectorLayer = new Tmap.Layer.Vector("vectorLayerID");
      vectorLayer.addFeatures(kmlForm);
      this.map.addLayer(vectorLayer);
      //경로 그리기 후 해당영역으로 줌  
      this.map.zoomToExtent(vectorLayer.getDataExtent());
    }
  },
  mounted() {
    this.eventBus.$on("search", this.search);
    this.initTmap();
  }
};
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  .search_nav {
    position: absolute;
  }
  .firstSearch {
    margin: 10px 0 0 10px;
    z-index: 100;
  }
  .secondSearch {
    margin: 80px 0 0 10px;
    z-index: 0;
  }
  .map {
    position: absolute;
    z-index: -100;
  }
  .btn {
    position: absolute;
    margin: 150px 0 0 10px;
    z-index: -1;
    text-align: center;
    cursor: pointer;
    width: 350px;
    height: 50px;
    line-height: 50px;
    background-color: #5fc694;
    color: white;
    font-size: 20px;
    border: 1px solid #eaeaea;
  }
  .btn:hover{
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }
  .btn:active{
    background-color: #598b73;
  }
}
</style>