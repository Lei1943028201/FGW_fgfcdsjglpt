import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        mapId: '',
        mapData: []
    },
    getters: {
        /* 正在展示的地图数据 */
        showMapData(state){
            return state.mapData.filter(item => {
                return item.code === state.mapId
            })[0] || state.mapData[0]

        }
    },
    mutations: {
        SET_MAPID: (state, _mapId) => {
            state.mapId = _mapId
        },
        SET_MAPDATA: (state, _mapData) => {
            state.mapData = _mapData
        },
    },
    actions: {
        SetMapId({commit}, _mapId) {
            commit('SET_MAPID', _mapId)
        },
        SetMapData({commit}, _mapData){
            commit('SET_MAPDATA', _mapData)
        },
    }
})