<template>
    <el-popover width="428"
                placement="bottom-start"
                @show="selectShow"
                @hide="selectHide"
                trigger="click">
        <ul class="fd-select-content clear">
            <li class="fd-select-item left hand"
                :class="{'active': item.active}"
                v-for="(item, index) in dataList"
                @click="clickSelect(index)"
                :key="index">{{item.name}}
            </li>
        </ul>
        <button slot="reference" class="fd-btn fd-btn-select">{{selectName}}<i
            :class="[{'el-icon-arrow-down': !dialogVisible}, {'el-icon-arrow-up': dialogVisible}]"></i></button>
    </el-popover>
</template>

<script>
    export default {
        name: "CcSelect",
        props: {
            selectName: {
                default: '商务楼宇'
            },
            dataList: {
                default: () => ([
                    {
                        name: '东城区',
                        active: false,
                    },
                    {
                        name: '东城区',
                        active: false,
                    },
                ])
            }
        },
        data() {
            return {
                dialogVisible: false
            }
        },
        computed: {
            activeSelectList(){
                return this.dataList.filter(item=>{
                    return item.active
                })
            }
        },
        methods: {
            clickSelect(index){
                this.$emit('handlerSelect', index)
            },
            selectShow() {
                this.dialogVisible = true
            },
            selectHide() {
                this.dialogVisible = false
                this.$emit('selectHide', this.activeSelectList)
            },

        },
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .fd-btn-select {
        background: #112550;
        color: #9ccae6;
    }

    .fd-select-content {
        background: #112550;
        padding: 15px;
        li {
            min-width: 82px;
            margin-right: 10px;
            margin-bottom: 10px;
            border: 1px solid #0461a1;
            background: #112550;
            line-height: 30px;
            font-size: 15px;
            padding: 0 10px;
            color: #fff;
            text-align: center;
        }
        .active {
            border: 1px solid #ffa910;
            color: #ffa910;
            box-shadow: 0 0 8px rgba(255, 169, 16, 0.6) inset;
        }
    }
</style>