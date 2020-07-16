<template>
    <div class="clear">
        <h1 class="left fd-title" :class="titleName">{{title.name}}</h1>
        <ul class="fd-content-tab left clear">
            <li v-for="index of 2"
                class="fd-tab-item left"
                :class="{'active': index === activeTab}"
                @click="handlerTab(index)"
                :key="index">
            </li>
        </ul>
    </div>
</template>

<script>
    /**
     * 弹窗头部组件
     */
    export default {
        name: "AcDialogTitle",
        props: ['title'],
        data() {
            return {
                activeTab: 1,
            }
        },
        computed: {
            titleName(){
                return `fd-title-${this.title.code}`
            }
        },
        methods: {
            handlerTab(index) {
                this.activeTab = index
                this.$emit('handlerShowType', index)
            }
        },
        created() {

        }
    }

</script>

<style scoped lang="less" rel="stylesheet/less">
    .fd-title{
        color: rgba(0,0,0,0);
    }
    .fd-title-gdqy{
        background: url("../../../public/img/icon-text-gdqy.png") -5px center/100% no-repeat
    }
    .fd-title-map_gw{
        background: url("../../../public/img/icon-text-map_gw.png") -5px center/100% no-repeat
    }
    .fd-title-map_rb{
        background: url("../../../public/img/icon-text-map_rb.png") -5px center/100% no-repeat
    }
    .fd-title-zdly{
        background: url("../../../public/img/icon-text-zdly.png") -5px center/100% no-repeat
    }
    .fd-title-zdxm{
        background: url("../../../public/img/icon-text-zdxm.png") -5px center/100% no-repeat
    }
    .fd-content-tab {
        margin-left: 40px;
        .fd-tab-item {
            box-sizing: border-box;
            width: 55px;
            height: 30px;
            border-radius: 3px;
            text-align: center;
            line-height: 30px;
        }
        .fd-tab-item:nth-child(1) {
            background: url('../../../public/img/icon-chart.png') no-repeat;
            background-size: 34px 69px;
            background-position: 10px -3px;

        }
        .fd-tab-item:nth-child(2) {
            background: url('../../../public/img/icon-table.png') no-repeat;
            background-size: 34px 69px;
            background-position: 10px -1px;
        }
        & > .active {
            border: 1px solid #155683;
            background-position: 10px -42px !important;
        }
    }

</style>