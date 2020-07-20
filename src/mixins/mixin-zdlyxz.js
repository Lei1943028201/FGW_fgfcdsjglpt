import AcDialogTitle from '../components/AcZtqkxz/AcDialogTitle'

export default {
    components: {
        AcDialogTitle,
    },
    data(){
        return {
            K: window.innerWidth/1920, // 比例系数
            dialogVisible: false,
            showType: 1, // 展示类型 1 图表 2 表格
        }
    },
    filters: {

    },
    computed: {

    },
    methods: {
        /* 切换图表/表格 */
        handlerShowType(index){
            this.showType = index
        },
        /* 切换地区/行业 */
        dialogHandlerTab(tab) {
            if (tab.code === this.dialogActiveTab) {
                return
            }
            this.dialogActiveTab = tab.code
            this.handlerConfirm()
        },
        /* 打开弹窗 */
        handlerOpen(key,type){
            this.$store.dispatch('SetParams', this.params)
            this.dialogVisible = true
            if(key){
                this[key] = type
            }
        },
        /* 关闭弹窗 */
        handleClose(done){
            done()
        },
        /* 点击确认 */
        handlerConfirm(){
            this.$store.dispatch('SetParams', this.params)
            if(this.showType === 1){
                this.$refs.AcMapXzChart.init()
            }else{
                this.$refs.AcMapXzTable.init()
            }
        },
        /* 是否包含节假日 */
        handlerSJFW() {
            if(this.params.sjfw === '1'){
                this.params.sjfw = '2'
            }else {
                this.params.sjfw = '1'
            }
        },
    }
}