<template>
    <div>
        <div v-show="mapDialogType==='1'">
            <div v-show="dialogActiveTab === '1'">
                1 国网-地区

            </div>
            <div v-show="dialogActiveTab === '2'">
                2 国网-行业
            </div>
        </div>
        <div v-show="mapDialogType==='2'">
            <div v-show="dialogActiveTab === '1'">
                1 日报-地区

            </div>
            <div v-show="dialogActiveTab === '2'">
                2 日报-行业
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