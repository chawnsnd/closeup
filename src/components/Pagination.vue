<template>
  <div class="pagination container">
    <div class="seven prev" @click="prevPage">
      &lt;
    </div>
    <div class="seven" @click="setPage(page)" v-for="page in pages" :key="page" :class="{'active': page == curPage}">
      {{ validPage(page) ? page : ''}}
    </div>
    <div class="seven next" @click="nextPage">
      &gt;
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data() {
    return {
      curPage: 1
    }
  },
  props: ['maxPage'],
  methods: {
    setPage(page) {
      if(!this.validPage(page)) return;
      this.curPage = page;
      this.eventBus.$emit('changePage', page);
    },
    prevPage() {
      this.setPage(this.curPage - 1);
    },
    nextPage() {
      this.setPage(this.curPage + 1);
    },
    validPage(page) {
      if(page <= 0 || page > this.maxPage) return false;
      else return true;
    }
  },
  computed: {
    pages() {
      if(this.curPage <= 2) {
        return [1,2,3,4,5];
      } else if (this.curPage >= this.maxPage - 2) {
        return [this.maxPage-4, this.maxPage-3, this.maxPage-2, this.maxPage-1, this.maxPage];
      } else {
        return [this.curPage-2, this.curPage-1, this.curPage, this.curPage+1, this.curPage+2];
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination{
    text-align: center;
}
.pagination > *{
    display: inline-block;
    cursor: pointer;
}
.seven{
    border: 1px solid #eaeaea;
    font-weight: bold;
    margin: 0 5px 0 5px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
}
.active{
    background-color: #d31900;
    color: white;
}
</style>
