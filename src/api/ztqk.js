import request from './axios'
import config from './config'

/**
 * 国办平台
 * @param params
 */
export function getFgfcl(params) {
    return request({
        url: config.url.ztqk.fgfcl,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}
/**
 * 重点项目
 * @param params
 */
export function getZdgcData(params) {
    return request({
        url: config.url.ztqk.zdgcData,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}
/**
 * 商务楼宇
 * @param params
 */
export function getSwlyData(params) {
    return request({
        url: config.url.ztqk.swlyData,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}
/**
 * 复工复产
 * @param params
 */
export function getFgfczsData(params) {
    return request({
        url: config.url.ztqk.fgfczsData,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}
/**
 * 趋势对比
 * @param params
 */
export function getQsdbData(params) {
    return request({
        url: config.url.ztqk.qsdbData,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}
/**
 * 重点领域
 * @param params
 */
export function getZdly(params) {
    return request({
        url: config.url.ztqk.zdly,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}

/**
 * 国电企业 - 所有区
 * @param params
 */
export function getSyq(params) {
    return request({
        url: config.url.ztqk.syq,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}
/**
 * 国电企业 - 行业
 * @param params
 */
export function getGhy(params) {
    return request({
        url: config.url.ztqk.ghy,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}
