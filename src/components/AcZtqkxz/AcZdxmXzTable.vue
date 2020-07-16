<template>
    <div>
        <el-table
                :data="tableData"
                stripe
                max-height="520"
                style="width: 100%">
            <el-table-column
                    align="center"
                    prop="date"
                    width="100"
                    label="日期">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value1"
                    label="单位">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value2"
                    label="项目个数">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value3"
                    label="已开工数">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value4"
                    :render-header="renderheader"
                    label="当天新|开工数">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value5"
                    label="开工人数">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value5"
                    label="总开工率">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value5"
                    :render-header="renderheader"
                    label="市级部门|主责项目|已开工数">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value5"
                    :render-header="renderheader"
                    label="市级部门|主责项目|开工率">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value5"
                    width="100"
                    :render-header="renderheader"
                    label="区主责项目|已开工数">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value5"
                    width="100"
                    :render-header="renderheader"
                    label="区主责项目|已开工率">
            </el-table-column>
        </el-table>
        <el-pagination
                @current-change="handleCurrentChange"
                background
                layout="prev, pager, next"
                :page-size="5"
                :current-page="currentPage"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
    /**
     * 重点项目下钻页面-表格
     */
    import {getGlyFglqs, getMtglyfgl} from '../../api/ztqkxz'
    export default {
        name: "AcZdxmXzTable",
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
            // 表头换行
            renderheader(h, {column}) {
                return h('span', {}, [
                    h('span', {}, column.label.split('|')[0]),
                    h('br'),
                    h('span', {}, column.label.split('|')[1])
                ])
            },
            // 翻页操作
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage
            },
            init() {
                getGlyFglqs()
                getMtglyfgl()
            }
        },
        created() {
            this.init()
        }
    }

</script>

<style scoped lang="less" rel="stylesheet/less">


</style>