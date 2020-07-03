<template>
    <div id="app">
        <TheHeader></TheHeader>
        <router-view></router-view>
        <TheFooter></TheFooter>
    </div>
</template>

<script>

</script>

<style lang="less" rel="stylesheet/less">
    @import './style/common.less';
    #app{
        background: url("../public/img/bg-main.png") no-repeat center/ 100% 100%;
    }
</style>
