<template>
    <div id="Qsdb">
        <!-- 标题模块 -->
        <CcTitle title="趋势对比" :time="jzrq"></CcTitle>

        <!-- 左侧Tab模块 -->
        <CcTab class="fd-tab-qsdb" :tab-list="tabList1" @handlerTab="handlerTab1"></CcTab>

        <!-- 右侧Tab模块-->
        <CcTabText class="fd-tab-qsdb--text" :tab-list="tabList2" @handlerTab="handlerTab2"></CcTabText>

        <!-- echarts图--开始 -->
        <div class="fd-content-echarts">
            <CcEcharts :option="option" @clickEcharts="clickEcharts"></CcEcharts>
            <!-- 弹层 -->
            <div :style="tooltipStyle" class="fd-tooltip-xAxis">北京调至二级响应</div>
        </div>
        <!-- echarts图--结束 -->
    </div>
</template>

<script>
    import {getQsdbData} from '../../api/ztqk'
    /* 趋势对比 */
    export default {
        name: "AcQsdb",
        data() {
            return {
                activeTab1: '1', //
                activeTab2: '1', // 日月周
                activeTabJjr: false, // 是否包含节假日
                tabList1: [
                    {
                        name: '复工复产情况',
                        code: '1'
                    },
                    {
                        name: '健康宝查询趋势',
                        code: '2'
                    },
                    {
                        name: '12345查询趋势',
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
                /* 累计确诊数数据 */
                ljqzsDataList: [],
                /* 健康宝查询数数据 */
                cxsJkbDataList: [],
                /* 12345接诉即办查询数数据 */
                cxsJsjbDataList: [],
                /* 时间轴 */
                dateList: [],
                tooltipStyle: '',
                clientWidth: 0
            }
        },
        computed: {
            gwbfData() {
                let data = this.gwbfDataList.map(item => item.fgfczs)
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
            sjxjData() {
                let data = this.sjxjDataList.map(item => item.fgfczs)
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
            ljqzsData() {
                let data = this.ljqzsDataList.map(item => item)
                return {
                    name: '累计查询次数',
                    type: 'line',
                    smooth: true,
                    color: '#8e40e7',
                    yAxisIndex: 1,
                    connectNulls: true,
                    data
                }
            },
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
            legendData() {
                switch (this.activeTab1) {
                    case '1':
                        return ['国网北分复工复产指数', '市经信局复工复产指数', '累计查询次数']
                    case '2':
                        return ['健康宝查询次数', '累计查询次数']
                    case '3':
                        return ['12345查询次数', '累计查询次数']
                    default:
                        return []
                }
            },
            xAxisData() {
                return this.dateList.map(item => item.date)
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
            option() {
                return {
                    legend: {
                        data: this.legendData,
                        icon: 'roundRect',
                        itemHeight: 4,
                        y: 45,
                        x: 'center',
                        textStyle: {
                            color: '#00b6ff',
                            fontSize: 15
                        },
                    },
                    grid: {
                        x: 58,
                        y: 80,
                        x2: 34,
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
                                interval:0, //强制显示文字
                                rich: {
                                    white: {
                                        fontSize: 15,      //更改坐标轴文字大小
                                        color: "#00b6ff"
                                    },
                                    company: {
                                        fontSize: 15,      //更改坐标轴文字大小
                                        color: "#ff3a56"
                                    }
                                },
                                formatter: (value, index) => {
                                    let str = this.dateList[index].sfjjr ? 'company': 'white'
                                    if(this.clientWidth>=1660){
                                        return `{${str}|${value}}`
                                    }
                                    if(index%2 === 1){
                                        return `{${str}|\n${value}}`
                                    }
                                    return `{${str}|${value}}`
                                }
                            },

                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLine: {
                                show: false,
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#00b6ff',  //更改坐标轴文字颜色
                                    fontSize: 15      //更改坐标轴文字大小
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
                            axisLine: {
                                show: false,
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#00b6ff',  //更改坐标轴文字颜色
                                    fontSize: 15      //更改坐标轴文字大小
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
                return this.resData.sjjzrq
            },
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
                }
                this.init()
            },
            clickEcharts(params){
                if(params.componentType === 'xAxis'){
                    console.log(params.event.event,params.event.event.layerX)
                    this.tooltipStyle = `position: absolute; bottom: 50px;left: ${params.event.event.layerX}px;`
                }
            },

            init() {
                getQsdbData({sjfw: this.activeTab, sfxsjjr: this.activeTabJjr})
                    .then(res => {
                        this.resData = res.data
                        this.gwbfDataList = res.data.gwbfDataList
                        this.sjxjDataList = res.data.sjxjDataList
                        this.ljqzsDataList = res.data.ljqzsDataList
                        this.cxsJkbDataList = res.data.cxsJkbDataList
                        this.cxsJsjbDataList = res.data.cxsJsjbDataList
                        this.dateList = res.data.dateList
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
    .fd-tooltip-xAxis{
        display: none;
        box-sizing: border-box;
        padding: 17px 0;
        width: 238px;
        height: 67px;
        background: url('../../../public/img/bg-01.png') no-repeat center/100%;
        font-size: 15px;
        text-align: center;
    }
</style>