<template>
    <div id="map" class="map" />
</template>

<script>
export default {
    data() {
        return {
            map: null,
            markerLayer: null,
            vectorLayer: null,
            tData: null,
            bounds: null,
            markerX: null,
            markerA: null,
            markerB: null
        }
    },
    methods: {
        resizeBrowser(){
            var map = document.getElementById('map');
            map.style.width = '100%';
            this.map.updateSize();
        },
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
            this.bounds = new Tmap.Bounds();
        },
        makeMarker(lonlat, str) {
            var size = new Tmap.Size(24, 38);//아이콘 크기 설정
	    	var offset = new Tmap.Pixel(-(size.w / 2), -(size.h));//아이콘 중심점 설정
            var icon = new Tmap.Icon('http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_'+str+'.png',size, offset);//마커 아이콘 설정
            return new Tmap.Marker(lonlat, icon);//마커 생성
        },
        clickPOI(place){
            if(this.markerX != null) {
                this.markerLayer.removeMarker(this.markerX);
                this.markerX = null
            }
            var lonlat = new Tmap.LonLat(place.frontLon, place.frontLat).transform("EPSG:3857", "EPSG:3857")
            this.map.setCenter(lonlat, 15);
            this.markerX = this.makeMarker(lonlat, 'x');
            this.markerLayer.addMarker(this.markerX);
        },
        recommand(places){
            var placeA = places[0];
            var placeB = places[1];
            var a_lonLat = new Tmap.LonLat(Number(placeA.frontLon), Number(placeA.frontLat)); //시작 좌표입니다.   
            var b_lonLat = new Tmap.LonLat(Number(placeB.frontLon), Number(placeB.frontLat)); //도착 좌표입니다.
		    var optionObj = {
                reqCoordType:"EPSG3857", //요청 좌표계 옵셥 설정입니다.
                resCoordType:"EPSG3857"  //응답 좌표계 옵셥 설정입니다.
            }
            this.tData.getRoutePlan(a_lonLat, b_lonLat, optionObj);//경로 탐색 데이터를 콜백 함수를 통해 XML로 리턴합니다.
            var kmlForm = new Tmap.Format.KML().read(this.tData.responseXML);
            this.drawVector("route", kmlForm);        
        },
        drawVector(vectorName, features){
            for(var index in features){
                features[index].style = {
                    strokeColor: "#598b73",
                    strokeWidth: 5,
                    pointRadius: 3
                };
            }
            if(this.vectorLayer != null) this.map.removeLayer(this.vectorLayer);
            this.vectorLayer = new Tmap.Layer.Vector(vectorName);
            this.vectorLayer.addFeatures(features);
            this.map.addLayer(this.vectorLayer);
            this.map.zoomToExtent(this.vectorLayer.getDataExtent());
        },
        setBound(places){
            for(var idx in places){
                this.bounds.extend(new Tmap.LonLat(places[idx].frontLon, places[idx].frontLat));
            }
            this.map.zoomToExtent(this.bounds);
        },
        getAroundPOISearch() {
            console.log("준비중")
        },
        setA(place){
            if(this.markerA != null) {
                this.markerLayer.removeMarker(this.markerA);
                this.markerA = null
            }
            var lonlat = new Tmap.LonLat(place.frontLon, place.frontLat);
            this.map.setCenter(lonlat, 15);
            this.markerA = this.makeMarker(lonlat, 'a');
            this.markerLayer.addMarker(this.markerA);
        },
        setB(place){
            if(this.markerB != null) {
                this.markerLayer.removeMarker(this.markerB);
                this.markerB = null
            }
            var lonlat = new Tmap.LonLat(place.frontLon, place.frontLat);
            this.map.setCenter(lonlat, 15);
            this.markerB = this.makeMarker(lonlat, 'b');
            this.markerLayer.addMarker(this.markerB);
        }
    },
    mounted() {
        window.addEventListener('resize', this.resizeBrowser);
        this.initTmap();
        this.eventBus.$on("setA", this.setA);
        this.eventBus.$on("setB", this.setB);
        this.eventBus.$on("clickPOI", this.clickPOI);
        this.eventBus.$on("recommand", this.recommand);
    }
}
</script>

<style>

</style>
