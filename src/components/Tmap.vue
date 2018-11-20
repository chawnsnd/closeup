<template>
    <div id="map" class="map">
    </div>
</template>

<script>
export default {
    data() {
        return {
            map: new Tmap.Map({
                width: window.innerWidth,
                height: window.innerHeight
            }),
            markerLayer: new Tmap.Layer.Markers(),
            tData: new Tmap.TData(),
            personMarkers: [],
            poisMarkers: []
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
            // this.markerLayer = new Tmap.Layer.Markers(); //마커 레이어 생성
            this.map.addLayer(this.markerLayer); //map에 마커 레이어 추가
            // this.tData = new Tmap.TData();
            this.setCenter(14151544.45025370, 4484308.41146003);
        },
        makeMarker(poi, iconURL) {
            var self = this;
            var lonlat = new Tmap.LonLat(poi.lon, poi.lat);
            var label = new Tmap.Label(poi.id);
            var size = new Tmap.Size(24, 38);//아이콘 크기 설정
	    	var offset = new Tmap.Pixel(-(size.w / 2), -(size.h));//아이콘 중심점 설정
            var icon = new Tmap.Icon(iconURL, size, offset);//마커 아이콘 설정
            var marker = new Tmap.Markers(lonlat, icon, label);//마커 생성
            return marker;
        },
        setPersonMarker(poi, person){
            if(this.personMarkers[person] != null) this.markerLayer.removeMarker(this.personMarkers[person]);
            var marker = this.makeMarker(poi, 'http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_'+String(person+1)+'.png');
            this.personMarkers[person] = marker;
            this.markerLayer.addMarker(this.personMarkers[person]);
            this.setCenter(poi.lon, poi.lat);
        },
        setPoisMarker(pois){
            var self = this;
            this.poisMarkers.forEach(poisMarker => { this.markerLayer.removeMarker(poisMarker) });
            this.poisMarkers = [];
            pois.forEach(poi => {
                var marker = this.makeMarker(poi, 'https://s3.ap-northeast-2.amazonaws.com/closeup-s3/resource/pin_green.png');
                this.poisMarkers.push(marker)
                this.markerLayer.addMarker(marker)
            });
            var bounds = new Tmap.Bounds();
            this.poisMarkers.forEach(poisMarker => {
                bounds.extend(poisMarker.lonlat);
            });
            this.personMarkers.forEach(personMarker => {
                bounds.extend(personMarker.lonlat);
            })
            this.map.zoomToExtent(bounds);
        },
        setCenter(lon, lat){
            var lonLat = new Tmap.LonLat(lon, lat);
            this.map.setCenter(lonLat, 15);
        },
        clickRecommandPoi(poi){
            this.poisMarkers.forEach(poisMarker => {
                if(poisMarker.id == poi.id){
                    poisMarker.attributes.icon = 'https://s3.ap-northeast-2.amazonaws.com/closeup-s3/resource/pin_red.png';
                }else{
                    poisMarker.attributes.icon = 'https://s3.ap-northeast-2.amazonaws.com/closeup-s3/resource/pin_green.png';
                }
            })
            this.setCenter(poi.lon, poi.lat);
        },
        dbStoreGetCenter(keyword){
            var center = this.map.getCenter();
            this.eventBus.$emit('getTotPOISearch', keyword, center);
        }
    },
    mounted() {
        window.addEventListener('resize', function(){
            var map = document.getElementById('map');
            map.style.width = '100%';
        });
        this.initTmap();
        this.eventBus.$on("clickRecommandPoi", this.clickRecommandPoi);
        this.eventBus.$on("setPersonMarker", this.setPersonMarker);
        this.eventBus.$on("setPoisMarker", this.setPoisMarker);
        this.eventBus.$on('dbStoreGetCenter', this.dbStoreGetCenter);
    }
}
</script>

<style>

</style>
