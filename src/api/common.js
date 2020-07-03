import request from './axios'
import config from './config'

export function getMapSvg() {
    return request({
        url: config.url.common.mapSvg,
        method: config.methodGet,
        responseType: 'text',
        params: {
            time: new Date().getTime(),
        }
    })
}