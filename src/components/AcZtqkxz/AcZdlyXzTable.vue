<template>
    <div  class="fd-xz-content-table">
        <el-table
                :data="tableData"
                stripe
                max-height="520"
                style="width: 100%">
            <el-table-column
                    align="center"
                    prop="date"
                    label="日期">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value1"
                    label="部门">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value2"
                    label="管理对象">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value3"
                    label="总数量">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value4"
                    label="复工数">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value5"
                    label="复工复产率">
            </el-table-column>
        </el-table>
        <el-pagination
                @current-change="handleCurrentChange"
                background
                layout="prev, pager, next"
                :page-size="10"
                :current-page="currentPage"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
    /**
     * 重点领域下钻页面-表格
     */
    import {getGlyGglqsbg} from '../../api/ztqkxz'

    export default {
        name: "AcZdlyXzTable",
        data() {
            return {
                total: 1111,
                currentPage: 1,
                pageSizes: 5,
                tableData: [
                    {
                        date: '2016-05-02',
                        value1: '市住建委',
                        value2: '规上工地',
                        value3: '2130',
                        value4: '2130',
                        value5: '100',
                    },
                    {
                        date: '2016-05-02',
                        value1: '市住建委',
                        value2: '规上工地',
                        value3: '2130',
                        value4: '2130',
                        value5: '100',
                    },
                    {
                        date: '2016-05-02',
                        value1: '市住建委',
                        value2: '规上工地',
                        value3: '2130',
                        value4: '2130',
                        value5: '100',
                    },
                    {
                        date: '2016-05-02',
                        value1: '市住建委',
                        value2: '规上工地',
                        value3: '2130',
                        value4: '2130',
                        value5: '100',
                    },
                    {
                        date: '2016-05-02',
                        value1: '市住建委',
                        value2: '规上工地',
                        value3: '2130',
                        value4: '2130',
                        value5: '100',
                    },
                ]
            }
        },
        computed: {

        },
        methods: {
            // 翻页操作
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage
            },
            init() {
                getGlyGglqsbg()
            }
        },
        updated(){
            this.init()
        },
        created() {
            this.init()
        }
    }

</script>

<style lang="less" rel="stylesheet/less">
    @import "../../style/mixin-dialog";
</style>