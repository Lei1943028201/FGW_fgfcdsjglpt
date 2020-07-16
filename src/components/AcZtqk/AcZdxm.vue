<template>
    <div>
        <!-- 标题模块 -->
        <CcTitle title="重点项目" :time="resData.jzrq" @clickTitle="handlerOpen"/>

        <!-- 排行榜模块 -->
        <CcTop :data-list="topList"/>

        <!-- 数据展示--开始 -->
        <!--<div class="fd-content-card clear">
            <ul class="left">
                <li>
                    <p class="fd-p-top"><span>{{resData.xmzs}}</span>个</p>
                    <p class="fd-p-bottom">项目总数</p>
                </li>
                <li>
                    <p class="fd-p-top"><span>{{resData.kgs}}</span>个</p>
                    <p class="fd-p-bottom">已开工数</p>
                </li>
            </ul>
            <ul class="right">
                <li>
                    <p class="fd-p-top"><span>{{resData.kgl}}</span>%</p>
                    <p class="fd-p-bottom">开工率</p>
                </li>
                <li>
                    <p class="fd-p-top"><span>{{resData.kgzrs}}</span>人</p>
                    <p class="fd-p-bottom">开工总人数</p>
                </li>
            </ul>
        </div>-->

        <div class="fd-content-card clear">
            <div class="left">
                <CcEcharts :option="option(resData.jdfgl || '')"/>
                <div class="fd-content-detail">
                    <p class="fd-detail-p1 clear"><span class="left">已开工{{resData.jdykgs}}</span><span class="right">项目数{{resData.jdxms}}</span>
                    </p>
                    <p class="fd-detail-p2"><span>{{resData.jdmc}}</span></p>
                </div>
            </div>
            <div class="right">
                <CcEcharts :option="option(resData.qnfgl || '')"/>
                <div class="fd-content-detail">
                    <p class="fd-detail-p1 clear"><span class="left">已开工{{resData.qnykgs}}</span><span class="right">项目数{{resData.qnxms}}</span>
                    </p>
                    <p class="fd-detail-p2"><span>全年项目复工率</span></p>
                </div>
            </div>
        </div>
        <!-- 数据展示--开始 -->

        <!-- 弹窗 -- 开始 -->
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                :lock-scroll="false"
                width="1060"
                :before-close="handleClose">
            <AcDialogTitle slot="title" :title="dialogTitle" @handlerShowType="handlerShowType"></AcDialogTitle>
            <AcZdxmXzChart v-if="showType === 1"></AcZdxmXzChart>
            <AcZdxmXzTable v-else></AcZdxmXzTable>
        </el-dialog>
        <!-- 弹窗 -- 结束 -->
    </div>
</template>

<script>
    import echarts from 'echarts'
    import AcZdxmXzTable from '../AcZtqkxz/AcZdxmXzTable'
    import AcZdxmXzChart from '../AcZtqkxz/AcZdxmXzChart'
    import mixinZdlyxz from '../../mixins/mixin-zdlyxz'
    import {getZdgcData} from '../../api/ztqk'
    /* 重点项目 */
    export default {
        name: "AcZdxm",
        mixins: [mixinZdlyxz],
        components: {
            AcZdxmXzTable,
            AcZdxmXzChart,
        },
        data() {
            return {
                dialogTitle: {
                    name: '重点项目各区开工情况',
                    code: 'zdxm'
                },
                /* 后台返回的数据 */
                resData: {},
                /* 前三--排行 */
                dqQsKgl: [],
                /* 后三--排行 */
                dqHsKgl: [],
            }
        },
        computed: {
            /* 排行数据 */
            topList() {
                return [
                    ...this.dqQsKgl
                        .map(item => ({
                            name: item.dqmc,
                            value1: item.pm,
                            value2: item.kgl + '%',
                        })),
                    ...this.dqHsKgl
                        .map(item => ({
                            name: item.dqmc,
                            value1: item.pm,
                            value2: item.kgl + '%',
                        }))
                ]
            },
            /* 展示数据 */
            cardData1() {
                if (this.activeTab1 === '1') {
                    return {
                        value1: this.resData.qgfgl,
                        value2: this.resData.qgfglbh
                    }
                } else {
                    return {
                        value1: this.resData.qgfcl,
                        value2: this.resData.qgfclbh
                    }
                }

            },
            cardData2() {
                if (this.activeTab1 === '1') {
                    return {
                        value1: this.resData.bjfgl,
                        value2: this.resData.bjfglbh
                    }
                } else {
                    return {
                        value1: this.resData.bjfcl,
                        value2: this.resData.bjfclbc
                    }
                }
            },
            cardData3() {
                if (this.activeTab1 === '1') {
                    return {
                        value1: this.resData.bjfglpm,
                        value2: this.resData.bjfglpmbh
                    }
                } else {
                    return {
                        value1: this.resData.bjfclpm,
                        value2: this.resData.bjfclpmbh
                    }
                }
            },
            option() {
                return (value) => {
                    let datas = {
                        company: "%",
                        dataArr: [{
                            value: value
                        }]
                    };
                    let max = 100;
                    let centerArr = ["50%", "60%"];
                    return {
                        series: [
                            {
                                name: "外圈", //刻度背景
                                type: "gauge",
                                z: 2,
                                radius: "115%",
                                splitNumber: 0,
                                startAngle: 180,
                                endAngle: 0,
                                min: 0,
                                max: max,
                                center: centerArr, //整体的位置设置
                                axisLine: {
                                    lineStyle: {
                                        color: [
                                            [
                                                1, new echarts.graphic.LinearGradient(1, 0, 0, 0,
                                                [
                                                    {
                                                        offset: 1,
                                                        color: '#0066ff'
                                                    },
                                                    {
                                                        offset: 0,
                                                        color: '#0af4ff'
                                                    }
                                                ]
                                            )
                                            ],
                                            [
                                                1, '#413e54'
                                            ]
                                        ],
                                        width: 4
                                    }
                                },
                                splitLine: {
                                    show: false
                                },
                                data: [{
                                    show: false,
                                    value: "80"
                                }],
                                axisLabel: {
                                    show: false
                                },
                                pointer: {
                                    show: false
                                },
                                axisTick: {
                                    show: false
                                },
                                detail: {
                                    show: 0
                                }
                            },
                            {
                                name: "刻度尺", //刻度背景
                                type: "gauge",
                                z: 4,
                                radius: "90%",
                                splitNumber: 4,
                                startAngle: 180,
                                endAngle: 0,
                                center: centerArr, //整体的位置设置
                                axisLine: {
                                    // 坐标轴线
                                    lineStyle: {
                                        // 属性lineStyle控制线条样式
                                        color: [
                                            [1, "#00B3FE"],
                                            [1, "#212D43"]
                                        ],
                                        width: 25,
                                        opacity: 0 //刻度背景宽度
                                    }
                                },
                                splitLine: {
                                    length: 15, //刻度节点线长度
                                    lineStyle: {
                                        width: 2,
                                        color: "#5f6877"
                                    }
                                },
                                pointer: {
                                    show: true,
                                    length: '75%',
                                    radius: '20%',
                                    width: 3, //指针粗细
                                },
                                data: datas.dataArr,
                                axisLabel: {
                                    show: false
                                },

                                animationDuration: 4000,
                                axisTick: {
                                    show: true,
                                    lineStyle: {
                                        color: "#3c475a",
                                        width: 1
                                    },
                                    length: 5,
                                    splitNumber: 10
                                },
                                detail: {
                                    formatter: function () {//图表中间文字数据展示
                                        return (
                                            "{white|" + value + "}{company|" + datas.company + "}"
                                        );
                                    },
                                    rich: {
                                        white: {
                                            fontSize: 20*this.K,
                                            fontWeight: 700,
                                            color: "#00ffff"
                                        },
                                        company: {
                                            fontSize: 15*this.K,
                                            color: "#00ffff"
                                        }
                                    },
                                    offsetCenter: ["0", "0"]
                                },

                            },
                            /*{
                                name: "外圈", //刻度背景
                                type: "gauge",
                                z: 6,
                                radius: "65%",
                                splitNumber: 0,
                                startAngle: 180,
                                endAngle: 0,
                                min: 0,
                                max: max,
                                center: centerArr, //整体的位置设置
                                axisLine: {
                                    lineStyle: {
                                        color: [
                                            [
                                                1, new echarts.graphic.LinearGradient(0, 1, 0, 0,
                                                [
                                                    {
                                                        offset: 1,
                                                        color: '#0066ff'
                                                    },
                                                    {
                                                        offset: 0,
                                                        color: '#0af4ff'
                                                    }
                                                ]
                                            )
                                            ],
                                            [
                                                1, '#413e54'
                                            ]
                                        ],
                                        width: 4
                                    }
                                },
                                splitLine: {
                                    show: false
                                },
                                data: [{
                                    show: false,
                                    value: "80"
                                }],
                                axisLabel: {
                                    show: false
                                },
                                pointer: {
                                    show: false
                                },
                                axisTick: {
                                    show: false
                                },
                                detail: {
                                    show: 0
                                }
                            },*/
                        ]
                    };
                }
            },
        },
        methods: {
            init() {
                getZdgcData().then(res => {
                    this.resData = res.data
                    this.dqQsKgl = res.data.dqQsKgl
                })
            }
        },
        created() {
            this.init()
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import '../../style/mixin-dialog';
    .fd-content-card {
        position: relative;
        box-sizing: border-box;
        margin-top: 15px;
        margin-bottom: 20px;
        width: 100%;
        height: 145px;
        /*background: url('../../../public/img/bg-zdgc.png') no-repeat center/213px 145px;
        ul {
            box-sizing: border-box;
            padding: 0 25px 0;
            width: 125px;
            height: 130px;
            li {
                margin: 10px 0;
            }
        }
        & > .left {
            background: url('../../../public/img/bg-card-left.png') repeat-y center/ 100% 100%;
        }
        & > .right {
            background: url('../../../public/img/bg-card-right.png') repeat-y center/ 100% 100%;
        }
        .fd-p-top {
            color: #00f0ff;
            font-size: 15px;
            span {
                font-size: 20px;
                font-weight: bold;
            }
        }
        .fd-p-bottom {
            margin-top: 5px;
            color: #c9e7ff;
            font-size: 15px;
        }*/
        & > div {
            width: 50%;
            height: 100%;
        }
        .fd-content-detail {
            position: absolute;
            bottom: 5px;
            width: 50%;
            text-align: center;
            .fd-detail-p1 {
                padding: 0 20px;
                font-size: 15px;
                color: #6194b4;
            }
            .fd-detail-p2 {
                font-size: 16px;
                color: #c9e7ff;
            }
        }
    }
    /deep/.fd-box-title h2{
        cursor: pointer;
    }
</style>