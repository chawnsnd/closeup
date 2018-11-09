<template>
    <div v-if="pois != null" class="list">
        <div class="pois" :class="{'disable': loading}">
            <div class="count">{{(paging.curPage-1)*10+1}} ~ {{(paging.curPage)*10}} / {{pois.totalCount}}</div>
            <div class="poi" v-for="(poi, index) in pois" :key="index">
                <div class="left" @click="clickPOI(poi)">
                    <div class="poiname">{{poi.name}}</div>
                    <div class="latlon">{{poi.upperAddrName}} {{poi.middleAddrName}} {{poi.lowerAddrName}} {{poi.detailAddrName}}</div>
                </div>
            </div>
            <pagination :maxPage="paging.maxPage"/>
        </div>
    </div>
    <div v-else class="list ment" :class="{'disable': loading}">CloseUP으로 약속장소를 쉽게 정해보세요!</div>
</template>

<script>
import Pagination from './Pagination';
export default {
    components: {
        "pagination": Pagination
    },
    data() {
        return{
            pois: null,
            paging: {
                count: 10,
                curPage: 1,
                maxPage: 0
            },
            loading: false,
            gAppKey: "5a4a3525-808d-41a4-8968-b84175f11618",
            keyword: ""
        }
    },
    methods: {
        inputKeyword(keyword, index){
            if(keyword == '') return alert('검색어를 입력해 주세요');
            this.keyword = keyword;
            this.person = index;
            this.getTotPOISearch()
        },
        getTotPOISearch() {
            var self = this;
	  	    var url = "https://api2.sktelecom.com/tmap/pois";//POI 검색 api url 입니다
            var params = {
                    "version" : "1"//버전
                    ,"page" : this.paging.curPage//페이지
                    ,"count"  : this.paging.count//페이지당 검색수
                    ,"searchKeyword" : this.keyword //검색어
                    ,"searchtypCd" : "A"//R: 거리순 / A:정확도순
                    ,"appKey"  : this.gAppKey //앱키
                    ,"reqCoordType" : "EPSG3857"
                    ,"resCoordType" : "EPSG3857"
            };
            this.loading = true;
	  	    $.get( url, params, function(data){
                if( data ) { // POI 통합검색 요청 성공 시 작업
                    self.pois = data.searchPoiInfo.pois.poi;
                    self.paging.maxPage = Math.ceil(data.searchPoiInfo.totalCount/self.paging.count);
                    if(this.person === 999) return this.dbStore(data.searchPoiInfo.pois.poi);
                    self.clickPOI(self.pois[0]);
                }
                else {
                    console.log("검색결과가 없습니다");
                }
	  	    }).then(function(){
                self.loading = false;
            });
        },
        dbStore(pois){
            var socket = new WebSocket("ws://127.0.0.1:6789");
            socket.onopen = function(e){ socket.send(JSON.stringify(pois)) }
            return socket.close();
        },
        changePage(page){
            this.paging.curPage = page;
            this.getTotPOISearch(this.keyword, this.person);
        },
        clickPOI(poi){
            this.eventBus.$emit('setPersonMarker', poi, this.person)
            this.eventBus.$emit('setPerson', poi, this.person)
        }
    },
    mounted() {
        this.eventBus.$on("inputKeyword", this.inputKeyword);
        this.eventBus.$on("changePage", this.changePage);
    },
    computed: {
        pages() {
            if(this.paging.curPage <= 2) {
                return [1,2,3,4,5];
            } else if (this.paging.curPage >= this.paging.maxPage - 2) {
                return [this.paging.maxPage-4, this.paging.maxPage-3, this.paging.maxPage-2, this.paging.maxPage-1, this.paging.maxPage];
            } else {
                return [this.paging.curPage-2, this.paging.curPage-1, this.paging.curPage, this.paging.curPage+1, this.paging.curPage+2];
            }
        }
    }
}
</script>

<style lang="scss" scoped>
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
.disable{
    opacity: 0.4;
    filter: alpha(opacity=40);
    pointer-events: none;
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
.pagination{
    margin-top: 5px;
}
.ment{
    text-align: center;
    color: grey;
}
</style>
