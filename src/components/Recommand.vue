<template>
    <div class="recommand" v-if="pois!=null">
        <div class="title"> <span>CloseUp</span>이 추천하는 BEST 장소</div>
        <div class="r_poi" v-for="(poi, index) in pois" :key="index" @click="clickPoi(poi)">
            <div class="img"><img :src="poi.image" width="100px" height="100px"/></div>
            <div class="info">
                <div class="first line">
                    <span class="name">{{index+1}}. {{poi.name}}</span>
                </div>
                <div class="score"><span>{{poi.score}}</span>점</div>
                <div class="second line">
                    <div class="address">{{poi.upperAddrName}} {{poi.middleAddrName}} {{poi.lowerAddrName}} {{poi.detailAddrName}}</div>
                    <div class="tel">TEL: {{poi.telNo}}</div>
                </div>
                <div class="third line categories">
                    <span class="category" v-for="(category, index) in poi.categories" :key="index">{{category}}</span>
                </div>
                <div class="fourth line">
                    <span class="starpoint"><i class="fas fa-star"></i> {{poi.starPoint}}</span>
                    <span class="evaluate" @click="starPoint(poi)">평가하기</span>
                    <span class="google" @click="googleSearch(poi.name)">구글검색</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['pois'],
    data(){
        return {
        }
    },
    methods: {
        googleSearch(keyword){
            window.open(`https://www.google.co.kr/search?q=${keyword}`);
        },
        clickPoi(poi){
            this.eventBus.$emit('setCenter', poi.frontLon, poi.frontLat);
        },
        starPoint(poi){
            this.eventBus.$emit('showStarPoint', poi);
        }
    }
}
</script>
<style lang="scss" scoped>
.recommand{
    background-color: white;
    border: 1px solid #eaeaea;
    width: 330px;
    text-align: left;
    padding: 10px;
}
.title{
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    span {
        color: #598b73;
    }
}
.r_poi{
    display: flex;
    cursor: pointer;
    margin-top: 5px;
    padding-top: 5px;
    border-top: 2px solid #eaeaea;
    &:hover{
        background-color: #eaeaea;
    }
    .img{
        flex: 1;
    }
    .info{
        flex: 5;
        margin-left: 5px;
    }
}
.first{
    font-size: 20px;
    font-weight: bold;
    overflow: hidden; 
    text-overflow: ellipsis;
    white-space: nowrap; 
    margin-bottom: 15px;
}
.score{
    float: right;
    span{
        color: red;
    }
    font-size: 15px;
    font-weight: bold;
}
.second{
    font-size: 12px;
    margin-bottom: 5px;
}
.category{
    margin-right: 10px;
    background-color: #5fc694;
    color: white;
    padding: 3px;
    font-size: 12px;
    border-radius: 100px;
}
.starpoint{
    color: gold;
}
.evaluate{
    margin-left: 5px;
    color: #ff2f6e;
    font-size: 13px;
    &:hover{
        text-decoration: underline;
    }
}
.google{
    float: right;
    font-size: 12px;
    &:hover{
        text-decoration: underline;
    }
}
</style>
