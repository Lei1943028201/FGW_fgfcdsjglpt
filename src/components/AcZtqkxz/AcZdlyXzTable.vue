<template>
    <div>
        重点领域Table
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

            }
        },
        computed: {

        },
        methods: {
            init() {
                getGlyGglqsbg()
            }
        },
        created() {
            this.init()
        }
    }

</script>

<style scoped lang="less" rel="stylesheet/less">


</style>