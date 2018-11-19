<template>
    <div id="map" class="map">
    </div>
</template>

<script>
import MarkerPopup from "./MarkerPopup";
// import recommandPois from "../tmp/recommandPois"

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
            popups: [],
            showPopup: false,
            recommandPois: []
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
        makeMarker(poi, size, iconURL) {
            var self = this;
            var lonlat = new Tmap.LonLat(poi.lon, poi.lat);
            var label = new Tmap.Label(poi.id);
            var size = new Tmap.Size(24, 38);//아이콘 크기 설정
	    	var offset = new Tmap.Pixel(-(size.w / 2), -(size.h));//아이콘 중심점 설정
            // var icon = new Tmap.Icon('http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_'+str+'.png',size, offset);//마커 아이콘 설정
            var icon = new Tmap.Icon(iconURL, size, offset);//마커 아이콘 설정
            var marker = new Tmap.Markers(lonlat, icon, label);//마커 생성
            var popup = this.makePopup(poi);
            this.popups.push(popup);
            // console.log(popup)
            marker.events.register("click", marker, function(e){
                self.popups.forEach(popup => {
                    if(marker.labelHtml === popup.id) {
                        self.map.addPopup(popup);
                    }else{
                        self.map.removePopup(popup);
                    }
                })
            });
            return marker;
        },
        makePopup(poi){
            var content = 
                `<div style=' position: relative; border-bottom: 1px solid #dcdcdc; line-height: 18px; padding: 0 35px 2px 0;'>
                    <div style='font-size: 12px; line-height: 15px;'>
                        <span style='display: inline-block; width: 14px; height: 14px; font-weight: bold; background-image: url(/resources/images/common/icon_blet.png); vertical-align: middle; margin-right: 5px;'>${poi.name}</span>
                    </div>
                </div>
                <div style='position: relative; padding-top: 5px; display:inline-block'>
                    <div style='display:inline-block; border:1px solid #dcdcdc;'><img src=${poi.image} width='73' height='70'></div>
                    <div style='display:inline-block; margin-left:5px; vertical-align: top; border-bottom: 1px solid #dcdcdc;'>
                        <span style='font-size: 12px; margin-left:2px; margin-bottom:2px; display:block;'>${poi.upperAddrName} ${poi.middleAddrName} ${poi.roadName} ${poi.firstBuildNo}</span>
                        <span style='font-size: 12px; color:#888; margin-left:2px; margin-bottom:2px; display:block;'>(지번)${poi.upperAddrName} ${poi.middleAddrName} ${poi.lowerAddrName} ${poi.detailAddrName} ${poi.firstNo} ${poi.secondNo}</span>
                        <span style='font-size: 12px; color:gold; margin-left:2px; display:block;'><i class="fas fa-star"></i> ${poi.starPoint}</span>
                    </div>
                    <div style='display:inline-block; margin-left:5px; vertical-align: top;>
                        ${poi.desc}
                    </div>
                </div>`;
            var popup = new Tmap.Popup(poi.id,
                new Tmap.LonLat(poi.lon, poi.lat),//Popup 이 표출될 맵 좌표
                new Tmap.Size(180, 50),//Popup 크기
                content
            );
            popup.setBorder("1px solid #8d8d8d");//popup border 조절
            popup.autoSize=true;//popup 사이즈 자동 조절
            return popup
        },
        setPersonMarker(poi, person){
            if(this.personMarkers[person] != null) this.markerLayer.removeMarker(this.personMarkers[person]);
            var marker = this.makeMarker(poi, new Tmap.Size(32, 24), 'http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_'+String(person+1)+'.png');
            this.personMarkers[person] = marker;
            this.markerLayer.addMarker(this.personMarkers[person]);
            this.setCenter(poi.lon, poi.lat);
        },
        setPoisMarker(pois){
            this.poisMarkers.forEach(poisMarker => { this.markerLayer.removeMarker(poisMarker) });
            this.poisMarkers = [];
            pois.forEach(poi => {
                // var marker = this.makeMarker(poi, new Tmap.Size(19, 12), 'https://s3.ap-northeast-2.amazonaws.com/closeup-s3/resource/pin_green.png');
                // this.poisMarkers.push(marker);
                // this.markerLayer.addMarker(marker);
                var point = new Tmap.LonLat(poi.lon, poi.lat);
                var marker = new Tmap.Cluster.Marker(point, {
                    icon: "https://s3.ap-northeast-2.amazonaws.com/closeup-s3/resource/pin_green.png", // 마커 이미지 url
                    width: 20, // 마커 사이즈
                    data: poi.lon + "," + poi.lat, // 클릭 이벤트시에 사용할 데이터
                    clickHandler: function (e) { // 클릭 이벤트 핸들러
                        alert(e.data);
                    }
                });
                this.poisMarkers.push(marker);
                // this.markerLayer.addMarker(marker);
            });
            var bounds = new Tmap.Bounds();
            this.poisMarkers.forEach(poisMarker => {
                bounds.extend(poisMarker.lonlat);
            });
            this.personMarkers.forEach(personMarker => {
                bounds.extend(personMarker.lonlat);
            })
            this.cluster();
            this.map.zoomToExtent(bounds);
        },
        cluster(){
            var icons = [];
            icons.push(new Tmap.Cluster.Icon("http://topopentile1.tmap.co.kr/tmapicon/map/clusterbg1.png", { width: 20, fontColor: "#333333", fontSize: 15 }));
            icons.push(new Tmap.Cluster.Icon("http://topopentile1.tmap.co.kr/tmapicon/map/clusterbg2.png", { width: 25, fontColor: "#333333", fontSize: 15 }));
            icons.push(new Tmap.Cluster.Icon("http://topopentile1.tmap.co.kr/tmapicon/map/clusterbg3.png", { width: 30, fontColor: "#333333", fontSize: 15 }));

            // 마커클러스터 등록
            // gap : 값이 10이면 10개단위로 icon 변경
            // distance : 클러스터링 할 픽셀 거리
            var markerCluster = new Tmap.Cluster.Layer(this.map, { markers: this.poisMarkers, icon: icons, gap: 30, distance: 70 });
        },
        setCenter(lon, lat){
            var lonLat = new Tmap.LonLat(lon, lat);
            this.map.setCenter(lonLat, 15);
        },
        clickRecommandPoi(poi){
            this.poisMarkers.forEach(poisMarker => {
                this.markerLayer.removeMarker(poisMarker);
                if(poisMarker.labelHtml == poi.id){
                    poisMarker.icon.url = 'https://s3.ap-northeast-2.amazonaws.com/closeup-s3/resource/pin_red.png';
                    poisMarker.events.triggerEvent("click");
                }else{
                    poisMarker.icon.url = 'https://s3.ap-northeast-2.amazonaws.com/closeup-s3/resource/pin_green.png';
                }
                this.markerLayer.addMarker(poisMarker);
            })
            this.setCenter(poi.lon, poi.lat);
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
    }
}
</script>

<style>

</style>
