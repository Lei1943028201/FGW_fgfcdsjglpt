<template>
    <div>
        重点项目1
    </div>
</template>

<script>
    /**
     * 重点项目下钻页面-图表
     */
    import {getGlyFglqs, getMtglyfgl} from '../../api/ztqkxz'
    export default {
        name: "AcZdxmXzChart",
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