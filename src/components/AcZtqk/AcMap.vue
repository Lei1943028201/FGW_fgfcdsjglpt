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
                    <span class="fd-value-01">{{showMapData.qzbldw}}</span>
                    <span class="fd-unit">个</span>
                </p>
                <p><span class="fd-name">确诊病例单位</span></p>
            </div>
            <div class="fd-bottom">
                <p>
                    <span class="fd-value-01">{{showMapData.gtdw}}</span>
                    <span class="fd-unit">个</span>
                </p>
                <p><span class="fd-name">关停单位</span></p>
            </div>
        </div>
        <!-- 圆球--中 -->
        <div class="fd-ball fd-ball-2">
            <div class="fd-top">
                <p>
                    <span class="fd-value-01">{{showMapData.ljqz}}</span>
                    <span class="fd-unit">例</span>
                </p>
                <p><span class="fd-name">累计确诊</span></p>
            </div>
            <div class="fd-bottom">
                <p>
                    <span class="fd-value-01">{{showMapData.xyqz}}</span>
                    <span class="fd-unit">例</span>
                </p>
                <p><span class="fd-name">现有确诊</span></p>
            </div>
        </div>
        <!-- 圆球--右 -->
        <div class="fd-ball fd-ball-3">
            <div class="fd-top">
                <p>
                    <span class="fd-value-01">{{showMapData.fxdq}}</span>
                    <span class="fd-unit">个</span>
                </p>
                <p><span class="fd-name">风险地区</span></p>
            </div>
            <div class="fd-bottom">
                <p class="fd-high-risk">
                    <span class="fd-value-01">{{showMapData.gfxdq}}</span>
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
    import {mapState, mapGetters} from 'vuex'
    import {getFgfczsData} from '../../api/ztqk'
    /* 地图 */
    export default {
        name: "AcMap",
        components: {
            ChartMap
        },
        data() {
            return {
                qsfgfcData: {}
            }
        },
        computed: {
            ...mapState(['mapId']),
            ...mapGetters(['showMapData']),
        },
        methods: {
            init() {
                getFgfczsData().then(res => {
                    res.data.qsfgfcData.code = '1100000'
                    this.qsfgfcData = res.data.qsfgfcData
                    this.$store.dispatch('SetMapData', [
                        res.data.qsfgfcData,
                        ...res.data.gdqfgfcDataList,
                    ])
                })
            }
        },
        created() {
            setTimeout(()=>{this.init()}, 1000)
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