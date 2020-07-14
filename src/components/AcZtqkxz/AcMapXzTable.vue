<template>
    <div>
        AcMapXzRbzs
    </div>
</template>

<script>
    /**
     * 地图下钻-表格
     */
    import {getGdqFgfczsqsbg, getGhyFgfczsqsbg} from '../../api/ztqkxz'
    export default {
        name: "AcMapXzTable",
        props:['dialogActiveTab'],
        data() {
            return {

            }
        },
        computed: {

        },
        methods: {
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