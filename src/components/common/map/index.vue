<template>
    <div class="fd-map" id="jsMap2">
        <div class="fd-bar-map-wrapper">
            <div class="fd-tooltip">
                <p class="fd-name">丰台</p>
                <p>国网北分：<span class="fd-value-01">78.11</span></p>
                <p>市经信局：<span class="fd-value-02">78.11</span></p>
                <p>确诊人数：<span class="fd-value-03">2</span>人</p>
            </div>
            <!-- 地图绘制容器 -->
            <div class="fd-bar-map-render-wrapper" ref="barMap"></div>
        </div>
    </div>
</template>
<!--js-->
<script>
    /**
     * @version 1.0.1
     * @author wanghf  <wuwg@thunisoft.com>
     * @createTime:2019-11-15,
     * @updateTime:2019-11-15
     * @copyright thunisoft fd
     * @description  *  [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}
     *  [jsdoc-vuejs]{@link  http://npm.taobao.org/package/jsdoc-vuejs}  -
     */
    import $ from 'jquery'
    // 引入圆圈图片
    import imgCircle from './images/img-map-circle.png';
    // 引入混入方法
    import mapHandler from './extend/mapHandler';
    import {getMapSvg} from '../../../api/common'

    export default {
        name: 'appCommonDataMap',
        // 混入
        mixins: [mapHandler],
        props: {
            // 图例名称
            legendName: {type: String},
            // 地图id
            mapId: {
                type: String,
                default: '110000'
            },
            // 数据
            mapData: {
                type: Array,
                default() {
                    return [
                        {
                            "name": "平谷区",
                            "code": "110117",
                            "val": 280
                        }, {
                            "name": "通州区",
                            "code": "110112",
                            "val": 280
                        }, {
                            "name": "东城区",
                            "code": "110101",
                            "val": 280
                        }, {
                            "name": "海淀区",
                            "code": "110108",
                            "val": 280
                        }, {
                            "name": "昌平区",
                            "code": "110114",
                            "val": 280
                        }, {
                            "name": "朝阳区",
                            "code": "110105",
                            "val": 280
                        }, {
                            "name": "顺义区",
                            "code": "110113",
                            "val": 280
                        }, {
                            "name": "房山区",
                            "code": "110111",
                            "val": 280
                        }, {
                            "name": "西城区",
                            "code": "110102",
                            "val": 280
                        }, {
                            "name": "丰台区",
                            "code": "110106",
                            "val": 280
                        }, {
                            "name": "大兴区",
                            "code": "110115",
                            "val": 280
                        }, {
                            "name": "门头沟区",
                            "code": "110109",
                            "val": 280
                        }, {
                            "name": "密云区",
                            "code": "110228",
                            "val": 280
                        },
                        {
                            "name": "怀柔区",
                            "code": "110116",
                            "val": 280
                        }, {
                            "name": "延庆区",
                            "code": "110229",
                            "val": 280
                        }, {
                            "name": "石景山区",
                            "code": "110107",
                            "val": 280
                        }
                    ];
                }
            },
            // 类型
            type: {
                type: String,
                default: 'bar'
            },
            // 地图参数
            mapStyle: {
                type: Object,
                default() {
                    return {
                        // 区域地图
                        areaMap: {
                            fill: 'rgba(20 , 67, 147, 1)',
                            stroke: 'rgba(7,22,49,0.75)',
                            activeStroke: '#239569',
                            // activeStroke: 'rgba(0,0,255,1)',
                            strokeWidth: 2,
                            hoverFill: 'rgba(25,167,253,1)',
                            activeFill: '#1c477e'
                        },
                        circle: {
                            stroke: 'rgba(0,70,156,1)',
                            r: 3,
                            fill: '#fff45c'
                        },
                        textStyle: {
                            fontSize: 28,
                            fill: '#c6d5f4',
                            hoverFill: '#fff'
                        },
                        lineStyle: {
                            stroke: '#dfc6bd',
                            strokeWidth: 2
                        },
                        // 数据文本
                        dataTextStyle: {
                            fontSize: 24,
                            fill: '#3d1f15',
                            hoverFill: '#fff'
                        }
                    };
                }
            },
            // 区域地图颜色
            areaMapColor: {
                type: Array,
                default() {
                    return [
                        '#0aa2ff',
                        '#0a9efb',
                        '#0999f5',
                        '#0999f5',
                        '#088ce6',
                        '#088ce6',
                        '#067bd5',
                        '#0573cb',
                        '#056bc2',
                        '#0462b9',
                        '#035aaf',
                        '#0252a7',
                        '#014b9f',
                        '#014498',
                        '#003f92',
                        '#003c8f',
                    ];
                }
            },
            // 地图灰色颜色
            gray: {
                type: String,
                default: 'rgba(128,128,128,1)'
            },
            // 地图灰色线条颜色
            grayStroke: {
                type: String,
                default: '#333'
            },
            // 文本偏移量
            textNameOffset: {
                type: Number,
                default: 10
            },
            textNameOffsetLine: {
                type: Number,
                default: 5
            },
            // mapid 的前缀
            mapidPrefix: {
                type: String,
                default: 'js-mapid-'
            },
            // 颜色拆分的粒度
            STEPS: {
                type: Number,
                default: 16
            },
            // 最大高度
            barMaxHeight: {
                type: Number,
                default: 100
            },
            // 最小高度
            barMinHeight: {
                type: Number,
                default: 5
            },
            // 是否伸出
            isStretchOut: {
                type: Boolean,
                default: false
            },
            // 图形偏移量
            chartsOffset: {
                type: Number,
                default: 40
            },
            // 展现top数值
            chartsTop: {
                type: Number,
                default: 5
            },
            // 双击事件
            dblclickCallback: {
                type: Function,
                default() {
                    //
                }
            },
            // 加载完执行的回调函数
            readyCallback: {
                type: Function,
                default() {
                    //
                }
            },
            // 活跃的回调函数
            activeCallback: {
                type: Function,
                default() {
                    //
                }
            }
        },
        data() {
            return {
                overlapStreet: [
                    // 重叠新街乡镇
                    '110112210',
                    '110106018',
                    '110106019',
                    '110106020'
                ],
                overlapOldStreet: [
                    // 重叠旧街乡镇
                    '110112119',
                    '110106004',
                    '110106010',
                    '110106008'
                ],
                // 新街乡镇对应旧街乡镇
                '110112210': {code: '110112119'},
                '110106018': {code: '110106004'},
                '110106019': {code: '110106010'},
                '110106020': {code: '110106008'},
                // 旧街乡镇对应新街乡镇
                '110112119': {code: '110112210'},
                '110106004': {code: '110106018'},
                '110106010': {code: '110106019'},
                '110106008': {code: '110106020'},
                // 地图snap对象
                snap: null,
                // 地图容器
                mapContain: null,
                // 透视图组
                perspectiveGroup: null,
                // 地图视窗
                viewBox: null,
                // 地图的比值
                mapRatio: 0,
                // 地图字体大小
                mapStyleFontSize: 0,
                // 地图数据字体大小
                mapStyleDataFontSize: 0,
                // 圆半径
                mapStyleCircleR: 0,
                // 地图边框粗细
                mapStyleStrokeWidth: 0,
                mapStyleLineStrokeWidth: 0,
                strokeDasharray: 0,
                strokeDashoffset: 0,
                // 缩放比例
                scale: 1,
                // 地图区域最大值
                areaMapMaxValue: 0,
                // 地图区域最小值
                areaMapMinValue: 0,
                // 地图区域最大值
                areaMapMaxValue2: 0,
                // 地图区域最小值
                areaMapMinValue2: 0,
                // 圆圈图片宽
                circleImgW: 188,
                // 圆圈图片高
                circleImgH: 188,
                highLineStroke: '#f00',
                highLineStrokeWidth: 3,
                // 区域线条样式
                areaLineStyle: {
                    x1: 140,
                    x2: 100,
                    y: 100
                },
                // 类型映射对象
                typeMap: {
                    // 柱状图
                    bar: {
                        // 柱状图
                        name: 'bar',
                        // 地图元素
                        areaMap: 'areaMapBar',
                        // 地图组
                        areaMapGroup: 'areaMapBarGroup',
                        // 创建方法
                        createFun: 'createAreaMapBar',
                        // 更新方法
                        updateFun: 'updateDataBar',
                        // 更新对应的样式方法
                        updateStyleFun: 'updateAreaMapBarStyle'
                    }
                },
                // 区域背景
                areaMapBj: null,
                // 地图数据
                areaMapDataSource: [],
                // 地图区域
                areaMap: {},
                // 地图数据
                areaMapData: {},
                // 中心点
                areaMapCircle: {},
                // 圆
                areaMapCircleImgGroup: null,
                // 中心圆图片
                areaMapCircleImg: {},
                // 地图线条
                areaMapLine: {},
                // 柱状图组
                areaMapBarGroup: null,
                // 柱子数据
                areaMapBar: {},
                // 高亮的地图线组
                areaMapHighLineGroup: null,
                // 高亮的地图线对象
                areaMapHighLine: {},
                // 区域伸出来的线条组
                areaStretchOutLineGroup: null,
                // 区域伸出来的线条对象
                areaStretchOutLine: {},
                // 激活的区域
                activeAreaMap: null,
                // 高亮的区域
                highLightAreaMap: null,
                // 图例数据
                legendData: [],
                legendMaxValue: 0
            };
        },
        computed: {
            // 透视盒子
            perspectiveBox() {
                return this.perspectiveGroup ? this.perspectiveGroup.getBBox() : null;
            }
        },
        methods: {
            init() {
                const _this = this;
                this.requestSvgMap(data => {
                    _this.$nextTick(() => {
                        _this.$refs.barMap.innerHTML = data;
                        _this.initial();
                    });
                });
            },
            // 请求svg地图
            requestSvgMap(callback) {
                getMapSvg().then(res => {
                    if (Object.prototype.toString.call(callback) === '[object Function]') {
                        callback(res);
                    }
                })
            },
            initial: function () {
                const _this = this;
                // 销毁 重置一下变量
                _this.destory();

                // 初始化snap对象
                this.initSnap();

                // 初始化参数,全局可以访问的所有变量
                _this.initParams();

                // 初始化地图，这里会获取到所有的区域地图对象，和中心点对象
                _this.initialAreaMap();
                // 增加交互效果
                _this.addAreaMapInteraction();
                // 如果存在线，那么线应该在圆圈之前
                if (_this.areaMapLineGroup) {
                    if (!_this.snap) {
                        return
                    }
                    _this.snap.select('#js-circle-gourp').before(_this.areaMapLineGroup);
                }
                // 点击之后的回调函数
                if (Object.prototype.toString.call(_this.readyCallback) === '[object Function]') {
                    _this.readyCallback();
                }
                // 第一次更新数据
                _this.updateData(_this.mapData);
            },
            // 初始化Snap对象
            initSnap() {
                // 地图snap对象赋值
                this.snap = Snap(`#jsSvg${this.mapId}`);
                // 设置默认的pointer-events属性
                if (this.snap) {
                    this.snap.attr({
                        width: '100%',
                        height: '100%',
                        'pointer-events': 'auto'
                    });
                }
            },
            // 初始化参数
            initParams: function () {
                const _this = this;
                // 是否显示错误日志
                //  perspective group 组
                if (!_this.snap) {
                    return
                }
                _this.perspectiveGroup = _this.snap.select('#js-perspective-group');
                // 视窗对象
                _this.viewBox = _this.snap.attr('viewBox');
                // 如果拉线
                if (_this.isStretchOut) {
                    const _width = _this.viewBox.width;
                    const _height = _this.viewBox.height;
                    _this.snap.attr('viewBox', `${-(_width * 0.08)} ${-(_height * 0.08)} ${_width / 0.84} ${_height / 0.84}`);
                }
                // 视窗对象
                _this.viewBox = _this.snap.attr('viewBox');
                // 视窗对象
                _this.viewBox = _this.snap.attr('viewBox');
                // 地图的比值
                _this.mapRatio = _this.getMapRatio();
                // 根据不同的尺寸设置不同的样式
                _this.changeMapStyle();
                // 背景
                _this.areaMapBj = _this.snap.select('#js-svg-bg');
                if (_this.areaMapBj) {
                    const _shadow = _this.snap.paper.filter(Snap.filter.blur(10));
                    _this.areaMapBj.attr({
                        fill: 'rgba(52,188,233,0.8)',
                        stroke: 'rgba(52,188,233,0.8)',
                        filter: _shadow
                    });
                }
            },
            // 设置缩放大小
            setScale: function (scale) {
                // 如果没有缩放，则跳出函数
                if (scale === this.scale) {
                    return;
                }
                this.scale = scale;
                // 获取比率
                this.mapRatio = this.getMapRatio();
                // 更新地图样式
                this.updateMapStyle();
            },
            // 获取地图的比值
            getMapRatio: function () {
                const _this = this;
                const _scale = this.scale;
                // var _relativeWidth = _mapContain.clientWidth * _scale;
                const _relativeWidth = $(window).width() * _scale;
                const _relativeHeight = $(window).height() * _scale;
                // var _relativeHeight = _mapContain.clientHeight * _scale;
                const _ratio = Math.min(_this.viewBox.width / _relativeWidth, _this.viewBox.height / _relativeHeight);
                // 如果是pc端则直接返回ratio，否则移动端取其2/3
                // eslint-disable-next-line no-magic-numbers
                if ($(window).width() > 1280) {
                    return _ratio;
                }
                // alert('上一次ratio:' + this.mapRatio + ' 这一次ratio' + _ratio)
                // eslint-disable-next-line no-magic-numbers
                return _ratio * 2 / 3;
            },
            // 修改地图外观参数
            changeMapStyle: function () {
                const _this = this;
                // 设置地图字体大小
                _this.mapStyleFontSize = _this.mapStyle.textStyle.fontSize * _this.mapRatio;
                // 设置地图数据字体大小
                _this.mapStyleDataFontSize = _this.mapStyle.dataTextStyle.fontSize * _this.mapRatio;
                // 圆半径
                _this.mapStyleCircleR = _this.mapStyle.circle.r * _this.mapRatio;
                // areaMap边框
                _this.mapStyleStrokeWidth = _this.mapStyle.areaMap.strokeWidth * _this.mapRatio;
                // areaMapLine 边框
                _this.mapStyleLineStrokeWidth = _this.mapStyle.lineStyle.strokeWidth * _this.mapRatio;
                // dashArray 间距
                // eslint-disable-next-line no-magic-numbers
                _this.strokeDasharray = 4 * _this.mapRatio;
                _this.strokeDashoffset = _this.mapRatio;
            },
            //  更新地图演示
            updateMapStyle: function () {
                // 更新样式
                this.changeMapStyle();
                // 更新背景颜色
                this.updateBjStyle();
                // 更新地图路径边框
                this.updateAreaMapStyle();
                // 更新地图上的圆半径
                // this.updateAreaMapCircleStyle();
                // 更新地图上的文字大小 （区域文本）
                this.updateAreaMapTextStyle();
                // 更新地图线
                this.updateAreaMapLineStyle();
                // 更新地图上的圆半径
                this.updateAreaMapCircleImgStyle();
                // 更新伸出来的线条样式
                this.updateAreaStretchOutLineStyle();
                // 更新柱状图样式
                // 执行对应类型的更新样式方法
                this[this.typeMap['bar'].updateStyleFun]();
                // 更新高亮的线条
                this.updateHighLineStyle();
            },

            // 更新背景样式
            updateBjStyle() {
                const _this = this;
                if (_this.areaMapBj) {
                    // eslint-disable-next-line no-magic-numbers
                    _this.areaMapBj.attr({strokeWidth: 3 * _this.mapRatio});
                }
            },
            // 更新高亮的线条样式
            updateHighLineStyle() {
                const _this = this;
                if (this.areaMapHighLineGroup) {
                    $.each(this.areaMapHighLine, (key, item) => {
                        item.line.attr({strokeWidth: _this.highLineStrokeWidth * _this.mapRatio});
                        item.circle.attr({
                            // eslint-disable-next-line no-magic-numbers
                            x: item.line.attr('points')[0] - _this.circleImgW * _this.mapRatio / 2,
                            // eslint-disable-next-line no-magic-numbers
                            y: item.line.attr('points')[1] - _this.circleImgH * _this.mapRatio / 2,
                            width: _this.circleImgW * _this.mapRatio,
                            height: _this.circleImgH * _this.mapRatio
                        });
                    });
                }
            },
            // 更新地图路径边框
            updateAreaMapStyle: function () {
                const _this = this;
                $.each(_this.areaMap, function (name, value) {
                    // 是区域块，需要进行循环绑定
                    if (Array.isArray(value)) {
                        value.forEach(function (item) {
                            // 边线大小
                            item.attr({strokeWidth: _this.mapStyleStrokeWidth});
                        });
                    } else {
                        // 边线大小
                        value.attr({strokeWidth: _this.mapStyleStrokeWidth});
                    }
                });
            },

            // 更新地图上的文字大小 （包含区域和数据文本）
            updateAreaMapTextStyle: function () {
                const _this = this;
                const fontSize = _this.mapStyleFontSize;
                // 区域名称
                if (_this.areaMapText) {
                    $.each(_this.areaMapText, function (name, value) {
                        // 边线大小
                        value.attr({'font-size': `${fontSize}px`});
                    });
                }
            },
            // 更新地图线
            updateAreaMapLineStyle: function () {
                const _this = this;
                if (_this.areaMapLine) {
                    $.each(_this.areaMapLine, function (name, value) {
                        const _mapId = value.data('mapid');
                        // 获取象限的值
                        const _quadrant = value.data('quadrant');
                        const _areaMapCircle = _this.areaMapCircle[_this.mapidPrefix + _mapId];
                        // 圆心坐标
                        const _cx = parseFloat(_areaMapCircle.attr('cx'));
                        const _cy = parseFloat(_areaMapCircle.attr('cy'));
                        const _coords = [[_cx, _cy]];
                        // 中间点
                        const _middleCoords = [_cx, _cy];
                        // 结束点
                        const _endCoords = [_cx, _cy];
                        if (_quadrant === 1) {
                            // 中间点
                            _middleCoords[0] = _cx - _this.mapRatio * _this.areaLineStyle.x1;
                            _middleCoords[1] = _cy + _this.mapRatio * _this.areaLineStyle.y;

                            // 结束点
                            _endCoords[0] = _middleCoords[0] - _this.mapRatio * _this.areaLineStyle.x2;
                            _endCoords[1] = _middleCoords[1];
                            // eslint-disable-next-line no-magic-numbers
                        } else if (_quadrant === 2) {
                            // 中间点
                            _middleCoords[0] = _cx + _this.mapRatio * _this.areaLineStyle.x1;
                            _middleCoords[1] = _cy + _this.mapRatio * _this.areaLineStyle.y;

                            // 结束点
                            _endCoords[0] = _middleCoords[0] + _this.mapRatio * _this.areaLineStyle.x2;
                            _endCoords[1] = _middleCoords[1];
                            // eslint-disable-next-line no-magic-numbers
                        } else if (_quadrant === 3) {
                            // 中间点
                            _middleCoords[0] = _cx + _this.mapRatio * _this.areaLineStyle.x1;
                            _middleCoords[1] = _cy - _this.mapRatio * _this.areaLineStyle.y;

                            // 结束点
                            _endCoords[0] = _middleCoords[0] + _this.mapRatio * _this.areaLineStyle.x2;
                            _endCoords[1] = _middleCoords[1];
                        } else {
                            // 中间点
                            _middleCoords[0] = _cx - _this.mapRatio * _this.areaLineStyle.x1;
                            _middleCoords[1] = _cy - _this.mapRatio * _this.areaLineStyle.y;

                            // 结束点
                            _endCoords[0] = _middleCoords[0] - _this.mapRatio * _this.areaLineStyle.x2;
                            _endCoords[1] = _middleCoords[1];
                        }
                        _coords.push(_middleCoords);
                        _coords.push(_endCoords);
                        value.attr({
                            d: _this.getLinePathByCoord(_coords),
                            strokeWidth: _this.highLineStrokeWidth * _this.mapRatio
                        });
                    });
                }
            },
            // 更新地图伸出来的线样式
            updateAreaStretchOutLineStyle: function () {
                const _this = this;
                if (_this.isStretchOut) {
                    $.each(_this.areaStretchOutLine, function (name, value) {
                        value.attr({strokeWidth: _this.highLineStrokeWidth * _this.mapRatio});
                    });
                }
            },
            // 更新地图上的圆半径
            updateAreaMapCircleImgStyle: function () {
                const _this = this;
                if (this.areaMapCircleImgGroup) {
                    $.each(this.areaMapCircleImg, (key, item) => {
                        const _mapId = item.data('mapid');
                        const _areaMapCircle = _this.areaMapCircle[_this.mapidPrefix + _mapId];
                        item.attr({
                            x: parseFloat(_areaMapCircle.attr('cx')) - _this.circleImgW * _this.mapRatio / 2,
                            y: parseFloat(_areaMapCircle.attr('cy')) - _this.circleImgH * _this.mapRatio / 2,
                            width: _this.circleImgW * _this.mapRatio,
                            height: _this.circleImgH * _this.mapRatio
                        });
                    });
                }
            },

            // 更新柱状图的样式
            updateAreaMapBarStyle() {
                const _this = this;
                const dataTextfontSize = _this.mapStyleDataFontSize;
                // 数据
                $.each(_this.areaMapDataSource, function (index, value) {
                    const _mapId = value.code;
                    if (_this.isStretchOut && index >= _this.chartsTop) {
                        return false;
                    }
                    if (_this.areaMapBar[_this.mapidPrefix + _mapId] && value.val > 0) {
                        let _eCx = 0;
                        let _eCy = 0;
                        if (_this.isStretchOut && _this.areaStretchOutLine[_this.mapidPrefix + _mapId]) {
                            // 拉出来的线
                            const _stretchOutLine = _this.areaStretchOutLine[_this.mapidPrefix + _mapId];
                            const _direction = _stretchOutLine.data('direction');
                            const _quadrant = _stretchOutLine.data('quadrant');
                            const _endCoords = _stretchOutLine.data('endCoords');
                            _eCx = _direction === 'horizontal' ? ((_quadrant === 1 || _quadrant === 4) ? (_endCoords[0] + _this.chartsOffset * _this.mapRatio) : (_endCoords[0] - _this.chartsOffset * _this.mapRatio)) : _endCoords[0];
                            _eCy = _endCoords[1];

                            // 区域文本
                            _this.areaMapText[_this.mapidPrefix + _mapId].attr({'dominant-baseline': 'text-before-edge'});
                        } else {
                            const _areaMapCircle = _this.areaMapCircle[_this.mapidPrefix + _mapId];
                            _eCx = parseFloat(_areaMapCircle.attr('cx'));
                            _eCy = parseFloat(_areaMapCircle.attr('cy'));
                            // 区域文本
                            _this.areaMapText[_this.mapidPrefix + _mapId].attr({'dominant-baseline': 'middle'});
                        }
                        // 区域文本
                        _this.areaMapText[_this.mapidPrefix + _mapId].attr({
                            x: _eCx,
                            y: _eCy
                        });
                        // eslint-disable-next-line no-magic-numbers
                        _eCy -= 30 * _this.mapRatio;
                        // 椭圆1
                        //_this.areaMapBar[_this.mapidPrefix + _mapId].ellipse1.attr({
                        //    cx: _eCx,
                        //    cy: _eCy,
                        //    // eslint-disable-next-line no-magic-numbers
                        //    rx: 33 * _this.mapRatio,
                        //    // eslint-disable-next-line no-magic-numbers
                        //    ry: 16 * _this.mapRatio,
                        //    // eslint-disable-next-line no-magic-numbers
                        //    strokeWidth: 2 * _this.mapRatio
                        //});
                        // 椭圆2
                        _this.areaMapBar[_this.mapidPrefix + _mapId].ellipse2.attr({
                            // eslint-disable-next-line no-magic-numbers
                            cx: _eCx - 10 * _this.mapRatio,
                            // eslint-disable-next-line no-magic-numbers
                            cy: _eCy - 5 * _this.mapRatio,
                            // eslint-disable-next-line no-magic-numbers
                            rx: 10 * _this.mapRatio,
                            // eslint-disable-next-line no-magic-numbers
                            ry: 10 * _this.mapRatio,
                            strokeWidth: '0'
                        });
                        // 椭圆3
                        //_this.areaMapBar[_this.mapidPrefix + _mapId].ellipse3.attr({
                        //    // eslint-disable-next-line no-magic-numbers
                        //    cx: _eCx + 10 * _this.mapRatio,
                        //    // eslint-disable-next-line no-magic-numbers
                        //    cy: _eCy - 5 * _this.mapRatio,
                        //    // eslint-disable-next-line no-magic-numbers
                        //    rx: 10 * _this.mapRatio,
                        //    // eslint-disable-next-line no-magic-numbers
                        //    ry: 10 * _this.mapRatio,
                        //    strokeWidth: '0'
                        //});
                        const _height = _this.areaMapBar[_this.mapidPrefix + _mapId].bar.data('height');
                        // 柱子高度
                        _this.areaMapBar[_this.mapidPrefix + _mapId].bar.attr({
                            // eslint-disable-next-line no-magic-numbers
                            x: _eCx - 20 * _this.mapRatio,
                            // eslint-disable-next-line no-magic-numbers
                            y: _eCy - 5 - _height * _this.mapRatio,
                            // eslint-disable-next-line no-magic-numbers
                            width: 20 * _this.mapRatio,
                            height: _height * _this.mapRatio
                        });

                        //const _height1 = _this.areaMapBar[_this.mapidPrefix + _mapId].bar1.data('height');
                        //// 柱子高度
                        //_this.areaMapBar[_this.mapidPrefix + _mapId].bar1.attr({
                        //    x: _eCx,
                        //    // eslint-disable-next-line no-magic-numbers
                        //    y: _eCy - 5 - 0 * _this.mapRatio,
                        //    // eslint-disable-next-line no-magic-numbers
                        //    width: 20 * _this.mapRatio,
                        //    height: 0 * _this.mapRatio
                        //});

                        // 柱子椭圆
                        _this.areaMapBar[_this.mapidPrefix + _mapId].barEllipse.attr({
                            // eslint-disable-next-line no-magic-numbers
                            cx: _eCx - 11 * _this.mapRatio,
                            // eslint-disable-next-line no-magic-numbers
                            cy: _eCy - 5 - _height * _this.mapRatio,
                            // eslint-disable-next-line no-magic-numbers
                            rx: 10 * _this.mapRatio,
                            // eslint-disable-next-line no-magic-numbers
                            ry: 5 * _this.mapRatio
                        });
                        // 柱子椭圆2
                        //_this.areaMapBar[_this.mapidPrefix + _mapId].barEllipse2.attr({
                        //    // eslint-disable-next-line no-magic-numbers
                        //    cx: _eCx + 10 * _this.mapRatio,
                        //    // eslint-disable-next-line no-magic-numbers
                        //    cy: _eCy - 5 - _height1 * _this.mapRatio,
                        //    // eslint-disable-next-line no-magic-numbers
                        //    rx: 10 * _this.mapRatio,
                        //    // eslint-disable-next-line no-magic-numbers
                        //    ry: 5 * _this.mapRatio
                        //});
                        // 文本
                        _this.areaMapBar[_this.mapidPrefix + _mapId].dataText.attr({
                            x: _eCx,
                            // eslint-disable-next-line no-magic-numbers
                            y: _eCy - (_height + 20) * _this.mapRatio,
                            fontSize: `${dataTextfontSize}px`
                        });
                        $(`#js-mapid-${_mapId}-textValue`).css({fontSize: `${dataTextfontSize}px`});
                        // 如果拉线，更新文本的位置
                        _this.updateAreaChartsPosition(_this.areaMapBar[_this.mapidPrefix + _mapId].group, _mapId);
                    }
                });
            },

            // 更新区域图形的位置
            updateAreaChartsPosition(chartsGroup, mapId) {
                const _this = this;
                // 如果拉线
                if (_this.isStretchOut && _this.areaStretchOutLine[_this.mapidPrefix + mapId]) {
                    const _stretchOutLine = _this.areaStretchOutLine[_this.mapidPrefix + mapId];
                    const _quadrant = _stretchOutLine.data('quadrant');
                    const _direction = _stretchOutLine.data('direction');
                    // eslint-disable-next-line no-magic-numbers
                    if (_direction === 'vertical' && (_quadrant === 3 || _quadrant === 4)) {
                        const _transform = `translate(0, ${chartsGroup.getBBox().height})`;
                        chartsGroup.attr({transform: _transform});
                        _this.areaMapText[_this.mapidPrefix + mapId].attr({transform: _transform});
                    } else {
                        chartsGroup.attr({transform: 'none'});
                    }
                }
            },
            // 初始化地图
            initialAreaMap: function () {
                const _this = this;
                if (!_this.snap) {
                    return
                }

                const g1 = _this.snap.paper.gradient('L(0, 0,1920,1080)#000-#15459b-#47b6ff');
                _this.snap.select('#svgMapBj1').attr({fill: g1});

                _this.mapStyle.areaMap.fill = _this.snap.paper.gradient('L(0, 0,1920,1080)#1d54b7-#0d2859-#1d54b7');
                // 获取所有区域的对象
                $(`#jsSvg${_this.mapId} path[id^="${_this.mapidPrefix}"]`).each(function () {
                    const _self = $(this);
                    const _id = _self.attr('id');
                    // eslint-disable-next-line no-magic-numbers
                    const _mapId = _id.split('-')[2];
                    const item = _this.snap.select(`#${_id}`);

                    if (!_this.areaMap[_this.mapidPrefix + _mapId]) {
                        _this.areaMap[_this.mapidPrefix + _mapId] = [];
                    }
                    // 设置path的style
                    item.attr({
                        stroke: _this.mapStyle.areaMap.stroke,
                        strokeWidth: _this.mapStyleStrokeWidth,
                        // fill: _this.mapStyle.areaMap.fill,
                        fill: _this.mapStyle.areaMap.fill,
                        cursor: 'pointer',
                        'pointer-events': 'auto'
                    })
                    // 设置名称
                        .data('name', item.attr('name'))
                        .data('mapid', _mapId);
                    _this.areaMap[_this.mapidPrefix + _mapId].push(item);
                    // 点击文本点击事件
                    _this.bindAreaMapItemInteraction(_this.areaMap[_this.mapidPrefix + _mapId][0]);
                });
                // 获取所有中心点的对象
                $(`#jsSvg${_this.mapId} circle[id^="${_this.mapidPrefix}"]`).each(function () {
                    const _self = $(this);
                    const _id = _self.attr('id');
                    const _mapId = _id.split('-')[2];
                    try {
                        // 不存在才需要赋值
                        if (!_this.areaMapCircle[_this.mapidPrefix + _mapId]) {
                            // 中心点对象
                            _this.areaMapCircle[_this.mapidPrefix + _mapId] = _this.snap.select(`#${_id}`);
                            // 设置circle的style
                            _this.areaMapCircle[_this.mapidPrefix + _mapId].attr({
                                //fill: _this.mapStyle.circle.fill,
                                r: _this.mapStyleCircleR,
                                pointerEvents: 'none',
                                display: 'none'
                            }).data('name',
                                // 是区域块，取任意一块的值即可
                                Array.isArray(_this.areaMap[_this.mapidPrefix + _mapId])
                                    ? _this.areaMap[_this.mapidPrefix + _mapId][0].attr('name')
                                    : _this.areaMap[_this.mapidPrefix + _mapId].attr('name')
                            )
                                .data('mapid', _mapId);
                        }
                    } catch (e) {
                        //
                    }
                });
                const fontSize = _this.mapStyleFontSize;
                const _textGroup = _this.snap.paper.g().attr({id: 'js-areaMapText-group'});
                _this.perspectiveGroup.append(_textGroup);
                _textGroup.after(_this.snap.select('#js-circle-gourp'));
                // 获取所有文本的对象
                $(`#jsSvg${_this.mapId} text[id^="${_this.mapidPrefix}"]`).each(function () {
                    const _self = $(this);
                    const _id = _self.attr('id');
                    const _mapId = _id.split('-')[2];
                    try {
                        // 不存在才需要赋值
                        if (!_this.areaMapText[_this.mapidPrefix + _mapId]) {
                            const _areaMapCircle = _this.areaMapCircle[_this.mapidPrefix + _mapId];
                            // 中心点对象
                            _this.areaMapText[_this.mapidPrefix + _mapId] = _this.snap.select(`#${_id}`);
                            // 设置text的style
                            _this.areaMapText[_this.mapidPrefix + _mapId].attr({
                                'transform': 'none',
                                x: parseFloat(_areaMapCircle.attr('cx')),
                                y: parseFloat(_areaMapCircle.attr('cy')),
                                'font-size': `${fontSize}px`,
                                fill: _this.mapStyle.textStyle.fill,
                                fontFamily: 'Microsoft YaHei',
                                'text-anchor': 'middle',
                                'dominant-baseline': 'middle'
                            }).data('name', _this.areaMapText[_this.mapidPrefix + _mapId].attr('text'))
                                .data('mapid', _mapId);
                            _textGroup.append(_this.areaMapText[_this.mapidPrefix + _mapId]);
                            // 点击文本点击事件
                            _this.bindAreaMapItemInteraction(_this.areaMapText[_this.mapidPrefix + _mapId]);
                        }
                    } catch (e) {
                        //
                    }
                });
                // 绘制地图高亮的圆
                _this.createAreaHighMapCircle();
                // 创建区域地图线条
                _this.createAreaMapLine();
                // 创建地图圆
                _this.createAreaMapCircleImg();
            },
            // 绘制地图高亮的圆
            createAreaHighMapCircle() {
                const _this = this;
                if (!_this.snap) {
                    return
                }
                const _lineTotalGroup = _this.snap.select('#js-map-line-group');
                if (_lineTotalGroup) {
                    _this.areaMapHighLineGroup = _lineTotalGroup;
                    _lineTotalGroup.selectAll('polyline').forEach((item) => {
                        const _points = item.attr('points');
                        const _mapId = item.attr('id').split('-')[2];
                        _this.areaMapHighLine[_this.mapidPrefix + _mapId] = {};
                        const _lineGroup = _this.snap.paper.g().attr({id: `js-map-${_mapId}-high-line-group`});
                        _lineTotalGroup.append(_lineGroup);
                        _this.areaMapHighLine[_this.mapidPrefix + _mapId].group = _lineGroup;

                        item.attr({
                            fill: 'none',
                            stroke: '#00EAFF',
                            // eslint-disable-next-line no-magic-numbers
                            strokeWidth: 3 * _this.mapRatio
                        });
                        _lineGroup.append(item);
                        _this.areaMapHighLine[_this.mapidPrefix + _mapId].line = item;

                        const _imgCircle = _this.snap.paper.el('image', {
                            href: imgCircle,
                            // eslint-disable-next-line no-magic-numbers
                            x: _points[0] - _this.circleImgW / 2 * _this.mapRatio,
                            // eslint-disable-next-line no-magic-numbers
                            y: _points[1] - _this.circleImgH / 2 * _this.mapRatio,
                            width: _this.circleImgW * _this.mapRatio,
                            height: _this.circleImgH * _this.mapRatio,
                            'user-select': 'none',
                            'pointer-events': 'none'
                        });
                        _lineGroup.append(_imgCircle);
                        _this.areaMapHighLine[_this.mapidPrefix + _mapId].circle = _imgCircle;
                    });
                }
            },
            // 绘制区域地图的柱子状态
            createAreaMapBar() {
                const _this = this;
                if (!_this.snap) {
                    return
                }
                // 添加到组
                if (!_this.areaMapBarGroup) {
                    // 柱状图组
                    _this.areaMapBarGroup = _this.snap.paper.g().attr({id: 'js-areaMapBar-group'});
                    _this.perspectiveGroup.append(_this.areaMapBarGroup);

                    // 数据文本大小
                    const fontSize = _this.mapStyleDataFontSize;
                    $.each(_this.areaMapCircle, function (name, value) {
                        const _id = value.attr('id');
                        // eslint-disable-next-line no-magic-numbers
                        const _mapId = _id.split('-')[2];
                        // 不存在才需要赋值
                        if (!_this.areaMapBar[_this.mapidPrefix + _mapId]) {
                            _this.areaMapBar[_this.mapidPrefix + _mapId] = {};
                            _this.areaMapBar[_this.mapidPrefix + _mapId].group = _this.snap.paper.g().attr({
                                id: `js-areaMapBar-group-${_mapId}`,
                                display: 'none'
                            })
                                .data('mapid', _mapId);
                            // 绑定点击事件
                            _this.bindAreaMapItemInteraction(_this.areaMapBar[_this.mapidPrefix + _mapId].group);
                            // 添加到大组中
                            _this.areaMapBarGroup.append(_this.areaMapBar[_this.mapidPrefix + _mapId].group);

                            let _eCx = 0;
                            let _eCy = 0;
                            if (_this.isStretchOut && _this.areaStretchOutLine[_this.mapidPrefix + _mapId]) {
                                const _stretchOutLine = _this.areaStretchOutLine[_this.mapidPrefix + _mapId];
                                const _quadrant = _stretchOutLine.data('quadrant');
                                const _direction = _stretchOutLine.data('direction');
                                const _endCoords = _stretchOutLine.data('endCoords');
                                // eslint-disable-next-line no-magic-numbers
                                _eCx = _direction === 'horizontal' ? ((_quadrant === 1 || _quadrant === 4) ? (_endCoords[0] + _this.chartsOffset * _this.mapRatio) : (_endCoords[0] - _this.chartsOffset * _this.mapRatio)) : _endCoords[0];
                                _eCy = _endCoords[1];
                            } else {
                                _eCx = parseFloat(value.attr('cx'));
                                _eCy = parseFloat(value.attr('cy'));
                            }
                            // eslint-disable-next-line no-magic-numbers
                            _eCy -= 20 * _this.mapRatio;
                            const _strokeGradient = _this.snap.gradient('l(0,0,1,1)rgba(0, 70, 200, 1)-rgba(29, 129, 227, 1)');
                            const _ellipse1 = _this.snap.paper.el('ellipse', {
                                id: `areaMapBar-${_mapId}-ellipse1`,
                                cx: _eCx,
                                cy: _eCy,
                                // eslint-disable-next-line no-magic-numbers
                                rx: 33 * _this.mapRatio,
                                // eslint-disable-next-line no-magic-numbers
                                ry: 16 * _this.mapRatio,
                                fill: 'none',
                                stroke: _strokeGradient,
                                // eslint-disable-next-line no-magic-numbers
                                strokeWidth: 2 * _this.mapRatio,
                                opacity: 0,
                                display: 'none'
                            });
                            _this.areaMapBar[_this.mapidPrefix + _mapId].ellipse1 = _ellipse1;
                            //  添加到组
                            _this.areaMapBar[_this.mapidPrefix + _mapId].group.append(_ellipse1);

                            const _ellipse2 = _this.snap.paper.el('ellipse', {
                                id: `areaMapBar-${_mapId}-ellipse2`,
                                cx: _eCx,
                                // eslint-disable-next-line no-magic-numbers
                                cy: _eCy - 100 * _this.mapRatio,
                                // eslint-disable-next-line no-magic-numbers
                                rx: 10 * _this.mapRatio,
                                // eslint-disable-next-line no-magic-numbers
                                ry: 5 * _this.mapRatio,
                                fill: _this.snap.gradient('l(1, 0, 0, 0)#297dbd-#1b4c84-#297dbd'),
                                stroke: _strokeGradient,
                                strokeWidth: '0',
                                opacity: 1,
                                display: 'none'
                            });
                            _this.areaMapBar[_this.mapidPrefix + _mapId].ellipse2 = _ellipse2;
                            //  添加到组
                            _this.areaMapBar[_this.mapidPrefix + _mapId].group.append(_ellipse2);


                            const _ellipse3 = _this.snap.paper.el('ellipse', {
                                id: `areaMapBar-${_mapId}-ellipse3`,
                                cx: _eCx,
                                // eslint-disable-next-line no-magic-numbers
                                cy: _eCy - 100 * _this.mapRatio,
                                // eslint-disable-next-line no-magic-numbers
                                rx: 10 * _this.mapRatio,
                                // eslint-disable-next-line no-magic-numbers
                                ry: 5 * _this.mapRatio,
                                fill: _this.snap.gradient('l(1, 0, 0, 0)#00eaff-#004796-#00eaff'),
                                stroke: _strokeGradient,
                                strokeWidth: '0',
                                opacity: 0,
                                display: 'none'
                            });
                            _this.areaMapBar[_this.mapidPrefix + _mapId].ellipse3 = _ellipse3;
                            //  添加到组
                            _this.areaMapBar[_this.mapidPrefix + _mapId].group.append(_ellipse3);


                            const _barFill = _this.snap.gradient('l(1, 0, 0, 0)#297bb7-#1c538c-#297bb7');
                            const _bar = _this.snap.paper.el('rect', {
                                id: `areaMapBar-${_mapId}-rect`,
                                // eslint-disable-next-line no-magic-numbers
                                x: _eCx - 22.5 * _this.mapRatio,
                                y: _eCy,
                                // eslint-disable-next-line no-magic-numbers
                                width: 45 * _this.mapRatio,
                                height: 0,
                                fill: _barFill,
                                display: 'none'
                            }).data('height', 0);
                            _this.areaMapBar[_this.mapidPrefix + _mapId].bar = _bar;
                            //  添加到组
                            _this.areaMapBar[_this.mapidPrefix + _mapId].group.append(_bar);

                            const _barFill1 = _this.snap.gradient('l(1, 0, 0, 0)#00eaff-#004796-#00eaff');
                            const _bar1 = _this.snap.paper.el('rect', {
                                id: `areaMapBar-${_mapId}-rect`,
                                // eslint-disable-next-line no-magic-numbers
                                x: _eCx - 22.5 * _this.mapRatio,
                                y: _eCy,
                                // eslint-disable-next-line no-magic-numbers
                                width: 45 * _this.mapRatio,
                                height: 0,
                                fill: _barFill1,
                                display: 'none'
                            }).data('height', 0);
                            _this.areaMapBar[_this.mapidPrefix + _mapId].bar1 = _bar1;
                            //  添加到组
                            _this.areaMapBar[_this.mapidPrefix + _mapId].group.append(_bar1);

                            const _barEllipse = _this.snap.el('ellipse', {
                                id: `areaMapBar-${_mapId}-rectEllipse`,
                                cx: _eCx,
                                // eslint-disable-next-line no-magic-numbers
                                cy: _eCy - 100 * _this.mapRatio,
                                // eslint-disable-next-line no-magic-numbers
                                rx: 10 * _this.mapRatio,
                                // eslint-disable-next-line no-magic-numbers
                                ry: 5 * _this.mapRatio,
                                fill: _this.snap.gradient('l(1, 1, 0, 0)#86f1fb-#86f1fb-#86f1fb'),
                                display: 'none'
                            });
                            _this.areaMapBar[_this.mapidPrefix + _mapId].barEllipse = _barEllipse;
                            //  添加到组
                            _this.areaMapBar[_this.mapidPrefix + _mapId].group.append(_barEllipse);

                            // let _barEllipseFill2 = _this.snap.gradient('l(1, 1, 0, 0)#5ddf8e-#4bb780')
                            const _barEllipse2 = _this.snap.el('ellipse', {
                                id: `areaMapBar-${_mapId}-rectEllipse`,
                                cx: 1000000000000,
                                // eslint-disable-next-line no-magic-numbers
                                cy: 9900000 - 0 * _this.mapRatio,
                                // eslint-disable-next-line no-magic-numbers
                                rx: 0 * _this.mapRatio,
                                // eslint-disable-next-line no-magic-numbers
                                ry: 0 * _this.mapRatio,
                                fill: 'transparent',
                                display: 'none'
                            });
                            _this.areaMapBar[_this.mapidPrefix + _mapId].barEllipse2 = _barEllipse2;
                            //  添加到组
                            _this.areaMapBar[_this.mapidPrefix + _mapId].group.append(_barEllipse2);

                            const _dataText = _this.snap.el('text', {
                                id: `areaMapBar-${_mapId}-text`,
                                x: _eCx,
                                // eslint-disable-next-line no-magic-numbers
                                y: _eCy - (100 + 20) * _this.mapRatio,
                                text: '',
                                fontSize: `${fontSize * _this.mapRatio}px`,
                                fontFamily: 'Microsoft YaHei',
                                fill: '#56d089',
                                'text-anchor': 'middle',
                                'dominant-baseline': 'text-after-edge',
                                display: 'none'
                            });
                            _this.areaMapBar[_this.mapidPrefix + _mapId].dataText = _dataText;
                            //  添加到组
                            _this.areaMapBar[_this.mapidPrefix + _mapId].group.append(_dataText);
                        }
                    });
                }
            },

            // 删除拉出来的线条
            deleteStretchOutLine() {
                const _this = this;
                // 删除拉出来的线条
                if (_this.areaStretchOutLineGroup) {
                    // 遍历线条进行文本重置
                    $.each(_this.areaStretchOutLine, (key, value) => {
                        const _mapId = value.data('mapid');
                        // 区域圆
                        const _areaMapCircle = _this.areaMapCircle[_this.mapidPrefix + _mapId];
                        // 区域文本样式还原
                        _this.areaMapText[_this.mapidPrefix + _mapId].attr({
                            x: parseFloat(_areaMapCircle.attr('cx')),
                            y: parseFloat(_areaMapCircle.attr('cy')),
                            'text-anchor': 'middle',
                            'dominant-baseline': 'text-before-edge'
                        });
                    });
                    // 删除线条数组，重置变量
                    _this.areaStretchOutLineGroup.remove();
                    _this.areaStretchOutLineGroup = null;
                    _this.areaStretchOutLine = {};
                }
            },

            // 创建拉出来的线条
            createStretchOutLine() {
                // 如果不伸出线，则直接跳出
                if (!this.isStretchOut) {
                    return;
                }
                const _this = this;
                if (!_this.areaStretchOutLineGroup) {
                    _this.areaStretchOutLineGroup = _this.snap.paper.g().attr({id: 'js-areaStretchLine-group'});
                    _this.perspectiveGroup.append(_this.areaStretchOutLineGroup);
                }

                // 循环数据
                $.each(_this.areaMapDataSource, function (index, value) {
                    // 只展现top5
                    if (index >= _this.chartsTop) {
                        return false;
                    }
                    // 如果数值小于等于0，则调出循环
                    if (value.code <= 0) {
                        return true;
                    }
                    const _mapId = value.code;

                    if (!_this.areaMap[_this.mapidPrefix + _mapId]) {
                        return;
                    }
                    const _areaMapCircle = _this.areaMapCircle[_this.mapidPrefix + _mapId];
                    // 圆心
                    const _cx = parseFloat(_areaMapCircle.attr('cx'));
                    const _cy = parseFloat(_areaMapCircle.attr('cy'));

                    // 圆心坐标
                    const _point = {
                        x: _cx,
                        y: _cy
                    };
                    // 获取圆心所在象限
                    const _quadrant = _this.getPointQuadrant(_point);

                    const _startCoords = [_cx, _cy];
                    const _endCoords = [_cx, _cy];

                    // 获取线条方向 水平还是垂直
                    const _direction = _this.getLineDirection(_startCoords, _quadrant);

                    // 透视窗口的盒子
                    const _perspectiveBox = _this.perspectiveBox;

                    // 如果是水平的
                    if (_direction === 'horizontal') {
                        // 如果是第一象限或者第四象限，则往右伸展
                        // eslint-disable-next-line no-magic-numbers
                        if (_quadrant === 1 || _quadrant === 4) {
                            _endCoords[0] = _perspectiveBox.x2;
                        } else {
                            // 否则往左伸展
                            _endCoords[0] = _perspectiveBox.x;
                        }
                    }
                    // 如果是第一象限或者第二象限，则往上伸展
                    // eslint-disable-next-line no-magic-numbers
                    if ((_quadrant === 1 || _quadrant === 2) && _direction !== 'horizontal') {
                        _endCoords[1] = _perspectiveBox.y;
                    } else {
                        // 否则往下伸展
                        _endCoords[1] = _perspectiveBox.y2;
                    }
                    const _coords = [_startCoords, _endCoords];

                    // 绘制线条
                    _this.areaStretchOutLine[_this.mapidPrefix + _mapId] = _this.drawLine(_coords, `${_mapId}-stretch`, _quadrant);
                    // 赋值所在象限
                    _this.areaStretchOutLine[_this.mapidPrefix + _mapId].attr({display: 'block'}).data('quadrant', _quadrant)
                        .data('startCoords', _startCoords)
                        .data('endCoords', _endCoords)
                        .data('mapid', _mapId)
                        .data('direction', _direction);
                    // 加入到伸出线条组中
                    _this.areaStretchOutLineGroup.append(_this.areaStretchOutLine[_this.mapidPrefix + _mapId]);
                });
            },

            // 获取线条的方向
            getLineDirection(coords, quadrant) {
                const _this = this;
                // 默认是水平的
                let _direction = 'horizontal';
                // 循环遍历拉出来的线条
                $.each(_this.areaStretchOutLine, function (_key, value) {
                    // 如果象限一致距离&&小于50 并且比较的那个点是水平方向 则先应该垂直方向展示
                    // eslint-disable-next-line no-magic-numbers
                    if (quadrant === value.data('quadrant') && Math.abs(coords[1] - value.data('endCoords')[1]) < 80 * _this.mapRatio && value.data('direction') == 'horizontal') {
                        _direction = 'vertical';
                        return false;
                    }
                });
                return _direction;
            },

            // 获取点所在象限
            getPointQuadrant(point) {
                const _this = this;
                const _cx = point.x;
                const _cy = point.y;
                let _quadrant = 1;
                // eslint-disable-next-line no-magic-numbers
                if (_cx > _this.viewBox.width / 2 && _cy < _this.viewBox.height / 2) {
                    _quadrant = 1;
                    // eslint-disable-next-line no-magic-numbers
                } else if (_cx <= _this.viewBox.width / 2 && _cy < _this.viewBox.height / 2) {
                    // eslint-disable-next-line no-magic-numbers
                    _quadrant = 2;
                    // eslint-disable-next-line no-magic-numbers
                } else if (_cx < _this.viewBox.width / 2 && _cy >= _this.viewBox.height / 2) {
                    // eslint-disable-next-line no-magic-numbers
                    _quadrant = 3;
                } else {
                    // eslint-disable-next-line no-magic-numbers
                    _quadrant = 4;
                }
                return _quadrant;
            },
            // 创建地图线
            createAreaMapLine() {
                const _this = this;
                // 创建线组
                if (_this.snap) {
                    return
                }
                if (!_this.areaMapLineGroup) {
                    _this.areaMapLineGroup = _this.snap.paper.g().attr({id: 'js-areaMapLine-group'});
                    _this.perspectiveGroup.append(_this.areaMapLineGroup);
                }
                $.each(_this.areaMapCircle, function (name, value) {
                    const _id = value.attr('id');
                    // eslint-disable-next-line no-magic-numbers
                    const _mapId = _id.split('-')[2];
                    const _cx = Number(value.attr('cx'));
                    const _cy = Number(value.attr('cy'));
                    // 点
                    const _coords = [[_cx, _cy]];

                    const _middleCoords = [_cx, _cy];
                    const _endCoords = [_cx, _cy];

                    let _quadrant = 1;
                    // eslint-disable-next-line no-magic-numbers
                    if (_cx > _this.viewBox.width / 2 && _cy < _this.viewBox.height / 2) {
                        _quadrant = 1;

                        // 中间点
                        _middleCoords[0] = _cx - _this.mapRatio * _this.areaLineStyle.x1;
                        _middleCoords[1] = _cy + _this.mapRatio * _this.areaLineStyle.y;

                        // 结束点
                        _endCoords[0] = _middleCoords[0] - _this.mapRatio * _this.areaLineStyle.x2;
                        _endCoords[1] = _middleCoords[1];
                        // eslint-disable-next-line no-magic-numbers
                    } else if (_cx <= _this.viewBox.width / 2 && _cy < _this.viewBox.height / 2) {
                        // eslint-disable-next-line no-magic-numbers
                        _quadrant = 2;

                        // 中间点
                        _middleCoords[0] = _cx + _this.mapRatio * _this.areaLineStyle.x1;
                        _middleCoords[1] = _cy + _this.mapRatio * _this.areaLineStyle.y;

                        // 结束点
                        _endCoords[0] = _middleCoords[0] + _this.mapRatio * _this.areaLineStyle.x2;
                        _endCoords[1] = _middleCoords[1];
                        // eslint-disable-next-line no-magic-numbers
                    } else if (_cx < _this.viewBox.width / 2 && _cy >= _this.viewBox.height / 2) {
                        // eslint-disable-next-line no-magic-numbers
                        _quadrant = 3;

                        // 中间点
                        _middleCoords[0] = _cx + _this.mapRatio * _this.areaLineStyle.x1;
                        _middleCoords[1] = _cy - _this.mapRatio * _this.areaLineStyle.y;

                        // 结束点
                        _endCoords[0] = _middleCoords[0] + _this.mapRatio * _this.areaLineStyle.x2;
                        _endCoords[1] = _middleCoords[1];
                    } else {
                        // eslint-disable-next-line no-magic-numbers
                        _quadrant = 4;

                        // 中间点
                        _middleCoords[0] = _cx - _this.mapRatio * _this.areaLineStyle.x1;
                        _middleCoords[1] = _cy - _this.mapRatio * _this.areaLineStyle.y;

                        // 结束点
                        _endCoords[0] = _middleCoords[0] - _this.mapRatio * _this.areaLineStyle.x2;
                        _endCoords[1] = _middleCoords[1];
                    }
                    _coords.push(_middleCoords);
                    _coords.push(_endCoords);
                    _this.areaMapLine[_this.mapidPrefix + _mapId] = _this.drawLine(_coords, _mapId, _quadrant).data('mapid', _mapId)
                        .data('quadrant', _quadrant);
                    _this.areaMapLineGroup.append(_this.areaMapLine[_this.mapidPrefix + _mapId]);
                });
            },
            // 创建圆
            createAreaMapCircleImg() {
                const _this = this;
                // 创建线组
                if (!_this.snap) {
                    return
                }
                if (!_this.areaMapCircleImgGroup) {
                    _this.areaMapCircleImgGroup = _this.snap.paper.g().attr({id: 'js-areaMapCircleImg-group'});
                    _this.perspectiveGroup.append(_this.areaMapCircleImgGroup);
                }
                // 西城、东城、石景山
                // let _mapArr = ['110102', '110101', '110107']
                $.each(_this.areaMapCircle, function (name, value) {
                    const _id = value.attr('id');
                    // eslint-disable-next-line no-magic-numbers
                    const _mapId = _id.split('-')[2];
                    const _img = _this.snap.paper.el('image', {
                        href: imgCircle,
                        // eslint-disable-next-line no-magic-numbers
                        x: parseFloat(value.attr('cx')) - _this.circleImgW * _this.mapRatio / 2,
                        // eslint-disable-next-line no-magic-numbers
                        y: parseFloat(value.attr('cy')) - _this.circleImgH * _this.mapRatio / 2,
                        width: _this.circleImgW * _this.mapRatio,
                        height: _this.circleImgH * _this.mapRatio,
                        'pointer-events': 'none',
                        display: 'none'
                    }).data('mapid', _mapId);
                    _this.areaMapCircleImg[_this.mapidPrefix + _mapId] = _img;
                    _this.areaMapCircleImgGroup.append(_img);
                });
            },
            // 绘制线
            drawLine: function (coords, id) {
                const _this = this;
                if (!_this.snap) {
                    return
                }
                // 获取路径
                const _path = _this.getLinePathByCoord(coords);
                // 绘制线
                return _this.snap.paper.el('path', {
                    d: _path,
                    id: `js-mapid-${id}-mapline`,
                    // stroke: _strokeGradient,
                    stroke: 'rgba(42, 145, 187, 1)',
                    strokeWidth: _this.highLineStrokeWidth * _this.mapRatio,
                    fill: 'none',
                    'pointer-events': 'none',
                    display: 'none'
                });
            },

            // 通过坐标获取对应的路径
            getLinePathByCoord(coords) {
                let _path = '';
                coords.forEach(function (item, index) {
                    switch (index) {
                        // 开始
                        case 0:
                            _path = `M${item[0]} ${item[1]}`;
                            break;
                        default:
                            _path = `${_path}L${item[0]} ${item[1]}`;
                            break;
                    }
                });
                return _path;
            },
            // 更新柱状图的数据  //这块应该是只针对专项行动的
            updateDataBar() {
                const _this = this;
                // 展现组
                _this.areaMapBarGroup.attr({display: 'block'});
                $.each(_this.areaMapBar, function (index, value) {
                    value.group.attr({display: 'none'});
                });
                // 循环数据
                $.each(_this.areaMapDataSource, function (index, value) {
                    // debugger
                    if (!_this.areaMap[_this.mapidPrefix + value.code]) {
                        return true;
                    }
                    // 只展现top chartsTop
                    if (_this.isStretchOut && index >= _this.chartsTop) {
                        return false;
                    }
                    // 更新所有数据对象
                    // Rxjb区域
                    _this.areaMapData[_this.mapidPrefix + value.code] = value;
                    // 如果柱状图存在
                    if (_this.areaMapBar[_this.mapidPrefix + value.code] && value.val > 0) {
                        const _mapId = value.code;
                        // 赋值柱状图的值
                        const _val = value.val;
                        //const  maxValue = _this.areaMapMaxValue;
                        const maxValue = _this.areaMapMaxValue > _this.areaMapMaxValue2 ? _this.areaMapMaxValue : _this.areaMapMaxValue2;
                        // 获取柱子的高度
                        let _height = maxValue === 0 ? 0 : (value.val / maxValue) * _this.barMaxHeight;
                        // 如果高度小于最小高度，则取值最小高度，如果大于最大高度，则取值最大高度
                        _height = _height < _this.barMinHeight ? _this.barMinHeight : (_height > _this.barMaxHeight ? _this.barMaxHeight : _height);

                        //let _height2 = maxValue === 0 ? 0 : (value.value2 / maxValue) * _this.barMaxHeight;
                        //_height2 = _height2 < _this.barMinHeight ? _this.barMinHeight : (_height2 > _this.barMaxHeight ? _this.barMaxHeight : _height2);


                        if (_height > 0) {
                            // 展现对应的柱子
                            _this.areaMapBar[_this.mapidPrefix + value.code].group.attr({display: 'block'});
                        }

                        //  添加到组
                        _this.areaMapBar[_this.mapidPrefix + _mapId].bar.data('height', _height);
                        //_this.areaMapBar[_this.mapidPrefix + _mapId].bar1.data('height', _height2);

                        // 文本
                        _this.areaMapBar[_this.mapidPrefix + _mapId].dataText.attr({text: ''});
                        // eslint-disable-next-line no-magic-numbers
                        if (_mapId.length > 8) {
                            _this.overlayStreet(_mapId, _val);
                        }
                    }
                });

                // 更新区域地图样式
                _this.updateAreaMapBarStyle();
            },
            // 重叠街乡镇数据添加
            overlayStreet(mapId, val, type, quota) {
                const _this = this;
                for (let i = 0; i < this.overlapOldStreet.length; i++) {
                    if (mapId === _this.overlapOldStreet[i]) {
                        // 记录下当前的数据
                        const _nowValue = val || 0;
                        $(`#js-mapid-${_this.overlapOldStreet[i]}-textValue`).text(_nowValue);
                        for (let j = 0; j < _this.areaMapDataSource.length; j++) {
                            // for(let k = 0; k<_this.overlapStreet.length; k++){
                            if ((_this.areaMapDataSource[j].mapId) === _this[mapId].code) {
                                // 记录下重叠的数据
                                const _coverData = _this.areaMapDataSource[j] && _this.areaMapDataSource[j].value ? _this.areaMapDataSource[j].value : 0;
                                $(`#js-mapid-${_this[mapId].code}-textValue`).text(_coverData);
                                // 设置当前重叠区域的值  叠加
                                if (type === 'house') {
                                    quota.dataText.attr({text: _nowValue + _coverData});
                                } else if (type === 'rkxx') {
                                    quota.dataText.attr({text: _nowValue + _coverData});
                                } else if (type === 'fwzj') {
                                    quota.dataText.attr({text: _nowValue + _coverData});
                                } else if (type === 'rxjb') {
                                    quota.dataText.attr({text: _nowValue + _coverData});
                                } else if (type === 'person') {
                                    quota.dataText.attr({text: _nowValue + _coverData});
                                } else if (type === 'gdp') {
                                    quota.dataText.attr({text: _nowValue + _coverData});
                                } else if (type === 'POI') {
                                    quota.dataText.attr({text: _nowValue + _coverData});
                                } else {
                                    _this.areaMapBar[this.mapidPrefix + mapId].dataText.attr({text: _nowValue + _coverData});
                                }
                                // }
                            }
                        }
                    }
                }
            },
            // 隐藏所有的柱子元素
            hideAllBarEle() {
                // 隐藏柱子
                if (this.areaMapBarGroup) {
                    this.areaMapBarGroup.attr({display: 'none'});
                }
            },
            // 更新数据
            updateData: function (dataSource) {
                const _this = this;

                // 如果数据为空，则返回
                if (!dataSource || dataSource.length === 0) {
                    return;
                }
                // 更新对象, 判断对象是不是等于
                if (dataSource && $.type(dataSource) === 'array') {
                    _this.areaMapDataSource = dataSource;
                }
                let _hasProp = false;
                $.each(_this.areaMap, function () {
                    _hasProp = true;
                });
                // 如果没有任何属性跳出函数
                if (!_hasProp) {
                    // 调用初始化方法
                    _this.initial();
                    return;
                }

                // 清空数据值
                _this.areaMapData = {};

                // 删除之前拉出来的线条和还原文本
                _this.isStretchOut && _this.deleteStretchOutLine();

                // 设置最小值
                _this.setMinValue();
                // 设置最大值
                _this.setMaxValue();
                // 设置图例数据
                _this.setLegendData();

                // 隐藏所有的柱子元素
                this.hideAllBarEle();

                // 创建伸出来的线条
                _this.createStretchOutLine();

                // 先执行创建方法
                this[this.typeMap['bar'].createFun]();

                // 执行对应类型的更新方法
                this[this.typeMap['bar'].updateFun]();

                // 修改每个数据对应的颜色
                _this.mendAreaMapFillColor();
                // 设置每个区域的颜色
                _this.setAreaMapFillColor();


                if (_this.highLightAreaMap) {
                    let _id = _this.highLightAreaMap.node.id.replace('js-mapid-', '');
                    _this.setHighLightMapById(_id);
                }


            },
            // 设置图例数据
            setLegendData() {
                const _legendData = [];
                // 如果差距小于等于2则说明总共不超过3个数，摆4个则不合适了
                if ((Math.ceil(this.areaMapMaxValue) - Math.ceil(this.areaMapMinValue)) <= 2) {
                    for (let i = Math.ceil(this.areaMapMaxValue); i >= Math.ceil(this.areaMapMinValue); i--) {
                        _legendData.push(i);
                    }
                } else {
                    _legendData.push(Math.ceil(this.areaMapMaxValue));
                    // eslint-disable-next-line no-magic-numbers
                    _legendData.push(Math.ceil(this.areaMapMinValue + (this.areaMapMaxValue + this.areaMapMinValue) * 2 / 3));
                    // eslint-disable-next-line no-magic-numbers
                    _legendData.push(Math.ceil(this.areaMapMinValue + (this.areaMapMaxValue + this.areaMapMinValue) / 3));
                    _legendData.push(Math.ceil(this.areaMapMinValue));
                }
                // 如果只有一个数，则再放一个最小值，至少保证图例有两条数据
                if (_legendData.length === 1) {
                    _legendData.push(Math.ceil(this.areaMapMinValue));
                }
                // 赋值图例数据
                this.legendData = _legendData;
            },
            // 单条路径事件
            bindAreaMapItemInteraction: function (item) {
                const _this = this;
                const _mapid = item.data('mapid');
                if (!_this.snap) {
                    return
                }

                _this.mapStyle.areaMap.hoverFill = _this.snap.paper.gradient('l(0,1,0,0)#f68b17-#f9c83f');
                if (item.node.nodeName === 'path') {
                    const dom = $('#jsTip');
                    // hover事件
                    item.hover(function () {
                            let _data = {
                                name: '',
                                val: 0
                            };
                            _this.mapData.forEach(function (item1) {
                                if (item1.code == _mapid) {
                                    _data = item1;
                                }
                            });
                            // 判断是否展示提示框
                            if (_data.show === true) {
                                this.attr({fill: _this.mapStyle.areaMap.hoverFill});
                                $('#jsTip').css({display: 'block'});
                                $('#jsQx').text(_data.name);
                                $('#jsDlr span').text(_data.val);
                            }
                        },
                        function () {
                            $('#jsTip').css({display: 'none'});
                            // 如果当前为激活区域
                            if (_this.highLightAreaMap) {
                                if (_this.highLightAreaMap.node.id == item.node.id) {
                                    this.attr({fill: _this.mapStyle.areaMap.hoverFill});
                                } else {
                                    this.attr({fill: _this.areaMapData[item.node.id].fillColor});
                                }

                            } else {
                                this.attr({fill: _this.areaMapData[item.node.id].fillColor});
                            }

                        });

                    const delt = 5;
                    const winW = parseFloat($(window).width());
                    const winH = parseFloat($(window).height());
                    item.mousemove(function (event) {
                        const _event = event || window.event;
                        let left = parseFloat(_event.pageX) + 20;
                        let top = parseFloat(_event.pageY);
                        const tipW = parseFloat(dom.width());
                        const tipH = parseFloat(dom.height());
                        if ((left + tipW + delt) > winW) {
                            left = winW - tipW - delt;
                        }
                        if ((top + tipH + delt) > winH) {
                            top = winH - tipH - delt;
                        }
                        dom.css({
                            top: top,
                            left: left
                        });
                    });
                }


                // 为每个path绑定事件
                item.click(function (event) {
                    //  阻止事件冒泡
                    event.stopPropagation();

                    // 数据
                    const _data1 = _this.areaMapData[_this.mapidPrefix + _mapid];
                    const _name = _this.areaMapText[_this.mapidPrefix + _mapid] ? _this.areaMapText[_this.mapidPrefix + _mapid].attr('text') : '';
                    // 点击之后的回调函数
                    if (Object.prototype.toString.call(_this.clickCallback) === '[object Function]' && _data1.show === true) {
                        _this.clickCallback(event, this, _data1, _name);

                    }
                });
            },
            // 增加交互效果
            addAreaMapInteraction: function () {
                const _this = this;
                $.each(_this.areaMap, function (name, value) {
                    // 是区域块，需要进行循环，为每个区域都绑定事件
                    if (Array.isArray(value)) {
                        value.forEach(function (item) {
                            // 单条路径事件
                            _this.bindAreaMapItemInteraction(item, name);
                        });
                    } else {
                        // 单条路径事件
                        _this.bindAreaMapItemInteraction(value, name);
                    }
                });
            },
            // 设置单个区域的颜色
            setAreaMapItemColor: function (item) {
                const _this = this;
                const _mapid = item.data('mapid');
                let _areaCount = 0;
                // 数据
                const _data = _this.areaMapData[_this.mapidPrefix + _mapid];
                if (_data) {
                    _areaCount = Math.abs(_data.val);
                    // 判断数据量的大小，决定是否置灰 (小于最小值或者大于最大值)
                    if (_areaCount < _this.areaMapMinValue || _areaCount > _this.areaMapMaxValue) {
                        item.attr({
                            fill: _this.gray,
                            stroke: _this.grayStroke
                        });
                    } else {
                        // 不置灰就用data里保留的颜色
                        item.attr({
                            fill: _data.fillColor,
                            stroke: _this.mapStyle.areaMap.stroke
                        });
                    }
                } else {
                    item.attr({
                        fill: _this.areaMapColor[0],
                        stroke: _this.mapStyle.areaMap.stroke
                    });
                }
            },
            // 销毁函数
            destory: function () {
                const _this = this;
                // 重置变量
                _this.scale = 1;
                // 区域背景对象置为空
                _this.areaMapBj = null;
                // 地图区域
                _this.areaMap = {};
                // 地图数据
                _this.areaMapDataSource = [];
                // 地图文本
                _this.areaMapText = {};
                // 中心点
                _this.areaMapCircle = {};
                // 地图线条
                _this.areaMapLine = {};
                // 地图线条组
                _this.areaMapLineGroup = null;
                // 地图高亮组
                _this.areaMapHighLineGroup = null;
                // 柱子组对象置空
                _this.areaMapBarGroup = null;
                // 区域柱状图
                _this.areaMapBar = {};
                // circle图形组
                _this.areaMapCircleImgGroup = null;
                // 区域圆心图形
                _this.areaMapCircleImg = {};
                // 区域伸出来线条组
                _this.areaStretchOutLineGroup = null;
                // 区域伸出来的线条
                _this.areaStretchOutLine = {};
                // 激活的区域
                _this.activeAreaMap = null;
                // 高亮的区域
                _this.highLightAreaMap = null;
                // 图例置空
                _this.legendData = [];
            }
        },
        // 初始化后
        mounted() {
            this.init();
        }
    };

</script>
<!--样式表-->
<style lang="less">
    @import "./index.less";
</style>

