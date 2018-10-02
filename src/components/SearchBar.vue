<template>
    <div class="search_nav">
        <div class="search_bar">
            <input @keyup.enter="onEnter" @input="onInput" type="text" class="input" placeholder="장소 검색"/>
            <i class="fas fa-search" />
        </div>
        <div class="dropdown">
            <div class="place" v-for="place in suggestPlaces" :key="place.name+place.lon+place.lat">
                {{place.name}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            keyword: "",
            suggestPlaces: [],
            tdata: null
        }
    },
    methods: {
        onEnter() {
            this.searchPlace(this.suggestPlaces[0]);
            return this.suggestPlaces = [];
        },
        onInput(e) {
            this.keyword = e.target.value;
            if(this.keyword==='') return this.suggestPlaces = [];
            this.suggestPlace(this.keyword);
        },
        searchPlace(place){
            this.eventBus.$emit('search', place);
        },
        suggestPlace(keyword) {
            this.searchPOI(keyword)
        },
        searchPOI(keyword){
            this.tdata = new Tmap.TData();//REST API 에서 제공되는 경로, 교통정보, POI 데이터를 쉽게 처리할 수 있는 클래스입니다.
            this.tdata.events.register("onComplete", this.tdata, this.onCompleteTData);//데이터 로드가 성공적으로 완료되었을 때 발생하는 이벤트입니다.
            this.tdata.getPOIDataFromSearch(encodeURIComponent(keyword));//encodeURIComponent함수로 해당 파라메터 값을 처리합니다.
        },
        onCompleteTData(e){
            //return 받은 xml에서 'searchPoiInfo pois poi'가 존재하는지 확인합니다.
            if(jQuery(this.tdata.responseXML).find("searchPoiInfo pois poi").text() != ''){
                var suggest = [];
                //each문을 실행하여 마커를 추가합니다.
                jQuery(this.tdata.responseXML).find("searchPoiInfo pois poi").each(function(){
                    if(1){
                        suggest.push({
                            name: jQuery(this).find("name").text(),
                            lon: jQuery(this).find("frontLon").text(),
                            lat: jQuery(this).find("frontLat").text()
                        });
                    }
                });
                suggest.slice(20, suggest.length-20);
                this.suggestPlaces = suggest;
            }else {
                // console.log("검색결과 없음")
            }
        }
    }
    
}
</script>

<style lang="scss" scoped>
.search_bar{
    background-color: white;
    width: 350px;
    height: 50px;
    border: 1px solid #eaeaea;
    line-height: 50px;
    .input{
        border: none;
        outline: none;
        width: 85%;
        height: 90%;
    }
    .fa-search:hover{
        cursor: pointer;
        font-size: 20px;
    }
}
.dropdown{
    width: 350px;
    background-color: white;
    border: 1px solid #eaeaea;
    border-top: none;
    .place{
        height: 30px;
        line-height: 30px;
        cursor: default;
        text-align: left;
        padding-left: 20px;
    }
    .place:hover{
        background-color: #eaeaea;
    }
}

</style>
