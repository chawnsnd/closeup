<template>
    <div class="searchbar">
        <input v-model="keyword" @keyup.enter="onEnter" type="text" class="input" placeholder="장소 검색"/>
        <i class="fas fa-search" @click="onEnter"/>
    </div>
</template>

<script>
export default {
    props: ['person'],
    data() {
        return {
            keyword: "",
        }
    },
    methods: {
        onEnter() {
            this.eventBus.$emit('inputKeyword', this.keyword);
            this.suggestPlaces = [];
            this.idx = 0;
        }
    }
    
}
</script>

<style lang="scss" scoped>
.searchbar{
    background-color: white;
    width: 350px;
    height: 50px;
    border: 1px solid #eaeaea;
    line-height: 50px;
    .input{
        border: none;
        outline: none;
        width: 85%;
        height: 90%;
    }
    .fa-search:hover{
        cursor: pointer;
        font-size: 20px;
    }
}

</style>
