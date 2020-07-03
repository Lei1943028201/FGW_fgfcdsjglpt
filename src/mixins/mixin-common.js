export default {
    filters: {
        /* 去除负号的显示 */
        filterText: function (value) {
            if (!value) {
                return ''
            }
            value = String(value)
            return value.replace(/-/,'' );
        }
    },
    computed: {
        /* 判断上升还是下降 */
        classNameIsUp() {
            return value => Number(value) < 0 ? 'fd-text-down' : 'fd-text-up'
        },
    }
}