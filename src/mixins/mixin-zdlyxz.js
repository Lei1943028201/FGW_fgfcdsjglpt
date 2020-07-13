export default {
    data(){
        return {
            dialogVisible: false,
        }
    },
    filters: {

    },
    computed: {


    },
    methods: {
        handlerOpen(){
            this.dialogVisible = true
        },
        handleClose(done){
            done()
        },
    }
}