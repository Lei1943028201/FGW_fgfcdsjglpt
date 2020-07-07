<template>
    <div class="fd-content clear">
        <!-- 页面左侧内容区--开始 -->
        <div class="fd-box left">
            <!-- 国办平台模块 -->
            <AcGbpt></AcGbpt>
            <!-- 重点项目模块 -->
            <AcZdxm></AcZdxm>
            <!-- 商务楼宇模块 -->
            <AcSwly></AcSwly>
        </div>
        <!-- 页面左侧内容区--结束 -->

        <!-- 页面中间内容区--开始 -->
        <div class="fd-content-center left">
            <!-- 地图模块 -->
            <AcMap></AcMap>
            <!-- 趋势对比模块 -->
            <AcQsdb></AcQsdb>
        </div>
        <!-- 页面中间内容区--结束 -->

        <!-- 页面右侧内容区--开始 -->
        <div class="fd-box right">
            <!-- 重点领域模块 -->
            <AcZdly></AcZdly>
            <!-- banner图 -->
            <div class="fd-banner hand" @click="clickBanner">联通北分复工复产监测平台</div>
            <!-- 国电企业模块 -->
            <AcGdqy></AcGdqy>
        </div>
        <!-- 页面右侧内容区--开始 -->
    </div>
</template>

<script>
    import AcGbpt from '../components/AcZtqk/AcGbpt'
    import AcZdxm from '../components/AcZtqk/AcZdxm'
    import AcSwly from '../components/AcZtqk/AcSwly'
    import AcZdly from '../components/AcZtqk/AcZdly'
    import AcGdqy from '../components/AcZtqk/AcGdqy'
    import AcQsdb from '../components/AcZtqk/AcQsdb'
    import AcMap from '../components/AcZtqk/AcMap'
    export default {
        name: "PageZTqk",
        components: {
            AcGbpt,
            AcZdxm,
            AcSwly,
            AcZdly,
            AcGdqy,
            AcQsdb,
            AcMap,
        },
        methods: {
            clickBanner(){
                window.open('http://172.26.72.128/bjfgw/pages/unicom.html?menu=3#')
            }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .fd-content{
        margin: 0 auto;
        width: 1860px;
    }
    .fd-box{
        box-sizing: border-box;
        padding: 30px;
        width: 480px;
        height: 926px;
        background: url("../../public/img/bg-border.png") no-repeat center/100% 100%;
    }
    .fd-content-center{
        box-sizing: border-box;
        padding: 0 20px;
        width: 900px;
        height: 926px;
    }
    .fd-banner{
        width: 100%;
        height: 93px;
        background: url("../../public/img/bg-banner.png") no-repeat center/100% 100%;
        font-size: 26px;
        color: #00fcff;
        text-align: center;
        line-height: 93px;
    }
</style>