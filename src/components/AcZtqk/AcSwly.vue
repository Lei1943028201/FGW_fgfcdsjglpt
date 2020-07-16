<template>
    <div>
        <!-- 标题模块 -->
        <CcTitle title="商务楼宇" :time="resData.jzrq"/>

        <div v-if="type === 1">
            <!-- 进度条 -->
            <div class="fd-content-progress">
                <ul>
                    <li v-for="(item, index) in swlyList" :key="item.name" class="clear fd-item">
                        <!-- 左侧布局 -->
                        <div class="left">
                            <p>
                                <span class="fd-progress--name">{{item.cyyqlx}}</span>
                                <span class="fd-progress--value1">{{item.cyyqgs}}个</span>
                            </p>
                            <!-- 进度条 -->
                            <div class="fd-progress-bar--outer">
                                <span class="fd-progress-bar--inner" :style="progressBarWidth(item.cyyqfgl)"></span>
                            </div>
                        </div>
                        <!-- 右侧布局 -->
                        <div class="right">
                            <span v-if="index === 0" style="color: #6194b4;margin-left: 15px">复工率</span><br/>
                            <span class="fd-progress--value2">{{item.cyyqfgl}}%</span>
                            <span :class="classNameIsUp(item.cyyqfglbh)">{{item.cyyqfglbh | filterText}}%</span>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- 数据展示模块 -->
            <CcCard :data-list="cardData" class="fd-card"/>
        </div>
        <div v-else class="fd-content-02">
            <div class="fd-item fd-item-01 clear">
                <p><span class="fd-value">7</span>个</p>
                <p>涉及楼宇</p>
            </div>
            <div class="fd-item fd-item-02 clear">
                <p class="left">涉及单位<span class="fd-value">66</span>个</p>
                <p class="right">涉及行业<span class="fd-value">66</span>个</p>
            </div>
            <div class="fd-item fd-item-03 clear">
                <p class="left">涉及超市<span class="fd-value">66</span>个</p>
                <p class="right">涉及餐馆<span class="fd-value">66</span>个</p>
            </div>
            <div class="fd-item fd-item-04 clear">
                <p class="left">涉及商场<span class="fd-value">66</span>个</p>
                <p class="right">涉及食堂<span class="fd-value">66</span>个</p>
            </div>
        </div>

    </div>
</template>

<script>
    import {getSwlyData} from '../../api/ztqk'
    /* 商务楼宇 */
    export default {
        name: "AcSwly",
        data() {
            return {
                type: 1, // 根据type展示不同的页面
                /* 后台返回的数据 */
                resData: {},
                /* 商务楼宇数据 */
                swlyList: [],
            }
        },
        computed: {
            cardData(){
                return [
                    {
                        name: '全市楼宇总数',
                        value: this.resData.qslyzs,
                        unit: '个'
                    },
                    {
                        name: '单位总数',
                        value: this.resData.dwzs,
                        unit: '万个'
                    },
                    {
                        name: '规上企业总数',
                        value: this.resData.gsqyzs,
                        unit: '个'
                    },
                ]
            }
        },
        methods: {
            /*  */
            progressBarWidth(value){
                if(value > 100){
                    value = 100
                }
                return `width: ${value}%`
            },
            init() {
                getSwlyData()
                    .then(res => {
                        this.resData = res.data
                        this.swlyList = res.data.cyyqList
                    })
            }
        },
        created() {
            this.init()
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .fd-content-progress{
        min-height: 160px;
        li{
            margin-top: 15px;
            height: 30px;
            font-size: 15px;
            .left{
                width: calc(100% - 130px);
            }
            .right{
                width: 130px; white-space: nowrap;
            }
        }
        .fd-progress--name{
            margin-left: 5px;
            font-size: 16px;
            color: #c9e7ff;
        }
        .fd-progress--value1{
            font-size: 15px;
            color: #00f0ff;
        }
        .fd-progress--value2{
            display: inline-block;
            margin: 0 5px;
            width: 60px;
            color: #9ccae6;
            text-align: center;
        }
        .fd-progress-bar--outer{
            margin-top: 5px;
            width: 100%;
            height: 10px;
            border-radius: 5px;
            background: #04264c;
            .fd-progress-bar--inner{
                display: inline-block;
                float: left;
                width: 0;
                height: 10px;
                border-radius: 5px;
                background: linear-gradient(to right, #0066ff, #0af4ff);
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
    .fd-card{
        margin-top: 30px;
    }
    .fd-content-02{
        width: 100%;
        height: 242px;
        background: url("../../../public/img/bg-swly.png") no-repeat center/300px 242px;
        color: #c9e7ff;
        text-align: center;
        font-size: 15px;
        .fd-item{
            width: 100%;
        }
        .fd-value{
            margin: 0 5px;
            font-weight: bold;
        }
        .fd-item-01{
            padding-top: 20px;
            .fd-value{
                color: #ffa910;
                font-size: 24px;
            }
        }
        .fd-item-02{
            margin-bottom: 25px;
            padding: 0 40px;
            .fd-value{
                color: #00ffff;
                font-size: 20px;
            }
        }
        .fd-item-03,.fd-item-04{
            margin-top: 15px;
            padding:0 10px;
            .fd-value{
                font-size: 17px;
            }
        }
    }
</style>