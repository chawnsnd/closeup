<template>
    <div class="main">
        <search-bar />
        <div id="map_div" class="map">
        </div>
        <place-info v-bind:place="place"/>
    </div>
</template>

<script>
import SearchBar from './SearchBar'
import PlaceInfo from './PlaceInfo'

export default {
    data() {
        return{
            map: null,
            markerLayer: null,
            marker: null,
            place: null
        }
    },
    components: {
        'search-bar': SearchBar,
        'place-info': PlaceInfo
    },
    methods: {
        initTmap(){
            this.map = new Tmap.Map({
                div:'map_div',
                width : window.innerWidth,
                height : window.innerHeight,
            });
            this.markerLayer = new Tmap.Layer.Markers();//마커 레이어 생성
            this.map.addLayer(this.markerLayer);//map에 마커 레이어 추가
            this.setCenter();
        },
        search(place){
            this.place = place;
            this.setCenter(place.lon, place.lat);
            this.setMarker(place.lon, place.lat);
        },
        setCenter(lon=126.986072, lat=37.570028){
            this.map.setCenter(new Tmap.LonLat(lon.toString(), lat.toString()).transform("EPSG:4326", "EPSG:3857"), 15);
            this.setMarker(lon, lat);
        },
        setMarker(lon, lat){
            this.markerLayer.removeMarker(this.marker);
            var lonlat = new Tmap.LonLat(lon, lat).transform("EPSG:4326", "EPSG:3857");//좌표 설정
            var size = new Tmap.Size(24, 38);//아이콘 크기 설정
            var offset = new Tmap.Pixel(-(size.w / 2), -(size.h));//아이콘 중심점 설정
            var icon = new Tmap.Icon('http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_a.png',size, offset);//마커 아이콘 설정

            this.marker = new Tmap.Marker(lonlat, icon);//마커 생성
            this.markerLayer.addMarker(this.marker);//레이어에 마커 추가
        }
    },
    mounted(){
        this.eventBus.$on('search', this.search);
        this.initTmap(this.lon, this.lat);
    }
}
</script>

<style lang="scss" scoped>
.main{
    position: relative;
    .search_nav{
        position: absolute;
        margin: 10px 0 0 10px;
    }
    .map{
        position: absolute;
        z-index: -100;
    }
    .place_info{
        position: absolute;
        margin: 10px 0 0 10px;
        z-index: -50;
    }
}
</style>