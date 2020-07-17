<template>
    <div id="AcZdlyXzChart" class="fd-xz-content-chart">
        <h2 class="fd-title-01">各领域复工率趋势</h2>
        <CcEcharts :option="option" class="fd-chart-top"/>
        <h2>X月X日 各领域复工率</h2>
        <CcEcharts :option="option" class="fd-chart-bottom"/>
    </div>
</template>

<script>
    /**
     * 重点领域下钻页面-图表
     */
    import echarts from 'echarts'
    import {getGlyFglqs, getMtglyfgl} from '../../api/ztqkxz'
    export default {
        name: "AcZdlyXzChart",
        data() {
            return {
                resData: {},
                /* echarts数据 */
                gzlsqk: {},
            }
        },
        computed: {
            option() {
                let _this = this
                return {
                    legend: [
                        {
                            data: this.legend.filter(item => item.icon === 'roundRect'),
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
                    ],
                    grid: {
                        x: 48,
                        x2: 0,
                    },
                    tooltip: {
                        show: true,
                        formatter(params){
                            let index = params.dataIndex
                            return `企业总数:${_this.qyzsArr[index] + _this.fgzsArr[index]}万<br/>复工数:${_this.fgzsArr[index]}万<br/>复工率:${_this.fglArr[index]}%`
                        }
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: this.bmArr,
                            axisLine: {
                                lineStyle: {
                                    color: '#041f51'
                                }
                            },
                            axisLabel: {
                                interval:0, //强制显示文字
                                textStyle: {
                                    color: '#00b6ff',  //更改坐标轴文字颜色
                                    fontSize: this.fontSize       //更改坐标轴文字大小
                                },
                                formatter: function (value) {
                                    if(value === '商场（超市）'){
                                        return '商场\n（超市）'
                                    }
                                    if(value === '餐馆（食堂）'){
                                        return '餐馆\n（食堂）'

                                    }
                                    let ret = "";//拼接加\n返回的类目项
                                    let maxLength = 2;//每项显示文字个数
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

                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            min:0,
                            max: this.gzlsqk.fglMax || 100,
                            splitNumber : 2,
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
                                formatter: function (value) {
                                    return `${value}%`
                                }
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
                            min:0,
                            max: this.gzlsqk.qyzsMax || 100,
                            axisLine: {
                                show: false,
                            },
                            //设置网格线颜色
                            splitLine: {
                                show: false,
                            },
                            axisLabel: {
                                formatter: function () {
                                    return ''
                                }
                            },
                        },
                    ],
                    series: [
                        {
                            name: '企业总数',
                            type: 'bar',
                            yAxisIndex: 1,
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
                            data: this.qyzsArr
                        },
                        {
                            name: '复工数',
                            type: 'bar',
                            yAxisIndex: 1,
                            barWidth: 10,//柱图宽度
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                {
                                    offset: 1,
                                    color: '#fd7d20'
                                },
                                {
                                    offset: 0,
                                    color: '#ffd65c'
                                }
                            ]),
                            barGap: "-100%", /*这里设置包含关系*/
                            data: this.fgzsArr
                        },
                        {
                            name: '复工率',
                            type: 'line',
                            yAxisIndex: 0,
                            smooth: true,
                            color: '#10f680',
                            data: this.fglArr
                        },
                    ]
                };
            },
            /* 图例 */
            legend() {
                let {legend} = this.gzlsqk

                if(legend){
                    return legend.map(item=>{
                        return {
                            name: item,
                            icon: item === '复工率' ? 'rect': 'roundRect',
                        }
                    }) || []
                }
                return  []
            },
        },
        methods: {
            init() {
                getGlyFglqs()
                    .then(res => {
                        this.resData = res.data
                        this.gzlsqk = res.data.gzlsqk
                    })
                getMtglyfgl()
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