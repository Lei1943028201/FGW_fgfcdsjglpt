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
        /**
         * 左侧数据
         */
        fgfcl: 'json/ztqk/fgfcl.json',          // 国办平台
        zdgcData: 'json/ztqk/zdgcData.json',    // 重点项目
        swlyData: 'json/ztqk/swlyData.json',    // 商务楼宇
        /**
         * 中间数据
         */
        fgfczsData: 'json/ztqk/fgfczsData.json',// 复工复产
        qsdbData: 'json/ztqk/qsdbData.json',    // 趋势对比
        /**
         * 右侧数据
         */
        zdly: 'json/ztqk/zdly.json',            // 重点领域
        syq: 'json/ztqk/syq.json',              // 国电企业 - 所有区
        ghy: 'json/ztqk/ghy.json',              // 国电企业 - 行业
    },
    /* 整体情况下钻页接口 */
    ztqkxz: {
        /**
         * 左侧数据
         */

        /**
         * 中间数据
         */
        sxtj: 'json/ztqkxz/sxtj.json',                      // 筛选条件
        gdq_fgfczsqs: 'json/ztqkxz/gdq_fgfczsqs.json',      // 全市各区企业复工指数趋势
        gdq_mtfgfczs: 'json/ztqkxz/gdq_mtfgfczs.json',      // 某天各区复工复产指数
        gdq_fgfczsqsbg: 'json/ztqkxz/gdq_fgfczsqsbg.json',  // 各区复工复产指数趋势表格
        ghy_fgfczsqs: 'json/ztqkxz/ghy_fgfczsqs.json',      // 全市各行业复工指数趋势
        ghy_mtfgfczs: 'json/ztqkxz/ghy_mtfgfczs.json',      // 某天各行业复工复产指数
        ghy_fgfczsqsbg: 'json/ztqkxz/ghy_fgfczsqsbg.json',  // 各行业复工复产指数趋势表格
        /**
         * 右侧数据
         */
        glysj: 'json/ztqkxz/glysj.json',                    // 筛选条件
        gbmly: 'json/ztqkxz/gbmly.json',                    // 获取各部门领域
        glyfglqs: 'json/ztqkxz/glyfglqs.json',              // 各领域复工率趋势
        mtglyfgl: 'json/ztqkxz/mtglyfgl.json',              // 某天各领域复工率
        glyfglqsbg: 'json/ztqkxz/glyfglqsbg.json',         // 各领域复工率趋势表格
        gdq_fglqs: 'json/ztqkxz/gdq_fglqs.json',            // 全市各区企业复工率趋势
        gdq_mtfglqs: 'json/ztqkxz/gdq_mtfglqs.json',        // 某天各区复工率
        gdq_fgqkbg: 'json/ztqkxz/gdq_fgqkbg.json',          // 各区复工率趋势表格
        exportbg: 'json/ztqkxz/exportbg.json',    // 各区复工率趋势表格-导出Excel
        ghy_fglqs: 'json/ztqkxz/ghy_fglqs.json',            // 全市各行业复工率趋势
        ghy_mtfglqs: 'json/ztqkxz/ghy_mtfglqs.json',        // 某天各行业复工率
        ghy_fgqkbg: 'json/ztqkxz/ghy_fgqkbg.json',          // 各行业复工率趋势表格
    }
};

// 服务数据
const serverUrl = {
    common: {
        mapSvg: 'svg/map-110000-2.svg',
    },
    // 整体情况
    ztqk: {
        /**
         * 左侧数据
         */

        fgfcl: '/api/v1/fgfcl',         // 国办平台
        zdgcData: '/api/v1/zdgcData',   // 重点项目
        swlyData: '/api/v1/swlyData',   // 商务楼宇
        /**
         * 中间数据
         */
        fgfczsData: '/api/v1/fgfczsData',// 复工复产
        qsdbData: '/api/v1/qsdbData',   // 趋势对比
        /**
         * 右侧数据
         */
        zdly: '/api/v1/zdly',           // 重点领域
        syq: '/api/v1/gdqy/syq',        // 国电企业 - 所有区
        ghy: '/api/v1/gdqy/ghy',        // 国电企业 - 行业
    },
    ztqkxz: {
        /**
         * 左侧数据
         */

        /**
         * 中间数据
         */
        sxtj: '/api/v1/fgfcxzym/sxtj',                      // 筛选条件
        gdq_fgfczsqs: '/api/v1/fgfcxzym/gdq/fgfczsqs',      // 全市各区企业复工指数趋势
        gdq_mtfgfczs: '/api/v1/fgfcxzym/gdq/mtfgfczs',      // 某天各区复工复产指数
        gdq_fgfczsqsbg: '/api/v1/fgfcxzym/gdq/fgfczsqsbg',  // 各区复工复产指数趋势表格
        ghy_fgfczsqs: '/api/v1/fgfcxzym/ghy/fgfczsqs',      // 全市各行业复工指数趋势
        ghy_mtfgfczs: '/api/v1/fgfcxzym/ghy/mtfgfczs',      // 某天各行业复工复产指数
        ghy_fgfczsqsbg: '/api/v1/fgfcxzym/ghy/fgfczsqsbg',  // 各行业复工复产指数趋势表格
        /**
         * 右侧数据
         */
        glysj: '/api/v1/zdly/glysj',                    // 筛选条件
        gbmly: '/api/v1/zdly/gbmly',                    // 获取各部门领域
        glyfglqs: '/api/v1/zdly/glyfglqs',              // 各领域复工率趋势
        mtglyfgl: '/api/v1/zdly/mtglyfgl',              // 某天各领域复工率
        glyfglqsbg: '/api/v1/zdly/glyfglqs/bg',         // 各领域复工率趋势表格
        gdq_fglqs: '/api/v1/gdqy/gdq/fglqs',            // 全市各区企业复工率趋势
        gdq_mtfglqs: '/api/v1/gdqy/gdq/mtfglqs',        // 某天各区复工率
        gdq_fgqkbg: '/api/v1/gdqy/gdq/fgqkbg',          // 各区复工率趋势表格
        exportbg: '/api/v1/zdly/glyfglqs/bg/export',    // 各区复工率趋势表格-导出Excel
        ghy_fglqs: '/api/v1/gdqy/ghy/fglqs',            // 全市各行业复工率趋势
        ghy_mtfglqs: '/api/v1/gdqy/ghy/mtfglqs',        // 某天各行业复工率
        ghy_fgqkbg: '/api/v1/gdqy/ghy/fgqkbg',          // 各行业复工率趋势表格
    }
};

config.url = config.isDebug ? localUrl : serverUrl;

export default config
