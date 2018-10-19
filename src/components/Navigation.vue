<template>
    <div class="navigation">
        <div class="nav">
            <div class="a"><span class="placekind">A</span> <span class="placename" v-if="placeA != null">{{placeA.name}}</span></div>
            <div class="b"><span class="placekind">B</span> <span class="placename" v-if="placeB != null">{{placeB.name}}</span></div>
        </div>
        <div class="btn absolute" @click="recommand">약속장소 추천</div>
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
            placeA: null,
            placeB: null
        }
    },
    methods:{
        setA(place){
            this.placeA = place;
        },
        setB(place){
            this.placeB = place;
        },
        recommand(){
            if(this.placeA == null) return alert("A 장소를 입력하세요");
            if(this.placeB == null) return alert("B 장소를 입력하세요");
            this.eventBus.$emit('recommand', [this.placeA, this.placeB]);
        }
    },
    mounted(){
        this.eventBus.$on("setA", this.setA);
        this.eventBus.$on("setB", this.setB)
    }
}
</script>


<style>
.nav{
    background-color: white;
    border: 1px solid #eaeaea;
    width: 350px;
    text-align: left;
    display: flex;
}
.a, .b{
    border: 1px solid #eaeaea;
    padding: 15px;
    flex: 1;
}
.placekind{
    color: #5fc694;
}
.placename{
    vertical-align: top;
    width: 120px;
    height: 40px;
    color: black;
    float: right;
}
.btn {
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
</style>
