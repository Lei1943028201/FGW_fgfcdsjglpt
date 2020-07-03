<template>
    <div class="fd-tab">
                <span v-for="item in tabList"
                      :key="item.code"
                      class="hand"
                      :class="{'active': item.code === activeTab}"
                      @click="handlerTab(item)"
                >{{item.name}}</span>
    </div>
</template>

<script>
    export default {
        name: "CcTab",
        data() {
            return {
                activeTab: this.tabList[0].code
            }
        },
        props: {
            tabList: {
                default: () => ([
                    {
                        name: '复工',
                        code: '1'
                    },
                    {
                        name: '复产',
                        code: '2'
                    }
                ]),
            }
        },
        methods: {
            handlerTab(item) {
                this.activeTab = item.code
                this.$emit('handlerTab', item)
            },
        },
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .fd-tab {
        display: inline-block;
        margin: 15px 0;
        background: #112550;
        font-size: 16px;
        border-radius: 7px;
        color: #036bc2;
        span {
            box-sizing: border-box;
            display: inline-block;
            padding: 0 20px;
            min-width: 85px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 7px;
        }
        & > .active {
            color: #fff;
            background: #0397f1;
        }
    }
</style>