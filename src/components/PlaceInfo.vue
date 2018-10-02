<template>
    <div class="place_info">
        {{place}}
    </div>
</template>

<script>
export default {
    props: ['place'],
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.place_info{
    background-color: white;
    width: 350px;
    height: 800px;

}
</style>
