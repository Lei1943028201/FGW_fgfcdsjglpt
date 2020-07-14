<template>
    <div>
        <p>table-各行业</p>
    </div>
</template>

<script>
    import {getGdqFgqkbg, getGhyFgqkbg} from '../../api/ztqkxz'
    /* 地图 */
    export default {
        name: "AcGdqyXzTableGhy",
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