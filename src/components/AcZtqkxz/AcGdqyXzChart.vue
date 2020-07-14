<template>
    <div id="AcGdqyXzChart">
        <CcEcharts></CcEcharts>
        <CcEcharts></CcEcharts>
    </div>
</template>

<script>
    import {getGdqFglqs, getGdqMtfglqs, getGhyFglqs, getGhyMtfglqs} from '../../api/ztqkxz'
    /* 国电企业-图表 */
    export default {
        name: "AcGdqyXzChart",
        data() {
            return {

            }
        },
        props: ['dialogActiveTab'],
        computed: {

        },
        methods: {
            init(){
                /* 1: 地区 2：行业 */
                if(this.dialogActiveTab === '1'){
                    getGdqFglqs()
                    getGdqMtfglqs()
                }else{
                    getGhyFglqs()
                    getGhyMtfglqs()
                }
            }
        },
        created() {
            this.init()
        }
    }

</script>

<style scoped lang="less" rel="stylesheet/less">
    #AcGdqyXzChart{
        width: 100%;
        height: 100%;
    }

</style>