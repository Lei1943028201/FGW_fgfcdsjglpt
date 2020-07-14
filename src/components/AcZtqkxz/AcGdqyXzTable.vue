<template>
    <div>
        <p>table</p>
    </div>
</template>

<script>
    /**
     * 国电企业下钻页面-表格
     */
    import {getGdqFgqkbg, getGhyFgqkbg} from '../../api/ztqkxz'
    export default {
        name: "AcGdqyXzTable",
        data() {
            return {

            }
        },
        computed: {

        },
        methods: {
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