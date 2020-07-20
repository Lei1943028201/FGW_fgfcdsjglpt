<template>
    <div id="AcMapXzChart" class="fd-xz-content-chart">
        <h2 class="fd-title-01">全市各区企业复工率趋势</h2>
        <CcEcharts :option="optionTop" class="fd-chart-top"/>
        <h2>X月X日 各区/重点企业/小微企业 复工率</h2>
        <CcEcharts :option="optionBottom" class="fd-chart-bottom"/>
    </div>
</template>

<script>
    /**
     * 地图下钻-图表
     */
    import echarts from 'echarts'
    import {mapState} from 'vuex'
    import { getGdqFgfczsqs, getGdqMtfgfczs, getGhyFgfczsqs, getGhyMtfgfczs} from '../../api/ztqkxz'
    export default {
        name: "AcMapXzChart",
        props:['dialogActiveTab'],
        data() {
            return {
                resDataTop: {},
                resDataBottom: {},
                /* echarts数据 */
                gzlsqk: {},
            }
        },
        computed: {
            ...mapState(['params_xz']),
            optionTop() {
                return {
                    legend:  {
                        data: this.legendTop.filter(item => item.icon === 'roundRect'),
                        icon: 'roundRect',
                        itemWidth: 14,
                        itemHeight: 14,
                        y: 20,
                        x2: 70,
                        textStyle: {
                            color: '#00b6ff',
                            fontSize: this.fontSize ,
                        },
                    },
                    grid: {
                        x: 48,
                        x2: 0,
                    },
                    tooltip: {
                        show: true,
                    },
                    xAxis: {
                        type: 'category',
                        triggerEvent: true,
                        data: this.resDataTop.rqArr || [],
                        axisLine: {
                            lineStyle: {
                                color: '#041f51'
                            }
                        },
                        axisLabel: {
                            interval:0, //强制显示文字
                            rotate: 35,
                            textStyle: {
                                color: '#00b6ff',  //更改坐标轴文字颜色
                                fontSize: this.fontSize       //更改坐标轴文字大小
                            },
                        },
                    },
                    yAxis: {
                        type: 'value',
                        nameTextStyle: {
                            color: "#00b6ff",
                            fontSize: this.fontSize ,
                            padding: [0, 0, 0, -60]
                        },
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#00b6ff',  //更改坐标轴文字颜色
                                fontSize: this.fontSize       //更改坐标轴文字大小
                            },
                        },
                        //设置网格线颜色
                        splitLine: {
                            lineStyle: {
                                color: ['#0d2f58'],
                            }
                        }
                    },
                    series: this.seriesTop
                };
            },
            /* 图例 */
            legendTop() {
                let {legend} = this.resDataTop
                if(legend){
                    return legend|| []
                }
                return  []
            },
            seriesTop(){
                let {gqDataList} = this.resDataTop
                let colorList = ['#ffa50e','#00ffff','#8e40e7','#32cd32','#6495ed']
                if(gqDataList){
                    return gqDataList.map((item, index)=>{
                        return {
                            name: '复工率',
                            type: 'line',
                            smooth: true,
                            color: colorList[index%5],
                            data: item.fgzsArr
                        }
                    })
                }else{
                    return []
                }
            },
            optionBottom() {
                return {
                    legend:  {
                        data: this.legendBottom.filter(item => item.icon === 'roundRect'),
                        icon: 'roundRect',
                        itemWidth: 14,
                        itemHeight: 14,
                        y: 20,
                        x2: 70,
                        textStyle: {
                            color: '#00b6ff',
                            fontSize: this.fontSize ,
                        },
                    },
                    grid: {
                        x: 48,
                        x2: 0,
                    },
                    tooltip: {
                        show: true,
                    },
                    xAxis: {
                        type: 'category',
                        triggerEvent: true,
                        data: this.resDataBottom.dqArr || [],
                        axisLine: {
                            lineStyle: {
                                color: '#041f51'
                            }
                        },
                        axisLabel: {
                            interval:0, //强制显示文字
                            rotate: 35,
                            textStyle: {
                                color: '#00b6ff',  //更改坐标轴文字颜色
                                fontSize: this.fontSize       //更改坐标轴文字大小
                            },
                        },
                    },
                    yAxis: {
                        type: 'value',
                        nameTextStyle: {
                            color: "#00b6ff",
                            fontSize: this.fontSize ,
                            padding: [0, 0, 0, -60]
                        },
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#00b6ff',  //更改坐标轴文字颜色
                                fontSize: this.fontSize       //更改坐标轴文字大小
                            },
                        },
                        //设置网格线颜色
                        splitLine: {
                            lineStyle: {
                                color: ['#0d2f58'],
                            }
                        }
                    },
                    series: [
                        {
                            name: '企业总数',
                            type: 'bar',
                            barWidth: 10,//柱图宽度
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                {
                                    offset: 1,
                                    color: '#0066ff'
                                },
                                {
                                    offset: 0,
                                    color: '#00f4ff'
                                }
                            ]),
                            barBorderRadius: [5,5,0,0],
                            data: this.resDataBottom.fgzsArr || []
                        },
                    ]
                };
            },
            /* 图例 */
            legendBottom() {
                let {legend} = this.resDataTop
                if(legend){
                    return legend|| []
                }
                return  []
            },
            /* 第一个图表接口参数 */
            paramsTop(){
                return {
                    sjly: this.dialogActiveTab, // 数据来源（1：国网北分，2：市经信局）（数据来源为市经信局时，企业类型传空数组）
                    sjfw: this.params_xz.sjfw, //数据范围（1：包含节假日，2：不包含节假日）
                    ksrq: this.params_xz.ksrq,  // 开始日期(开始日期为空时，表示默认情况取近15天数据)
                    jzrq: this.params_xz.jzrq, // 截至日期(截至日期为空时，表示默认情况取近15天数据)
                    qylx: this.params_xz.qylx, // 企业类型(数组)（企业，重点企业，小微企业）
                    dq: this.params_xz.dq,     // 地区(数组)：全市，东城区,西城区等
                    rq: this.params_xz.rq, // 日期
                }
            },
            /* 第二个图表接口参数 */
            paramsBottom(){
                return {
                    sjly: this.dialogActiveTab, // 数据来源（1：国网北分，2：市经信局）（数据来源为市经信局时，企业类型传空数组）
                    qylx: this.params_xz.mtqylx, // 企业类型(数组)（企业，重点企业，小微企业）
                    rq: this.params_xz.rq, // 日期
                }
            }
        },
        methods: {
            init() {
                if(this.dialogActiveTab === '1'){
                    getGdqFgfczsqs(this.paramsTop)
                        .then(res => {
                            this.resDataTop = res.data
                        })
                    getGdqMtfgfczs(this.paramsBottom)
                        .then(res => {
                            this.resDataBottom = res.data
                        })
                }else{
                    getGhyFgfczsqs(this.paramsTop)
                        .then(res => {
                            this.resDataTop = res.data
                        })
                    getGhyMtfgfczs(this.paramsBottom)
                        .then(res => {
                            this.resDataBottom = res.data
                        })
                }

            }
        },
        created() {
            this.init()
        }
    }

</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../../style/mixin-dialog";

</style>