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
                <label><input v-model="category" @click="setCategory()" value="" type="radio" />전체</label>
            </div>
            <div><span>생활</span>
                <label><input v-model="category" @click="setCategory()" value="T와이파이존" type="radio" />T와이파이존</label>
                <label><input v-model="category" @click="setCategory()" value="목욕탕" type="radio" />목욕탕</label>
                <label><input v-model="category" @click="setCategory()" value="숙박" type="radio" />숙박</label>
                <label><input v-model="category" @click="setCategory()" value="쇼핑" type="radio" />쇼핑</label>
                <label><input v-model="category" @click="setCategory()" value="관공서" type="radio" />관공서</label>
                <label><input v-model="category" @click="setCategory()" value="주요시설물" type="radio" />주요시설물</label>
                <label><input v-model="category" @click="setCategory()" value="은행" type="radio" />은행</label>
                <label><input v-model="category" @click="setCategory()" value="ATM" type="radio" />ATM</label>
                <label><input v-model="category" @click="setCategory()" value="편의점" type="radio" />편의점</label>
                <label><input v-model="category" @click="setCategory()" value="미용실" type="radio" />미용실</label>
                <label><input v-model="category" @click="setCategory()" value="이발소" type="radio" />이발소</label>
                <label><input v-model="category" @click="setCategory()" value="대형마트" type="radio" />대형마트</label>
                <label><input v-model="category" @click="setCategory()" value="화장실" type="radio" />화장실</label>
                <label><input v-model="category" @click="setCategory()" value="공원" type="radio" />공원</label>
                <label><input v-model="category" @click="setCategory()" value="커피" type="radio" />커피</label>
                <label><input v-model="category" @click="setCategory()" value="음식" type="radio" />음식</label>
                <label><input v-model="category" @click="setCategory()" value="레저" type="radio" />레저</label>
                <label><input v-model="category" @click="setCategory()" value="호텔" type="radio" />호텔</label>
                <label><input v-model="category" @click="setCategory()" value="마트" type="radio" />마트</label>
            </div>
            <div><span>식음료</span>
                <label><input v-model="category" @click="setCategory()" value="식음료" type="radio" />식음료</label>
                <label><input v-model="category" @click="setCategory()" value="TV맛집" type="radio" />TV맛집</label>
                <label><input v-model="category" @click="setCategory()" value="카페" type="radio" />카페</label>
                <label><input v-model="category" @click="setCategory()" value="한식" type="radio" />한식</label>
                <label><input v-model="category" @click="setCategory()" value="중식" type="radio" />중식</label>
                <label><input v-model="category" @click="setCategory()" value="일식" type="radio" />일식</label>
                <label><input v-model="category" @click="setCategory()" value="양식" type="radio" />양식</label>
                <label><input v-model="category" @click="setCategory()" value="패밀리레스토랑" type="radio" />패밀리레스토랑</label>
                <label><input v-model="category" @click="setCategory()" value="전문음식점" type="radio" />전문음식점</label>
                <label><input v-model="category" @click="setCategory()" value="피자" type="radio" />피자</label>
                <label><input v-model="category" @click="setCategory()" value="치킨" type="radio" />치킨</label>
                <label><input v-model="category" @click="setCategory()" value="디저트" type="radio" />디저트</label>
                <label><input v-model="category" @click="setCategory()" value="제과점" type="radio" />제과점</label>
                <label><input v-model="category" @click="setCategory()" value="베스킨라빈스" type="radio" />베스킨라빈스</label>
                <label><input v-model="category" @click="setCategory()" value="하겐다즈" type="radio" />하겐다즈</label>
                <label><input v-model="category" @click="setCategory()" value="나뚜루" type="radio" />나뚜루</label>
                <label><input v-model="category" @click="setCategory()" value="콜드스톤" type="radio" />콜드스톤</label>
                <label><input v-model="category" @click="setCategory()" value="패스트푸드" type="radio" />패스트푸드</label>
            </div>
            <div><span>교통</span>
                <label><input v-model="category" @click="setCategory()" value="교통" type="radio" />교통</label>
                <label><input v-model="category" @click="setCategory()" value="버스" type="radio" />버스</label>
                <label><input v-model="category" @click="setCategory()" value="버스정류장" type="radio" />버스정류장</label>
                <label><input v-model="category" @click="setCategory()" value="지하철" type="radio" />지하철</label>
                <label><input v-model="category" @click="setCategory()" value="주유소" type="radio" />주유소</label>
                <label><input v-model="category" @click="setCategory()" value="충전소" type="radio" />충전소</label>
                <label><input v-model="category" @click="setCategory()" value="주차장" type="radio" />주차장</label>
                <label><input v-model="category" @click="setCategory()" value="정비소" type="radio" />정비소</label>
                <label><input v-model="category" @click="setCategory()" value="EV충전소" type="radio" />EV충전소</label>
                <label><input v-model="category" @click="setCategory()" value="EV" type="radio" />EV</label>
                <label><input v-model="category" @click="setCategory()" value="가스충전소" type="radio" />가스충전소</label>
            </div>
            <div><span>병원</span>
                <label><input v-model="category" @click="setCategory()" value="병원" type="radio" />병원</label>
                <label><input v-model="category" @click="setCategory()" value="약국" type="radio" />약국</label>
                <label><input v-model="category" @click="setCategory()" value="내과" type="radio" />내과</label>
                <label><input v-model="category" @click="setCategory()" value="소아과" type="radio" />소아과</label>
                <label><input v-model="category" @click="setCategory()" value="외과" type="radio" />외과</label>
                <label><input v-model="category" @click="setCategory()" value="치과" type="radio" />치과</label>
                <label><input v-model="category" @click="setCategory()" value="안과" type="radio" />안과</label>
                <label><input v-model="category" @click="setCategory()" value="의원" type="radio" />의원</label>
                <label><input v-model="category" @click="setCategory()" value="보건소" type="radio" />보건소</label>
                <label><input v-model="category" @click="setCategory()" value="한의원" type="radio" />한의원</label>
            </div>
            <div><span>놀거리</span>
                <label><input v-model="category" @click="setCategory()" value="놀거리" type="radio" />놀거리</label>
                <label><input v-model="category" @click="setCategory()" value="영화관" type="radio" />영화관</label>
                <label><input v-model="category" @click="setCategory()" value="노래방" type="radio" />노래방</label>
                <label><input v-model="category" @click="setCategory()" value="PC방" type="radio" />PC방</label>
                <label><input v-model="category" @click="setCategory()" value="공연장" type="radio" />공연장</label>
                <label><input v-model="category" @click="setCategory()" value="문화시설" type="radio" />문화시설</label>
                <label><input v-model="category" @click="setCategory()" value="스크린골프장" type="radio" />스크린골프장</label>
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
            category: null
        }
    },
    methods:{
        clickPoiName(index){
            this.pois[index].name = null,
            this.eventBus.$emit('removePois');
        },
        setPerson(poi, index){
            this.paramPois.push(poi);
            this.pois[index].name = poi.name;
            this.pois[index].keyword = poi.name;
        },
        setCategory(){
            for(var idx in this.pois){
                if(this.pois[idx].name === null) return;
            }
            this.recommand();
        },
        clickRecommand(){
            for(var idx in this.pois){
                if(this.pois[idx].name === null) return alert("않이! 사람을 추가했으면 장소를 채우셔야죠, 답답한 양반아...");
            }
            this.recommand();
        },
        recommand(){
            this.eventBus.$emit('toggleSearching');
            var lonLats = [];
            this.paramPois.forEach(poi => {
                var lonLat = {lon: poi.lon, lat: poi.lat};
                lonLats.push(lonLat);
            });
            // this.param.pois를 통해 recommandPois를 얻을 것
            var param = {
                command: "recommend_api",
                people_chosen: lonLats,
                keyWord: this.category
            }
            Socket
            .send(param)
            .then(res => { 
                this.recommandPois = res 
                this.eventBus.$emit('showRecommandComponent', this.recommandPois);
                this.eventBus.$emit('setPoisMarker', this.recommandPois);
                this.eventBus.$emit('toggleSearching');
            })
            .catch(err => { console.log(err) })
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
    width: 1400px;
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
