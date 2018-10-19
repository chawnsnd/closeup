<template>
    <div v-if="searchPoiInfo != null" class="list">
        <div class="count">{{searchPoiInfo.count}}/{{searchPoiInfo.totalCount}}</div>
        <div class="pois">
            <div class="poi" v-for="(poi, index) in searchPoiInfo.pois.poi" :key="index">
                <div class="left" @click="clickPOI(poi)">
                    <div class="poiname">{{poi.name}}</div>
                    <div class="latlon">{{poi.frontLat}} {{poi.frontLon}}</div>
                </div>
                <div class="right">
                    <div @click="setA(poi)">A로 지정</div>
                    <div @click="setB(poi)">B로 지정</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            searchPoiInfo: null
        }
    },
    methods: {
        getTotPOISearch(keyword) {
            var gAppKey = "5a4a3525-808d-41a4-8968-b84175f11618";
            var self = this;
	  	    if(keyword == ''){
	  		    alert('검색어를 입력해 주세요');
	  		    return;
	    	}
	  	    var url = "https://api2.sktelecom.com/tmap/pois";//POI 검색 api url 입니다
            var params = {
                    "version" : "1"//버전
                    ,"page" : "1"//페이지
                    ,"count"  : "10"//페이지당 검색수
                    ,"searchKeyword" : keyword //검색어
                    ,"searchtypCd" : "A"//R: 거리순 / A:정확도순
                    ,"appKey"  : gAppKey //앱키
                    ,"reqCoordType" : "EPSG3857"
                    ,"resCoordType" : "EPSG3857"
            };
	  	    $.get( url, params, function(data){
                if( data ) { // POI 통합검색 요청 성공 시 작업
                    self.searchPoiInfo = data.searchPoiInfo;
                }
                else {
                    alert("검색결과가 없습니다");
                }
	  	    });
        },
        clickPOI(poi){
            this.eventBus.$emit('clickPOI', poi)
        },
        setA(poi){
            this.eventBus.$emit('setA', poi)
        },
        setB(poi){
            this.eventBus.$emit('setB', poi)
        }
    },
    mounted() {
        this.eventBus.$on("inputKeyword", this.getTotPOISearch);
    } 
}
</script>

<style>
.list{
    background-color: white;
    border: 1px solid #eaeaea;
    width: 330px;
    text-align: left;
    padding: 10px;
}
.count{
    text-align: right;
    margin-bottom: 5px;
    color: #5fc694;
}
.poi{
    cursor: pointer;
    padding: 10px;
    border-top: 1px solid #eaeaea;
    display: flex;
}
.poiname{
    width: 240px;
    overflow: hidden; 
    text-overflow: ellipsis;
    white-space: nowrap; 
}
.poi:hover{
    background-color: #eaeaea;
}
.left{
    flex: 4;
}
.latlon{
    color: grey;
    font-size: 10px;
}
.right{
    flex: 1;
    border: 1px solid #eaeaea;
    display: flex;
}
.right *{
    text-align: center;
    vertical-align: middle;
    flex: 1;
    display: inline-block;
    background-color: #5fc694;
    color: white;
    font-size: 8px;
    padding: 5px;
    font-weight: bold;
}
.right *:hover{
    background-color: #598b73;
}
</style>
