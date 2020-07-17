<template>
    <div  class="fd-xz-content-table">
        <h2 class="fd-title-01">全市各领域复工率详情</h2>
        <el-table
                :data="tableData"
                stripe
                :span-method="objectSpanMethod"
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
            <el-table-column align="center" label="管理对象">
                <el-table-column
                        align="center"
                        prop="value2">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="value2">
                </el-table-column>
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
                        id:'2',
                        date: '2016-05-02',
                        value1: '市经济信息华局',
                        value2: '规上工地企业',
                        value3: '2130',
                        value4: '2130',
                        value5: '100',
                    },
                    {
                        id:'3',
                        date: '2016-05-03',
                        value1: '市商务局',
                        value2: '超市',
                        value3: '2130',
                        value4: '2130',
                        value5: '100',
                    },
                    {
                        id:'4',
                        date: '2016-05-03',
                        value1: '市商务局',
                        value2: '餐饮',
                        value3: '2130',
                        value4: '2130',
                        value5: '100',
                    },
                    {
                        id:'5',
                        date: '2016-05-03',
                        value1: '市商务局',
                        value2: '小计',
                        value3: '2130',
                        value4: '2130',
                        value5: '100',
                    },
                    {
                        id:'6',
                        date: '2016-05-02',
                        value1: '市城管执法局',
                        value2: '商务楼宇',
                        value3: '2130',
                        value4: '2130',
                        value5: '100',
                    },
                    {
                        id:'7',
                        date: '2016-05-02',
                        value1: '市住建委',
                        value2: '规上工地',
                        value3: '2130',
                        value4: '2130',
                        value5: '100',
                    },
                    {
                        id:'8',
                        date: '2016-05-02',
                        value1: '市城管执法局',
                        value2: '超市',
                        value3: '2130',
                        value4: '2130',
                        value5: '100',
                    },
                    {
                        id:'9',
                        date: '2016-05-02',
                        value1: '市城管执法局',
                        value2: '小计',
                        value3: '2130',
                        value4: '2130',
                        value5: '100',
                    },
                ],
                spanArr: [], //遍历数据时，根据相同的标识去存储记录
                pos: 0 // 二维数组的索引
            }
        },
        computed: {

        },
        methods: {
            getSpanArr(data) {
                let that = this
                //页面展示的数据，不一定是全部的数据，所以每次都清空之前存储的 保证遍历的数据是最新的数据。以免造成数据渲染混乱
                that.spanArr = []
                that.pos = 0
                //遍历数据
                data.forEach((item, index) => {
                    //判断是否是第一项
                    if (index === 0) {
                        this.spanArr.push(1)
                        this.pos = 0
                    } else {
                        //不是第一项时，就根据标识去存储
                        if (data[index].value1 === data[index - 1].value1) {
                            // 查找到符合条件的数据时每次要把之前存储的数据+1
                            this.spanArr[this.pos] += 1
                            this.spanArr.push(0)
                        } else {
                            // 没有符合的数据时，要记住当前的index
                            this.spanArr.push(1)
                            this.pos = index
                        }
                    }
                })
            },
            objectSpanMethod({rowIndex, columnIndex}) {

                // 页面列表上 表格合并行 -> 第几列(从0开始)
                // 需要合并多个单元格时 依次增加判断条件即可
                if (columnIndex === 0) {
                    // 二维数组存储的数据 取出
                    const _row = this.spanArr[rowIndex]
                    const _col = _row > 0 ? 1 : 0
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                    //不可以return {rowspan：0， colspan: 0} 会造成数据不渲染， 也可以不写else，eslint过不了的话就返回false
                } else if(columnIndex === 1){
                    // 二维数组存储的数据 取出
                    const _row = this.spanArr[rowIndex]
                    const _col = _row > 0 ? 1 : 0
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                } else {
                    return false
                }
            },
            // 翻页操作
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage
            },
            init() {
                getGlyGglqsbg()
                this.getSpanArr(this.tableData)
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