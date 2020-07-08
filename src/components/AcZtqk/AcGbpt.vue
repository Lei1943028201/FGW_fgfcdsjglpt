<template>
    <div>
        <!-- 标题模块 -->
        <CcTitle title="国办平台" :time="resData.jzrq"/>

        <!-- tab切换--开始  -->
        <div class="fd-content-tab clear">
            <!-- 复工复产 -->
            <CcTab class="left" :tab-list="tab1" @handlerTab="handlerTab1"/>
            <!-- 产业 -->
            <CcTabText class="right" :tab-list="tab2" @handlerTab="handlerTab2"/>
        </div>
        <!-- tab切换--结束 -->

        <!-- 排行榜--开始 -->
        <span class="fd-icon-right" v-if="false"></span>
        <CcTop :data-list="topList"/>
        <!-- 排行榜--结束 -->

        <!-- 数据展示--开始 -->
        <ul class="fd-content-card clear">
            <li>
                <p class="fd-text-1"><span>{{cardData1.value1}}</span>%</p>
                <p class="fd-text-2">全国{{activeTabName1}}率</p>
                <p class="fd-text-3"><span :class="classNameIsUp(cardData1.value2)">{{cardData1.value2 | filterText}}%</span>昨日</p>
            </li>
            <li>
                <p class="fd-text-1"><span>{{cardData2.value1}}</span>%</p>
                <p class="fd-text-2">北京{{activeTabName1}}率</p>
                <p class="fd-text-3"><span :class="classNameIsUp(cardData2.value2)">{{cardData2.value2 | filterText}}%</span>昨日</p>
            </li>
            <li>
                <p class="fd-text-1"><span>{{cardData3.value1}}</span></p>
                <p class="fd-text-2">全国排名</p>
                <p class="fd-text-3"><span :class="classNameIsUp(cardData3.value2)">{{cardData3.value2 | filterText}}</span>昨日</p>
            </li>
        </ul>
        <!-- 数据展示--开始 -->
    </div>
</template>

<script>
    import {getFgfcl} from '../../api/ztqk'
    /* 国办平台 */
    export default {
        name: "AcGbpt",
        data() {
            return {
                /* 复工/复产 */
                activeTab1: '1',
                activeTabName1: '复工',
                /* 产业 */
                activeTab2: '0',
                /* 复工/复产 */
                tab1: [
                    {
                        name: '复工',
                        code: '1'
                    },
                    {
                        name: '复产',
                        code: '2'
                    }
                ],
                /* 产业 */
                tab2: [
                    {
                        name: '第二产业',
                        code: '0'
                    },
                    {
                        name: '第三产业',
                        code: '1'
                    }
                ],
                /* 后台返回的数据 */
                resData: {},
                /* 复工数据--排行 */
                sfFglPm: [],
                /* 复产数据--排行 */
                sfFclPm: [],
            }
        },
        computed: {
            /* 排行数据 */
            topList() {
                if (this.activeTab1 === '1') {
                    return this.sfFglPm.map(item => ({
                        name: item.dqmc,
                        value1: item.pm,
                        value2: item.fgl+'%',
                    }))
                } else {
                    return this.sfFclPm.map(item => ({
                        name: item.dqmc,
                        value1: item.pm,
                        value2: item.fcl+'%',
                    }))
                }
            },
            /* 展示数据 */
            cardData1() {
                if(this.activeTab1 === '1'){
                    return {
                        value1: this.resData.qgfgl,
                        value2: this.resData.qgfglbh
                    }
                }else{
                    return {
                        value1: this.resData.qgfcl,
                        value2: this.resData.qgfclbh
                    }
                }

            },
            cardData2() {
                if(this.activeTab1 === '1'){
                    return {
                        value1: this.resData.bjfgl,
                        value2: this.resData.bjfglbh
                    }
                }else{
                    return {
                        value1: this.resData.bjfcl,
                        value2: this.resData.bjfclbh
                    }
                }
            },
            cardData3() {
                if(this.activeTab1 === '1'){
                    return {
                        value1: this.resData.bjfglpm,
                        value2: this.resData.bjfglpmbh
                    }
                }else{
                    return {
                        value1: this.resData.bjfclpm,
                        value2: this.resData.bjfclpmbh
                    }
                }
            },
        },
        methods: {
            /* 切换--复工/复产 */
            handlerTab1(tab) {
                this.activeTab1 = tab.code
                this.activeTabName1 = tab.name
            },
            /* 切换--产业 */
            handlerTab2(item) {
                this.activeTab2 = item.code
                this.init()
            },
            init() {
                getFgfcl({hylb: this.activeTab2}).then(res => {
                    this.resData = res.data
                    this.sfFglPm = res.data.sfFglPm
                    this.sfFclPm = res.data.sfFclPm
                })
            }
        },
        created() {
            this.init()
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">

    .fd-icon-right {
        margin-top: 16px;
        float: right;
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url("../../../public/img/icon-right.png") no-repeat right center/ 8px 16px;
        cursor: pointer;
    }

    /* CcTop模块样式 */
    .fd-content-top {
        //width: calc(100% - 25px);
    }

    .fd-content-card {
        width: 100%;
        margin: 20px 0 28px;
        & > li:nth-child(2) {
            position: relative;
            .fd-line {
                content: '';
                position: absolute;
                top: 20px;
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
                    font-size: 25px;
                    font-weight: bold;
                }
            }
            .fd-text-2 {
                margin: 10px 0;
                color: #c9e7ff;
            }
            .fd-text-3 {
                color: #208fff;
            }
            .fd-text-up {
                color: #ff3a56;
                margin-right: 5px;
                &:after {
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
</style>