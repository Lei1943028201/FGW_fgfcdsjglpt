<template>
    <div id="AcGdqyXzChart" class="fd-xz-content-chart">
        <h2 class="fd-title-01">全市各{{this.dialogActiveTab === '1'? '区': '行业'}}企业复工率趋势</h2>
        <CcEcharts :option="optionTop" class="fd-chart-top"/>
        <h2>X月X日 各{{this.dialogActiveTab === '1'? '区': '行业'}}/重点企业/小微企业 复工率</h2>
        <CcEcharts :option="optionBottom" class="fd-chart-bottom"/>
    </div>
</template>

<script>
    /**
     * 国电企业下钻页面-图表
     */
    import echarts from 'echarts'
    import {mapState} from 'vuex'
    import {getGdqFglqs, getGdqMtfglqs, getGhyFglqs, getGhyMtfglqs} from '../../api/ztqkxz'
    export default {
        name: "AcGdqyXzChart",
        props: ['dialogActiveTab'],
        data() {
            return {
                /* echarts数据 */
                resDataTop: {
                    gdDataList: [],
                    fglMin: 0,
                    rqArr: [],
                    legend: [],
                },
                resDataBottom: {
                    dqArr: [],
                    fglArr: [],
                    qyfgsArr: [],
                    qyzsArr: [],
                },
            }
        },
        computed: {
            ...mapState(['params_gdqy']),
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
                        min: Math.floor(this.resDataTop.fglMin),
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
                let {gdDataList} = this.resDataTop
                let colorList = ['#ffa50e', '#00ffff', '#8e40e7', '#32cd32', '#6495ed']
                return gdDataList.map((item, index) => {
                    return {
                        name: item.lxmc,
                        type: 'line',
                        smooth: true,
                        color: colorList[index % 5],
                        data: item.qyfgl
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
                        x2: 50,
                        y: 30,
                        y2: 100
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
                            interval: 0, //强制显示文字
                            textStyle: {
                                color: '#00b6ff',  //更改坐标轴文字颜色
                                fontSize: this.fontSize       //更改坐标轴文字大小
                            },
                            formatter: function (value) {
                                let ret = "";//拼接加\n返回的类目项
                                let maxLength = 5;//每项显示文字个数
                                let valLength = value.length;//X轴类目项的文字个数
                                let rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                                if (rowN > 1) {
                                    for (let i = 0; i < rowN; i++) {
                                        let temp = "";//每次截取的字符串
                                        let start = i * maxLength;//开始截取的位置
                                        let end = start + maxLength;//结束截取的位置
                                        temp = value.substring(start, end) + "\n";
                                        ret += temp; //凭借最终的字符串
                                    }
                                    return ret;
                                }
                                else {
                                    return value;
                                }
                            }
                        },
                    },
                    yAxis: [
                        {
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
                        {
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
                                show: false,
                                lineStyle: {
                                    color: ['#0d2f58'],
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            yAxisIndex: 0,
                            name: '当日复工率',
                            type: 'line',
                            color: '#fd7d20',
                            data: this.resDataBottom.fglArr || []
                        },
                        {
                            yAxisIndex: 1,
                            name: '企业总数',
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
                            data: this.resDataBottom.qyzsArr || []
                        },
                        {
                            yAxisIndex: 1,
                            name: '复工企业数',
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
                            data: this.resDataBottom.qyfgsArr || []
                        },

                    ]
                };
            },
            /* 第一个图表接口参数 */
            paramsTop() {
                return {
                    sjfw: this.params_gdqy.sjfw, //数据范围（1：包含节假日，2：不包含节假日）
                    ksrq: this.params_gdqy.ksrq,  // 开始日期(开始日期为空时，表示默认情况取近15天数据)
                    jzrq: this.params_gdqy.jzrq, // 截至日期(截至日期为空时，表示默认情况取近15天数据)
                    dq: this.params_gdqy.dq,     // 地区(数组)：全市，东城区,西城区等
                    qylx: this.params_gdqy.qylx, // 企业类型(数组)：全部企业，重点企业，小微企业
                }
            },
            /* 第二个图表接口参数 */
            paramsBottom() {
                return {
                    rq: this.params_gdqy.rq, // 日期
                    qylx: this.params_gdqy.qylx, // 企业类型(数组)：全部企业，重点企业，小微企业
                }
            }
        },
        methods: {
            init(){
                this.$nextTick(()=>{
                    /* 1: 地区 2：行业 */
                    if(this.dialogActiveTab === '1'){
                        getGdqFglqs(this.paramsTop)
                            .then(res => {
                                this.resDataTop = res.data
                            })
                        getGdqMtfglqs(this.paramsBottom)
                            .then(res => {
                                this.resDataBottom = res.data
                            })
                    }else{
                        getGhyFglqs(this.paramsTop)
                            .then(res => {
                                this.resDataTop = res.data
                            })
                        getGhyMtfglqs(this.paramsBottom)
                            .then(res => {
                                this.resDataBottom = res.data
                            })
                    }
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