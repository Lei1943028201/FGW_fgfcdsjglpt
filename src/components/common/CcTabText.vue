<template>
    <div class="fd-tab--text">
                <span v-for="item in tabList"
                      :key="item.code"
                      class="hand"
                      :class="{'active': item.code === activeTab || (item.type==='other' && activeTabOther)}"
                      @click="handlerTab(item)"
                >{{item.name}}</span>
    </div>
</template>

<script>
    export default {
        name: "CcTabText",
        data() {
            return {
                activeTab: this.tabList[0].code,
                activeTabOther: false
            }
        },
        props: {
            tabList: {
                default: () => ([
                    {
                        name: '第二产业',
                        code: '0'
                    },
                    {
                        name: '第三产业',
                        code: '1'
                    }
                ])
            }
        },
        methods: {
            /* 切换产业 */
            handlerTab(item) {
                if (item.type === 'other') {
                    this.activeTabOther = !this.activeTabOther;
                }else{
                    this.activeTab = item.code
                }
                this.$emit('handlerTab', item)
            },
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .fd-tab--text {
        margin: 15px 0;
        font-size: 15px;
        color: #036bc2;
        span {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            text-align: center;
            user-select: none;
        }
        & > .active {
            color: #208fff;
            font-weight: bold;
        }
        & > span:not(:last-child):after {
            content: '|';
            float: right;
            margin: 0 10px;
            color: #09396c;
        }
    }
</style>