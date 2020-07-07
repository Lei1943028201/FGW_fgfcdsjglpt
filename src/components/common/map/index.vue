<template>
    <div class="fd-map" id="jsMap">
        <div class="fd-bar-map-wrapper">
            <div class="fd-tooltip">
                <p class="fd-name">{{showMapData.dqmc}}</p>
                <p>国网北分：<span class="fd-value-01">{{showMapData.gwbffgfczs}}</span></p>
                <p>市经信局：<span class="fd-value-02">{{showMapData.sjxjfgfczs}}</span></p>
                <p>确诊人数：<span class="fd-value-03">{{showMapData.xyqz}}</span>人</p>
            </div>
            <!-- 地图绘制容器 -->
            <div class="fd-bar-map-render-wrapper" ref="jsMapArea" id="jsMapArea"></div>
        </div>
    </div>
</template>
<!--js-->
<script>
    import operateMap from './extend/operateMap'
    import {mapGetters} from 'vuex'
    export default {
        name: 'appCommonDataMap',
        data() {
            return {
                //map数据
                mapDataJia: {
                    sja_data: {
                        110101: {
                            sas: 410,
                            jas: 883
                        },
                        110102: {
                            sas: 420,
                            jas: 883
                        },
                        110105: {
                            sas: 700,
                            jas: 883
                        },
                        110106: {
                            sas: 430,
                            jas: 883
                        },
                        110107: {
                            sas: 440,
                            jas: 883
                        },
                        110108: {
                            sas: 450,
                            jas: 883
                        },
                        110109: {
                            sas: 460,
                            jas: 883
                        },
                        110111: {
                            sas: 470,
                            jas: 883
                        },
                        110112: {
                            sas: 480,
                            jas: 883
                        },
                        110113: {
                            sas: 490,
                            jas: 883
                        },
                        110114: {
                            sas: 500,
                            jas: 883
                        },
                        110115: {
                            sas: 510,
                            jas: 883
                        },
                        110116: {
                            sas: 530,
                            jas: 883
                        },
                        110117: {
                            sas: 520,
                            jas: 883
                        },
                        110228: {
                            sas: 480,
                            jas: 883
                        },
                        110229: {
                            sas: 650,
                            jas: 883
                        }
                    }
                },
                //选中的地区
                chooseArea: {key: "110000", value: "北京全市"}
            };
        },
        computed: {
            ...mapGetters(['showMapData']),
        },
        methods: {
            //获取地图数据
            init() {
                this.mapDataJia.sja_data = {
                    "110101": {"dqbm": "110101", "dqmc": "东城区", "bqxfsljs": 1000, "zbwxfsljs": 400},
                    "110102": {"dqbm": "110102", "dqmc": "西城区", "bqxfsljs": 100, "zbwxfsljs": 70},
                    "110105": {"dqbm": "110105", "dqmc": "朝阳区", "bqxfsljs": 500, "zbwxfsljs": 700},
                    "110106": {"dqbm": "110106", "dqmc": "丰台区", "bqxfsljs": 500, "zbwxfsljs": 700},
                    "110107": {"dqbm": "110107", "dqmc": "石景山区", "bqxfsljs": 500, "zbwxfsljs": 700},
                    "110108": {"dqbm": "110108", "dqmc": "海淀区", "bqxfsljs": 500, "zbwxfsljs": 700},
                    "110109": {"dqbm": "110109", "dqmc": "门头沟区", "bqxfsljs": 500, "zbwxfsljs": 700},
                    "110111": {"dqbm": "110111", "dqmc": "房山区", "bqxfsljs": 500, "zbwxfsljs": 700},
                    "110112": {"dqbm": "110112", "dqmc": "通州区", "bqxfsljs": 500, "zbwxfsljs": 700},
                    "110113": {"dqbm": "110113", "dqmc": "顺义区", "bqxfsljs": 500, "zbwxfsljs": 700},
                    "110114": {"dqbm": "110114", "dqmc": "昌平区", "bqxfsljs": 500, "zbwxfsljs": 700},
                    "110115": {"dqbm": "110115", "dqmc": "大兴区", "bqxfsljs": 500, "zbwxfsljs": 700},
                    "110116": {"dqbm": "110116", "dqmc": "怀柔区", "bqxfsljs": 500, "zbwxfsljs": 700},
                    "110117": {"dqbm": "110117", "dqmc": "平谷区", "bqxfsljs": 500, "zbwxfsljs": 700},
                    "110228": {"dqbm": "110228", "dqmc": "密云区", "bqxfsljs": 500, "zbwxfsljs": 700},
                    "110229": {"dqbm": "110229", "dqmc": "延庆区", "bqxfsljs": 500, "zbwxfsljs": 700}
                }
                this.updataMap();
            },
            //地图渲染更新方法
            updataMap: function () {
                // debugger
                var _this = this;
                _this.map = operateMap.init(_this.$refs.jsMapArea);
                // debugger
                _this.map.setOption({
                    data: _this.mapDataJia.sja_data, //地图数据
                    flagNew: 1,
                    qpData: _this.mapDataJia.sja_data,//气泡数据
                    requestBjs: true,
                    requestQy: '',
                    svgUrl: 'map-1100000',
                    mapidJxzPrefix: '',
                    clickCallback: function (name, value) {
                        //点击更新数据
                        _this.chooseArea = {
                            key: value,
                            value: name
                        }
                        _this.init();
                    },
                    hoverCallback: function (_mapId) {
                        _this.$store.dispatch('SetMapId', _mapId)
                    },
                });
                // debugger
                _this.$nextTick(function () {
                    setTimeout(function () {
                        _this.map.triggerClick(_this.chooseArea)
                    }, 300)
                })
            },
        },
        // 初始化后
        mounted() {
            this.init();
        }
    };

</script>
<!--样式表-->
<style lang="less">
    @import "./index.less";
</style>

