<template>
    <div id="Qsdb">
        <!-- 标题模块 -->
        <CcTitle title="趋势对比" :time="jzrq"/>

        <!-- 左侧Tab模块 -->
        <CcTab class="fd-tab-qsdb" :tab-list="tabList1" @handlerTab="handlerTab1"/>

        <!-- 右侧Tab模块-->
        <CcTabText class="fd-tab-qsdb--text" :tab-list="tabList2" @handlerTab="handlerTab2"/>

        <!-- echarts图--开始 -->
        <div class="fd-content-echarts">
            <CcEcharts :option="option"
                       @clickEcharts="clickEcharts"
                       @mouseoutEcharts="mouseoutEcharts"
                       @mousemoveEcharts="mousemoveEcharts"/>
            <!-- 弹层 -->
            <div :style="tooltipStyle" class="fd-tooltip-xAxis" ref="tooltipxAxis">{{tooltipxAxisData}}</div>
            <!-- echartsTooltip  -->
            <div class="fd-tooltip clear" ref="tooltip">
                <h2>趋势变化</h2>
                <div class="left">
                    <h3>各区</h3>
                    <table>
                        <thead>
                        <tr>
                            <td><span></span></td>
                            <td><span>{{activeTabName2==='日'? '今日': `本${activeTabName2}`}}</span></td>
                            <td><span>{{activeTabName2==='日'? '昨日': `上${activeTabName2}`}}</span></td>
                            <td><span>环比</span></td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in tooltipData.gdqfgfczs" :key="index">
                            <td><span>{{item.dqmc}}</span></td>
                            <td><span>{{item.fgfczs}}</span></td>
                            <td><span>{{item.zrfgfczs}}</span></td>
                            <td><span :class="classNameIsUp(item.zshb)">{{item.zshb | filterText}}%</span></td>
                        </tr>

                        </tbody>
                    </table>
                </div>
                <div class="right">
                    <h3>各行业</h3>
                    <table>
                        <thead>
                        <tr>
                            <td><span></span></td>
                            <td><span>{{activeTabName2==='日'? '今日' : `本${activeTabName2}`}}</span></td>
                            <td><span>{{activeTabName2==='日'? '昨日' : `上${activeTabName2}`}}</span></td>
                            <td><span>环比</span></td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in tooltipData.ghyfgfczs" :key="index">
                            <td><span>{{item.hymc}}</span></td>
                            <td><span>{{item.fgfczs}}</span></td>
                            <td><span>{{item.zrfgfczs}}</span></td>
                            <td><span :class="classNameIsUp(item.zshb)">{{item.zshb | filterText}}%</span></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- echarts图--结束 -->

    </div>
</template>

<script>
    import mixinZdlyxz from '../../mixins/mixin-zdlyxz'
    import {getQsdbData} from '../../api/ztqk'
    /* 趋势对比 */
    export default {
        name: "AcQsdb",
        mixins: [mixinZdlyxz],
        data() {
            return {
                activeTab1: '1', //
                activeTab2: '1', // 日月周
                activeTabName2: '日', // 日月周
                activeTabJjr: false, // 是否包含节假日
                tabList1: [
                    {
                        name: '复工复产情况',
                        code: '1'
                    },
                    {
                        name: '健康宝查询情况',
                        code: '2'
                    },
                    {
                        name: '12345诉求情况',
                        code: '3'
                    }
                ],
                tabList2: [
                    {
                        name: '日',
                        code: '1'
                    },
                    {
                        name: '周',
                        code: '3'
                    },
                    {
                        name: '月',
                        code: '2'
                    },
                    {
                        name: '不包含节假日',
                        type: 'other',
                        code: '4'
                    }
                ],
                resData: {},
                /* 国网北分复工复产指数数据 */
                gwbfDataList: [],
                /* 市经信局复工复产指数数据 */
                sjxjDataList: [],

                /* 复工复产累计确诊数数据 */
                fgfcLjqzsDataList: [],
                /* 健康宝累计确诊数数据 */
                jkbLjqzsDataList: [],
                /* 12345累计确诊数数据 */
                jsjbLjqzsDataList: [],

                /* 健康宝查询数数据 */
                cxsJkbDataList: [],
                /* 12345接诉即办查询数数据 */
                cxsJsjbDataList: [],

                /* 复工复产情况时间列表 */
                fgfcDateList: [],
                /* 健康宝时间列表 */
                jkbDateList: [],
                /* 12345时间列表 */
                jsjbDateList: [],
                tooltipStyle: '',
                clientWidth: 0,
                /* 鼠标移入图表中需要展示的数据 */
                hoverEChartsLine: {
                    name: '',
                    dataIndex: ''
                },
                /* 鼠标移入图表中需要展示的数据 */
                hoverEChartsXAxis: '',
            }
        },
        computed: {
            /* 国网北分数据 */
            gwbfData() {
                let data = this.gwbfDataList.map(item => {
                    return {
                        value: item.fgfczs,
                        ...item
                    }
                })
                return {
                    name: '国网北分复工复产指数',
                    type: 'line',
                    smooth: true,
                    color: '#ffa50e',
                    yAxisIndex: 0,
                    connectNulls: true,
                    data
                }
            },
            /* 市经信局数据 */
            sjxjData() {
                let data = this.sjxjDataList.map(item => {
                    return {
                        value: item.fgfczs,
                        ...item
                    }
                })
                return {
                    name: '市经信局复工复产指数',
                    type: 'line',
                    smooth: true,
                    color: '#00ffff',
                    yAxisIndex: 0,
                    connectNulls: true,
                    data
                }
            },
            /* 累计查询次数 */
            ljqzsData() {
                let data = this.jsjbLjqzsDataList.map(item => item)
                return {
                    name: '累计确诊数',
                    type: 'line',
                    smooth: true,
                    color: '#8e40e7',
                    yAxisIndex: 1,
                    connectNulls: true,
                    data
                }
            },
            /* 健康宝查询次数 */
            cxsJkbData() {
                let data = this.cxsJkbDataList.map(item => item)
                return {
                    name: '健康宝查询次数',
                    type: 'line',
                    smooth: true,
                    color: '#ffa50e',
                    yAxisIndex: 0,
                    connectNulls: true,
                    data
                }
            },
            /* 12345查询次数 */
            cxsJsjbData() {
                let data = this.cxsJsjbDataList.map(item => item)
                return {
                    name: '12345查询次数',
                    type: 'line',
                    smooth: true,
                    color: '#ffa50e',
                    yAxisIndex: 0,
                    data
                }
            },
            /* 图例数据 */
            legendData() {
                switch (this.activeTab1) {
                    case '1':
                        return ['国网北分复工复产指数', '市经信局复工复产指数', '累计确诊数']
                    case '2':
                        return ['健康宝查询次数', '累计确诊数']
                    case '3':
                        return ['12345查询次数', '累计确诊数']
                    default:
                        return []
                }
            },
            /* x轴数据 */
            xAxisData() {
                switch (this.activeTab1) {
                    case '1':
                        return this.fgfcDateList.map(item => {
                            return {
                                value: item.date,
                                ...item
                            }
                        })
                    case '2':
                        return this.jkbDateList.map(item => {
                            return {
                                value: item.date,
                                ...item
                            }
                        })
                    case '3':
                        return this.jsjbDateList.map(item => {
                            return {
                                value: item.date,
                                ...item
                            }
                        })
                    default:
                        return []
                }
            },
            seriesData() {
                switch (this.activeTab1) {
                    case '1':
                        return [
                            this.gwbfData,
                            this.sjxjData,
                            this.ljqzsData
                        ]
                    case '2':
                        return [
                            this.cxsJkbData,
                            this.ljqzsData
                        ]
                    case '3':
                        return [
                            this.cxsJsjbData,
                            this.ljqzsData
                        ]
                    default:
                        return []
                }
            },
            /* echarts配置 */
            option() {
                let rotate = this.activeTab2 === '2'? 30 : 0
                let minAndMax = {
                    min: 600,
                    max: 1200
                }
                let yAxisName = ''
                if (this.activeTab1 === '1') {
                    yAxisName = ''
                }
                if (this.activeTab1 === '2') {
                    yAxisName = '单位:万'
                }
                if (this.activeTab1 === '3') {
                    yAxisName = '单位:次'
                }
                return {
                    tooltip: {
                        show: true,
                    },
                    legend: {
                        data: this.legendData,
                        icon: 'roundRect',
                        itemHeight: 4,
                        y: 55 * this.K,
                        x: 'center',
                        textStyle: {
                            color: '#00b6ff',
                            fontSize: 15*this.K
                        },
                    },
                    grid: {
                        x: 58,
                        y: 90 * this.K,
                        x2: 55,
                        y2: 45
                    },
                    xAxis: [
                        {
                            type: 'category',
                            triggerEvent: true,
                            data: this.xAxisData,
                            axisLine: {
                                lineStyle: {
                                    color: '#041f51'
                                }
                            },
                            axisLabel: {
                                interval: 0, //强制显示文字
                                rotate: rotate,
                                rich: {
                                    white: {
                                        fontSize: 15*this.K,      //更改坐标轴文字大小
                                        color: "#00b6ff"
                                    },
                                    company: {
                                        fontSize: 15*this.K,      //更改坐标轴文字大小
                                        color: "#ff3a56"
                                    }
                                },
                                formatter: (value, index) => {
                                    let str
                                    /* 判断是否特殊数据 */
                                    if (this.activeTab1 === '1') {
                                        str = this.fgfcDateList[index].sftsrq ? 'company' : 'white'
                                    }
                                    if (this.activeTab1 === '2') {
                                        str = this.jkbDateList[index].sftsrq ? 'company' : 'white'
                                    }
                                    if (this.activeTab1 === '3') {
                                        str = this.jsjbDateList[index].sftsrq ? 'company' : 'white'
                                    }
                                    /* 判断是否错位展示 */
                                    /*if (this.clientWidth >= 1660 && this.activeTab2 === '1') {
                                        return `{${str}|${value}}`
                                    }
                                    if (index % 2 === 1) {
                                        return `{${str}|\n${value}}`
                                    }*/
                                    return `{${str}|${value}}`
                                }
                            },

                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                           /* min: 0,
                            max: 120,*/
                            name: yAxisName,
                            splitNumber: 4,
                            nameTextStyle: {
                                color: "#00b6ff",
                                fontSize: 15*this.K,
                                padding: [0, 0, 0, -60]
                            },
                            axisLine: {
                                show: false,
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#00b6ff',  //更改坐标轴文字颜色
                                    fontSize: 15*this.K  //更改坐标轴文字大小
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
                            ...minAndMax,
                            type: 'value',
                            splitNumber: 4,
                            axisLine: {
                                show: false,
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#00b6ff',  //更改坐标轴文字颜色
                                    fontSize: 15*this.K  //更改坐标轴文字大小
                                },
                            },
                            //设置网格线颜色
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: ['#0d2f58'],
                                }
                            }
                        },
                    ],
                    series: this.seriesData
                };
            },
            /* 截至日期 */
            jzrq() {
                switch (this.activeTab1) {
                    case '1' :
                        return this.resData.fgfcSjjzrq
                    case '2' :
                        return this.resData.jkbSjjzrq
                    case '3' :
                        return this.resData.jsjbSjjzrq
                    default :
                        return '--/--'
                }
            },

            /* 浮显框中展示的数据 */
            tooltipData() {
                let {name, dataIndex} = this.hoverEChartsLine
                if (name === '国网北分复工复产指数') {
                    return this.gwbfData.data[dataIndex]
                }
                if (name === '市经信局复工复产指数') {
                    return this.sjxjData.data[dataIndex]
                }
                return {
                    gdqfgfczs: [],
                    ghyfgfczs: [],
                }
            },
            tooltipxAxisData() {
                let str = ''
                this.xAxisData.map(item => {
                    if (item.value === this.hoverEChartsXAxis) {
                        str = item.tssj
                    }
                })
                return str
            }
        },
        methods: {
            handlerTab1(tab) {
                if (this.activeTab1 === tab.code) {
                    return
                }
                this.activeTab1 = tab.code
            },
            handlerTab2(tab) {
                if (this.activeTab2 === tab.code && tab.type !== 'other') {
                    return
                }
                if (tab.type === 'other') {
                    this.activeTabJjr = !this.activeTabJjr;
                } else {
                    this.activeTab2 = tab.code
                    this.activeTabName2 = tab.name
                }
                this.init()
            },
            clickEcharts(params) {
                if (params.componentType === 'xAxis') {
                    console.log(params.event.event, params.event.event.layerX)
                    this.tooltipStyle = `position: absolute; bottom: 50px;left: ${params.event.event.layerX}px;`
                }
            },
            /* 进入 */
            mousemoveEcharts(params) {
                let f = window.innerWidth/1920
                if (params.componentType === 'series') {
                    this.hoverEChartsLine.name = params.seriesName
                    this.hoverEChartsLine.dataIndex = params.dataIndex
                    if (params.seriesName === '国网北分复工复产指数' || params.seriesName === '市经信局复工复产指数') {
                        let $tooltip = this.$refs.tooltip.style
                        $tooltip.top = params.event.event.zrY - 150*f + 'px'
                        $tooltip.left = params.event.event.zrX - 350*f + 'px'
                        $tooltip.display = 'block'
                    }
                }
                if (params.componentType === 'xAxis') {
                    let text = params.event.target.style.text
                    if (text.indexOf('company') > -1) {
                        this.hoverEChartsXAxis = params.value
                        let $tooltip = this.$refs.tooltipxAxis.style
                        $tooltip.top = params.event.event.zrY - 30*f + 'px'
                        $tooltip.left = params.event.event.zrX - 90*f + 'px'
                        $tooltip.display = 'block'
                    }
                }

            },
            /* 离开 */
            mouseoutEcharts() {
                this.$refs.tooltip.style.display = 'none'
                this.$refs.tooltipxAxis.style.display = 'none'
            },
            init() {
                getQsdbData({sjfw: this.activeTab2, sfxsjjr: !this.activeTabJjr})
                    .then(res => {
                        this.resData = res.data

                        this.cxsJkbDataList = res.data.cxsJkbDataList
                        this.cxsJsjbDataList = res.data.cxsJsjbDataList

                        this.gwbfDataList = res.data.gwbfDataList
                        this.sjxjDataList = res.data.sjxjDataList

                        this.fgfcLjqzsDataList = res.data.fgfcLjqzsDataList
                        this.jkbLjqzsDataList = res.data.jkbLjqzsDataList
                        this.jsjbLjqzsDataList = res.data.jsjbLjqzsDataList


                        this.fgfcDateList = res.data.fgfcDateList
                        this.jkbDateList = res.data.jkbDateList
                        this.jsjbDateList = res.data.jsjbDateList
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
        created() {
            this.clientWidth = document.body.clientWidth
            window.addEventListener("resize", () => (this.clientWidth = document.body.clientWidth));
            this.init()
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    #Qsdb {
        position: relative;
        background: url("../../../public/img/bg-qsdb.png") repeat-x;
        padding: 0 20px;
    }

    .fd-tab-qsdb {
        position: absolute;
        top: 40px;
        z-index: 1;
    }

    .fd-tab-qsdb--text {
        position: absolute;
        top: 40px;
        right: 20px;
        z-index: 1;
    }

    .fd-content-echarts {
        width: 100%;
        height: 260px;
    }

    .fd-tooltip-xAxis {
        display: none;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        padding: 17px 0;
        width: 238px;
        height: 67px;
        background: url('../../../public/img/bg-01.png') no-repeat center/100%;
        font-size: 15px;
        text-align: center;
    }

    .fd-tooltip {
        display: none;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        padding: 10px 15px;
        width: 720px;
        height: 183px;
        font-size: 15px;
        background: rgba(0, 36, 86, 0.95);
        border: 1px solid #00a1e9;
        box-shadow: 0 0 13px #0072ff inset;
        z-index: 1;
        & > h2, h3 {
            font-size: 16px;
            text-align: center;
        }
        & > h2 {
            text-shadow: 0 0 7px #00b4ff;
        }
        h3 {
            margin-bottom: 5px;
            color: #208fff;
        }
        & > .left {
            width: 50%;
            height: 100%;
        }
        & > .right {
            width: 50%;
            height: 100%;
        }
        table {
            /*table-layout: fixed;*/
            width: 100%;
            text-align: right;
            span {
                display: inline-block;
                min-height: 24px;
                white-space: nowrap;
                line-height: 24px;
            }
            thead {
                color: #00eaff;
                tr, td {
                    background: #022d67;
                }
            }

        }
        .fd-text-up {
            color: #ff3a56;
            margin-right: 5px;
            &:before {
                content: '';
                display: inline-block;
                width: 9px;
                height: 13px;
                background: url("../../../public/img/icon-up.png") no-repeat center/100% 100%;
            }
        }
        .fd-text-down {
            color: #2ddf81;
            margin-right: 5px;
            &:before {
                content: '';
                display: inline-block;
                width: 9px;
                height: 13px;
                background: url("../../../public/img/icon-down.png") no-repeat center/100% 100%;
            }
        }

    }
</style>