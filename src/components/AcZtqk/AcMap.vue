<template>
    <div class="fd-content-map">
        <!-- 顶部数据展示--开始 -->
        <div class="fd-map-top">
            <div>
                <p>
                    <span class="fd-name">国网指数</span>
                    <span class="fd-value-01">{{qsfgfcData.gwbffgfczs }}</span>
                    <span class="fd-value-02" :class="classNameIsUp(qsfgfcData.gwbffgfczsbhz)">{{qsfgfcData.gwbffgfczsbhz | filterText}}</span>
                </p>
            </div>
            <div>
                <p>
                    <span class="fd-name">日报指数</span>
                    <span class="fd-value-04">{{qsfgfcData.sjxjfgfczs}}</span>
                    <span class="fd-value-02" :class="classNameIsUp(qsfgfcData.sjxjfgfczsbhz)">{{qsfgfcData.sjxjfgfczsbhz | filterText}}</span>
                </p>
            </div>
        </div>
        <!-- 顶部数据展示--结束 -->

        <!-- 地图 -->
        <div class="fd-box-map">
            <ChartMap ref="chartMap"/>
        </div>

        <!-- 三个圆球--开始 -->
        <!-- 圆球--左 -->
        <div class="fd-ball fd-ball-1">
            <div class="fd-top">
                <p>
                    <span class="fd-value-01">{{qsfgfcData.qzbldw}}</span>
                    <span class="fd-unit">个</span>
                </p>
                <p><span class="fd-name">确诊病例单位</span></p>
            </div>
            <div class="fd-bottom">
                <p>
                    <span class="fd-value-01">{{qsfgfcData.gtdw}}</span>
                    <span class="fd-unit">个</span>
                </p>
                <p><span class="fd-name">关停单位</span></p>
            </div>
        </div>
        <!-- 圆球--中 -->
        <div class="fd-ball fd-ball-2">
            <div class="fd-top">
                <p>
                    <span class="fd-value-01">{{qsfgfcData.ljqz}}</span>
                    <span class="fd-unit">例</span>
                </p>
                <p><span class="fd-name">累计确诊</span></p>
            </div>
            <div class="fd-bottom">
                <p>
                    <span class="fd-value-01">{{qsfgfcData.xyqz}}</span>
                    <span class="fd-unit">例</span>
                </p>
                <p><span class="fd-name">现有确诊</span></p>
            </div>
        </div>
        <!-- 圆球--右 -->
        <div class="fd-ball fd-ball-3">
            <div class="fd-top">
                <p>
                    <span class="fd-value-01">{{qsfgfcData.fxdq}}</span>
                    <span class="fd-unit">个</span>
                </p>
                <p><span class="fd-name">风险地区</span></p>
            </div>
            <div class="fd-bottom">
                <p class="fd-high-risk">
                    <span class="fd-value-01">{{qsfgfcData.gfxdq}}</span>
                    <span class="fd-unit">个</span>
                </p>
                <p><span class="fd-name">高风险地区</span></p>
            </div>
        </div>
        <!-- 三个圆球--结束 -->
    </div>
</template>

<script>
    import ChartMap from '../../components/common/map/index.vue';
    import {getFgfczsData} from '../../api/ztqk'
    /* 地图 */
    export default {
        name: "AcMap",
        components: {
            ChartMap
        },
        data() {
            return {
                mapData: [
                    {
                        "name": "平谷区",
                        "code": "93AAC59B7554B59A3322BCDDCCF51CA1",
                        "show": false,
                        "val": 960
                    },
                    {
                        "name": "通州区",
                        "code": "2B07A20D66C7E629DBBA5F139331F38E",
                        "show": false,
                        "val": 218
                    },
                    {
                        "name": "东城区",
                        "code": "FB16AD8BB2F6BECCDDF92888D5371309",
                        "show": false,
                        "val": 1630
                    },
                    {
                        "name": "海淀区",
                        "code": "ABDB2A04E44F24E246F4DCFCA99ECF24",
                        "show": false,
                        "val": 500
                    },
                    {
                        "name": "昌平区",
                        "code": "9CA37880978F0800E78273687B44EC82",
                        "show": false,
                        "val": 999
                    },
                    {
                        "name": "朝阳区",
                        "code": "3C5E6D7A07E15B4174A2289C414B3101",
                        "show": false,
                        "val": 800
                    },
                    {
                        "name": "顺义区",
                        "code": "D20F5773BC59754677A41C3BF7866B0F",
                        "show": false,
                        "val": 1730
                    },
                    {
                        "name": "房山区",
                        "code": "7334E39C7C8A8A402FBF1D3F08EABC21",
                        "show": true,
                        "val": 30
                    },
                    {
                        "name": "西城区",
                        "code": "251FFCA7F1CF44E7B5E2ABCB3CF504B9",
                        "show": true,
                        "val": 1920
                    },
                    {
                        "name": "丰台区",
                        "code": "A6B7B440D73F001BEF379579C986EB24",
                        "show": true,
                        "val": 280
                    },
                    {
                        "name": "大兴区",
                        "code": "FBBF6E15C8F4E2C5A33DDAAC0BBAD670",
                        "show": true,
                        "val": 1080
                    },
                    {
                        "name": "门头沟区",
                        "code": "2B526B513E748B3C5454E823771DA010",
                        "show": true,
                        "val": 1300
                    },
                    {
                        "name": "密云区",
                        "code": "DC4A0662C1DB18CAC86BC4E43FE17F19",
                        "show": true,
                        "val": 333
                    },
                    {
                        "name": "怀柔区",
                        "code": "C69FB3C138863680B2639791DD365FE0",
                        "show": true,
                        "val": 1536
                    },
                    {
                        "name": "延庆区",
                        "code": "B618ADA976669A3FFB4CF0BC308FE50D",
                        "show": true,
                        "val": 1632
                    },
                    {
                        "name": "石景山区",
                        "code": "156D2960DEA40E387F962ACE2E567635",
                        "show": true,
                        "val": 280
                    }
                ],
                /* 全市复工复产数据 */
                qsfgfcData: {},
                /* 各地区复工复产数据 */
                gdqfgfcDataList: [],
            }
        },
        methods: {
            init() {
                getFgfczsData().then(res => {
                    this.qsfgfcData = res.data.qsfgfcData
                    this.gdqfgfcDataList = res.data.gdqfgfcDataList
                    let mapData = this.gdqfgfcDataList.map(item=>({
                        name: item.dqmc,
                        val: item.gwbffgfczs,
                    }))
                    setTimeout(()=>{
                        this.$refs.chartMap.updateData(this.mapData);
                    }, 1000)
                })
            }
        },
        created() {
            this.init()
        }
    }

</script>

<style scoped lang="less" rel="stylesheet/less">
    .fd-content-map {
        position: relative;
        height: 620px;
        .fd-map-top {
            padding-top: 44px;
            text-align: center;
            & > div {
                display: inline-block;
                margin: 0 42px;
                height: 65px;
                background: url('../../../public/img/icon-rectangle.png') no-repeat 1px bottom/87px 10px;
                .fd-name {
                    font-size: 22px;
                    color: #d8f0ff;
                }
                .fd-value-01 {
                    margin: 0 10px;
                    font-size: 40px;
                    font-weight: bold;
                    color: #ffa40e;
                }
                .fd-value-02 {
                    font-size: 18px;
                    color: #ff3a56;
                }
                .fd-value-04 {
                    margin: 0 10px;
                    font-size: 40px;
                    font-weight: bold;
                    color: #00ffff;
                }
                .fd-text-up {
                    color: #ff3a56;
                    margin-right: 5px;
                    &:before {
                        content: '';
                        display: inline-block;
                        width: 16px;
                        height: 17px;
                        background: url("../../../public/img/icon-up.png") no-repeat center/100% 100%;
                    }
                }
                .fd-text-down {
                    color: #2ddf81;
                    margin-right: 5px;
                    &:before {
                        content: '';
                        display: inline-block;
                        width: 16px;
                        height: 17px;
                        background: url("../../../public/img/icon-down.png") no-repeat center/100% 100%;
                    }
                }
            }
        }
        .fd-box-map {
            height: calc(100% - 120px);
            background: url("../../../public/img/bg_map.png") no-repeat;
            background-size: 860px 320px;
            background-position: 40px 120px;
        }
    }

    .fd-ball {
        position: absolute;
        width: 154px;
        height: 154px;
        border-radius: 50%;
        background: url("../../../public/img/bg-ball.png") no-repeat center/100%;
        text-align: center;
        font-size: 16px;
        .fd-top {
            margin-top: 15px;
            color: #ffc600;
            .fd-name {
                color: #06d8ff;
            }
        }
        .fd-bottom {
            margin-top: 10px;
        }
        .fd-value-01 {
            font-size: 24px;
            font-weight: bold;

        }
        .fd-bottom {
            color: #fff;
            .fd-name {
                color: #06d8ff;
            }
        }
        .fd-value-01 {
            font-size: 24px;
            font-weight: bold;

        }
    }

    .fd-ball-1 {
        left: 100px;
        bottom: 50px;
        .fd-top {

        }
    }

    .fd-ball-2 {
        left: 370px;
        bottom: 15px;
    }

    .fd-ball-3 {
        left: 640px;
        bottom: 50px;
    }

    /* 高风险 */
    .fd-high-risk {
        color: #ff3c3c !important;
    }


</style>