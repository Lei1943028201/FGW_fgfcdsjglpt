<template>
    <ul class="fd-content-top clear" ref="topBox">
        <li v-for="(item, index) in dataList"
            :key="'ListOne' + index"
            :class="className(index)"
        >
            <span class="fd-item-value1">{{index > 2 ? item.value1 : ''}}</span>
            <span class="fd-item-name">{{item.name}}</span>
            <span class="fd-item-value2">{{item.value2}}</span>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "CcTop",
        props: {
            dataList: {
                default: function () {
                    return [
                        {
                            name: '--区',
                            value1: '1',
                            value2: '--%',
                        },
                        {
                            name: '--区',
                            value1: '2',
                            value2: '--%',
                        },
                        {
                            name: '--区',
                            value1: '3',
                            value2: '--%',
                        }
                    ]
                }
            }
        },
        methods: {
            className(index) {
                if (index % 3 === 1) {
                    return 'fd-item-center'
                }
            },
        },
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .fd-content-top {
        margin-top: 12px;
        min-height: 30px;
        li {
            float: left;
            margin-bottom: 6px;
            width: calc(~'(100% - 20px)' / 3);
            background: #112248;
            border-radius: 10px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 15px;
            color: #9ccae6;
            .fd-item-value1 {
                display: inline-block;
                width: 18px;
                height: 30px;
                margin-right: 5px;
                color: #ffa963;
            }
            &:nth-child(1) .fd-item-value1 {
                background: url("../../../public/img/icon-medal-01.png") no-repeat center/14px 18px;
            }
            &:nth-child(2) .fd-item-value1 {
                background: url("../../../public/img/icon-medal-02.png") no-repeat center/14px 18px;
            }
            &:nth-child(3) .fd-item-value1 {
                background: url("../../../public/img/icon-medal-03.png") no-repeat center/14px 18px;
            }
            .fd-item-name {
                vertical-align: top;
                margin-right: 5px;
            }
            .fd-item-value2 {
                vertical-align: top;
            }
            @media screen and (max-width: 1440px) {
                .fd-item-value2 {
                    display: none;
                }
            }
        }
        .fd-item-center {
            margin: 0 10px;
        }
    }
</style>