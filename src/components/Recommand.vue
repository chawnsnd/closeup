<template>
    <div class="recommand" v-if="pois!=null">
        <div class="title"> <span>CloseUp</span>이 추천하는 BEST 장소</div>
        <div class="r_poi" v-for="(poi, index) in paginatedData" :key="index" @click="clickPoi(poi)">
            <div class="info">
                <div class="first line">
                    <span class="name">{{poi.name}}</span>
                    <span class="score">{{poi.weight}}점</span>
                </div>
                <div class="second line">
                    <div class="address">{{poi.upperAddrName}} {{poi.middleAddrName}} {{poi.lowerAddrName}} {{poi.detailAddrName}}</div>
                    <div class="tel">
                        TEL: 
                        <span v-if="poi.telNo==''||poi.telNo==' '">정보없음</span>
                        <span v-else>{{poi.telNo}}</span>
                    </div>
                </div>
                <div class="third line categories">
                    <span class="category" v-for="(category, index) in poi.categories" :key="index">{{category}}</span>
                </div>
                <div class="fourth line">
                    <span class="starpoint" @click="starPoint(poi)"><i class="fas fa-star"></i> {{poi.starPoint}}</span>
                </div>
            </div>
        </div>
        <div class="pagination">
            <span @click="prevPage()">이전</span>
            <span @click="nextPage()">다음</span>
        </div>
    </div>
</template>
<script>
export default {
    props: ['pois'],
    data(){
        return {
            pageNumber: 0,
            size: 5
        }
    },
    methods: {
        prevPage(){
            if(this.pageNumber == 0) return
            this.pageNumber--;
        },
        nextPage(){
            this.pageNumber++
        },
        googleSearch(keyword){
            window.open(`https://www.google.co.kr/search?q=${keyword}`);
        },
        clickPoi(poi){
            this.eventBus.$emit('clickRecommandPoi', poi);
        },
        starPoint(poi){
            this.eventBus.$emit('showStarPoint', poi);
        }
    },
    computed: {
        pageCount(){
            let l = this.pois.length;
            let s = this.size;
            return Math.floor(l/s);
        },
        paginatedData(){
            const start = this.pageNumber * this.size;
            const end = start + this.size;
            return this.pois.slice(start, end);
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
    .name{
        overflow: hidden; 
        text-overflow: ellipsis;
        white-space: nowrap; 
        display: inline-block;
        width: 280px;
    }
    .score{
        display: inline-block;
        float: right;
        color: red;
        font-size: 15px;
        font-weight: bold;
    }
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
    float: right;
    &:hover{
        color: goldenrod;
    }
}
.google{
    float: right;
    font-size: 12px;
    &:hover{
        text-decoration: underline;
    }
}
.pagination{
    display: flex;
    span{
        flex: 1;
        font-weight: bold;
        font-size: 20px;
        text-align: center;
        cursor: pointer;
        &:hover{
            background-color: #eaeaea;
        }
    }
}
</style>
