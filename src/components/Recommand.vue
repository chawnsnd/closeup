<template>
    <div class="recommand">
        <div class="title"> <span>CloseUp</span>이 추천하는 BEST 장소</div>
        <div class="r_place" v-for="(place, index) in places" :key="index">
            <div class="img"><img :src="place.image" width="100px" height="100px"/></div>
            <div class="info">
                <div class="first line">
                    <span class="rank">{{index+1}}.</span>
                    <span class="name">{{place.name}}</span>
                    <span class="score">{{place.score}}점</span>
                </div>
                <div class="second line">
                    <div class="address">{{place.address}}</div>
                    <div class="tel">TEL: {{place.telNo}}</div>
                </div>
                <div class="third line categories">
                    <span class="category" v-for="(category, index) in place.categories" :key="index">{{category}}</span>
                </div>
                <div class="fourth line">
                    <span class="starpoint">★★★★★({{place.starPoint}})</span>
                    <span class="google" @click="googleSearch(place.name)">구글검색</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            places: [{
                name: "죽전역",
                image: "https://s3.namuwikiusercontent.com/s/ef257e547cb0d07cc9d86f667452d671b55f1adda4f7de20a24b3efa323d013e82dc8d02e658493aec442c03ead4f349986bd4d79c10464066b90ff685df3d39d1205e967e2eda84735491a6aeee500a02be65401ae81cf5f2b1c1ceaabb417f",
                telNo: "01025424536",
                address: "경기도 용인시 수지구 포은대로 530 12345645",
                starPoint: 3.5,
                score: 97,
                lon: 12345,
                lat: 12345,
                categories: ["지하철", "대중교통"]
            },{
                name: "죽전역2",
                image: "https://s3.namuwikiusercontent.com/s/ef257e547cb0d07cc9d86f667452d671b55f1adda4f7de20a24b3efa323d013e82dc8d02e658493aec442c03ead4f349986bd4d79c10464066b90ff685df3d39d1205e967e2eda84735491a6aeee500a02be65401ae81cf5f2b1c1ceaabb417f",
                telNo: "01025424536",
                address: "경기도 용인시 수지구 포은대로 530 12345645",
                starPoint: 3.5,
                score: 82,
                lon: 12345,
                lat: 12345,
                categories: ["지하철", "대중교통", "대학교"]
            },{
                name: "죽전역3",
                image: "https://s3.namuwikiusercontent.com/s/ef257e547cb0d07cc9d86f667452d671b55f1adda4f7de20a24b3efa323d013e82dc8d02e658493aec442c03ead4f349986bd4d79c10464066b90ff685df3d39d1205e967e2eda84735491a6aeee500a02be65401ae81cf5f2b1c1ceaabb417f",
                telNo: "01025424536",
                address: "경기도 용인시 수지구 포은대로 530 12345645",
                starPoint: 3.5,
                score: 51,
                lon: 12345,
                lat: 12345,
                categories: ["지하철"]
            }]
        }
    },
    methods: {
        googleSearch(keyword){
            window.open(`https://www.google.co.kr/search?q=${keyword}`);
        }

    }
}
</script>
<style>
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
}
.title > span{
    color: #598b73;
}
.r_place{
    display: flex;
    cursor: pointer;
    margin-top: 5px;
    padding-top: 5px;
    border-top: 2px solid #eaeaea;
}
.r_place:hover{
    background-color: #eaeaea;
}
.img{
    flex: 1;
}
.info{
    flex: 5;
    margin-left: 5px;
}
.line *{
    display: inline-block;
}
.first{
    font-size: 20px;
    font-weight: bold;
}
.rank{
    margin-right: 5px;
}
.score{
    float: right;
    color: black;
    font-size: 15px;
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
.google{
    float: right;
}
.google:hover{
    text-decoration: underline;
}
</style>
