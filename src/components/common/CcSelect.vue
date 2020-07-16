<template>
    <el-popover width="428"
                placement="bottom-start"
                @show="selectShow"
                @hide="selecthide"
                trigger="click">
        <ul class="fd-select-content clear">
            <li class="fd-select-item left hand"
                :class="{'active': item.name === activeData.name}"
                v-for="(item, index) in dataList"
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
                        code: '共计'
                    },
                    {
                        name: '东城区',
                        code: '复工数'
                    },
                    {
                        name: '东城区',
                        code: '%'
                    },
                    {
                        name: '东城区',
                        code: '共计'
                    },
                    {
                        name: '东城区',
                        code: '复工数'
                    },
                    {
                        name: '东城区',
                        code: '%'
                    },
                    {
                        name: '东城区',
                        code: '共计'
                    },
                    {
                        name: '东城区',
                        code: '复工数'
                    },
                    {
                        name: '东城区',
                        code: '%'
                    },
                ])
            }
        },
        data() {
            return {
                activeData: {
                    name: '东城区',
                    value: '东城区'
                },
                dialogVisible: false
            }
        },
        methods: {
            selectShow() {
                this.dialogVisible = true
            },
            selecthide() {
                this.dialogVisible = false
            },
        }
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
            margin-right: 10px;
            margin-bottom: 10px;
            border: 1px solid #0461a1;
            background: #112550;
            line-height: 30px;
            font-size: 15px;
            padding: 0 20px;
            color: #fff;
        }
        .active {
            border: 1px solid #ffa910;
            color: #ffa910;
            box-shadow: 0 0 8px rgba(255, 169, 16, 0.6) inset;
        }
    }
</style>