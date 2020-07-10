/**
 *@file config.js
 *@version 1.0.1
 *@author ylei
 *@createTime 2020/06/30 - 20:37
 *@updateTime 2020/06/30 - 20:37
 *@see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}
 *@description    config.js ,所有的配置文件
 *                      详细说明看注释  !important
 */
// 默认开发环境
const develop = false;
//
const config = {
    //  是否是调试模式，true 为json数据，false 为服务器数据
    isDebug: develop,
    // ajax查询方式   GET
    methodGet: 'GET',
    // ajax查询方式  POST
    methodPost: develop ? 'GET' : 'POST',
    // ajax查询方式  PUT
    methodPut: develop ? 'GET' : 'PUT',
    // ajax查询方式  DELETEsocketio
    methodDelete: develop ? 'GET' : 'DELETE',
    // ajax查询方式  PATCH
    methodPatch: develop ? 'GET' : 'PATCH',
    //  url链接,也就是数据的地址
    url: {},
    // 是否显示日志
    showLog: false,
};
// 本地数据
const localUrl = {
    common: {
        mapSvg: 'svg/map-110000-2.svg',
    },
    // 整体情况
    ztqk: {
        // 国办平台
        fgfcl: 'json/ztqk/fgfcl.json',
        // 重点项目
        zdgcData: 'json/ztqk/zdgcData.json',
        // 商务楼宇
        swlyData: 'json/ztqk/swlyData.json',

        // 复工复产
        fgfczsData: 'json/ztqk/fgfczsData.json',
        // 趋势对比
        qsdbData: 'json/ztqk/qsdbData.json',

        // 重点领域
        zdly: 'json/ztqk/zdly.json',
        // 国电企业 - 所有区
        syq: 'json/ztqk/syq.json',
        // 国电企业 - 行业
        ghy: 'json/ztqk/ghy.json',
    }
};

// 服务数据
const serverUrl = {
    common: {
        mapSvg: 'svg/map-110000-2.svg',
    },
    // 整体情况
    ztqk: {
        // 国办平台
        fgfcl: '/api/v1/fgfcl',
        // 重点项目
        zdgcData: '/api/v1/zdgcData',
        // 商务楼宇
        swlyData: '/api/v1/swlyData',

        // 复工复产
        fgfczsData: '/api/v1/fgfczsData',
        // 趋势对比
        qsdbData: '/api/v1/qsdbData',

        // 重点领域
        zdly: '/api/v1/zdly',
        // 国电企业 - 所有区
        syq: '/api/v1/gdqy/syq',
        // 国电企业 - 行业
        ghy: '/api/v1/gdqy/ghy',
    }
};

config.url = config.isDebug ? localUrl : serverUrl;

export default config
