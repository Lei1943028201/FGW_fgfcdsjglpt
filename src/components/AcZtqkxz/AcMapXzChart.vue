<template>
    <div>
        AcMapXzGwzs
    </div>
</template>

<script>
    /**
     * 地图下钻-图表
     */
    import {getGdqFgfczsqs, getGdqMtfgfczs, getGhyFgfczsqs, getGhyMtfgfczs} from '../../api/ztqkxz'
    export default {
        name: "AcMapXzChart",
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
                    getGdqFgfczsqs()
                    getGdqMtfgfczs()
                }else{
                    getGhyFgfczsqs()
                    getGhyMtfgfczs()
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