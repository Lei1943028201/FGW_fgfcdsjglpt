<template>
    <div class="fd-box-title clear"
         :class="className"
         ref="theTitle">
        <h2 class="left">{{title}}</h2>
        <span class="fd-box-title-time right">{{label}}：{{time}}</span>
    </div>
</template>

<script>
    export default {
        name: "CcTitle",
        data() {
            return {
                domWidth: 0,
            }
        },
        props: {
            title: {
                default: ''
            },
            label: {
                default: '数据截至日期'
            },
            time: {
                default: '--/--'
            }
        },
        computed: {
            className() {
                return this.domWidth < 500 ? 'fd-box-title-01' : 'fd-box-title-02'
            }
        },
        mounted() {
            this.domWidth = this.$refs.theTitle.clientWidth
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .fd-box-title {
        h2 {
            height: 48px;
            font-size: 20px;
            line-height: 48px;
            color: #fff;
            text-shadow: 0 0 7px #00b4ff;
        }
        .fd-box-title-time {
            margin-top: 15px;
            font-size: 15px;
            color: #00b6ff;
        }
    }

    .fd-box-title-01 {
        background: url('../../../public/img/bg-title-01.png') no-repeat left bottom/326px 26px;
    }

    .fd-box-title-02 {
        background: url('../../../public/img/bg-title-02.png') no-repeat left bottom/778px 26px;
    }
</style>