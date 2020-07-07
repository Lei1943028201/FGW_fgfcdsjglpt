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
    import {mapState, mapGetters} from 'vuex'
    export default {
        name: 'appCommonDataMap',
        data() {
            return {
                //map数据
                mapDataJia: {
                    "110101": {"dqbm": "110101", "dqmc": "东城区", "bqxfsljs": 0, "zbwxfsljs": 0},
                    "110102": {"dqbm": "110102", "dqmc": "西城区", "bqxfsljs": 0, "zbwxfsljs": 0},
                    "110105": {"dqbm": "110105", "dqmc": "朝阳区", "bqxfsljs": 0, "zbwxfsljs": 0},
                    "110106": {"dqbm": "110106", "dqmc": "丰台区", "bqxfsljs": 0, "zbwxfsljs": 0},
                    "110107": {"dqbm": "110107", "dqmc": "石景山区", "bqxfsljs": 0, "zbwxfsljs": 0},
                    "110108": {"dqbm": "110108", "dqmc": "海淀区", "bqxfsljs": 0, "zbwxfsljs": 0},
                    "110109": {"dqbm": "110109", "dqmc": "门头沟区", "bqxfsljs": 0, "zbwxfsljs": 0},
                    "110111": {"dqbm": "110111", "dqmc": "房山区", "bqxfsljs": 0, "zbwxfsljs": 0},
                    "110112": {"dqbm": "110112", "dqmc": "通州区", "bqxfsljs": 0, "zbwxfsljs": 0},
                    "110113": {"dqbm": "110113", "dqmc": "顺义区", "bqxfsljs": 0, "zbwxfsljs": 0},
                    "110114": {"dqbm": "110114", "dqmc": "昌平区", "bqxfsljs": 0, "zbwxfsljs": 0},
                    "110115": {"dqbm": "110115", "dqmc": "大兴区", "bqxfsljs": 0, "zbwxfsljs": 0},
                    "110116": {"dqbm": "110116", "dqmc": "怀柔区", "bqxfsljs": 0, "zbwxfsljs": 0},
                    "110117": {"dqbm": "110117", "dqmc": "平谷区", "bqxfsljs": 0, "zbwxfsljs": 0},
                    "110228": {"dqbm": "110228", "dqmc": "密云区", "bqxfsljs": 0, "zbwxfsljs": 0},
                    "110229": {"dqbm": "110229", "dqmc": "延庆区", "bqxfsljs": 0, "zbwxfsljs": 0}
                },
            };
        },
        computed: {
            ...mapState(['mapData']),
            ...mapGetters(['showMapData']),
        },
        watch: {
            mapData(newData){
                newData.map((item)=>{
                    if(item.code === '1100000'){
                        return
                    }
                    this.mapDataJia[item.code].dqbm = item.code
                    this.mapDataJia[item.code].dqmc = item.dqmc
                    this.mapDataJia[item.code].bqxfsljs = item.gwbffgfczs
                    this.mapDataJia[item.code].zbwxfsljs = item.sjxjfgfczs
                })
                this.upDataMap()
            }
        },
        methods: {
            //地图渲染更新方法
            upDataMap: function () {
                // debugger
                var _this = this;
                _this.map = operateMap.init(_this.$refs.jsMapArea);
                // debugger
                _this.map.setOption({
                    data: _this.mapDataJia, //地图数据
                    flagNew: 1,
                    qpData: _this.mapDataJia,//气泡数据
                    requestBjs: true,
                    requestQy: '',
                    svgUrl: 'map-1100000',
                    mapidJxzPrefix: '',
                    hoverCallback: function (_mapId) {
                        _this.$store.dispatch('SetMapId', _mapId)
                    },
                });
            },
        },
        // 初始化后
        mounted() {
            this.upDataMap();
        }
    };

</script>
<!--样式表-->
<style lang="less">
    @import "./index.less";
</style>

