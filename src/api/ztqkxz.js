import request from './axios'
import config from './config'

/**
 * 获取筛选条件
 * @param params
 */
export function getSxtj(params) {
    return request({
        url: config.url.ztqkxz.sxtj,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}

/**
 * 获取各部门领域
 * @param params
 */
export function getGbmly(params) {
    return request({
        url: config.url.ztqkxz.gbmly,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}

/**
 * 全市各区企业复工指数趋势
 * @param params
 */
export function getGdqFgfczsqs(params) {
    return request({
        url: config.url.ztqkxz.gdq_fgfczsqs,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}

/**
 * 某天各区复工复产指数
 * @param params
 */
export function getGdqMtfgfczs(params) {
    return request({
        url: config.url.ztqkxz.gdq_mtfgfczs,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}

/**
 * 各区复工复产指数趋势表格
 * @param params
 */
export function getGdqFgfczsqsbg(params) {
    return request({
        url: config.url.ztqkxz.gdq_fgfczsqsbg,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}


/**
 * 全市各行业复工指数趋势
 * @param params
 */
export function getGhyFgfczsqs(params) {
    return request({
        url: config.url.ztqkxz.ghy_fgfczsqs,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}


/**
 * 某天各行业复工复产指数
 * @param params
 */
export function getGhyMtfgfczs(params) {
    return request({
        url: config.url.ztqkxz.ghy_mtfgfczs,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}


/**
 * 各行业复工复产指数趋势表格
 * @param params
 */
export function getGhyFgfczsqsbg(params) {
    return request({
        url: config.url.ztqkxz.ghy_fgfczsqsbg,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}

/**
 * 筛选条件
 * @param params
 */
export function getGlysj(params) {
    return request({
        url: config.url.ztqkxz.glysj,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}

/**
 * 各领域复工率趋势
 * @param params
 */
export function getGlyFglqs(params) {
    return request({
        url: config.url.ztqkxz.glyfglqs,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}

/**
 * 某天各领域复工率
 * @param params
 */
export function getMtglyfgl(params) {
    return request({
        url: config.url.ztqkxz.mtglyfgl,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}

/**
 * 各领域复工率趋势表格
 * @param params
 */
export function getGlyGglqsbg(params) {
    return request({
        url: config.url.ztqkxz.glyfglqsbg,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}

/**
 * 全市各区企业复工率趋势
 * @param params
 */
export function getGdqFglqs(params) {
    return request({
        url: config.url.ztqkxz.gdq_fglqs,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}


/**
 * 某天各区复工率
 * @param params
 */
export function getGdqMtfglqs(params) {
    return request({
        url: config.url.ztqkxz.gdq_mtfglqs,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}


/**
 * 各区复工率趋势表格
 * @param params
 */
export function getGdqFgqkbg(params) {
    return request({
        url: config.url.ztqkxz.gdq_fgqkbg,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}


/**
 * 导出Excel
 * @param params
 */
export function downloadExcel(params) {
    return request({
        url: config.url.ztqkxz.exportbg,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}

/**
 * 全市各行业复工率趋势
 * @param params
 */
export function getGhyFglqs(params) {
    return request({
        url: config.url.ztqkxz.ghy_fglqs,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}

/**
 * 某天各行业复工率
 * @param params
 */
export function getGhyMtfglqs(params) {
    return request({
        url: config.url.ztqkxz.ghy_mtfglqs,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}


/**
 * 各行业复工率趋势表格
 * @param params
 */
export function getGhyFgqkbg(params) {
    return request({
        url: config.url.ztqkxz.ghy_fgqkbg,
        method: config.methodGet,
        params: {
            time: new Date().getTime(),
            ...params
        }
    })
}
