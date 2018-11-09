<template>
    <div class="recommand">
        <div class="title"> <span>CloseUp</span>이 추천하는 BEST 장소</div>
        <div class="r_poi" v-for="(poi, index) in pois" :key="index" @click="clickPOI(poi)">
            <div class="img"><img :src="poi.image" width="100px" height="100px"/></div>
            <div class="info">
                <div class="first line">
                    <span class="name">{{index+1}}. {{poi.name}}</span>
                    <span class="score">{{poi.score}}점</span>
                </div>
                <div class="second line">
                    <div class="address">{{poi.upperAddrName}} {{poi.middleAddrName}} {{poi.lowerAddrName}} {{poi.detailAddrName}}</div>
                    <div class="tel">TEL: {{poi.telNo}}</div>
                </div>
                <div class="third line categories">
                    <span class="category" v-for="(category, index) in poi.categories" :key="index">{{category}}</span>
                </div>
                <div class="fourth line">
                    <span class="starpoint" v-for="point in 5" :key="point">
                        <i class="fas fa-star" v-if="poi.starPoint>=point"></i>
                        <i class="far fa-star" v-else></i>
                    </span>
                    <span>({{poi.starPoint}})</span>
                    <span class="google" @click="googleSearch(poi.name)">구글검색</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import recommandPois from "../tmp/recommandPois"
export default {
    data(){
        return {
            pois: recommandPois
        }
    },
    methods: {
        googleSearch(keyword){
            window.open(`https://www.google.co.kr/search?q=${keyword}`);
        },
        clickPOI(poi){
            this.eventBus.$emit('setCenter', poi.lon, poi.lat);
        }
    }
}
</script>
<style lang="scss">
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
.line *{
    display: inline-block;
}
.first{
    font-size: 20px;
    font-weight: bold;
    .score{
        float: right;
        color: black;
        font-size: 15px;
    }
}
.second{
    font-size: 12px;
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
.google{
    float: right;
    &:hover{
        text-decoration: underline;
    }
}
</style>
