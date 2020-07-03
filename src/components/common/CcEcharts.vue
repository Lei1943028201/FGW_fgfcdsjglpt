<template>
    <div ref="theEchart" class="fd-content-echarts"></div>
</template>

<script>
    import echarts from 'echarts'

    export default {
        name: "CcEcharts",
        data() {
            return {
                theEchart: null
            }
        },
        props: ['option'],
        watch: {
            option: {
                deep: true,
                handler() {
                    this.update()
                }
            }
        },
        methods: {
            update() {
                this.theEchart.clear()
                this.theEchart.setOption(this.option)
            },
            init() {
                this.theEchart = echarts.init(this.$refs.theEchart)
                this.theEchart.setOption(this.option)

                this.theEchart.on('click', params => this.$emit('clickEcharts', params))

                /* 图表自适应 */
                window.addEventListener("resize", () => this.theEchart.resize());
            },
        },
        mounted() {
            this.init()
        },
    }
</script>

<style scoped>
    .fd-content-echarts {
        width: 100%;
        height: 100%;
    }
</style>