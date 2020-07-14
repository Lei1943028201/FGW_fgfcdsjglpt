<template>
    <div>
        <CcEcharts/>
        <CcEcharts/>
    </div>
</template>

<script>
    /**
     * 重点领域下钻页面-图表
     */
    import {getGlyFglqs, getMtglyfgl} from '../../api/ztqkxz'
    export default {
        name: "AcZdlyXzChart",
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