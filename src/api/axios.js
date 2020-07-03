import axios from 'axios';
// 创建axios实例
let service = axios.create({
    //baseURL: 'http://yapi.thunisoft.com/mock/2716',
    baseURL: '',
    timeout: 50000, // 请求超时时间
})

/**
 * request拦截器
 */
service.interceptors.request.use(config => {
    return config
}, error => Promise.reject(error))

/**
 * response拦截器
 */
service.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error)
)
export default service
