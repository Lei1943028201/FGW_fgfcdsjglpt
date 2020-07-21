<template>
    <div class="fd-xz-content-table">
        <h2 class="fd-title-01">全市各区复工详情</h2>
        <el-table
                :data="tableData"
                stripe
                max-height="520"
                style="width: 100%">
            <el-table-column
                    align="center"
                    prop="rq"
                    width="100"
                    label="日期">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="dqmc"
                    label="单位">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="xmgs"
                    label="项目个数">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="ykgs"
                    label="已开工数">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="dtkgs"
                    :render-header="renderheader"
                    label="当天新|开工数">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="kgrs"
                    label="开工人数">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="kgl"
                    label="总开工率">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="sjxmkgs"
                    :render-header="renderheader"
                    label="市级部门|主责项目|已开工数">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="sjxmkgl"
                    :render-header="renderheader"
                    label="市级部门|主责项目|开工率">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="qjxmkgs"
                    width="100"
                    :render-header="renderheader"
                    label="区主责项目|已开工数">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="qjxmkgl"
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
    import {mapState} from 'vuex'
    import {getFglbg} from '../../api/ztqkxz'
    export default {
        name: "AcZdxmXzTable",
        data() {
            return {
                total: 1111,
                currentPage: 1,
                pageSizes: 5,
                tableData: []
            }
        },
        computed: {
            ...mapState(['params_zdxm']),
            params(){
                return {
                    sjfw: this.params_zdxm.sjfw, //数据范围（1：包含节假日，2：不包含节假日）
                    ksrq: this.params_zdxm.ksrq,  // 开始日期(开始日期为空时，表示默认情况取近15天数据)
                    jzrq: this.params_zdxm.jzrq, // 截至日期(截至日期为空时，表示默认情况取近15天数据)
                    dq: this.params_zdxm.dq,     // 地区(数组)：全市，东城区,西城区等
                    jd: this.params_zdxm.jd, // 日期
                    limit: this.params_zdxm.limit, // 日期
                    offset: this.params_zdxm.offset, // 日期
                }
            },
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
                getFglbg(this.params).then((res)=>{
                    this.total = res.data.total
                    this.tableData = res.data.gqDataList
                })
            }
        },
        created() {
            this.init()
        }
    }

</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../../style/mixin-dialog";
</style>