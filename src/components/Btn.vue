<template>
    <div class="btn">{{message}}</div>
</template>

<script>
export default {
    props: ["message"]
}
</script>

<style lang="scss" scoped>
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
