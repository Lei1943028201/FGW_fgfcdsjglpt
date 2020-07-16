<template>
    <div>
        <!-- 各地区 -->
        <el-table
                v-show="dialogActiveTab === '1'"
                :data="tableDataGdq"
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
                    label="单位">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value2"
                    label="企业总数">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value3"
                    :render-header="renderheader"
                    label="复工|企业数">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value4"
                    label="复工率">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value5"
                    :render-header="renderheader"
                    label="重点企业|总数">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value5"
                    :render-header="renderheader"
                    label="重点企业|复工复产数">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value5"
                    :render-header="renderheader"
                    label="重点企业|复工率">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value5"
                    :render-header="renderheader"
                    label="小微企业|总数">
            </el-table-column>
        </el-table>
        <!-- 行业 -->
        <el-table
                v-show="dialogActiveTab === '2'"
                :data="tableDataGhy"
                stripe
                max-height="520"
                style="width: 100%">
            <el-table-column
                    align="center"
                    prop="date"
                    label="日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value1"
                    label="所属行业"
                    width="180">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value2"
                    label="企业总数">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value3"
                    label="复工企业数">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="value4"
                    label="复工率">
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
     * 国电企业下钻页面-表格
     */
    import {getGdqFgqkbg, getGhyFgqkbg} from '../../api/ztqkxz'
    export default {
        name: "AcGdqyXzTable",
        props:['dialogActiveTab'],
        data() {
            return {
                total: 1111,
                currentPage: 1,
                pageSizes: 5,
                tableDataGdq: [
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
                ],
                tableDataGhy: [
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
                ],
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
                /* 1: 地区 2：行业 */
                if(this.dialogActiveTab === '1'){
                    getGdqFgqkbg()
                }else{
                    getGhyFgqkbg()
                }
            }
        },
        created() {
            this.init()
        }
    }

</script>

<style scoped lang="less" rel="stylesheet/less">


</style>