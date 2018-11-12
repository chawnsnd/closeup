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
            showPopup: false,
            recommandPois: recommandPois,
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
            this.setCenter(14151544.45025370, 4484308.41146003);
        },
        makeMarker(poi, str) {
            var self = this;
            var lonlat = new Tmap.LonLat(poi.lon, poi.lat);
            var label = new Tmap.Label(poi.name);
            var size = new Tmap.Size(24, 38);//아이콘 크기 설정
	    	var offset = new Tmap.Pixel(-(size.w / 2), -(size.h));//아이콘 중심점 설정
            var icon = new Tmap.Icon('http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_'+str+'.png',size, offset);//마커 아이콘 설정
            var marker = new Tmap.Marker(lonlat, icon, label);//마커 생성
            //마커에 poi정보를 나타낼 수 있는 팝업 등록
            var content =
`<div style=' position: relative; border-bottom: 1px solid #dcdcdc; line-height: 18px; padding: 0 35px 2px 0;'>
    <div style='font-size: 12px; line-height: 15px;'>
        <span style='display: inline-block; width: 14px; height: 14px; background-image: url(/resources/images/common/icon_blet.png); vertical-align: middle; margin-right: 5px;'></span>${poi.name}
    </div>
</div>
<div style='position: relative; padding-top: 5px; display:inline-block'>
    <div style='display:inline-block; border:1px solid #dcdcdc;'><img src=${poi.image} width='73' height='70'></div>
    <div style='display:inline-block; margin-left:5px; vertical-align: top;'>
        <span style='font-size: 12px; margin-left:2px; margin-bottom:2px; display:block;'>${poi.upperAddrName} ${poi.middleAddrName} ${poi.lowerAddrName} ${poi.detailAddrName}</span>
        <span style='font-size: 12px; color:#888; margin-left:2px; margin-bottom:2px; display:block;'>(도로명)${poi.roadName} ${poi.buildingNo1} ${poi.buildingNo2}</span>
        <span style='font-size: 12px; color:gold; margin-left:2px; display:block;'><i class="fas fa-star"></i> ${poi.starPoint}</span>
        <span class="evaluate" @click="starPoint(poi)">평가하기</span>
        <span style='font-size: 12px; margin-left:2px;'><a href='https://www.google.co.kr/search?q=${poi.name}' target='blank'>구글검색</a></span>
    </div>
</div>`;
            var popup = new Tmap.Popup("popup"+poi.id,
                lonlat,//Popup 이 표출될 맵 좌표
                new Tmap.Size(180, 50),//Popup 크기
                content,//Popup 표시될 text
                function(){ 
                    select.unselectAll();
                    self.showPopup = !self.showPopup;
                }//close클릭시 실행할 콜백 함수
            );
            popup.setBorder("1px solid #8d8d8d");//popup border 조절
            popup.autoSize=true;//popup 사이즈 자동 조절
            marker.events.register("click", popup, function(e){
                self.map.removeAllPopup();
                if(!self.showPopup){
                    self.map.addPopup(this);	// Map에 팝업 객체를 등록합니다.
                }else{
                    self.map.removePopup(this);	// Map에 팝업 객체를 제거합니다.
                }
                self.showPopup = !self.showPopup;
            });
            return marker;
        },
        setPersonMarker(poi, person){
            if(this.personMarkers[person] != null) this.markerLayer.removeMarker(this.personMarkers[person]);
            var marker = this.makeMarker(poi, String(person+1));
            this.personMarkers[person] = marker;
            this.markerLayer.addMarker(this.personMarkers[person]);
            this.setCenter(poi.lon, poi.lat);
        },
        setPoisMarker(pois){
            this.poisMarkers.forEach(poisMarker => { this.markerLayer.removeMarker(poisMarker) });
            this.poisMarkers = [];
            pois.forEach(poi => {
                var marker = this.makeMarker(poi, 'x');
                this.poisMarkers.push(marker);
                this.markerLayer.addMarker(marker);
            });
            var bounds = new Tmap.Bounds();
            this.poisMarkers.forEach(poisMarker => {
                bounds.extend(poisMarker.lonlat);
            })
            this.map.zoomToExtent(bounds);
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
        });
        this.initTmap();
        this.eventBus.$on("setCenter", this.setCenter);
        this.eventBus.$on("setPersonMarker", this.setPersonMarker);
        this.eventBus.$on("setPoisMarker", this.setPoisMarker);
    }
}
</script>

<style>

</style>
