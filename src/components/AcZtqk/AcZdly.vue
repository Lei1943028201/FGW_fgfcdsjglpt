<template>
    <div>
        <!-- 标题模块 -->
        <CcTitle title="重点领域" :time="jzrq"/>

        <!-- 数据展示--开始 -->
        <ul class="fd-content-card clear">
            <li>
                <p class="fd-text-1"><span>{{cardData.qyzs}}</span>{{cardData.qyzsdw}}</p>
                <p class="fd-text-2">企业总数</p>
            </li>
            <li>
                <p class="fd-text-1"><span>{{cardData.fgs}}</span>{{cardData.fgsdw}}</p>
                <p class="fd-text-2">复工数</p>
            </li>
            <li>
                <p class="fd-text-1" :class="classNameIsUp(cardData.fgl)">{{cardData.fgl | filterText}}<span>%</span></p>
                <p class="fd-text-2">复工率</p>
            </li>
        </ul>
        <!-- 数据展示--结束 -->

        <!-- echarts图--开始 -->
        <div class="fd-content-echarts">
            <CcEcharts :option="option"/>
        </div>
        <!-- echarts图--结束 -->
    </div>
</template>

<script>
    import echarts from 'echarts'
    import {getZdly} from '../../api/ztqk'
    /* 重点领域 */
    export default {
        name: "AcZdly",
        data() {
            return {
                resData: {},
                /* echarts数据 */
                gzlsqk: {}
            }
        },
        computed: {
            option() {
                return {
                    legend: {
                        data: this.legend,
                        icon: 'roundRect',
                        y: 20,
                        x: 'right',
                        textStyle: {
                            color: '#00b6ff',
                            fontSize: 15
                        },
                    },
                    grid: {
                        x: 58,
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
                                    fontSize: 15      //更改坐标轴文字大小
                                },
                                formatter: function (value) {
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
                            name: '复工率',
                            nameTextStyle: {
                                color: "#00b6ff",
                                fontSize: 15,
                                padding: [0, 0, 0, -60]
                            },
                            axisLine: {
                                show: false,
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#00b6ff',  //更改坐标轴文字颜色
                                    fontSize: 15      //更改坐标轴文字大小
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
                    ],
                    series: [
                        {
                            name: '复工数',
                            type: 'bar',
                            stack: '复工',
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
                            data: this.qyzsArr
                        },
                        {
                            name: '企业总数',
                            type: 'bar',
                            stack: '复工',
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
                            data: this.fgzsArr
                        },
                        {
                            name: '复工率',
                            type: 'line',
                            smooth: true,
                            stack: '复工',
                            color: '#10f680',
                            data: this.fglArr
                        },
                    ]
                };
            },
            /* 截至日期 */
            jzrq() {
                return this.resData.jzrq
            },
            cardData() {
                return {
                    qyzs: this.resData.qyzs,
                    qyzsdw: this.resData.qyzsdw,
                    fgs: this.resData.fgs,
                    fgsdw: this.resData.fgsdw,
                    fgl: this.resData.fgl,
                }
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
            /* 部门 */
            bmArr() {
                let {bmArr} = this.gzlsqk
                return bmArr || []
            },
            /* 企业总数 */
            qyzsArr() {
                let {qyzsArr} = this.gzlsqk
                return qyzsArr || []
            },
            /* 复工数 */
            fgzsArr() {
                let {fgzsArr} = this.gzlsqk
                return fgzsArr || []
            },
            /* 复工率 */
            fglArr() {
                let {fglArr} = this.gzlsqk
                return fglArr || []
            },
        },
        methods: {
            handlerTab(tab) {
                if (tab.code === this.activeTab) {
                    return
                }
                this.activeTab = tab.code
                this.init()
            },
            init() {
                getZdly()
                    .then(res => {
                        this.resData = res.data
                        this.gzlsqk = res.data.gzlsqk
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
        created() {
            this.init()
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .fd-content-card {
        margin-top: 10px;
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
                color: #ffd016;
                span {
                    font-size: 25px;
                    font-weight: bold;
                }
            }
            .fd-text-2 {
                color: #c9e7ff;
            }
            .fd-text-up {
                margin-right: 5px;
                color: #ff3a56;
                font-size: 25px !important;
                font-weight: bold;
                span {
                    font-size: 15px;
                    font-weight: normal;
                }
                &:after {
                    content: '';
                    display: inline-block;
                    width: 9px;
                    height: 13px;
                    background: url("../../../public/img/icon-up.png") no-repeat center/100% 100%;
                }
            }
            .fd-text-down {
                margin-right: 5px;
                color: #2ddf81;
                font-size: 25px !important;
                font-weight: bold;
                span {
                    font-size: 15px;
                    font-weight: normal;
                }
                &:after {
                    content: '';
                    display: inline-block;
                    width: 9px;
                    height: 12px;
                    background: url("../../../public/img/icon-down.png") no-repeat center/100% 100%;
                }
            }
        }
    }

    .fd-content-echarts {
        width: 100%;
        height: 245px;
        margin-bottom: 10px;
    }
</style>