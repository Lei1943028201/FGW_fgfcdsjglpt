import Vue from 'vue'
import Vuex from 'vuex'

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
            rq: '',   // 日期
            sjfw: '', // 是否包含节假日
            dq: '',   // 地区
            lylx: '', // 部门领域
            hylx: '', // 行业领域
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
            state.params_xz[_params.key] = _params.value
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
        }
    }
})