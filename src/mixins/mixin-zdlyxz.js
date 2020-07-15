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
        handlerShowType(index){
            this.showType = index
        },
        handlerOpen(key,type){
            this.dialogVisible = true
            if(key){
                this[key] = type
            }
        },
        handleClose(done){
            done()
        },
    }
}