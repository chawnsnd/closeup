<template>
    <div id="map" class="map">
    </div>
</template>

<script>
import MarkerPopup from "./MarkerPopup";
import recommandPois from "../tmp/recommandPois"
export default {
    components: {
        'marker-popup': MarkerPopup
    },
    data() {
        return {
            map: null,
            markerLayer: null,
            vectorLayer: null,
            tData: null,
            personMarkers: [],
            poisMarkers: [],
            recommandPois: recommandPois
        }
    },
    methods: {
        initTmap() {
            this.map = new Tmap.Map({
                div: "map",
                width: window.innerWidth,
                height: window.innerHeight
            });
            this.map.removeZoomControl();
            this.markerLayer = new Tmap.Layer.Markers(); //마커 레이어 생성
            this.map.addLayer(this.markerLayer); //map에 마커 레이어 추가
            this.tData = new Tmap.TData();
        },
        makeMarker(poi, str='x') {
            var lonlat = new Tmap.LonLat(poi.frontLon, poi.frontLat);
            var markerStr = (str==='x') ? 'x' : String(person+1);
            var label = new Tmap.Label(poi.name);
            var size = new Tmap.Size(24, 38);//아이콘 크기 설정
	    	var offset = new Tmap.Pixel(-(size.w / 2), -(size.h));//아이콘 중심점 설정
            var icon = new Tmap.Icon('http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_'+str+'.png',size, offset);//마커 아이콘 설정
            var marker = new Tmap.Marker(lonlat, icon, label);//마커 생성
            //마커에 poi정보를 나타낼 수 있는 팝업 등록
            return marker 
        },
        setPersonMarker(poi, person){
            if(this.personMarkers[person] != null) this.markerLayer.removeMarker(this.personMarkers[person]);
            var marker = this.makeMarker(poi);
            this.personMarkers[person] = marker;
            this.markerLayer.addMarker(this.personMarkers[person]);
            this.map.setCenter(lonlat, 15);
        },
        setPoismarker(Pois){
            this.poisMarkers.forEach(poisMarker => { this.markerLayer.removeMarker(poisMarker) });
            this.poisMarkers = [];
            Pois.forEach(Poi => {
                var marker = this.makeMarker(Poi);
                this.poisMarkers.push(marker);
                this.markerLayer.addMarker(marker);
            });
            this.poisMarkers.forEach(poisMarker => {
                //보더에 등록
            })
            //보더에 맞게 뷰 적용
        },
        setCenter(lon, lat){
            var lonLat = new Tmap.LonLat(lon, lat);
            this.map.setCenter(lonLat, 15);
        }
    },
    mounted() {
        window.addEventListener('resize', function(){
            var map = document.getElementById('map');
            map.style.width = '100%';
            this.map.updateSize();
        });
        this.initTmap();
        this.eventBus.$on("setCenter", this.setCenter);
        this.eventBus.$on("setPersonMarker", this.setPersonMarker);
        this.setPoismarker(this.recommandPois);
    }
}
</script>

<style>

</style>
