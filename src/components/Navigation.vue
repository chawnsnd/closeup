<template>
    <div class="navigation">
        <div class="nav">
            <div class="scroll">
                <div class="poi">
                    <div class="poikey">1</div>
                    <div class="searchbar" @click="clickPoiName(0)" v-if="pois[0].name == null">
                        <input v-model="pois[0].keyword" @keyup.enter="onEnter(0)" type="text" class="input" poiholder="장소 검색"/>
                    </div>
                    <div class="poiname" @click="clickPoiName(0)" v-else>{{pois[0].name}}</div>
                </div>
                <div class="poi">
                    <div class="poikey">2</div>
                    <div class="searchbar" @click="clickPoiName(1)" v-if="pois[1].name == null">
                        <input v-model="pois[1].keyword" @keyup.enter="onEnter(1)" type="text" class="input" poiholder="장소 검색"/>
                    </div>
                    <div class="poiname" @click="clickPoiName(1)" v-else>{{pois[1].name}}</div>
                </div>
                <div v-for="(poi, index) in pois" :key="index">
                    <div class="poi" v-if="index>=2">
                        <div class="poikey">{{index+1}}</div>
                        <div class="searchbar" @click="clickPoiName(index)" v-if="pois[index].name == null">
                            <input v-model="pois[index].keyword" @keyup.enter="onEnter(index)" type="text" class="input" poiholder="장소 검색"/>
                        </div>
                        <div class="poiname" @click="clickPoiName(index)" v-else>{{pois[index].name}}</div>
                        <div class="remove" @click="removePoi(index)">-</div>
                    </div>
                </div>
            </div>
            <div class="poi plus" @click="pois.push({keyword: '', name: null})">+ 사람추가</div>
        </div>
        <div class="btn absolute" @click="clickRecommand">약속장소 추천</div>
        <div class="filtertap" :class="{active: showFilter }" @click="showFilter = !showFilter"><i class="fas fa-filter"> {{category}}</i></div>
        <div class="filter" v-if="showFilter">
            <div><span>전체</span>
                <label><input v-model="category" value="" type="radio" />전체</label>
            </div>
            <div><span>생활</span>
                <label><input v-model="category" value="숙박" type="radio" />숙박</label>
                <label><input v-model="category" value="쇼핑" type="radio" />쇼핑</label>
                <label><input v-model="category" value="편의점" type="radio" />편의점</label>
                <label><input v-model="category" value="대형마트" type="radio" />대형마트</label>
                <label><input v-model="category" value="마트" type="radio" />마트</label>
            </div>
            <div><span>식음료</span>
                <label><input v-model="category" value="카페" type="radio" />카페</label>
                <label><input v-model="category" value="한식" type="radio" />한식</label>
                <label><input v-model="category" value="중식" type="radio" />중식</label>
                <label><input v-model="category" value="일식" type="radio" />일식</label>
                <label><input v-model="category" value="양식" type="radio" />양식</label>
                <label><input v-model="category" value="패밀리레스토랑" type="radio" />패밀리레스토랑</label>
                <label><input v-model="category" value="피자" type="radio" />피자</label>
                <label><input v-model="category" value="치킨" type="radio" />치킨</label>
                <label><input v-model="category" value="디저트" type="radio" />디저트</label>
                <label><input v-model="category" value="패스트푸드" type="radio" />패스트푸드</label>
            </div>
            <div><span>교통</span>
                <label><input v-model="category" value="버스정류장" type="radio" />버스정류장</label>
                <label><input v-model="category" value="지하철" type="radio" />지하철</label>
            </div>
            <div><span>놀거리</span>
                <label><input v-model="category" value="영화관" type="radio" />영화관</label>
                <label><input v-model="category" value="노래방" type="radio" />노래방</label>
                <label><input v-model="category" value="PC방" type="radio" />PC방</label>
                <label><input v-model="category" value="스크린골프장" type="radio" />스크린골프장</label>
            </div>
        </div>

    </div>
    
</template>

<script>
import Socket from '../socket';
// import recommandPois from "../tmp/recommandPois"
import Btn from "./Btn";

export default {
    components: {
        "btn": Btn
    },
    data() {
        return{
            pois: [
                {
                    keyword: "",
                    name: null
                },
                {
                    keyword: "",
                    name: null
                }
            ],
            paramPois: [],
            recommandPois: [],
            showFilter: false,
            category: ""
        }
    },
    methods:{
        clickPoiName(index){
            this.pois[index].name = null,
            this.eventBus.$emit('removePois');
        },
        setPerson(poi, index){
            this.paramPois[index] = poi;
            this.pois[index].name = poi.name;
            this.pois[index].keyword = poi.name;
        },
        clickRecommand(){
            for(var idx in this.pois){
                if(this.pois[idx].name === null) return alert("않이! 사람을 추가했으면 장소를 채우셔야죠, 답답한 양반아...");
            }
            this.recommand(this.category);
        },
        recommand(category){
            console.log(category)
            this.eventBus.$emit('showSearching', true);
            var lonLats = [];
            this.paramPois.forEach(poi => {
                var lonLat = {lon: poi.lon, lat: poi.lat};
                lonLats.push(lonLat);
            });
            // this.param.pois를 통해 recommandPois를 얻을 것
            var param = {
                people_chosen: lonLats,
                keyWord: category
            }
            this.axios
            .get(`http://localhost:5000/api/pois`, param)
            .then(res => {
                this.recommandPois = res;
                this.eventBus.$emit('showRecommandComponent', this.recommandPois);
                this.eventBus.$emit('setPoisMarker', this.recommandPois);
            })
            .catch(err => {
                alert("장소추천에 실패했습니다.", err);
            })
            // Socket
            // .send(param)
            // .then(res => { 
            //     this.recommandPois = res;
            //     this.eventBus.$emit('showRecommandComponent', this.recommandPois);
            //     this.eventBus.$emit('setPoisMarker', this.recommandPois);
            // })
            // .catch(err => {
            //     if(err === 'no search poi'){
            //         console.log("검색결과 없음")
            //         this.recommandPois = [];
            //     }
            //     console.log(err)
            // })
            // .finally(() => {
            //     this.eventBus.$emit('showSearching', false);
            // })
        },
        onEnter(index) {
            this.eventBus.$emit('inputKeyword', this.pois[index].keyword, index);
        },
        removePoi(index){
            this.pois.splice(index,1);
            this.eventBus.$emit('removeMarker', index);
        }
    },
    mounted(){
        this.eventBus.$on("setPerson", this.setPerson);
    }
}
</script>


<style lang="scss" scoped>
.nav{
    background-color: white;
    border: 1px solid #eaeaea;
    width: 350px;
    text-align: left;
}
.scroll{
    overflow-y: scroll; 
    // max-height:156px;
    -ms-overflow-style: none;
}
.poi{
    border: 1px solid #eaeaea;
    padding: 15px;
    color: #5fc694;
    display: flex;
    height: 20px;
}
.poikey{
    flex: 1;
    text-align: left;
}
.searchbar{
    flex: 10;
}
.remove{
    flex: 1;
    display: inline-block;
    cursor: pointer;
    font-size: 20px;
    text-align: right;
}
.input{
    height: 90%;
    width: 100%;
    outline: none;
}
.poiname{
    text-align: left;
    flex: 10;
    color: black;
    overflow: hidden;
    word-break: keep-all;
    text-overflow: ellipsis;
    cursor: pointer;
}
.plus{
    cursor: pointer;
    text-align: center;
}

.btn {
    display: inline-block;
    text-align: center;
    cursor: pointer;
    width: 350px;
    line-height: 50px;
    background-color: #5fc694;
    color: white;
    font-size: 20px;
    border: 1px solid #eaeaea;
}
.btn:hover{
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
.btn:active{
    background-color: #598b73;
}
.filtertap {
    display: inline-block;
    border: 1px solid #eaeaea;
    padding: 0 5px;
    background-color: white;
    line-height: 50px;
    min-width: 50px;
    cursor: pointer;
    &:hover{
        color: #598b73;
        background-color: #eaeaea;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    }
}
.active{
    color: #598b73;
    border: 1px solid #598b73;
}
.filter{
    z-index: 999;
    position: absolute;
    top: 220px;
    left: 358px;
    background-color: white;
    border: 1px solid #eaeaea;
    width: 800px;
    padding-left: 10px;
    padding-right: 10px;
    text-align: left;
    font-size: 12px;
    div{
        padding: 10px 10px;
        border-top: 1px solid #eaeaea;
        *{
           display: inline-block; 
        }
        span{
            font-weight: bold;
            width: 80px;
            font-size: 15px;
            border-right: 1px solid black;
        }
        label{
            margin-left: 5px;
        }
    }
}
</style>
