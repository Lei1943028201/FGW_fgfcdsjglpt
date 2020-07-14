<template>
    <div id="Gdqy">
        <!-- 标题模块 -->
        <CcTitle title="国电企业" :time="jzrq" @clickTitle="handlerOpen"/>

        <!-- tab切换--模块 -->
        <CcTab :tab-list="tabList" @handlerTab="handlerTab"/>

        <div v-if="activeTab=== '1'">
            <!-- 数据展示模块 -->
            <CcCard :data-list="cardData"/>

            <!-- echarts图--开始 -->
            <div class="fd-content-echarts clear">
                <CcEcharts :option="option_zd" class="left"/>
                <CcEcharts :option="option_xw" class="right"/>
            </div>
            <!-- echarts图--结束 -->

            <!-- 数据展示--开始 -->
            <div class="fd-content-list clear">
                <div class="left">
                    <p class="fd-list-item">企业数<span>{{zdData.qys | filterText}}</span>{{zdData.qysdw}}</p>
                    <p class="fd-list-item">复工数<span>{{zdData.fgs}}</span>{{zdData.fgsdw}}</p>
                </div>
                <div class="right">
                    <p class="fd-list-item">企业数<span>{{xwData.qys | filterText}}</span>{{xwData.qysdw}}</p>
                    <p class="fd-list-item">复工数<span>{{xwData.fgs}}</span>{{xwData.fgsdw}}</p>
                </div>
            </div>
            <!-- 数据展示--结束 -->
        </div>
        <div v-else>
            <div class="fd-content-echarts-hy">
                <CcEcharts :option="option_hy"/>
            </div>
        </div>

        <!-- 弹窗 -- 开始 -->
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                :lock-scroll="false"
                width="1060"
                :before-close="handleClose">
            <AcDialogTitle slot="title" @handlerShowType="handlerShowType"></AcDialogTitle>
            <!-- tab切换--模块 -->
            <CcTab :tab-list="tabList" @handlerTab="dialogHandlerTab"/>
            <AcGdqyXzChart :dialog-active-tab="dialogActiveTab"  v-if="showType === 1"></AcGdqyXzChart>
            <AcGdqyXzTable :dialog-active-tab="dialogActiveTab" v-else></AcGdqyXzTable>
            <div >
            </div>
        </el-dialog>
        <!-- 弹窗 -- 结束 -->
    </div>
</template>

<script>
    import echarts from 'echarts'
    import AcGdqyXzChart from '../AcZtqkxz/AcGdqyXzChart'
    import AcGdqyXzTable from '../AcZtqkxz/AcGdqyXzTable'
    import mixinZdlyxz from '../../mixins/mixin-zdlyxz'
    import {getSyq, getGhy} from '../../api/ztqk'
    /* 国电企业 */
    export default {
        name: "AcGdqy",
        mixins: [mixinZdlyxz],
        components: {
            AcGdqyXzChart,
            AcGdqyXzTable,
        },
        data() {
            return {
                activeTab: '1',         // 首页 1 所有区 2 行业
                dialogActiveTab: '1',   // 弹窗 1 所有区 2 行业
                query: {

                },
                tabList: [
                    {
                        name: '所有区',
                        code: '1'
                    },
                    {
                        name: '行业',
                        code: '2'
                    }
                ],
                resData: {},
            }
        },
        computed: {
            option_zd() {
                return {
                    title: {
                        text: '重点',
                        textStyle: {
                            color: '#c9e7ff',
                            fontSize: 18
                        },
                        subtext: this.zdData.fgl + '%',
                        subtextStyle: {
                            fontSize: 22,
                            fontWeight: 'bold',
                            color: '#c9e7ff',
                        },
                        itemGap: 10, // 主副标题距离
                        left: 'center',
                        top: '32%'
                    },
                    angleAxis: {
                        max: 100, // 满分
                        // 隐藏刻度线
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    radiusAxis: {
                        type: 'category',
                        // 隐藏刻度线
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    polar: {
                        center: ['50%', '50%'],
                        radius: '150%' //图形大小
                    },
                    series: [{
                        type: 'bar',
                        data: [{
                            name: '重点',
                            value: this.zdData.fgl,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#0066ff'
                                    }, {
                                        offset: 1,
                                        color: '#0af4ff'
                                    }])
                                }
                            },
                        }],
                        coordinateSystem: 'polar',
                        roundCap: true,
                        barWidth: 7,
                        barGap: '-100%', // 两环重叠
                        z: 2,
                    }, { // 灰色环
                        type: 'bar',
                        data: [{
                            value: 100,
                            itemStyle: {
                                color: '#041f51',
                                shadowColor: 'rgba(0, 0, 0, 0.2)',
                                shadowBlur: 5,
                                shadowOffsetY: 2
                            }
                        }],
                        coordinateSystem: 'polar',
                        roundCap: true,
                        barWidth: 7,
                        barGap: '-100%', // 两环重叠
                        z: 1
                    }]
                }
            },
            option_xw() {
                return {
                    title: {
                        text: '小微',
                        textStyle: {
                            color: '#c9e7ff',
                            fontSize: 18
                        },
                        subtext: this.xwData.fgl + '%',
                        subtextStyle: {
                            fontSize: 22,
                            fontWeight: 'bold',
                            color: '#c9e7ff',
                        },
                        itemGap: 10, // 主副标题距离
                        left: 'center',
                        top: '32%'
                    },
                    angleAxis: {
                        max: 100, // 满分
                        // 隐藏刻度线
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    radiusAxis: {
                        type: 'category',
                        // 隐藏刻度线
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    polar: {
                        center: ['50%', '50%'],
                        radius: '150%' //图形大小
                    },
                    series: [{
                        type: 'bar',
                        data: [{
                            name: '小微',
                            value: this.xwData.fgl,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#fd7d20'
                                    }, {
                                        offset: 1,
                                        color: '#ffd65c'
                                    }])
                                }
                            },
                        }],
                        coordinateSystem: 'polar',
                        roundCap: true,
                        barWidth: 7,
                        barGap: '-100%', // 两环重叠
                        z: 2,
                    }, { // 灰色环
                        type: 'bar',
                        data: [{
                            value: 100,
                            itemStyle: {
                                color: '#041f51',
                                shadowColor: 'rgba(0, 0, 0, 0.2)',
                                shadowBlur: 5,
                                shadowOffsetY: 2
                            }
                        }],
                        coordinateSystem: 'polar',
                        roundCap: true,
                        barWidth: 7,
                        barGap: '-100%', // 两环重叠
                        z: 1
                    }]
                }
            },
            option_hy() {
                let _this = this
                return {
                    legend: {
                        data: this.legend,
                        icon: 'roundRect',
                        x: 'center',
                        y: 0,
                        textStyle: {
                            color: '#00b6ff',
                            fontSize: 15
                        },
                    },
                    grid: {
                        x: 58,
                        x2: 35
                    },
                    tooltip: {
                        show: true,
                        formatter(params) {
                            let index = params.dataIndex
                            return `企业总数:${_this.accAdd(_this.qyzsArr[index], _this.fgqysArr[index])}万<br/>复工企业数:${_this.fgqysArr[index]}万<br/>复工率:${_this.drfglArr[index]}%`
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
                                interval: 0, //强制显示文字
                                rotate: 30,
                                textStyle: {
                                    color: '#00b6ff',  //更改坐标轴文字颜色
                                    fontSize: 15      //更改坐标轴文字大小
                                },
                            },
                        }
                    ],
                    yAxis: [
                        {
                            name: '单位:万',
                            min: 0,
                            splitNumber: 3,
                            nameTextStyle: {
                                color: "#00b6ff",
                                fontSize: 15,
                                padding: [0, 0, 0, -60]
                            },
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
                            min: 0,
                            max: this.resData.drfglMax || 100,
                            splitNumber: 2,
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
                    series: [
                        {
                            name: '复工企业数',
                            type: 'bar',
                            stack: '万',
                            barWidth: 10,//柱图宽度
                            color: '#ffc300',
                            yAxisIndex: 0,
                            data: this.fgqysArr
                        },
                        {
                            name: '企业总数',
                            type: 'bar',
                            stack: '万',
                            barWidth: 10,//柱图宽度
                            color: '#02edff',
                            yAxisIndex: 0,
                            data: this.qyzsArr
                        },
                        {
                            name: '复工率',
                            type: 'line',
                            stack: '%',
                            color: '#d841fe',
                            yAxisIndex: 1,
                            data: this.drfglArr
                        },
                    ]
                };
            },
            /* 图例 */
            legend() {
                let {legend} = this.resData
                return legend || []
            },
            /* 部门 */
            bmArr() {
                let {ghyArr} = this.resData
                return ghyArr || []
            },
            /* 企业总数 */
            qyzsArr() {
                let {qyzsArr} = this.resData
                if (qyzsArr) {
                    return qyzsArr.map((item, index) => {
                        return this.accSub(item, this.fgqysArr[index])
                    })
                }
                return []
            },
            /* 复工企业数 */
            fgqysArr() {
                let {fgqysArr} = this.resData
                return fgqysArr || []
            },
            /* 当日复工复产指数 */
            drfglArr() {
                let {drfglArr} = this.resData
                return drfglArr || []
            },
            /* 截至日期 */
            jzrq() {
                return this.resData.jzrq
            },
            /* 全国数据 */
            cardData() {
                let {qsData} = this.resData
                return qsData ? [
                    {
                        name: '企业数',
                        value: qsData.qys,
                        unit: qsData.qysdw
                    },
                    {
                        name: '复工数',
                        value: qsData.fgs,
                        unit: qsData.fgsdw
                    },
                    {
                        name: '复工率',
                        value: qsData.fgl,
                        unit: '%'
                    },
                ] : []
            },
            /* 重点数据 */
            zdData() {
                let {zdqyData} = this.resData
                return zdqyData || {
                    "qyyhs": '',
                    "qyyhsdw": "万户",
                    "fgs": '',
                    "fgsdw": "户",
                    "fgl": ''
                }
            },
            /* 小微数据 */
            xwData() {
                let {xwqyData} = this.resData
                return xwqyData || {
                    "qyyhs": '',
                    "qyyhsdw": "万户",
                    "fgs": '',
                    "fgsdw": "户",
                    "fgl": ''
                }
            }
        },
        methods: {
            handlerTab(tab) {
                if (tab.code === this.activeTab) {
                    return
                }
                this.activeTab = tab.code
                this.init()
            },
            dialogHandlerTab(tab) {
                if (tab.code === this.dialogActiveTab) {
                    return
                }
                this.dialogActiveTab = tab.code
            },
            init() {
                if (this.activeTab === '1') {
                    getSyq()
                        .then(res => {
                            this.resData = res.data
                        })
                        .catch(err => {
                            console.log(err)
                        })
                } else {
                    getGhy()
                        .then(res => {
                            this.resData = res.data
                        })
                        .catch(err => {
                            console.log(err)
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
    @import '../../style/mixin-dialog';

    #Gdqy {
        margin-top: 25px;
        padding-bottom: 30px;
        background: url("../../../public/img/bg-gdqy.png") no-repeat center bottom/390px 160px;
        /deep/ .fd-box-title h2 {
            cursor: pointer;
        }
    }

    .fd-content-tab {
        margin: 8px auto 20px;
        width: 170px;
        height: 30px;
        text-align: center;
        font-size: 15px;
        line-height: 30px;
        background: #093867;
    }

    .fd-content-card {
        width: 100%;
        & > li:nth-child(2) {
            position: relative;
            .fd-line {
                content: '';
                position: absolute;
                top: 10px;
                display: inline-block;
                width: 1PX;
                height: 35px;
                background: #093767;
            }
            &:after {
                .fd-line;
                left: 0;
            }
            &:before {
                .fd-line;
                right: 0;
            }
        }
        li {
            float: left;
            width: 33.33333%;
            text-align: center;
            font-size: 15px;
            .fd-text-1 {
                color: #00f0ff;
                span {
                    font-size: 25px;
                    font-weight: bold;
                }
            }
            .fd-text-2 {
                color: #c9e7ff;
            }
        }
    }

    .fd-content-echarts {
        width: 100%;
        height: 160px;
        & > div {
            width: 50%;
            height: 100%;
        }
    }

    .fd-content-echarts-hy {
        width: 100%;
        height: 260px;
    }

    .fd-content-list {
        & > div {
            width: 50%;
            text-align: center;
            font-size: 15px;
            color: #c9e7ff;
        }
        .fd-list-item {
            margin-bottom: 10px;
            & > span {
                margin: 0 5px;
                font-size: 18px;
                font-weight: bold;
            }
        }
    }
</style>