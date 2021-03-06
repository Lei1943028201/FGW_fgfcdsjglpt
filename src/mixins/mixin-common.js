export default {
    filters: {
        /* 去除负号的显示 */
        filterText: function (value) {
            if (!value && value != 0) {
                return '--'
            }
            value = String(value)
            return value.replace(/-/, '');
        },
    },
    computed: {

        /* 判断上升还是下降 */
        classNameIsUp() {
            return value => Number(value) < 0 ? 'fd-text-down' : 'fd-text-up'
        },
    },
    methods: {
        accAdd(arg1, arg2) {
            if (isNaN(arg1)) {
                arg1 = 0;
            }
            if (isNaN(arg2)) {
                arg2 = 0;
            }
            arg1 = Number(arg1);
            arg2 = Number(arg2);
            let r1, r2, m, c;
            try {
                r1 = arg1.toString().split(".")[1].length;
            }
            catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length;
            }
            catch (e) {
                r2 = 0;
            }
            c = Math.abs(r1 - r2);
            m = Math.pow(10, Math.max(r1, r2));
            if (c > 0) {
                var cm = Math.pow(10, c);
                if (r1 > r2) {
                    arg1 = Number(arg1.toString().replace(".", ""));
                    arg2 = Number(arg2.toString().replace(".", "")) * cm;
                } else {
                    arg1 = Number(arg1.toString().replace(".", "")) * cm;
                    arg2 = Number(arg2.toString().replace(".", ""));
                }
            } else {
                arg1 = Number(arg1.toString().replace(".", ""));
                arg2 = Number(arg2.toString().replace(".", ""));
            }
            return (arg1 + arg2) / m;
        },
        accSub(arg1, arg2) {
            if (isNaN(arg1)) {
                arg1 = 0;
            }
            if (isNaN(arg2)) {
                arg2 = 0;
            }
            arg1 = Number(arg1);
            arg2 = Number(arg2);

            let r1, r2, m, n;
            try {
                r1 = arg1.toString().split(".")[1].length;
            }
            catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length;
            }
            catch (e) {
                r2 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
            n = (r1 >= r2) ? r1 : r2;
            return ((arg1 * m - arg2 * m) / m).toFixed(n);
        },
        accMul(arg1, arg2) {
            if (isNaN(arg1)) {
                arg1 = 0;
            }
            if (isNaN(arg2)) {
                arg2 = 0;
            }
            arg1 = Number(arg1);
            arg2 = Number(arg2);

            var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
            try {
                m += s1.split(".")[1].length;
            }
            catch (e) {
                //console.log(e);
            }
            try {
                m += s2.split(".")[1].length;
            }
            catch (e) {
                //console.log(e);
            }

            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
        }

    }
}