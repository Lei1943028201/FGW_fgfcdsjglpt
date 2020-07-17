<template>
    <div id="AcZdly">
        <!-- 标题模块 -->
        <CcTitle title="重点领域" :time="jzrq" @clickTitle="handlerOpen"/>

        <!-- 数据展示--开始 -->
        <ul class="fd-content-card clear">
            <li>
                <p class="fd-text-1"><span>{{cardData.qyzs | filterText}}</span>{{cardData.qyzsdw}}</p>
                <p class="fd-text-2">企业总数</p>
            </li>
            <li>
                <p class="fd-text-1"><span>{{cardData.fgs | filterText}}</span>{{cardData.fgsdw}}</p>
                <p class="fd-text-2">复工数</p>
            </li>
            <li>
                <p class="fd-text-1" :class="classNameIsUp(cardData.fgl)">{{cardData.fgl | filterText}}<span>%</span>
                </p>
                <p class="fd-text-2">复工率</p>
            </li>
        </ul>
        <!-- 数据展示--结束 -->

        <!-- echarts图--开始 -->
        <div class="fd-content-echarts">
            <CcEcharts :option="option"/>
        </div>
        <!-- echarts图--结束 -->

        <!-- 弹窗 -- 开始 -->
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="1060PX"
                :before-close="handleClose">
            <AcDialogTitle slot="title" :title="dialogTitle" @handlerShowType="handlerShowType"></AcDialogTitle>
            <div class="fd-query-content">
                <!-- tab切换--模块 -->
                <CcSelect select-name="请选择领域"
                          :data-list="selectData"
                          @handlerSelect="handlerSelect"
                          @selectHide="handlerConfirm"
                          class="fd-select-01"></CcSelect>
                <el-date-picker
                        size="small"
                        v-model="value1"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
                <el-button size="small" type="text" :class="[{'fd-btn--text': !sjfw}, {'fd-btn--text-active': sjfw}, 'hand']" @click="handlerSJFW">不包含节假日</el-button>
                <button class="fd-btn fd-btn-export">导出</button>
                <button class="fd-btn fd-btn-confirm" @click="handlerConfirm">确定</button>
            </div>
            <AcZdlyXzChart v-if="showType === 1" ref="AcZdlyXzChart"></AcZdlyXzChart>
            <AcZdlyXzTable v-else ref="AcZdlyXzTable"></AcZdlyXzTable>
        </el-dialog>
        <!-- 弹窗 -- 结束 -->
    </div>
</template>

<script>
    import echarts from 'echarts'
    import AcZdlyXzChart from '../AcZtqkxz/AcZdlyXzChart'
    import AcZdlyXzTable from '../AcZtqkxz/AcZdlyXzTable'
    import mixinZdlyxz from '../../mixins/mixin-zdlyxz'
    import {getZdly} from '../../api/ztqk'
    import {getGbmly} from '../../api/ztqkxz'
    /* 重点领域 */
    export default {
        name: "AcZdly",
        mixins: [mixinZdlyxz],
        components: {
            AcZdlyXzChart,
            AcZdlyXzTable,
        },
        data() {
            return {
                dialogTitle: {
                    name: '重点领域复工复产情况',
                    code: 'zdly'
                },
                resData: {},
                /* echarts数据 */
                gzlsqk: {},
                selectData:[],
                /* 查询参数 */
                value1: '',
                sjfw: false
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
                                fontSize: 15 * this.K,
                            },
                        },
                        {
                            data: this.legend.filter(item => item.icon === 'rect'),
                            icon: 'roundRect',
                            itemWidth: 14,
                            itemHeight: 5,
                            y: 20,
                            x: 'right',
                            textStyle: {
                                color: '#00b6ff',
                                fontSize: 15 * this.K,
                            },
                        }
                    ],
                    grid: {
                        x: 48,
                        x2: 0,
                    },
                    tooltip: {
                        show: true,
                        formatter(params) {
                            let index = params.dataIndex
                            return `企业总数:${_this.qyzsArr[index]}<br/>复工数:${_this.fgzsArr[index]}<br/>复工率:${_this.fglArr[index]}%`
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
                                textStyle: {
                                    color: '#00b6ff',  //更改坐标轴文字颜色
                                    fontSize: 15 * this.K       //更改坐标轴文字大小
                                },
                                formatter: function (value) {
                                    if (value === '商场（超市）') {
                                        return '商场\n（超市）'
                                    }
                                    if (value === '餐馆（食堂）') {
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
                            min: 0,
                            max: 100,
                            splitNumber: 2,
                            nameTextStyle: {
                                color: "#00b6ff",
                                fontSize: 15 * this.K,
                                padding: [0, 0, 0, -60]
                            },
                            axisLine: {
                                show: false,
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#00b6ff',  //更改坐标轴文字颜色
                                    fontSize: 15 * this.K       //更改坐标轴文字大小
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
                            min: 0,
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

                if (legend) {
                    return legend.map(item => {
                        return {
                            name: item,
                            icon: item === '复工率' ? 'rect' : 'roundRect',
                        }
                    }) || []
                }
                return []
            },
            /* 部门 */
            bmArr() {
                let bmArr = this.gzlsqk.bmArr || []
                return bmArr
            },
            /* 企业总数 */
            qyzsArr() {
                let {qyzsArr} = this.gzlsqk
                if (qyzsArr) {
                    return qyzsArr
                }
                return []
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
            handlerSJFW(){
                this.sjfw = !this.sjfw
                this.$store.dispatch('SetParams', {sjfw: this.sjfw})
            },
            /* 选择下拉选 */
            handlerSelect(index){
                this.selectData[index].active = !this.selectData[index].active
            },
            /* 确认 */
            handlerConfirm(){
                if(this.showType === 1){
                    this.$refs.AcZdlyXzChart.init();

                }else{
                    this.$refs.AcZdlyXzTable.init();
                }
            },
            handlerTab(tab) {
                if (tab.code === this.activeTab) {
                    return
                }
                this.activeTab = tab.code
                this.init()
            },

            init() {
                const loading = this.$loading({background: 'rgba(0, 0, 0, 0.6)'})
                getZdly()
                    .then(res => {
                        this.resData = res.data
                        this.gzlsqk = res.data.gzlsqk
                        loading.close();
                    })
                    .catch(err => {
                        console.log(err)
                        loading.close();
                    })
                getGbmly()
                    .then((res)=>{
                        this.selectData = res.data.dataList.map(item=>({
                            name: item.ly,
                            active: true
                        }))
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
                color: #ffa910;
                span {
                    font-size: 26px;
                    font-weight: bold;
                }
            }
            .fd-text-2 {
                color: #c9e7ff;
            }
            .fd-text-up {
                margin-right: 5px;
                color: #ff3a56;
                font-size: 26px !important;
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
                font-size: 26px !important;
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

    /deep/ .fd-box-title h2 {
        cursor: pointer;
    }
</style>