<template>
    <div>
        重点项目2
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

            }
        },
        computed: {

        },
        methods: {
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