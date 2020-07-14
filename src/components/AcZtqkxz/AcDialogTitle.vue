<template>
    <div class="clear">
        <h1 class="left">国网北分复工监测情况(分区)</h1>
        <ul class="fd-content-tab left clear">
            <li v-for="index of 2"
                class="fd-tab-item left"
                :class="{'active': index === activeTab}"
                @click="handlerTab(index)"
                :key="index">{{index}}</li>
        </ul>
    </div>
</template>

<script>
    /**
     * 弹窗头部组件
     */
    export default {
        name: "AcDialogTitle",
        data() {
            return {
                activeTab: 1,
            }
        },
        computed: {

        },
        methods: {
            handlerTab(index){
                this.activeTab = index
                this.$emit('handlerShowType', index)
            }
        },
        created() {

        }
    }

</script>

<style scoped lang="less" rel="stylesheet/less">
.fd-content-tab{
    margin-left: 40px;
    .fd-tab-item{
        box-sizing: border-box;
        width: 55px;
        height: 30px;
        border-radius: 3px;
        text-align: center;
        line-height: 30px;
    }
    .active{
        border: 1px solid #155683;
    }
}

</style>