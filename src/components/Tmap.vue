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
            markers: []
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
        },
        makeMarker(lonlat, str) {
            var size = new Tmap.Size(24, 38);//아이콘 크기 설정
	    	var offset = new Tmap.Pixel(-(size.w / 2), -(size.h));//아이콘 중심점 설정
            var icon = new Tmap.Icon('http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_'+str+'.png',size, offset);//마커 아이콘 설정
            return new Tmap.Marker(lonlat, icon);//마커 생성
        },
        removeMarker(index){
            if(this.markers[index] != null){
                this.markerLayer.removeMarker(this.markers[index]);
            }
        },
        clickPOI(place, placeKey){
            if(this.markers[placeKey] != null){
                this.markerLayer.removeMarker(this.markers[placeKey]);
            }
            var lonlat = new Tmap.LonLat(place.frontLon, place.frontLat).transform("EPSG:3857", "EPSG:3857")
            this.map.setCenter(lonlat, 15);
            this.markers[placeKey] = this.makeMarker(lonlat, String(placeKey+1));
            this.markerLayer.addMarker(this.markers[placeKey]);
        },
        recommand(places){
            // 사각형 바운드 그리기
            var bounds = new Tmap.Bounds();
            places.forEach(place => {
                var lonLat = new Tmap.LonLat(Number(place.frontLon), Number(place.frontLat));
                bounds.extend(lonLat);
            });
            this.map.zoomToExtent(bounds);
            // 사각형 내 좌표 나누기
            var border = Math.max(bounds.getSize().w, bounds.getSize().h);
            var radius = 9900; //m단위
            if(border/2 <= radius){
                radius = border
            }
            var searchCount = border/(radius*Math.sqrt(2));
            if(searchCount >= 3) return alert("검색반경이 너무 넓습니다.")
            for(var i=0; i<=searchCount; i++){
                for(var j=0; j<=searchCount; j++){
                    var lonLat = new Tmap.LonLat((bounds.getCenterLonLat().lon-border/2)+i*(border/searchCount), (bounds.getCenterLonLat().lat+border/2)-j*(border/searchCount));
                    var vector_layer = new Tmap.Layer.Vector('Tmap Vector Layer'); // 백터 레이어 생성
                    this.map.addLayers([vector_layer]); 
                    var circle = new Tmap.Geometry.Circle(lonLat.lon, lonLat.lat, radius); // 원 생성
                    var style_red = {
                        fillColor:"#FF0000",
                        fillOpacity:0.2,
                        strokeColor: "#FF0000",
                        strokeWidth: 3,
                        strokeDashstyle: "solid",
                        pointRadius: 60
                    };
                    var circleFeature = new Tmap.Feature.Vector(circle, null, style_red); // 원 백터 생성
		            vector_layer.addFeatures([circleFeature]); // 원 백터 를 백터 레이어에 추가
                    var lonLat = lonLat.transform("EPSG:3857", "EPSG:4326");
                    // this.getPOIfromCategory(lonLat, "", radius)
                }
            }
        },
        getPOIfromCategory(lonLat, categories, radius){
            var self = this;
            $.ajax({
                method:"GET",
                url:"https://api2.sktelecom.com/tmap/pois/search/around?version=1&format=xml&callback=result",// 주변 POI 검색 api 요청 url입니다.
                async:false,
                data:{
                    "categories" : "편의점;",
                    "resCoordType" : "EPSG3857",//응답 좌표계 유형
                    "reqCoordType" : "WGS84GEO",//요청 좌표계 유형
                    "centerLon" : lonLat.lon,
                    "centerLat" : lonLat.lat,
                    "searchtypCd" : "A",
                    "radius" : Math.ceil(radius/300),
                    "multiPoint" : "N",
                    "appKey" : "5a4a3525-808d-41a4-8968-b84175f11618",//실행을 위한 키입니다. 발급받으신 AppKey를 입력하세요.
                    "count" : 200//페이지당 출력되는 개수를 지정
                },
                success:function(response){
                    var prtcl = response;
                    var prtclString = new XMLSerializer().serializeToString(prtcl);
                    var xmlDoc = $.parseXML( prtclString ),
                    $xml = $( xmlDoc ),
                    $intRate = $xml.find("poi");
                    $intRate.each(function(index, element){
                        var lon = element.getElementsByTagName("noorLon")[0].childNodes[0].nodeValue;
                        var lat = element.getElementsByTagName("noorLat")[0].childNodes[0].nodeValue;
                        var marker = self.makeMarker(new Tmap.LonLat(lon, lat), 'e');
                        self.markerLayer.addMarker(marker);
                    })
                },
                error: function(res){
                    console.log("에러")
                }
            })
        }
    },
    mounted() {
        window.addEventListener('resize', this.resizeBrowser);
        this.initTmap();
        this.eventBus.$on("setA", this.setA);
        this.eventBus.$on("setB", this.setB);
        this.eventBus.$on("clickPOI", this.clickPOI);
        this.eventBus.$on("recommand", this.recommand);
        this.eventBus.$on("removeMarker", this.removeMarker);
    }
}
</script>

<style>

</style>
