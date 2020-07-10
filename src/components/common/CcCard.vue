<template>
    <ul class="fd-content-card clear">
        <li v-for="item in dataList" :key="item.name">
            <p class="fd-text-1"><span>{{item.value | filterText}}</span>{{item.unit}}</p>
            <p class="fd-text-2">{{item.name}}</p>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "CcCard",
        props: {
            dataList: {
                default: ()=>([
                    {
                        name: '共计',
                        value: '--',
                        unit: '万户'
                    },
                    {
                        name: '复工数',
                        value: '--',
                        unit: '家'
                    },
                    {
                        name: '复工率',
                        value: '--',
                        unit: '%'
                    },
                ])
            }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .fd-content-card {
        width: 100%;
        & > li:nth-child(2) {
            position: relative;
            .fd-line {
                content: '';
                position: absolute;
                top: 10px;
                display: inline-block;
                width: 1PX;
                height: 35px;
                background: #093767;
            }
            &:after {
                .fd-line;
                left: 0;
            }
            &:before {
                .fd-line;
                right: 0;
            }
        }
        li {
            float: left;
            width: 33.33333%;
            text-align: center;
            font-size: 15px;
            .fd-text-1 {
                color: #00f0ff;
                span {
                    font-size: 26px;
                    font-weight: bold;
                }
            }
            .fd-text-2 {
                color: #c9e7ff;
            }
        }
    }
</style>