import Vue from 'vue'
import Vuex from 'vuex'
import {getSxtj} from '../api/ztqkxz'
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        mapId: '',
        mapData: [],
        /* 弹窗页面参数 */
        params_xz: {
            offset: 1, // 页码
            limit: 10, // 展示条数
            ksrq: '', // 开始日期
            jzrq: '', // 结束日期
            rq: '2020-06-10',   // 日期
            sjfw: '', // 是否包含节假日
            dq: '',   // 地区
            lylx: '', // 部门领域
            hylx: '', // 行业领域
            qylx: '', // 区域类型
            mtqylx: '重点企业', // 每天区域类型
            jd: '', // 季度
        },
        /* 弹窗页面参数-重点项目 */
        params_zdxm: {
            offset: 1, // 页码
            limit: 10, // 展示条数
            ksrq: '', // 开始日期
            jzrq: '', // 结束日期
            rq: '2020-06-10',   // 日期
            sjfw: '', // 是否包含节假日
            dq: '',   // 地区
            lylx: '', // 部门领域
            hylx: '', // 行业领域
            qylx: '', // 区域类型
            mtqylx: '重点企业', // 每天区域类型
            jd: '', // 季度
        },
        /* 弹窗页面参数-重点领域 */
        params_zdly: {
            offset: 1, // 页码
            limit: 10, // 展示条数
            ksrq: '', // 开始日期
            jzrq: '', // 结束日期
            rq: '2020-06-10',   // 日期
            sjfw: '', // 是否包含节假日
            dq: '',   // 地区
            lylx: '', // 部门领域
            hylx: '', // 行业领域
            qylx: '', // 区域类型
            mtqylx: '重点企业', // 每天区域类型
            jd: '', // 季度
        },
        /* 弹窗页面参数-国电企业 */
        params_gdqy: {
            offset: 1, // 页码
            limit: 10, // 展示条数
            ksrq: '', // 开始日期
            jzrq: '', // 结束日期
            rq: '2020-06-10',   // 日期
            sjfw: '', // 是否包含节假日
            dq: '',   // 地区
            lylx: '', // 部门领域
            hylx: '', // 行业领域
            qylx: '', // 区域类型
            mtqylx: '重点企业', // 每天区域类型
            jd: '', // 季度
        },
        /* 弹窗页面参数-国网指数 */
        params_gwzs: {
            offset: 1, // 页码
            limit: 10, // 展示条数
            ksrq: '', // 开始日期
            jzrq: '', // 结束日期
            rq: '2020-06-10',   // 日期
            sjfw: '', // 是否包含节假日
            dq: '',   // 地区
            lylx: '', // 部门领域
            hylx: '', // 行业领域
            qylx: '', // 区域类型
            mtqylx: '重点企业', // 每天区域类型
            jd: '', // 季度
        },
        /* 弹窗页面参数-日报指数 */
        params_rbzs: {
            offset: 1, // 页码
            limit: 10, // 展示条数
            ksrq: '', // 开始日期
            jzrq: '', // 结束日期
            rq: '2020-06-10',   // 日期
            sjfw: '', // 是否包含节假日
            dq: '',   // 地区
            lylx: '', // 部门领域
            hylx: '', // 行业领域
            qylx: '', // 区域类型
            mtqylx: '重点企业', // 每天区域类型
            jd: '', // 季度
        },
    },
    getters: {
        /* 正在展示的地图数据 */
        showMapData(state){
            return state.mapData.filter(item => {
                return item.code === state.mapId
            })[0] || state.mapData[0] || {}

        }
    },
    mutations: {
        SET_MAPID: (state, _mapId) => {
            state.mapId = _mapId
        },
        SET_MAPDATA: (state, _mapData) => {
            state.mapData = _mapData
        },
        SET_PARAMS: (state, _params) => {
            Object.assign(state[_params.key], _params)
            console.log(state.params_gdqy)
        },
    },
    actions: {
        SetMapId({commit}, _mapId) {
            commit('SET_MAPID', _mapId)
        },
        SetMapData({commit}, _mapData){
            commit('SET_MAPDATA', _mapData)
        },
        SetParams({commit}, _params){
            commit('SET_PARAMS', _params)
        },
    }
})