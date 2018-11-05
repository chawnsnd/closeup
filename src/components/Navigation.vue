<template>
    <div class="navigation">
        <div class="nav">
            <div class="scroll">
                <div class="place">
                    <div class="placekey">1</div>
                    <div class="searchbar" v-if="places[0].name == null">
                        <input v-model="places[0].keyword" @keyup.enter="onEnter(0)" type="text" class="input" placeholder="장소 검색"/>
                    </div>
                    <div class="placename" @click="places[0].name = null" v-else>{{places[0].name}}</div>
                </div>
                <div class="place">
                    <div class="placekey">2</div>
                    <div class="searchbar" v-if="places[1].name == null">
                        <input v-model="places[1].keyword" @keyup.enter="onEnter(1)" type="text" class="input" placeholder="장소 검색"/>
                    </div>
                    <div class="placename" @click="places[1].name = null" v-else>{{places[1].name}}</div>
                </div>
                <div v-for="(place, index) in places" :key="index">
                    <div class="place" v-if="index>=2">
                        <div class="placekey">{{index+1}}</div>
                        <div class="searchbar" v-if="places[index].name == null">
                            <input v-model="places[index].keyword" @keyup.enter="onEnter(index)" type="text" class="input" placeholder="장소 검색"/>
                        </div>
                        <div class="placename" @click="places[index].name = null" v-else>{{places[index].name}}</div>
                        <div class="remove" @click="removePlace(index)">-</div>
                    </div>
                </div>
            </div>
            <div class="place plus" @click="places.push({keyword: '', name: null})">+ 사람추가</div>
        </div>
        <div class="btn absolute" @click="recommand">약속장소 추천</div>
        <div class="more">
            <div v-if="menuFlag" class="menu">
                <label><input type="checkbox"/>전체</label>
                <label><input type="checkbox"/>카페</label>
                <label><input type="checkbox"/>노래방</label>
                <label><input type="checkbox"/>식당</label>
                <label><input type="checkbox"/>호프</label>
                <input type="checkbox"/><input type="text" placeholder="기타" width="50px"/>
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
            places: [
                {
                    keyword: "",
                    name: null
                },
                {
                    keyword: "",
                    name: null
                }
            ],
            menuFlag: false
        }
    },
    methods:{
        setPlace(place, index){
            this.places[index].info = place;
            this.places[index].name = place.name;
            this.places[index].keyword = place.name;
        },
        recommand(){
            this.places.forEach(place => {
                if(place.name === null) return alert("않이! 사람을 추가했으면 장소를 채우셔야죠");
            });
            var places = [];
            this.places.forEach(place => {
                places.push(place.info);
            });
            this.eventBus.$emit('recommand', places);
            this.menuFlag = false;
        },
        onEnter(index) {
            this.eventBus.$emit('inputKeyword', this.places[index].keyword, index);
            this.suggestPlaces = [];
        },
        removePlace(index){
            this.places.splice(index,1);
            this.eventBus.$emit('removeMarker', index);
        }
    },
    mounted(){
        this.eventBus.$on("setPlace", this.setPlace);
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
.place{
    border: 1px solid #eaeaea;
    padding: 15px;
    color: #5fc694;
    display: flex;
    height: 20px;
}
.placekey{
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
.placename{
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
