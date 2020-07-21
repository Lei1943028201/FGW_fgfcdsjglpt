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
                width="1060"
                :before-close="handleClose">
            <AcDialogTitle slot="title" @handlerShowType="handlerShowType" :title="dialogTitle"></AcDialogTitle>
            <div class="fd-query-content">
                <!-- tab切换--模块 -->
                <CcTab :tab-list="tabList" @handlerTab="dialogHandlerTab"/>
                <CcSelect select-name="选择地区"
                          :data-list="selectList_dq"
                          class="fd-select-01"
                          v-show="dialogActiveTab==='1'"
                          @selectHide="handlerConfirm"
                          @handlerSelect="handlerSelectDQ"></CcSelect>
                <CcSelect select-name="企业类型"
                          :data-list="selectList_qylx"
                          class="fd-select-02"
                          v-show="dialogActiveTab==='1'"
                          @selectHide="handlerConfirm"
                          @handlerSelect="handlerSelectQYLX"></CcSelect>
                <CcSelect select-name="选择行业"
                          :data-list="selectList_hy"
                          class="fd-select-03"
                          v-show="dialogActiveTab==='2'"
                          @selectHide="handlerConfirm"
                          @handlerSelect="handlerSelectHY"></CcSelect>
                <div>
                    <el-date-picker
                            class="fd-date-picker-start"
                            :editable="false"
                            :clearable="false"
                            size="small"
                            v-model="params.ksrq"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="开始日期">
                    </el-date-picker>
                    <el-date-picker
                            :editable="false"
                            :clearable="false"
                            class="fd-date-picker-end"
                            size="small"
                            v-model="params.jzrq"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="结束日期">
                    </el-date-picker>
                </div>
                <el-button size="small" type="text"
                           v-show="dialogActiveTab==='1'"
                           :class="[{'fd-btn--text': params.sjfw==='1'}, {'fd-btn--text-active': params.sjfw==='2'}, 'hand']"
                           @click="handlerSJFW">不包含节假日
                </el-button>
                <button class="fd-btn fd-btn-export">导出</button>
                <button class="fd-btn fd-btn-confirm" @click="handlerConfirm">确定</button>
            </div>
            <!-- tab切换--模块 -->
            <AcGdqyXzChart ref="theChart" :dialog-active-tab="dialogActiveTab" v-if="showType === 1"></AcGdqyXzChart>
            <AcGdqyXzTable ref="theTable" :dialog-active-tab="dialogActiveTab" v-else></AcGdqyXzTable>
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
    import {getSxtj} from '../../api/ztqkxz'
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
                dialogTitle:{
                    name: '国网北分复工监测情况',
                    code: 'gdqy'
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
                selectList_qylx: [
                    {
                        name: '全部企业',
                        active: true,
                    },
                    {
                        name: '重点企业',
                        active: true,
                    },
                    {
                        name: '小微企业',
                        active: true,
                    },
                ],
                selectList_hy: [],
                selectList_dq: [],
                /* 查询参数 */
                params: {
                    key: 'params_gdqy',
                    ksrq: '',
                    jzrq: '',
                    sjfw: '1',
                    dq: '',
                    qylx: '',
                },
            }
        },
        computed: {
            option_zd() {
                return {
                    title: {
                        text: '重点',
                        textStyle: {
                            color: '#c9e7ff',
                            fontSize: 18*this.K
                        },
                        subtext: this.zdData.fgl + '%',
                        subtextStyle: {
                            fontSize: 22*this.K,
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
                            fontSize: 18*this.K
                        },
                        subtext: this.xwData.fgl + '%',
                        subtextStyle: {
                            fontSize: 22*this.K,
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
                    legend: [
                        {
                            data: this.legend.filter(item => item.icon === 'roundRect'),
                            icon: 'roundRect',
                            itemWidth: 14* this.K,
                            itemHeight: 14* this.K,
                            y: 20,
                            x2: 70,
                            textStyle: {
                                color: '#00b6ff',
                                fontSize: 15*this.K ,
                            },
                        },
                        {
                            data: this.legend.filter(item => item.icon === 'rect'),
                            icon: 'roundRect',
                            itemWidth: 14* this.K,
                            itemHeight: 5,
                            y: 20,
                            x: 'right',
                            textStyle: {
                                color: '#00b6ff',
                                fontSize: 15*this.K ,
                            },
                        }
                    ],
                    grid: {
                        x: 58,
                        x2: 35,
                        y2: 85*this.K,
                    },
                    tooltip: {
                        show: true,
                        formatter(params) {
                            let index = params.dataIndex
                            return `企业总数:${_this.qyzsArr[index]}万<br/>复工企业数:${_this.fgqysArr[index]}万<br/>复工率:${_this.drfglArr[index]}%`
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
                                rotate: 45,
                                textStyle: {
                                    color: '#00b6ff',  //更改坐标轴文字颜色
                                    fontSize: 15*this.K      //更改坐标轴文字大小
                                },
                            },
                        }
                    ],
                    yAxis: [
                        {
                            name: '单位:万',
                            min: 0,
                            max: Math.ceil(this.resData.fgqyzsMax/10000),
                            splitNumber: 3,
                            nameTextStyle: {
                                color: "#00b6ff",
                                fontSize: 15*this.K ,
                                padding: [0, 0, 0, -60]
                            },
                            type: 'value',
                            axisLine: {
                                show: false,
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#00b6ff',  //更改坐标轴文字颜色
                                    fontSize: 15*this.K      //更改坐标轴文字大小
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
                                    fontSize: 15*this.K       //更改坐标轴文字大小
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
                            name: '企业总数',
                            type: 'bar',
                            barWidth: 10,//柱图宽度
                            color: '#02edff',
                            yAxisIndex: 0,
                            data: this.qyzsArr
                        },
                        {
                            name: '复工企业数',
                            type: 'bar',
                            barWidth: 10,//柱图宽度
                            color: '#ffc300',
                            yAxisIndex: 0,
                            barGap: "-100%", /*这里设置包含关系*/
                            data: this.fgqysArr,
                        },

                        {
                            name: '复工率',
                            type: 'line',
                            /*stack: '%',*/
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
                let {ghyArr} = this.resData
                return ghyArr || []
            },
            /* 企业总数 */
            qyzsArr() {
                let {qyzsArr} = this.resData
                return qyzsArr || []
            },
            /* 复工企业数 */
            fgqysArr() {
                let {fgqysArr} = this.resData
                console.log(fgqysArr);
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
        watch:{
            /* 监听参数的变化 */
            params: {
                deep: true,
                handler(){
                    this.$store.dispatch('SetParams', this.params)
                }
            }
        },
        methods: {
            /* 切换地区/行业 */
            handlerTab(tab) {
                if (tab.code === this.activeTab) {
                    return
                }
                this.activeTab = tab.code
                this.init()
            },
            /* 选择地区 */
            handlerSelectDQ(index){
                this.selectList_dq[index].active = !this.selectList_dq[index].active
                this.params.dq = this.selectList_dq.filter(item=>item.active).map(item=>item.name).join()
            },
            /* 选择行业 */
            handlerSelectHY(index){
                this.selectList_hy[index].active = !this.selectList_hy[index].active
                this.params.dq = this.selectList_hy.filter(item=>item.active).map(item=>item.name).join()
            },
            /* 选择企业类型 */
            handlerSelectQYLX(index){
                this.selectList_qylx[index].active = !this.selectList_qylx[index].active
                this.params.qylx = this.selectList_qylx.filter(item=>item.active).map(item=>item.name).join()
            },
            /* 初始化参数 */
            initParams(){
                this.params.dq = this.selectList_dq.filter(item=>item.active).map(item=>item.name).join()
                this.params.qylx = this.selectList_qylx.filter(item=>item.active).map(item=>item.name).join()
            },
            /* 初始化下拉 */
            initSelectList(){
                getSxtj({tjlx: 'dq'})
                    .then((response) => {
                        this.selectList_dq = response.data.tjmcArr.map(item=>{
                            if(item === '北京市'){
                                return {
                                    name: item,
                                    active: true,
                                }
                            }else{
                                return {
                                    name: item,
                                    active: false,
                                }
                            }
                        })
                        this.initParams()
                    })
                    .catch(()=>{
                        let res = [
                            "北京市",
                            "东城区",
                            "西城区",
                            "朝阳区",
                            "海淀区",
                            "丰台区",
                            "石景山区",
                            "房山区",
                            "通州区",
                            "顺义区",
                            "昌平区",
                            "大兴区",
                            "门头沟区",
                            "平谷区",
                            "怀柔区",
                            "密云区",
                            "延庆区",
                            "经济技术开发区",
                            "跨区项目"
                        ]
                        this.selectList_dq = res.map(item=>{
                            if(item === '北京市'){
                                return {
                                    name: item,
                                    active: true,
                                }
                            }else{
                                return {
                                    name: item,
                                    active: false,
                                }
                            }
                        })
                        this.initParams()
                    })
                getSxtj({tjlx: 'hy'})
                    .then((response) => {
                        this.selectList_hy = response.data.tjmcArr.map(item=>({
                            name: item,
                            active: true,
                        }))
                    })
            },
            init() {
                const loading = this.$loading({background: 'rgba(0, 0, 0, 0.6)'})
                if (this.activeTab === '1') {
                    getSyq()
                        .then(res => {
                            this.resData = res.data
                            loading.close();
                        })
                        .catch(err => {
                            console.log(err)
                            loading.close();
                        })
                } else {
                    getGhy()
                        .then(res => {
                            this.resData = res.data
                            loading.close();
                        })
                        .catch(err => {
                            console.log(err)
                            loading.close();
                        })
                }
            }
        },
        created() {
            this.init()
            this.initSelectList()
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import '../../style/mixin-dialog';

    #Gdqy {
        margin-top: 25px;
        padding-bottom: 30px;
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
        height: 170px;
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
            margin-bottom: 5px;
            & > span {
                margin: 0 5px;
                font-size: 18px;
                font-weight: bold;
            }
        }
    }
</style>