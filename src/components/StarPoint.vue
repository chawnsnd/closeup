<template>
    <transition name="starPoint" class="starPoint">
        <div class="modal" @keyup.esc="$emit('close')">
            <div class="modal_container">
                <div class="modal_header">
                    <img v-if="poi.image!=null" :src="poi.image" class="image"/>
                    <span class="modal_name">{{poi.name}}</span>
                    <span class="exit" @click="$emit('close')">X</span>
                </div>
                <div class="modal_content">
                    <div class="explanation">별점을 매겨주세요.</div>
                    <div class="starPoint">
                        <span v-if="!flag" v-for="point in 5" :key="point" @mouseover="starPoint = point" @mouseout="starPoint = 0" @click="submitPoint()">
                            <i class="fas fa-star" v-if="starPoint>=point"></i>
                            <i class="far fa-star" v-else></i>
                        </span>
                        <span v-if="flag" v-for="point in 5" :key="point">
                            <i class="fas fa-star" v-if="starPoint>=point"></i>
                            <i class="far fa-star" v-else></i>
                        </span>
                    </div>
                    <span v-if="flag" @click="flag = false" class="resubmit">다시매기기</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return{
            starPoint: 0,
            flag: false,
            id: "1000560146",
            poi: {
                image: ""
            }
        }
    },
    methods: {
        submitPoint(){
            this.flag = true;
        },
        selectPoiByDb(){
            var self = this;
            var socket = new WebSocket("ws://ec2-13-59-71-223.us-east-2.compute.amazonaws.com:49152/");
            socket.onopen = function(event) {
                socket.send(
                    JSON.stringify({
                        command: "query_poi",
                        id: self.id
                    })
                );
            };
            socket.onmessage = function(event) {
                var data = JSON.parse(event.data);
                if (data == null) console.log("통신실패");
                if (data.type == "query_poi") console.log(data.response);
                this.poi = data.response;
            }
        }
    },
    mounted(){
        this.selectPoiByDb();
        console.log("스타랭킹 모달 생성")
    }
}
</script>

<style lang="scss" scoped>
.modal {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
    .modal_container {
        display: table-cell;
        vertical-align: middle;
        .modal_header{
            position: relative;
            margin: 0px auto;
            width: 30%;
            color: white;
            background-color: white;
            height: 150px;
        }
        .modal_content {
            margin: 0px auto;
            width: 30%;
            padding: 20px 0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
            transition: all .3s ease;
            background-color: white;
        }
    }
}
.modal_name{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    font-size: 33px;
    font-weight: bold;
    padding: 10px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, .5);
    overflow: hidden; 
    text-overflow: ellipsis;
    white-space: nowrap; 
}
.image{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 150px;
}
.exit{
    top: 10px;
    right: 0;
    position: absolute;
    padding: 10px;
    float: right;
    margin-right: 10px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, .5);
}
.explanation{
    font-weight: bold;
    margin-bottom: 5px;
}
.starPoint{
    cursor: pointer;
    font-size: 30px;
    color: gold;
}
.resubmit{
    font-size: 12px;
    color: grey;
    cursor: pointer;
}
#focus{
  width: 0;
  height: 0;
  opacity: 0;
}
</style>
