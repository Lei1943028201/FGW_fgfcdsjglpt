<template>
    <footer>
        <span>主办单位：市发展和改革委、北京市复工复产防控组办公室、市经济信息中心</span>
        <span>地址：北京市通州区运河东大街55号院</span>
        <span>邮政编码：101160</span>
        <span>技术支持：北京华宇信息技术有限公司、中国联合网络通信有限公司北京市分公司</span>
    </footer>
</template>

<script>
    export default {
        name: "TheFooter"
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    footer {
        box-sizing: border-box;
        padding-top: 28px;
        width: 100%;
        min-height: 60px;
        font-size: 15px;
        color: #00b6ff;
        text-align: center;
        background: url("../../../public/img/bg-footer.png") repeat-x 1px 100%;
    }
</style>