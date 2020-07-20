<template>
    <div class="fd-content-map">
        <!-- 顶部数据展示--开始 -->
        <div class="fd-map-top">
            <div>
                <p>
                    <span class="fd-name hand" @click="handlerOpen('mapDialogType', '1')">国网指数</span>
                    <span class="fd-value-01">{{qsfgfcData.gwbffgfczs }}</span>
                    <span class="fd-value-02" :class="classNameIsUp(qsfgfcData.gwbffgfczsbhz)">{{qsfgfcData.gwbffgfczsbhz | filterText}}</span>
                </p>
            </div>
            <div>
                <p>
                    <span class="fd-name hand" @click="handlerOpen('mapDialogType', '2')">日报指数</span>
                    <span class="fd-value-04">{{qsfgfcData.sjxjfgfczs}}</span>
                    <span class="fd-value-02" :class="classNameIsUp(qsfgfcData.sjxjfgfczsbhz)">{{qsfgfcData.sjxjfgfczsbhz | filterText}}</span>
                </p>
            </div>
        </div>
        <!-- 顶部数据展示--结束 -->

        <!-- 地图 -->
        <div class="fd-box-map">
            <ChartMap ref="chartMap"/>
        </div>

        <!-- 三个圆球--开始 -->
        <!-- 疫情期间 -->

        <!-- 非疫情期间 -->
        <!-- 圆球--左 -->
        <div class="fd-ball fd-ball-1">
            <div class="fd-top">
                <p>
                    <span class="fd-value-01">{{ballData[0].top.value}}</span>
                    <span class="fd-unit">{{ballData[0].top.unit}}</span>
                </p>
                <p><span class="fd-name">{{ballData[0].top.name}}</span></p>
            </div>
            <div class="fd-bottom">
                <p>
                    <span class="fd-value-01">{{ballData[0].bottom.value}}</span>
                    <span class="fd-unit">{{ballData[0].bottom.unit}}</span>
                </p>
                <p><span class="fd-name">{{ballData[0].bottom.name}}</span></p>
            </div>
        </div>
        <!-- 圆球--中 -->
        <div class="fd-ball fd-ball-2">
            <div class="fd-top">
                <p>
                    <span class="fd-value-01">{{ballData[1].top.value}}</span>
                    <span class="fd-unit">{{ballData[1].top.unit}}</span>
                </p>
                <p><span class="fd-name">{{ballData[1].top.name}}</span></p>
            </div>
            <div class="fd-bottom">
                <p>
                    <span class="fd-value-01">{{ballData[1].bottom.value}}</span>
                    <span class="fd-unit">{{ballData[1].bottom.unit}}</span>
                </p>
                <p><span class="fd-name">{{ballData[1].bottom.name}}</span></p>
            </div>
        </div>
        <!-- 圆球--右 -->
        <div class="fd-ball fd-ball-3">
            <div class="fd-top">
                <p>
                    <span class="fd-value-01">{{ballData[2].top.value}}</span>
                    <span class="fd-unit">{{ballData[2].top.unit}}</span>
                </p>
                <p><span class="fd-name">{{ballData[2].top.name}}</span></p>
            </div>
            <div class="fd-bottom">
                <p :class="{'fd-high-risk': isYq}">
                    <span class="fd-value-01">{{ballData[2].bottom.value}}</span>
                    <span class="fd-unit">{{ballData[2].bottom.unit}}</span>
                </p>
                <p><span class="fd-name">{{ballData[2].bottom.name}}</span></p>
            </div>
        </div>
        <!-- 三个圆球--结束 -->

        <!-- 弹窗 -- 开始 -->
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="1060"
                :before-close="handleClose">
            <AcDialogTitle slot="title" :title="dialogTitle" @handlerShowType="handlerShowType"></AcDialogTitle>
            <div class="fd-query-content">
                <!-- tab切换--模块 -->
                <CcTab :tab-list="tabList" @handlerTab="dialogHandlerTab"/>
                <CcSelect select-name="选择地区" :data-list="selectList_dq" class="fd-select-01" v-show="dialogActiveTab==='1'" @handlerSelect="handlerSelectDQ"></CcSelect>
                <CcSelect select-name="企业类型" :data-list="selectList_qylx" class="fd-select-02" v-show="dialogActiveTab==='1' && mapDialogType==='1'" @handlerSelect="handlerSelectQYLX"></CcSelect>
                <CcSelect select-name="选择行业" :data-list="selectList_hy" class="fd-select-03" v-show="dialogActiveTab==='2'" @handlerSelect="handlerSelectHY"></CcSelect>
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
            <AcMapXzChart ref="AcMapXzChart" :map-dialog-type="mapDialogType" :dialog-active-tab="dialogActiveTab" v-if="showType === 1"/>
            <AcMapXzTable ref="AcMapXzTable" :map-dialog-type="mapDialogType" :dialog-active-tab="dialogActiveTab" v-else/>
        </el-dialog>
        <!-- 弹窗 -- 结束 -->
    </div>
</template>

<script>

    import ChartMap from '../../components/common/map/index.vue';
    import AcMapXzChart from '../AcZtqkxz/AcMapXzChart'
    import AcMapXzTable from '../AcZtqkxz/AcMapXzTable'
    import mixinZdlyxz from '../../mixins/mixin-zdlyxz'
    import {mapState, mapGetters} from 'vuex'
    import {getFgfczsData} from '../../api/ztqk'
    import {getSxtj} from '../../api/ztqkxz'
    /* 地图 */
    export default {
        name: "AcMap",
        mixins: [mixinZdlyxz],
        components: {
            ChartMap,
            AcMapXzChart,
            AcMapXzTable,
        },
        data() {
            return {
                isYq: false, // 是否疫情
                mapDialogType: '', // 国网指数/日报指数
                dialogActiveTab: '1',
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
                qsfgfcData: {},
                /* 查询参数 */
                params: {
                    ksrq: '2020-06-06',
                    jzrq: '2020-07-07',
                    sjfw: '1',
                    dq: '',
                    qylx: '',
                },
            }
        },
        computed: {
            ...mapState(['mapId']),
            ...mapGetters(['showMapData']),
            dialogTitle() {
                if (this.mapDialogType === '1') {
                    return {
                        name: '国网北分复工复产情况',
                        code: 'map_gw'
                    }
                } else {
                    return {
                        name: '市经信局复工复产情况',
                        code: 'map_rb'
                    }
                }
            },
            ballData() {
                if (this.isYq) {
                    return [
                        {
                            top: {
                                name: '确诊病例单位',
                                unit: '个',
                                value: this.showMapData.qzbldw,
                            },
                            bottom: {
                                name: '关停单位',
                                unit: '个',
                                value: this.showMapData.gtdw,
                            }
                        },
                        {
                            top: {
                                name: '累计确诊',
                                unit: '例',
                                value: this.showMapData.ljqz,
                            },
                            bottom: {
                                name: '现有确诊',
                                unit: '例',
                                value: this.showMapData.xyqz,
                            }
                        },
                        {
                            top: {
                                name: '风险地区',
                                unit: '个',
                                value: this.showMapData.fxdq,
                            },
                            bottom: {
                                name: '高风险地区',
                                unit: '个',
                                value: this.showMapData.gfxdq,
                            }
                        },
                    ]
                } else {
                    return [
                        {
                            top: {
                                name: '规上工地',
                                unit: '%',
                                value: this.accMul(this.showMapData.gsgd, 100),
                            },
                            bottom: {
                                name: '规下工地',
                                unit: '%',
                                value: this.accMul(this.showMapData.gxgd, 100),

                            }
                        },
                        {
                            top: {
                                name: '规上工业企业',
                                unit: '%',
                                value: this.accMul(this.showMapData.gsgyqy, 100),

                            },
                            bottom: {
                                name: '规下工业企业',
                                unit: '%',
                                value: this.accMul(this.showMapData.gxgyqy, 100),
                            }
                        },
                        {
                            top: {
                                name: '规上餐饮',
                                unit: '%',
                                value: this.accMul(this.showMapData.gscy, 100),
                            },
                            bottom: {
                                name: '规下餐饮',
                                unit: '%',
                                value: this.accMul(this.showMapData.gxcy, 100),
                            }
                        },
                    ]
                }
            },
        },
        methods: {
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
                getSxtj({tjlx: 'hy'})
                    .then((response) => {
                        this.selectList_hy = response.data.tjmcArr.map(item=>({
                            name: item,
                            active: true,
                        }))
                    })
            },
            /* 初始化页面 */
            init() {
                const loading = this.$loading({background: 'rgba(0, 0, 0, 0.6)'})
                getFgfczsData()
                    .then(res => {
                        res.data.qsfgfcData.code = '1100000'
                        this.qsfgfcData = res.data.qsfgfcData
                        this.$store.dispatch('SetMapData', [
                            res.data.qsfgfcData,
                            ...res.data.gdqfgfcDataList,
                        ])
                        loading.close();
                    })
                    .catch(() => loading.close())
            }
        },
        created() {
            this.init()
            //this.initSelectList()
        }
    }

</script>

<style scoped lang="less" rel="stylesheet/less">
    @import '../../style/mixin-dialog';

    .fd-content-map {
        position: relative;
        height: 620px;
        .fd-map-top {
            padding-top: 44px;
            text-align: center;
            & > div {
                display: inline-block;
                margin: 0 42px;
                height: 65px;
                background: url('../../../public/img/icon-rectangle.png') no-repeat 1px bottom/87px 10px;
                .fd-name {
                    font-size: 22px;
                    color: #d8f0ff;
                }
                .fd-value-01 {
                    margin: 0 10px;
                    font-size: 40px;
                    font-weight: bold;
                    color: #ffa40e;
                }
                .fd-value-02 {
                    font-size: 18px;
                    color: #ff3a56;
                }
                .fd-value-04 {
                    margin: 0 10px;
                    font-size: 40px;
                    font-weight: bold;
                    color: #00ffff;
                }
                .fd-text-up {
                    color: #ff3a56;
                    margin-right: 5px;
                    &:before {
                        content: '';
                        display: inline-block;
                        width: 16px;
                        height: 17px;
                        background: url("../../../public/img/icon-up.png") no-repeat center/100% 100%;
                    }
                }
                .fd-text-down {
                    color: #2ddf81;
                    margin-right: 5px;
                    &:before {
                        content: '';
                        display: inline-block;
                        width: 16px;
                        height: 17px;
                        background: url("../../../public/img/icon-down.png") no-repeat center/100% 100%;
                    }
                }
            }
        }
        .fd-box-map {
            height: calc(100% - 120px);
            background: url("../../../public/img/bg_map.png") no-repeat;
            background-size: 860px 320px;
            background-position: 40px 120px;
        }
    }

    .fd-ball {
        position: absolute;
        width: 154px;
        height: 154px;
        border-radius: 50%;
        background: url("../../../public/img/bg-ball.png") no-repeat center/100%;
        text-align: center;
        font-size: 16px;
        .fd-top {
            margin-top: 15px;
            color: #ffc600;
            .fd-name {
                color: #06d8ff;
            }
        }
        .fd-bottom {
            margin-top: 5px;
        }
        .fd-value-01 {
            font-size: 28px;
            font-weight: bold;

        }
        .fd-bottom {
            color: #fff;
            .fd-name {
                color: #06d8ff;
            }
        }
        .fd-value-01 {
            font-size: 28px;
            font-weight: bold;

        }
    }

    .fd-ball-1 {
        left: 100px;
        bottom: 50px;
        .fd-top {

        }
    }

    .fd-ball-2 {
        left: 370px;
        bottom: 15px;
    }

    .fd-ball-3 {
        left: 640px;
        bottom: 50px;
    }

    /* 高风险 */
    .fd-high-risk {
        color: #ff3c3c !important;
    }


</style>