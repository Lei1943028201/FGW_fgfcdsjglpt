<template>
    <div id="AcZdxmXzChart" class="fd-xz-content-chart">
        <h2 class="fd-title-01">全市重点项目复工率趋势<button class="fd-btn fd-btn-export--chart">导出</button></h2>
        <CcEcharts :option="optionTop" class="fd-chart-top"/>
        <h2>X月X日各区复工率<button class="fd-btn fd-btn-export--chart">导出</button></h2>
        <CcEcharts :option="optionBottom" class="fd-chart-bottom"/>
    </div>
</template>

<script>
    /**
     * 重点项目下钻页面-图表
     */
    import echarts from 'echarts'
    import {mapState} from 'vuex'
    import {getFglqs, getMtfgl} from '../../api/ztqkxz'

    export default {
        name: "AcZdxmXzChart",
        data() {
            return {
                /* echarts数据 */
                resDataTop: {
                    gqDataList: [],
                    kglMin: 0,
                    rqArr: [],
                    legend: [],
                },
                resDataBottom: {
                    dqmcArr: [],
                    kglArr: [],
                    xmgsArr: [],
                    ykgsArr: [],
                },
            }
        },
        computed: {
            ...mapState(['params_zdxm']),
            /**
             * 全市chart配置
             ***/
            optionTop() {
                return {
                    legend: {
                        data: this.resDataTop.legend || [],
                        icon: 'roundRect',
                        itemHeight: 4,
                        y2: 30,
                        x: 'center',
                        textStyle: {
                            color: '#00b6ff',
                            fontSize: 15 * this.K
                        },
                    },
                    grid: {
                        x: 48,
                        y: 30,
                        x2: 0,
                        y2: 90,
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
                            interval: 0, //强制显示文字
                            rotate: 35,
                            textStyle: {
                                color: '#00b6ff',  //更改坐标轴文字颜色
                                fontSize: this.fontSize       //更改坐标轴文字大小
                            },
                        },
                    },
                    yAxis: {
                        type: 'value',
                        min: Math.floor(this.resDataTop.kglMin),
                        nameTextStyle: {
                            color: "#00b6ff",
                            fontSize: this.fontSize,
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
            seriesTop() {
                let {gqDataList} = this.resDataTop
                let colorList = ['#ffa50e', '#00ffff', '#8e40e7', '#32cd32', '#6495ed']
                return gqDataList.map((item, index) => {
                    return {
                        name: this.resDataTop.legend[index],
                        type: 'line',
                        smooth: true,
                        color: colorList[index % 5],
                        data: item.dqDataArr.map((value) => {
                            return value.fgl
                        })
                    }
                })
            },

            /**
             * 某天chart配置
             ***/
            optionBottom() {
                return {
                    legend: {
                        show: true,
                        x: 'center',
                        y2: 30,
                        textStyle: {
                            color: '#00b6ff',
                            fontSize: 15 * this.K
                        },
                    },
                    grid: {
                        x: 48,
                        x2: 0,
                        y: 30,
                        y2: 100
                    },
                    tooltip: {
                        show: true,
                    },
                    xAxis: {
                        type: 'category',
                        triggerEvent: true,
                        data: this.resDataBottom.dqmcArr || [],
                        axisLine: {
                            lineStyle: {
                                color: '#041f51'
                            }
                        },
                        axisLabel: {
                            interval: 0, //强制显示文字
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
                            fontSize: this.fontSize,
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
                            name: '项目个数',
                            type: 'bar',
                            barWidth: 10,//柱图宽度

                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                {
                                    offset: 0,
                                    color: '#0066ff'
                                },
                                {
                                    offset: 1,
                                    color: '#0af4ff'
                                }
                            ]),
                            itemStyle: {
                                barBorderRadius: [5, 5, 0, 0],
                            },
                            data: this.resDataBottom.xmgsArr || []
                        },
                        {
                            name: '已开工数',
                            type: 'bar',
                            barWidth: 10,//柱图宽度
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                {
                                    offset: 0,
                                    color: '#fd7d20'
                                },
                                {
                                    offset: 1,
                                    color: '#ffd65c'
                                }
                            ]),
                            itemStyle: {
                                barBorderRadius: [5, 5, 0, 0],
                            },
                            data: this.resDataBottom.ykgsArr || []
                        },
                        {
                            name: '开工率',
                            type: 'line',
                            color: '#fd7d20',
                            data: this.resDataBottom.kglArr || []
                        },
                    ]
                };
            },
            /* 第一个图表接口参数 */
            paramsTop() {
                return {
                    sjfw: this.params_zdxm.sjfw, //数据范围（1：包含节假日，2：不包含节假日）
                    ksrq: this.params_zdxm.ksrq,  // 开始日期(开始日期为空时，表示默认情况取近15天数据)
                    jzrq: this.params_zdxm.jzrq, // 截至日期(截至日期为空时，表示默认情况取近15天数据)
                    dq: this.params_zdxm.dq,     // 地区(数组)：全市，东城区,西城区等
                    jd: this.params_zdxm.jd, // 日期
                }
            },
            /* 第二个图表接口参数 */
            paramsBottom() {
                return {
                    rq: this.params_zdxm.rq, // 日期
                }
            }
        },
        methods: {
            init() {
                getFglqs(this.paramsTop)
                    .then(res => {
                        this.resDataTop = res.data
                    })
                getMtfgl(this.paramsBottom)
                    .then(res => {
                        this.resDataBottom = res.data
                    })

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