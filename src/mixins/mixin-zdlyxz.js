import AcDialogTitle from '../components/AcZtqkxz/AcDialogTitle'

export default {
    components: {
        AcDialogTitle,
    },
    data(){
        return {
            dialogVisible: false,
            showType: 1, // 展示类型 1 图表 2 表格
        }
    },
    filters: {

    },
    computed: {


    },
    methods: {
        handlerShowType(index){
            this.showType = index
        },
        handlerOpen(){
            this.dialogVisible = true
        },
        handleClose(done){
            done()
        },
    }
}