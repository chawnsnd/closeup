<template>
    <div class="main">
        <search-bar />
        <div id="map_div" class="map">
        </div>        
    </div>
</template>

<script>
import SearchBar from './SearchBar'

export default {
    data() {
        return{
            map: null
        }
    },
    components: {
        'search-bar': SearchBar
    },
    methods: {
        initTmap(){
            var map = new Tmap.Map({
                div:'map_div',
                width : window.innerWidth,
                height : window.innerHeight,
            });
            map.setCenter(new Tmap.LonLat("126.986072", "37.570028").transform("EPSG:4326", "EPSG:3857"), 15);
            this.map = map;
        } 
    },
    mounted(){
        this.initTmap();
    }
}
</script>

<style lang="scss" scoped>
.main{
    position: relative;
    .search_nav{
        position: absolute;
        margin: 10px 0 0 10px;
    }
    .map{
        position: absolute;
        z-index: -100;
    }
}
</style>