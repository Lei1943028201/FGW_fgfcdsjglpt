<template>
    <header>
        <ul class="left clear">
            <li class="fd-menu-item" v-for="item in menuLeft" :key="item.key"
                @click="clickMenu(item)"
                :class="{'active' : item.key === activeMenu}"><span>{{item.name}}</span></li>
        </ul>
        <span class="fd-header-text"></span>
        <ul class="right clear">
            <li class="fd-menu-item" v-for="item in menuRight" :key="item.key"
                @click="clickMenu(item)"
                :class="{'active' : item.key === activeMenu}"><span>{{item.name}}</span></li>
        </ul>
    </header>
</template>

<script>
    export default {
        name: "TheHeader",
        data() {
            return {
                activeMenu: 'ztqk',
                menuLeft: [
                    {
                        name: '首页',
                        key: 'sy',
                    },
                    {
                        name: '整体情况',
                        key: 'ztqk',
                    },
                    {
                        name: '区域分析',
                        key: 'qyfx',
                    },
                    {
                        name: '行业分析',
                        key: 'hyfx',
                    },
                ],
                menuRight: [
                    {
                        name: '专题深入',
                        key: 'ztsr',
                    },
                    {
                        name: '防疫情况',
                        key: 'fyqk',
                    },
                    {
                        name: '政务服务',
                        key: 'zwfw',
                    },
                    {
                        name: '资源服务',
                        key: 'zyfw',
                    },
                ],
            }
        },
        methods: {
            clickMenu(item){
                if(item.key === this.activeMenu){
                    return
                }
                this.activeMenu = item.key
            }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    header {
        box-sizing: border-box;
        padding: 32px 30px 0;
        width: 100%;
        height: 96px;
        font-size: 20px;
        background: url("../../../public/img/bg-header.png") no-repeat center/100% 100%;
        color: #fff;
        .left .fd-menu-item{
            background: url("../../../public/img/bg-menu-left.png") no-repeat center/100% 100%;
            &:hover {
                color: #f8c207;
                background: url("../../../public/img/bg-menu-left-active.png") no-repeat center/100% 100%;
            }
        }
        .right .fd-menu-item{
            background: url("../../../public/img/bg-menu-right.png") no-repeat center/100% 100%;
            &:hover {
                color: #f8c207;
                background: url("../../../public/img/bg-menu-right-active.png") no-repeat center/100% 100%;
            }
        }
        .fd-menu-item {
            float: left;
            width: 160px;
            height: 45px;
            font-size: 20px;
            text-align: center;
            line-height: 45px;
            color: #d6f0ff;
            margin-left: -15px;
            cursor: pointer;
            span{
                font-weight: bold;
            }

        }
        .left .active {
            color: #f8c207;
            background: url("../../../public/img/bg-menu-left-active.png") no-repeat center/100% 100%;
        }
        .right .active {
            color: #f8c207;
            background: url("../../../public/img/bg-menu-right-active.png") no-repeat center/100% 100%;
        }
        .fd-header-text {
            display: inline-block;
            position: absolute;
            top: 16px;
            left: 0;
            right: 0;
            margin: auto;
            width: 524px;
            height: 73px;
            background: url("../../../public/img/icon-header-text.png") no-repeat center/100% 100%;
        }
    }

</style>