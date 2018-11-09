<template>
    <div class="navigation">
        <div class="nav">
            <div class="scroll">
                <div class="poi">
                    <div class="poikey">1</div>
                    <div class="searchbar" v-if="pois[0].name == null">
                        <input v-model="pois[0].keyword" @keyup.enter="onEnter(0)" type="text" class="input" poiholder="장소 검색"/>
                    </div>
                    <div class="poiname" @click="pois[0].name = null" v-else>{{pois[0].name}}</div>
                </div>
                <div class="poi">
                    <div class="poikey">2</div>
                    <div class="searchbar" v-if="pois[1].name == null">
                        <input v-model="pois[1].keyword" @keyup.enter="onEnter(1)" type="text" class="input" poiholder="장소 검색"/>
                    </div>
                    <div class="poiname" @click="pois[1].name = null" v-else>{{pois[1].name}}</div>
                </div>
                <div v-for="(poi, index) in pois" :key="index">
                    <div class="poi" v-if="index>=2">
                        <div class="poikey">{{index+1}}</div>
                        <div class="searchbar" v-if="pois[index].name == null">
                            <input v-model="pois[index].keyword" @keyup.enter="onEnter(index)" type="text" class="input" poiholder="장소 검색"/>
                        </div>
                        <div class="poiname" @click="pois[index].name = null" v-else>{{pois[index].name}}</div>
                        <div class="remove" @click="removePoi(index)">-</div>
                    </div>
                </div>
            </div>
            <div class="poi plus" @click="pois.push({keyword: '', name: null})">+ 사람추가</div>
            <div class="poi">
                <div class="poikey">DB저장</div>
                <div class="searchbar">
                    <input v-model="dbStoreKeyword" @keyup.enter="onEnter(999)" type="text" class="input" poiholder="키워드 입력(편의점, 노래방, 피씨방 등)"/>
                </div>
            </div>
        </div>
        <div class="btn absolute" @click="recommand">약속장소 추천</div>
        <div class="more">
            <div v-if="menuFlag" class="menu">
                <label><input type="checkbox"/>전체</label>
                <label><input type="checkbox"/>카페</label>
                <label><input type="checkbox"/>노래방</label>
                <label><input type="checkbox"/>식당</label>
                <label><input type="checkbox"/>호프</label>
                <input type="checkbox"/><input type="text" poiholder="기타" width="50px"/>
            </div>
            <div class="moretap" @click="menuFlag = !menuFlag">::</div>
        </div>
    </div>
    
</template>

<script>
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
            menuFlag: false,
            dbStoreKeyword: ""
        }
    },
    methods:{
        setPoi(poi, index){
            this.pois[index].info = poi;
            this.pois[index].name = poi.name;
            this.pois[index].keyword = poi.name;
        },
        recommand(){
            this.pois.forEach(poi => {
                if(poi.name === null) return alert("않이! 사람을 추가했으면 장소를 채우셔야죠");
            });
            this.pois.forEach(poi => {
                pois.push(poi.info);
            });
            this.eventBus.$emit('recommand', pois);
            this.menuFlag = false;
        },
        onEnter(index) {
            if(index === 999) return this.eventBus.$emit('inputKeyword', this.dbStoreKeyword, index);
            this.eventBus.$emit('inputKeyword', this.pois[index].keyword, index);
        },
        removePoi(index){
            this.pois.splice(index,1);
            this.eventBus.$emit('removeMarker', index);
        }
    },
    mounted(){
        this.eventBus.$on("setPoi", this.setPoi);
    }
}
</script>


<style>
.nav{
    background-color: white;
    border: 1px solid #eaeaea;
    width: 350px;
    text-align: left;
}
.scroll{
    overflow-y: scroll; 
    max-height:156px;
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
.more{
    cursor: pointer;
    float: right;
    background-color: white;
    line-height: 50px;
    display: inline-block;
}
.more > *{
    display: inline-block;
}
.menu{
    padding-left: 10px;
    padding-right: 10px;
}
.moretap {
    border: 1px solid #eaeaea;
    width: 20px;
}
</style>
