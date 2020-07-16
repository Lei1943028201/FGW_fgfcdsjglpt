<template>
    <div>
        <div v-show="mapDialogType==='1'">
            <div v-show="dialogActiveTab === '1'">
                <el-table
                        :data="tableDataGwGdq"
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
                            label="单位"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="value2"
                            label="复工复产指数">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="value3"
                            label="重点企业复工复产指数">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="value4"
                            label="小微企业复工复产指数">
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
            <div v-show="dialogActiveTab === '2'">
                <el-table
                        :data="tableDataGwGhy"
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
                            label="行业"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="value2"
                            label="复工复产指数">
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
        </div>
        <div v-show="mapDialogType==='2'">
            <div v-show="dialogActiveTab === '1'">
                <el-table
                        :data="tableDataRbGdq"
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
                            label="单位"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="value2"
                            label="复工复产指数">
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
            <div v-show="dialogActiveTab === '2'">
                <el-table
                        :data="tableDataRbGhy"
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
                            label="行业">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="value2"
                            label="复工复产指数">
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
        </div>

    </div>
</template>

<script>
    /**
     * 地图下钻-表格
     */
    import {getGdqFgfczsqsbg, getGhyFgfczsqsbg} from '../../api/ztqkxz'
    export default {
        name: "AcMapXzTable",
        props:['mapDialogType', 'dialogActiveTab'],
        data() {
            return {
                total: 1111,
                currentPage: 1,
                pageSizes: 5,
                tableTitle:[

                ],
                tableDataGwGdq: [
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
                tableDataGwGhy: [
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
                tableDataRbGdq: [
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
                tableDataRbGhy: [
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
                if(this.dialogActiveTab === '1'){
                    getGdqFgfczsqsbg()
                }else{
                    getGhyFgfczsqsbg()
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