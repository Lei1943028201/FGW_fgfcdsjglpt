/**
 * @file operateMap.js3123123131
 * @author xieyq on 2017/7/12.
 * @version 1.0.0
 * @description 热力图svg操作的js文件
 */
import $ from 'jquery'
import {getMapSvg} from '../../../../api/common'
//定义地图图形的方法
var mapCharts = {
    version: '1.0.1' //mapCharts版本
};
mapCharts.init = function (dom) {
    var charts = new MapCharts(dom);
    return charts;
};
/*
 * 地图图形的构造方法
 * */
function MapCharts(dom) {
    this.dom = dom; //设置对应的dom元素
}
var Tinterval,TintervalJxz;
/*
 * 对象对应的属性方法
 * */
MapCharts.prototype = {
    /*
     * 设置参数选项
     * */
    setOption: function (options) {
        var _this = this;
        _this.defaultOptions = {
            isShowErrorLog: false, // 是否显示错误日志
            snap: '',
            tooltip: {
                show: true,
                showHead: true,
                id: 'tips',
                formatter: function () {
                },
                style: {}
            },
            mapId: '190000', //对应的地图mapId
            isMaxMap: true,
            mapTimer: null,//地图区域轮循定时器
            index: 0,//轮循是对应id 索引
            flag: 1,
            mapCount: [],//本区
            mapCount1: [],//转本区
            xsMaxValue: 0,
            xsMinValue: 0,
            xsMaxValue1: 0,
            xsMinValue1: 0,
            randomId: 'idHuaiRou',//页面加载第一次区域随机id
            //isPerspective: true, // 是否倾斜
            //perspectiveId: '#perspective', // 倾斜id
            //perspectiveStyle: {
            //    scaleX: '1', // 缩放的比例
            //    scaleY: '0.5'
            //},

            // 地图参数
            mapStyle: {
                map: {
                    fill: 'rgba(20,167,209,0.3)',
                    stroke: '#bfb892'
                },
                mapBj: {
                    fill: '#e27934',
                    shadow: {
                        x: 15,
                        y: 20,
                        radius: 15,
                        color: 'rgba(255,255,255,0.5)' //Snap.filter.shadow(30, 30, 15,'#2badfd')
                    },
                    stroke: '#a4f1fd',
                    strokeWidth: 1,
                    hoverFill: '#ffac00',//地图划过区域颜色
                    clickFill: 'rgba(28,80,206,0.5)', //地图点击区域颜色
                    clickStroke: '#ffd221'//地图点击区域描边颜色
                },
                areaMap: {
                    fill: 'rgba(20,167,209,0.3)',
                    stroke: 'rgba(182,180,138,1)',
                    strokeWidth: 15,
                    outlineStroke: '#00aeff',
                    outlineFill: '#82caee',
                    textFill: 'none',
                    hoverFill: '#ffac00',//地图划过区域颜色
                    clickFill: 'rgba(28,80,206,0.5)', //地图点击区域颜色
                    clickStroke: '#ffd221'//地图点击区域描边颜色
                },
                circle: {
                    stroke: 'rgba(0,70,156,1)',
                    r: 24,
                    fill: '#f7d66c' //圆的填充颜色
                },
                textStyle: {
                    fontSize: 70,
                    fill: '#c6d5f4',
                    hoverFill: '#fff',
                    shadow: {
                        x: 30,
                        y: 40,
                        radius: 25,
                        color: '#ffffff' //Snap.filter.shadow(30, 30, 15,'#2badfd')
                    }
                },
                emphasisTextStyle: {
                    fontSize: 60,
                    fontWeight: 'normal',
                    fill: '#00AEFF'
                },
                relativeWidth: 6028
            },
            areaMapColor: [],
            data: {

            }, //对应的数据对象
            setGray: '#0cafdb', //没数据的地图背景颜色
            setGrayStroke: '#333',
            mapidPrefix: 'map-', // mapid 的前缀
            mapidJxzPrefix: 'map-110115-', // mapid 的前缀
            activeMapId: '',//区分hover 和click 事件 切换id
            Matrix: '',//地图矩阵变量
            //选中范围中的视觉元素
            inRange: {
                //颜色
                color: ['#07a6ed',"#0154d2"]
            },
            ///设置分段数
            STEPS: 200,
            splitNumber: 2, //对于分段型数据，自动分成几段
            //动画坐标参数
            animateParams: {
                cx: 0,
                cy: 0,
                id: 0,
                fyName: ''
            },
            animateObj: {},
            blankclickCallback: function (dataList) {
            },
            flagNew:null,
            //气泡的数据
            qpData:{},
            //请求是否是市的地图
            requestBjs:null,
            //请求是否是区的地图
            requestQy:null,
            //请求的svg地址
            svgUrl:'',
            list:[
                {
                    name:'北京市',
                    value:'1100000',
                    isShow:true
                },
                {
                    name:'东城区',
                    value:'110101',
                    isShow:true
                },
                {
                    name:'西城区',
                    value:'110102',
                    isShow:true
                },
                {
                    name:'朝阳区',
                    value:'110105',
                    isShow:true
                },
                {
                    name:'丰台区',
                    value:'110106',
                    isShow:true
                },
                {
                    name:'石景山区',
                    value:'110107',
                    isShow:true
                },
                {
                    name:'海淀区',
                    value:'110108',
                    isShow:true
                },
                {
                    name:'门头沟区',
                    value:'110109',
                    isShow:true
                },
                {
                    name:'房山区',
                    value:'110111',
                    isShow:true
                },
                {
                    name:'通州区',
                    value:'110112',
                    isShow:true
                },
                {
                    name:'顺义区',
                    value:'110113',
                    isShow:true
                },
                {
                    name:'昌平区',
                    value:'110114',
                    isShow:true
                },
                {
                    name:'大兴区',
                    value:'110115',
                    isShow:true
                },
                {
                    name:'怀柔区',
                    value:'110116',
                    isShow:true
                },
                {
                    name:'平谷区',
                    value:'110117',
                    isShow:true
                },
                {
                    name:'密云区',
                    value:'110228',
                    isShow:true
                },
                {
                    name:'延庆区',
                    value:'110229',
                    isShow:true
                }
            ],
            clickCallback: function (name,value) {

            },
            hoverCallback: function (id) {

            },
            bjList:{
                1001:['110101'], //东城
                1002:['110102','110117'],//西城，平谷
                1004:['110105'], //朝阳
                1005:['110112','110109'], //通州，门头沟
                1006:['110229','110115'],//延庆，大兴
                1007:['110116','110111'],//怀柔，房山
                1008:['110106','110117'],//丰台，平谷
                1009:['110107','110117'],//石景山，平谷
                1010:['110114','110117'],//昌平，平谷
                1011:['110108'],//海淀
                1012:['110113'], //顺义
            },
            Tinterval:'',
            //街乡镇的动画
            TintervalJxz:'',
            activeMapId2:'',
            mapName:'',
            ssqList:{
                110101:[ //东城区
                    ['110101017','110101014'], //永定门外街道   龙潭街道
                    ['110101016','110101010'], //天坛街道   和平里街道
                    ['110101015'], //体育馆街道
                    ['110101011'], //前门街道
                    ['110101004','110101014'],  //安定门街道  龙潭街道
                    ['110101012'], //崇文门外
                    ['110101007','110101017'], //朝阳门    永定门外街道
                    ['110101002','110101014'], //景山街道   龙潭街道
                    ['110101006','110101017'], //东四街道  永定门外街道
                    ['110101013'], //东花市街道
                    ['110101001'], //东华门街道
                    ['110101010','110101017'],  //和平里街道  永定门外街道
                    ['110101008'], //建国门街道
                    ['110101003','110101014'],  //交道口街道  龙潭街道
                    ['110101005'], //北新桥街道
                    ['110101009','110101017'] //东直门街道  永定门外街道
                ]
            },
            //标记，即区域圆点的展现形式
            symbol: {
                type: 'circle',
                animate: {
                    loadAnimate: {
                        show: true,
                        delay: 400,//延迟动画
                        duration: 400,//动画的持续时间
                    },
                    normalAnimate: {
                        show: true,
                        duration: 2000,//动画的持续时间
                        ratio: 0.8,//动画的缩放比
                    }
                },
                //图形信息项样式
                itemStyle: {
                    //默认样式
                    normal: {
                        show: true,
                        ratio: 0.5,//缩放比例
                        img01: {
                            show: true,
                            src:"http://172.16.193.212:8080/img/icon-bar-01.png",
                            size: [12, 90],
                        },
                        img02: {
                            show: true,
                            src:"http://172.16.193.212:8080/img/icon-bar-02.png",
                            size: [12, 90],
                        },
                        outer: {
                            radius: [30, 6],
                            stroke: "#07a6ed",
                            strokeWidth: 4,
                        },
                        inner: {
                            radius: [15, 5],
                            stroke: "#07a6ed",
                            strokeWidth: 2,
                            fill: "#07a6ed",

                        }
                    },
                    // 强调的样式，即鼠标滑过的样式，也是选中样式
                    emphasis: {
                        show: true
                    }
                }
            }
        }
        // 合并参数
        _this.opts = $.fn.extend(true, {}, _this.defaultOptions, options || {});
        _this.init(); //调用初始化方法
    },

    /*
     * 地图图形的初始化方法
     * */
    init: function () {

        var _this = this;
        _this.clearAnimation();
        var url= _this.opts.svgUrl;
        if(_this.opts.requestBjs==true&&_this.opts.requestQy==false){
            //请求全市 svg地图
            _this.requestSvgMap('../svg/'+url+'.svg');
        }
        if(_this.opts.requestBjs==false&&_this.opts.requestQy==true){
            _this.opts.mapName=url.substring(4,11);
            //请求区 svg地图
            _this.requestSvgMapJxz('../svg/'+url+'.svg');
        }

    },
    /*
     * 设置svg地图
     * */
    setSvgMapJxz: function (response) {
        var _this = this;
        // 地图加载完毕
        _this.dom.innerHTML = response;

        var snap = Snap('#svgMap');
        snap.attr({
            width: '100%',
            height: '100%'
        });
        _this.snap = snap;
        _this.renderJxz(); //渲染地图
        _this.setMapBannerJxz(_this.opts.mapName); //动画
    },
    /*
     * 设置svg地图
     * */
    setSvgMap: function (response) {
        var _this = this;
        _this.animateImg = {};//添加图片
        _this.animateCircleOuter = {};
        _this.animateCircleInner = {};
        // 地图加载完毕
        _this.dom.innerHTML = response;
        _this.opts.qpData;
        var snap = Snap('#svgMap');
        snap.attr({
            width: '100%',
            height: '100%'
        });
        _this.snap = snap;
        _this.render(); //渲染地图

        _this.setMapBanner(); //动画

        _this.addLoadAnimate();


    },
    addLoadAnimate: function () {
        var _this=this;
        _this.setSize(0);
        Snap.animate(0, 1, function (value) {
            _this.setSize(value);
        }, 400, mina.easeout(), function () {
        });
    },
    setSize: function (ratio) {
        var _this=this;
        var imgData={},outerData={},innerData={};

        //先将将元素属性置零
        $.each(_this.animateCircleOuter, function (key, value) {

            _this.outerData = _this.animateCircleOuter[key].data("data");
            _this.animateCircleOuter[key].attr({
                rx: _this.outerData.rx * ratio,
                ry: _this.outerData.ry * ratio,
            });
            _this.innerData = _this.animateCircleInner[key].data("data");
            _this.animateCircleInner[key].attr({
                rx: _this.innerData.rx * ratio,
                ry: _this.innerData.ry * ratio,
            });
        })
        $.each(_this.animateImg, function (key, value) {
            _this.imgData = _this.animateImg[key].data("data");
            if(key.indexOf("X")>-1){
                _this.animateImg[key].attr({
                    x: -16,
                    y: _this.imgData.y - _this.imgData.height * ratio*2,
                    width: _this.imgData.width * ratio,
                    height: _this.imgData.height * ratio,
                    display: _this.imgData.show ? 'block' : 'none',
                });
            }else{
                _this.animateImg[key].attr({

                    x: 0,
                    y: _this.imgData.y - _this.imgData.height * ratio*2,
                    width: _this.imgData.width * ratio,
                    height: _this.imgData.height * ratio,
                    display: _this.imgData.show ? 'block' : 'none',
                });
            }


        })
    },
    /*
     * 设置标识的样式
     * @param {Object} symbolSvg 标识svg对象
     * @param {Object} style 样式对象
     * @param {Object} data 区域数据
     * @param {Object} point 坐标
     * @param {Object} propName 标记
     * */
    setSymbolStyle: function (propName, style, data, point, symbolSvg) {

        var _this = this,
            _ratio1 =  style.ratio,
            _ratio2 =  style.ratio;
        if (data) {
            /*具体显示多大*/
            /*  if (data.bqxfsljs > 1000) {
                  _ratio1 *= 1.5;
              } else if (data.bqxfsljs > 500) {
                  _ratio1 *= 1;
              } else{
                  _ratio1 *= 0.5;
              }*/
            _ratio1=1.0*data.bqxfsljs/_this.opts.xsMaxValue;
            /*具体显示多大*/
            /*  if (data.zbwxfsljs > 1000) {
                  _ratio2 *= 1.5;
              } else if (data.zbwxfsljs > 500) {
                  _ratio2 *= 1;
              } else{
                  _ratio2 *= 0.5;
              }*/
            _ratio2=1.0*data.zbwxfsljs/_this.opts.xsMaxValue;

            if(_ratio1>=0.7 || true){
                style.img01.src="http://172.16.193.212:8080/img/icon-bar-01.png"
            }else if(_ratio1<0.7&&_ratio1>=0.5){
                style.img01.src='public/img/img-yellow-01.png'
            }else if(_ratio1<0.5&&_ratio1>=0.3){
                style.img01.src='public/img/img-yellow-02.png'
            }else if(_ratio1<0.3&&_ratio1>=0.1){
                style.img01.src='public/img/img-yellow-03.png'
            }else if(_ratio1<0.1){
                style.img01.src='public/img/img-yellow-04.png'
            }
            if(_ratio2>=0.7 || true){
                style.img02.src="http://172.16.193.212:8080/img/icon-bar-02.png"
            }else if(_ratio2<0.7&&_ratio2>=0.5){
                style.img02.src='public/img/img-green-01.png'
            }else if(_ratio2<0.5&&_ratio2>=0.3){
                style.img02.src='public/img/img-green-02.png'
            }else if(_ratio2<0.3&&_ratio2>=0.1){
                style.img02.src='public/img/img-green-03.png'
            }else if(_ratio2<0.1){
                style.img02.src='public/img/img-green-04.png'
            }

            if (data) {
                _this.animateCircleOuter[propName] = _this.snap.paper.ellipse(0,0, 0, 0).attr({
                    stroke: style.outer.stroke,
                    "stroke-width": style.outer.strokeWidth,
                    opacity:0.05
                }).data("data", {
                    x: 0,
                    y: 0,
                    rx: style.outer.radius[0],
                    ry: style.outer.radius[1]
                });
                _this.animateCircleInner[propName] = _this.snap.paper.ellipse(0, 0, 0, 0).attr({
                    fill: style.inner.fill,
                    stroke: style.inner.stroke,
                    "stroke-width": style.inner.strokeWidth,
                    opacity:0.05
                }).data("data", {
                    x: -20,
                    y: 0,
                    rx: style.inner.radius[0],
                    ry: style.inner.radius[1]
                });

                /*是否显示柱子*/
                _this.animateImg[propName+"X"] = _this.snap.paper.image(style.img01.src,point.x, point.y, 0, 0).data("data", {
                    x: 0,
                    y: style.img01.size[1] * _ratio1,
                    width: style.img01.size[0],
                    height: style.img01.size[1] * _ratio1,
                    show: style.img01.show,
                });
                /*是否显示柱子*/
                _this.animateImg[propName+"Y"] = _this.snap.paper.image(style.img02.src, point.x, point.y, 0, 0).data("data", {
                    x: -20,
                    y: style.img02.size[1] * _ratio2,
                    width: style.img02.size[0],
                    height: style.img02.size[1] * _ratio2,
                    show: style.img02.show,
                });

                symbolSvg.add(_this.animateCircleOuter[propName],_this.animateCircleInner[propName],_this.animateImg[propName+"X"],_this.animateImg[propName+"Y"]);
                //  var height = style.img.show ? style.img.size[1] * _ratio : 0;
                symbolSvg.attr({
                    display: style.show ? 'block' : 'none',
                    transform:"translate("+point.x+","+point.y+")"
                })

            }



        }else{
            //仅仅改变颜色
            _this.animateCircleOuter[propName].attr({
                stroke: style.outer.stroke,
                "stroke-width": style.outer.strokeWidth
            });
            _this.animateCircleInner[propName].attr({
                fill: style.inner.fill,
                stroke: style.inner.stroke,
                "stroke-width": style.inner.strokeWidth
            });
            /*如果元素不是最顶层元素将元素置为最顶层*/
            if(_this.hoverName!=propName){
                _this.areaMapCircle[propName].parent().append(_this.areaMapCircle[propName]);
            }
        }

    },
    /*
     * 请求svg地图
     * */
    requestSvgMapJxz: function (url) {
        var _this = this;
        $('.fd-map-item').addClass('fd-hide');
        //  加载svg地图
        $.ajax({
            type: "GET",
            url: url,
            dataType: 'text',
            success: function (response) {
                _this.setSvgMapJxz(response); //设置svg地图
            },
            error: function (info) {
                throw new Error('加载地图失败' + info);
            }
        });
    },
    /*
     * 请求svg地图
     * */
    requestSvgMap: function () {
        var _this = this;
        //  加载svg地图
        getMapSvg().then(res=>{
            _this.setSvgMap(res)
        })
    },
    /*
     * 渲染 街乡镇svg
     * */
    renderJxz: function () {
        var _this = this;
        var data={
            1001: {
                sas: 410,
                jas: 883
            },
            1002: {
                sas: 420,
                jas: 883
            },
            1003: {
                sas: 430,
                jas: 883
            },
            1004: {
                sas: 440,
                jas: 883
            },
            1005: {
                sas: 450,
                jas: 883
            },
            1006: {
                sas: 460,
                jas: 883
            },
            1007:{
                sas: 470,
                jas: 883
            },
            1008:{
                sas: 480,
                jas: 883
            },
            1009:{
                sas: 490,
                jas: 883
            },
            1010:{
                sas: 500,
                jas: 883
            },
            1011:{
                sas: 510,
                jas: 883
            },
            1012:{
                sas: 520,
                jas: 883
            },
            1013: {
                sas: 410,
                jas: 883
            },
            1014: {
                sas: 420,
                jas: 883
            },
            1015: {
                sas: 430,
                jas: 883
            },
            1016: {
                sas: 440,
                jas: 883
            },
            1017: {
                sas: 450,
                jas: 883
            },
            1018: {
                sas: 460,
                jas: 883
            },
            1019:{
                sas: 470,
                jas: 883
            },
            1020:{
                sas: 480,
                jas: 883
            },
            1021:{
                sas: 490,
                jas: 883
            },
            1022:{
                sas: 500,
                jas: 883
            },
            1023:{
                sas: 510,
                jas: 883
            },
            1024:{
                sas: 520,
                jas: 883
            },
            1025: {
                sas: 410,
                jas: 883
            },
            1026: {
                sas: 420,
                jas: 883
            },
            1027: {
                sas: 430,
                jas: 883
            },
            1028: {
                sas: 440,
                jas: 883
            },
            1029: {
                sas: 450,
                jas: 883
            },
            1030: {
                sas: 460,
                jas: 883
            },
            1031:{
                sas: 470,
                jas: 883
            },
            1032:{
                sas: 480,
                jas: 883
            },
            1033:{
                sas: 490,
                jas: 883
            },
            1034:{
                sas: 500,
                jas: 883
            },
            1035:{
                sas: 510,
                jas: 883
            },
            1036:{
                sas: 520,
                jas: 883
            },
            1037: {
                sas: 410,
                jas: 883
            },
            1038: {
                sas: 420,
                jas: 883
            },
            1039: {
                sas: 430,
                jas: 883
            },
            1040: {
                sas: 440,
                jas: 883
            },
            1041: {
                sas: 450,
                jas: 883
            },
            1042: {
                sas: 460,
                jas: 883
            },
            1043:{
                sas: 490,
                jas: 883
            },
            1044:{
                sas: 500,
                jas: 883
            },
            1045:{
                sas: 510,
                jas: 883
            },
            1046:{
                sas: 520,
                jas: 883
            },
            1047: {
                sas: 410,
                jas: 883
            },
            1048: {
                sas: 420,
                jas: 883
            },
            1049: {
                sas: 430,
                jas: 883
            },
            1050: {
                sas: 440,
                jas: 883
            },
            1051: {
                sas: 450,
                jas: 883
            },
            1052: {
                sas: 460,
                jas: 883
            },
            1053:{
                sas: 490,
                jas: 883
            },
            1054:{
                sas: 500,
                jas: 883
            },
            1055:{
                sas: 510,
                jas: 883
            },
            1056:{
                sas: 520,
                jas: 883
            },
            1057: {
                sas: 410,
                jas: 883
            },
            1058: {
                sas: 420,
                jas: 883
            },
            1059: {
                sas: 430,
                jas: 883
            },
            1060: {
                sas: 440,
                jas: 883
            },
            1071: {
                sas: 450,
                jas: 883
            },
            1052: {
                sas: 460,
                jas: 883
            },
            1073:{
                sas: 490,
                jas: 883
            },
            1074:{
                sas: 500,
                jas: 883
            },
            1075:{
                sas: 510,
                jas: 883
            },
            1076:{
                sas: 520,
                jas: 883
            },
            1077: {
                sas: 410,
                jas: 883
            },
            1078: {
                sas: 420,
                jas: 883
            },
            1079: {
                sas: 430,
                jas: 883
            },
            1070: {
                sas: 440,
                jas: 883
            },
            1081: {
                sas: 450,
                jas: 883
            },
            1082: {
                sas: 460,
                jas: 883
            },
            1083:{
                sas: 490,
                jas: 883
            },
            1084:{
                sas: 500,
                jas: 883
            },
            1085:{
                sas: 510,
                jas: 883
            },
            1086:{
                sas: 520,
                jas: 883
            },
            1087: {
                sas: 410,
                jas: 883
            },
            1088: {
                sas: 420,
                jas: 883
            },
            1089: {
                sas: 430,
                jas: 883
            },
            1080: {
                sas: 440,
                jas: 883
            },
            1091: {
                sas: 450,
                jas: 883
            },
            1092: {
                sas: 460,
                jas: 883
            },
            1093:{
                sas: 490,
                jas: 883
            },
            1094:{
                sas: 500,
                jas: 883
            },
            1095:{
                sas: 510,
                jas: 883
            },
            1096:{
                sas: 520,
                jas: 883
            },
            1097: {
                sas: 410,
                jas: 883
            },
            1098: {
                sas: 420,
                jas: 883
            },
            1099: {
                sas: 430,
                jas: 883
            },
            1100: {
                sas: 440,
                jas: 883
            },
            1101: {
                sas: 450,
                jas: 883
            },
            1102: {
                sas: 460,
                jas: 883
            },
            1103:{
                sas: 490,
                jas: 883
            },
            1104:{
                sas: 500,
                jas: 883
            },
            1105:{
                sas: 510,
                jas: 883
            },
            1106:{
                sas: 520,
                jas: 883
            },
            1107: {
                sas: 410,
                jas: 883
            },
            1108: {
                sas: 420,
                jas: 883
            },
            1109: {
                sas: 430,
                jas: 883
            },
            1110: {
                sas: 440,
                jas: 883
            },
            1111:{
                sas: 510,
                jas: 883
            },
            1112:{
                sas: 520,
                jas: 883
            },
            1113: {
                sas: 410,
                jas: 883
            },
            1114: {
                sas: 420,
                jas: 883
            },
            1115: {
                sas: 430,
                jas: 883
            },
            1116: {
                sas: 440,
                jas: 883
            },
            1117: {
                sas: 450,
                jas: 883
            },
            1118: {
                sas: 460,
                jas: 883
            },
            1119:{
                sas: 470,
                jas: 883
            },
            1120:{
                sas: 480,
                jas: 883
            },
            1121:{
                sas: 490,
                jas: 883
            },
            1122:{
                sas: 500,
                jas: 883
            },
            1123:{
                sas: 510,
                jas: 883
            },
            1124:{
                sas: 520,
                jas: 883
            },
            1125: {
                sas: 410,
                jas: 883
            },
            1126: {
                sas: 420,
                jas: 883
            },
            1127: {
                sas: 430,
                jas: 883
            },
            1128: {
                sas: 440,
                jas: 883
            },
            1129: {
                sas: 450,
                jas: 883
            },
            1130: {
                sas: 460,
                jas: 883
            },
            1131:{
                sas: 470,
                jas: 883
            },
            1132:{
                sas: 480,
                jas: 883
            },
            1133:{
                sas: 490,
                jas: 883
            },
            1134:{
                sas: 500,
                jas: 883
            },
            1135:{
                sas: 510,
                jas: 883
            },
            1136:{
                sas: 520,
                jas: 883
            },
            1137: {
                sas: 410,
                jas: 883
            },
            1138: {
                sas: 420,
                jas: 883
            },
            1139: {
                sas: 430,
                jas: 883
            },
            1140: {
                sas: 440,
                jas: 883
            },
            1141: {
                sas: 450,
                jas: 883
            },
            1142: {
                sas: 460,
                jas: 883
            },
            1143:{
                sas: 490,
                jas: 883
            },
            1144:{
                sas: 500,
                jas: 883
            },
            1145:{
                sas: 510,
                jas: 883
            },
            1146:{
                sas: 520,
                jas: 883
            },
            1147: {
                sas: 410,
                jas: 883
            },
            1148: {
                sas: 420,
                jas: 883
            },
            1149: {
                sas: 430,
                jas: 883
            },
            1150: {
                sas: 440,
                jas: 883
            },
            1151: {
                sas: 450,
                jas: 883
            },
            1152: {
                sas: 460,
                jas: 883
            },
            1153:{
                sas: 490,
                jas: 883
            },
            1154:{
                sas: 500,
                jas: 883
            },
            1155:{
                sas: 510,
                jas: 883
            },
            1156:{
                sas: 520,
                jas: 883
            },
            1157: {
                sas: 410,
                jas: 883
            },
            1158: {
                sas: 420,
                jas: 883
            },
            1159: {
                sas: 430,
                jas: 883
            },
            1160: {
                sas: 440,
                jas: 883
            },
            1171: {
                sas: 450,
                jas: 883
            },
            1152: {
                sas: 460,
                jas: 883
            },
            1173:{
                sas: 490,
                jas: 883
            },
            1174:{
                sas: 500,
                jas: 883
            },
            1175:{
                sas: 510,
                jas: 883
            },
            1176:{
                sas: 520,
                jas: 883
            },
            1177: {
                sas: 410,
                jas: 883
            },
            1178: {
                sas: 420,
                jas: 883
            },
            1179: {
                sas: 430,
                jas: 883
            },
            1170: {
                sas: 440,
                jas: 883
            },
            1181: {
                sas: 450,
                jas: 883
            },
            1182: {
                sas: 460,
                jas: 883
            },
            1183:{
                sas: 490,
                jas: 883
            },
            1184:{
                sas: 500,
                jas: 883
            },
            1185:{
                sas: 510,
                jas: 883
            },
            1186:{
                sas: 520,
                jas: 883
            },
            1187: {
                sas: 410,
                jas: 883
            },
            1188: {
                sas: 420,
                jas: 883
            },
            1189: {
                sas: 430,
                jas: 883
            },
            1180: {
                sas: 440,
                jas: 883
            },
            1191: {
                sas: 450,
                jas: 883
            },
            1192: {
                sas: 460,
                jas: 883
            },
            1193:{
                sas: 490,
                jas: 883
            },
            1194:{
                sas: 500,
                jas: 883
            },
            1195:{
                sas: 510,
                jas: 883
            },
            1196:{
                sas: 520,
                jas: 883
            },
            1197: {
                sas: 410,
                jas: 883
            },
            1198: {
                sas: 420,
                jas: 883
            },
            1199: {
                sas: 430,
                jas: 883
            },
            1200: {
                sas: 440,
                jas: 883
            },
            1201: {
                sas: 410,
                jas: 883
            },
            1202: {
                sas: 420,
                jas: 883
            },
            1203: {
                sas: 430,
                jas: 883
            },
            1204: {
                sas: 440,
                jas: 883
            },
            1205: {
                sas: 450,
                jas: 883
            },
            1206: {
                sas: 460,
                jas: 883
            },
            1207:{
                sas: 470,
                jas: 883
            },
            1208:{
                sas: 480,
                jas: 883
            },
            1209:{
                sas: 490,
                jas: 883
            },
            1210:{
                sas: 500,
                jas: 883
            },
            1211:{
                sas: 510,
                jas: 883
            },
            1212:{
                sas: 520,
                jas: 883
            },
            1213: {
                sas: 410,
                jas: 883
            },
            1214: {
                sas: 420,
                jas: 883
            },
            1215: {
                sas: 430,
                jas: 883
            },
            1216: {
                sas: 440,
                jas: 883
            },
            1217: {
                sas: 450,
                jas: 883
            },
            1218: {
                sas: 460,
                jas: 883
            },
            1219:{
                sas: 470,
                jas: 883
            },
            1220:{
                sas: 480,
                jas: 883
            },

        };

        _this.opts.data=data;
        //设置地图样式
        this.setMapJxzStyle();
        _this.opts.activeMapId='';
        //赋值渐变颜色
        _this.gradientColor = this.gradientColors(_this.opts.inRange.color, _this.opts.STEPS);
        //创建提示框
        this.createTipBox();

        this.setAreaMapFillColor(); //设置区域填充颜色
        //添加区域交互动效
        this.addAreaMapInteractionJxz();
        //执行地图动画圆
        _this.opts.animateObj = this.operateAnimateCircle(_this.opts.animateParams.cx, _this.opts.animateParams.cy);

    },
    /*
     * 渲染svg
     * */
    render: function () {
        var _this = this;
        //设置地图样式
        this.setMapStyle();
        //赋值渐变颜色
        _this.gradientColor = this.gradientColors(_this.opts.inRange.color, _this.opts.STEPS);
        //创建提示框
        this.createTipBox();
        //初始化地图区域
        this.initAreaMap();


        this.setAreaMapFillColor(); //设置区域填充颜色
        //添加区域交互动效
        this.addAreaMapInteraction();
        //执行地图动画圆
        _this.opts.animateObj = this.operateAnimateCircle(_this.opts.animateParams.cx, _this.opts.animateParams.cy);


    },
    // 检测当前浏览器是否是ie 是ie则返回false
    checkIE: function () {
        if ((navigator.userAgent.indexOf('MSIE') >= 0) &&
            (navigator.userAgent.indexOf('Opera') < 0)) {
            // alert('你是使用IE')
            return false;
        } else if (navigator.userAgent.indexOf('Firefox') >= 0) {
            return true;
        } else if (navigator.userAgent.indexOf('Opera') >= 0) {
            return true;
        } else {
            return true;
        }
    },
    /*
     * 设置街乡镇地图的样式外观
     * */
    setMapJxzStyle: function () {
        var _this = this;
        var snap = _this.snap;

        // 是否显示错误日志
        _this.isShowErrorLog = _this.opts.isShowErrorLog;
        // 区域文本
        _this.areaText = [];

        // mapid 前缀
        _this.mapidPrefix = _this.opts.mapidJxzPrefix;

        // 是否是大地图
        _this.isMaxMap = _this.opts.isMaxMap;

        // 视窗对象
        _this.viewBox = _this.snap.attr('viewBox');

        // map style
        _this.mapStyle = _this.opts.mapStyle;

        // 是否倾斜
        _this.isPerspective = _this.opts.isPerspective;

        //设置全局矩阵变量Matrix
        //_this.Matrix = _this.opts.Matrix;

        // 地图的比值
        _this.mapRatio = Math.max(_this.viewBox.width / _this.mapStyle.relativeWidth,
            _this.viewBox.height / _this.mapStyle.relativeWidth);

        function changeMapStyle() {

            // 设置地图描边的大小
            _this.mapStyle.map.strokeWidthRatio = _this.mapStyle.map.strokeWidth * _this.mapRatio;

            // 设置阴影大小
            _this.mapStyle.mapBj.shadowFilter = Snap.filter.shadow(
                _this.mapStyle.mapBj.shadow.x * _this.mapRatio,
                _this.mapStyle.mapBj.shadow.y * _this.mapRatio,
                _this.mapStyle.mapBj.shadow.radius * _this.mapRatio,
                _this.mapStyle.mapBj.shadow.color);

            // 设置地图字体大小
            var fontSize = _this.mapStyle.textStyle.fontSize * _this.mapRatio;
            //检测是否是IE
            if (!_this.checkIE()) {
                fontSize = _this.mapStyle.textStyle.fontSize * _this.mapRatio * 1.5;
            }
            _this.mapStyle.textStyle.fontSizeRatio = fontSize;

            // 设置强调字体大小
            var emphasisFontSize = _this.mapStyle.emphasisTextStyle.fontSize * _this.mapRatio;
            //检测是否是IE
            if (!_this.checkIE()) {
                emphasisFontSize = _this.mapStyle.emphasisTextStyle.fontSize * _this.mapRatio * 1.5;
            }
            _this.mapStyle.emphasisTextStyle.fontSizeRatio = emphasisFontSize;

            // 圆半径
            _this.mapStyle.circle.rRatio = _this.mapStyle.circle.r * _this.mapRatio;

            //areaMap边框
            _this.mapStyle.areaMap.strokeWidthRatio = _this.mapStyle.areaMap.strokeWidth * _this.mapRatio;

            //dataText shadow
            _this.mapStyle.textStyle.shadowFilter = Snap.filter.shadow(
                _this.mapStyle.textStyle.shadow.x * _this.mapRatio,
                _this.mapStyle.textStyle.shadow.y * _this.mapRatio,
                _this.mapStyle.textStyle.shadow.radius * _this.mapRatio,
                _this.mapStyle.textStyle.shadow.color);
        }

        // 根据不同的尺寸设置不同的样式
        changeMapStyle();

        // 设置区域颜色
        _this.areaMapColor = _this.opts.areaMapColor;

        // 数据源对象
        _this.areaMapDataSource = _this.opts.data;


        // 地图背景样式
        +function setMapBjStyle() {
            _this.mapPathBjG = snap.select('#svgMapBjJxz');

            _this.mapPathBjG.selectAll('path').attr({
                stroke: _this.mapStyle.mapBj.stroke,
                fill: _this.opts.setGray, // 默认设置灰色
                strokeWidth:2
            });
            // 隐藏所有的 -outline
            $('[id$="-outline"]').css({
                display: 'none'
            });

            if ($('#xinjiang-group').length) {
                $('#xinjiang-outline').css({
                    display: 'block'
                });
            }

            //_this.mapPathBjGPath = _this.mapPathBjG.selectAll('path');
            /*  _this.mapPathBjGPath.attr({
             display: 'block',
             fill: _this.opts.setGray, //_this.mapStyle.mapBj.fill,
             filter: snap.paper.filter(_this.mapStyle.mapBj.shadowFilter),
             stroke: _this.mapStyle.mapBj.stroke,
             strokeWidth: _this.mapStyle.mapBj.strokeWidthRatio
             });*/


        }();

        if (_this.snap.select('	#mapid-nansha')) {
            _this.snap.select('#mapid-nansha').attr({
                fill: 'rgba(255,255,255,1)', // 'rgba(168,208,248,0.8)',
                stroke: '#6699cc', // _this.mapStyle.mapBj.stroke,
                strokeWidth: '6px'
            });
        }

        // 设置默认元素
        +function setOriginalElement() {
            //_this.snap.selectAll('text').remove(); // 移除默认文本
            _this.snap.selectAll('circle').attr({ // 隐藏所有的圆
                display: 'none'
            });
            _this.snap.selectAll('polily').attr({ // 隐藏所有的圆
                display: 'none'
            });
            // 移除默认文本
            _this.snap.selectAll('ellipse').attr({ // 隐藏所有的圆
                visibility: 'hidden',
                fill: '#fff'
            });
        }();

    },
    /*
     * 设置地图的样式外观
     * */
    setMapStyle: function () {
        var _this = this;
        var snap = _this.snap;

        // 是否显示错误日志
        _this.isShowErrorLog = _this.opts.isShowErrorLog;
        // 区域文本
        _this.areaText = [];

        // mapid 前缀
        _this.mapidPrefix = _this.opts.mapidPrefix;

        // 是否是大地图
        _this.isMaxMap = _this.opts.isMaxMap;

        // 视窗对象
        _this.viewBox = _this.snap.attr('viewBox');

        // map style
        _this.mapStyle = _this.opts.mapStyle;

        // 是否倾斜
        _this.isPerspective = _this.opts.isPerspective;

        //设置全局矩阵变量Matrix
        //_this.Matrix = _this.opts.Matrix;

        // 地图的比值
        _this.mapRatio = Math.max(_this.viewBox.width / _this.mapStyle.relativeWidth,
            _this.viewBox.height / _this.mapStyle.relativeWidth);

        function changeMapStyle() {

            // 设置地图描边的大小
            _this.mapStyle.map.strokeWidthRatio = _this.mapStyle.map.strokeWidth * _this.mapRatio;

            // 设置阴影大小
            _this.mapStyle.mapBj.shadowFilter = Snap.filter.shadow(
                _this.mapStyle.mapBj.shadow.x * _this.mapRatio,
                _this.mapStyle.mapBj.shadow.y * _this.mapRatio,
                _this.mapStyle.mapBj.shadow.radius * _this.mapRatio,
                _this.mapStyle.mapBj.shadow.color);

            // 设置地图字体大小
            var fontSize = _this.mapStyle.textStyle.fontSize * _this.mapRatio;
            //检测是否是IE
            if (!_this.checkIE()) {
                fontSize = _this.mapStyle.textStyle.fontSize * _this.mapRatio * 1.5;
            }
            _this.mapStyle.textStyle.fontSizeRatio = fontSize;

            // 设置强调字体大小
            var emphasisFontSize = _this.mapStyle.emphasisTextStyle.fontSize * _this.mapRatio;
            //检测是否是IE
            if (!_this.checkIE()) {
                emphasisFontSize = _this.mapStyle.emphasisTextStyle.fontSize * _this.mapRatio * 1.5;
            }
            _this.mapStyle.emphasisTextStyle.fontSizeRatio = emphasisFontSize;

            // 圆半径
            _this.mapStyle.circle.rRatio = _this.mapStyle.circle.r * _this.mapRatio;

            //areaMap边框
            _this.mapStyle.areaMap.strokeWidthRatio = _this.mapStyle.areaMap.strokeWidth * _this.mapRatio;

            //dataText shadow
            _this.mapStyle.textStyle.shadowFilter = Snap.filter.shadow(
                _this.mapStyle.textStyle.shadow.x * _this.mapRatio,
                _this.mapStyle.textStyle.shadow.y * _this.mapRatio,
                _this.mapStyle.textStyle.shadow.radius * _this.mapRatio,
                _this.mapStyle.textStyle.shadow.color);
        }

        // 根据不同的尺寸设置不同的样式
        changeMapStyle();

        // 设置区域颜色
        _this.areaMapColor = _this.opts.areaMapColor;

        // 数据源对象
        _this.areaMapDataSource = _this.opts.data;


        // 地图背景样式
        +function setMapBjStyle() {
            _this.mapPathBjG = snap.select('#svgMapBj');

            _this.mapPathBjG.selectAll('path').attr({
                stroke: _this.mapStyle.mapBj.stroke,
                fill:'none', // 默认设置灰色
                strokeWidth:2
            });
            // 隐藏所有的 -outline
            $('[id$="-outline"]').css({
                display: 'none'
            });

            if ($('#xinjiang-group').length) {
                $('#xinjiang-outline').css({
                    display: 'block'
                });
            }

            //_this.mapPathBjGPath = _this.mapPathBjG.selectAll('path');
            /*  _this.mapPathBjGPath.attr({
             display: 'block',
             fill: _this.opts.setGray, //_this.mapStyle.mapBj.fill,
             filter: snap.paper.filter(_this.mapStyle.mapBj.shadowFilter),
             stroke: _this.mapStyle.mapBj.stroke,
             strokeWidth: _this.mapStyle.mapBj.strokeWidthRatio
             });*/


        }();

        if (_this.snap.select('	#mapid-nansha')) {
            _this.snap.select('#mapid-nansha').attr({
                fill: 'rgba(255,255,255,1)', // 'rgba(168,208,248,0.8)',
                stroke: '#6699cc', // _this.mapStyle.mapBj.stroke,
                strokeWidth: '6px'
            });
        }

        // 设置默认元素
        +function setOriginalElement() {
            //_this.snap.selectAll('text').remove(); // 移除默认文本
            _this.snap.selectAll('circle').attr({ // 隐藏所有的圆
                display: 'none'
            });
            _this.snap.selectAll('polily').attr({ // 隐藏所有的圆
                display: 'none'
            });
            // 移除默认文本
            _this.snap.selectAll('ellipse').attr({ // 隐藏所有的圆
                visibility: 'hidden',
                fill: '#fff'
            });
        }();

    },
    /*
     * 初始化区域地图
     * */
    initAreaMap: function () {
        var _this = this;
        // 创建一个包含所有区域的地图对象
        _this.areaMapSet = {}; //设置集合,用来处理鼠标交互事件
        _this.areaMap = {}; //区域地图
        _this.areaMapData = {}; //地图数据
        _this.areaMapCircle = {}; //地图圆
        _this.areaMapText = {}; //地图文本
        _this.mapIdArr = [];//存放地图区域的mapId数组
        _this.areaMapEmphasis = {};    //强调的区域
        _this.areaMapGroup = {};    //设置gruop，用来处理鼠标交互事件
        //设置地图文本样式
        _this.snap.selectAll('text').attr({
            strokeWidth:0,
            fontFamily: 'Microsoft YaHei',
            textAnchor: 'middle',
            dominantBaseline: 'middle',
            color:'none',
            fontSize: 15,
            fill: '#c6d5f4',
            hoverFill: '#fff'
        });
        if(_this.opts.flagNew==1){
            $.each(_this.areaMapDataSource, function (index, value) {
                _this.opts.mapCount.push(value.bqxfsljs);
            });
            $.each(_this.areaMapDataSource, function (index, value) {
                _this.opts.mapCount1.push(value.zbwxfsljs);
            });
        }
        if(_this.opts.flagNew==2){
            $.each(_this.areaMapDataSource, function (index, value) {
                _this.opts.mapCount.push(value.drtj);
            });
        }
        if(_this.opts.flagNew==3){
            $.each(_this.areaMapDataSource, function (index, value) {
                _this.opts.mapCount.push(value.scsas);
            });
        }
        //假设第一个值为最大值
        _this.opts.xsMaxValue = _this.opts.mapCount[0];
        //假设第一个值为最小值
        _this.opts.xsMinValue = _this.opts.mapCount[0];
        //假设第一个值为最大值
        _this.opts.xsMaxValue1 = _this.opts.mapCount1[0];
        //假设第一个值为最小值
        _this.opts.xsMinValue1 = _this.opts.mapCount1[0];
        for (var i = 0; i < _this.opts.mapCount.length; i++) {
            if (_this.opts.mapCount[i] > _this.opts.xsMaxValue) {
                _this.opts.xsMaxValue = _this.opts.mapCount[i];
            }
            if (_this.opts.mapCount[i] < _this.opts.xsMinValue) {
                _this.opts.xsMinValue = _this.opts.mapCount[i];
            }
        }
        for (var i = 0; i < _this.opts.mapCount1.length; i++) {
            if (_this.opts.mapCount1[i] > _this.opts.xsMaxValue1) {
                _this.opts.xsMaxValue1 = _this.opts.mapCount1[i];
            }
            if (_this.opts.mapCount1[i] < _this.opts.xsMinValue1) {
                _this.opts.xsMinValue1 = _this.opts.mapCount1[i];
            }
        }
        //遍历数据对象
        for (var mapId in _this.areaMapDataSource) {
            _this.mapIdArr.push(mapId);//存放数组法院id
            // 区域数据对象
            _this.areaMapData[_this.mapidPrefix + mapId] = _this.areaMapDataSource[mapId];
            _this.areaMapData[_this.mapidPrefix + mapId].mapId = mapId;

            _this.areaMapSet[_this.mapidPrefix + mapId] = _this.snap.selectAll('#' + _this.mapidPrefix + mapId);

            _this.areaMapSet[_this.mapidPrefix + mapId].clear();

            var cursor = 'default';
            // 判断区域对象是否存在
            if ($('#' + _this.mapidPrefix + mapId).length > 0) {
                // 区域对象
                _this.areaMap[_this.mapidPrefix + mapId] = _this.snap.select('#' + _this.mapidPrefix + mapId);
                //设置对应的样式
                _this.areaMap[_this.mapidPrefix + mapId].attr({
                    stroke: _this.mapStyle.mapBj.stroke,
                    strokeWidth: 1,
                    fill: _this.mapStyle.areaMap.outlineFill,
                    cursor: 'pointer',
                    display: 'block'
                }).data('data', _this.areaMapData[_this.mapidPrefix + mapId]).data('isActive', false).data('index', _this.mapIdArr.length);//添加对应的数据对象 data('isActive', false)为了区分hover和click事件冲突问题

                // 不置灰就用data里保留的颜色
                if (_this.areaMap[_this.mapidPrefix + mapId].selectAll('path').length > 0) {
                    _this.areaMap[_this.mapidPrefix + mapId].selectAll('path').attr({
                        fill: _this.mapStyle.areaMap.outlineFill,
                        stroke: _this.mapStyle.areaMap.outlineStroke
                    });
                }
                //  _this.opts.lineConverge.startPoints.indexOf(mapId) === -1 && _this.areaMapSet[_this.mapidPrefix + mapId].push(_this.areaMap[_this.mapidPrefix + mapId]);

            }

            // 判断圆的对象是否存在
            if ($('#' + _this.mapidPrefix + mapId + '-circle').length > 0) {
                // 区域圆心对象
                _this.areaMapCircle[_this.mapidPrefix + mapId] = _this.snap.select('#' + _this.mapidPrefix + mapId + '-circle');
                //圆心坐标
                var circlePoint = {
                    x: _this.areaMapCircle[_this.mapidPrefix + mapId].attr('cx'),
                    y: _this.areaMapCircle[_this.mapidPrefix + mapId].attr('cy')
                };
                //设置对应的圆的样式
                _this.areaMapCircle[_this.mapidPrefix + mapId].attr({
                    x: _this.areaMapCircle[_this.mapidPrefix + mapId].attr('cx'),
                    y: _this.areaMapCircle[_this.mapidPrefix + mapId].attr('cy')
                }).data('data', _this.areaMapData[_this.mapidPrefix + mapId]).data('index', _this.mapIdArr.length).appendTo(_this.snap);
                _this.areaMapCircle[_this.mapidPrefix + mapId]=_this.snap.paper.g().attr({
                    x: _this.areaMapCircle[_this.mapidPrefix + mapId].attr('cx'),
                    y: _this.areaMapCircle[_this.mapidPrefix + mapId].attr('cy')
                }).data('data', _this.areaMapData[_this.mapidPrefix + mapId]).data('index', _this.mapIdArr.length).appendTo(_this.snap);
                // _this.opts.lineConverge.startPoints.indexOf(mapId) === -1 && _this.areaMapSet[_this.mapidPrefix + mapId].push(_this.areaMapCircle[_this.mapidPrefix + mapId]);
                // 创建数据本对象
                _this.areaMapText[_this.mapidPrefix + mapId] = _this.snap.select('#' + _this.mapidPrefix + mapId + '-text');
                //TODO
                _this.mapPathBjG.selectAll('text').attr({
                    stroke: '#ffffff', // 默认设置灰色
                });



                _this.setSymbolStyle(_this.mapidPrefix + mapId,_this.opts.symbol.itemStyle.normal,_this.areaMapData[_this.mapidPrefix + mapId],circlePoint,_this.areaMapCircle[_this.mapidPrefix + mapId]);


            }


        }
    },
    // 联动
    triggerClick:function(item){
        var _this=this;
        if(item.key=='110000'||item.key=='110100'){
            //地图上无法选北京市和北京市本委,因此不联动
            _this.opts.activeMapId=''
        }else{
            _this.opts.activeMapId=item.key
        }

        _this.clearAnimation();
        _this.opts.mapidJxzPrefix='map-'+item.key+'-';
        var dataValue=item.key;
        _this.opts.mapName=item.value;
        $('.js-map-value').text(dataValue);
        var dataName;
        // for(var i=0;i<_this.opts.list.length;i++){
        //     if(_this.opts.list[i].value==dataValue){
        //         dataName=_this.opts.list[i].name;
        //     }
        // }
        $('.js-map-name').text(item.value);

    },
    /*
     * 创建提示框
     * */
    createTipBox: function () {
        var _this = this;
        // 合并参数
        var style = $.fn.extend(true, {
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: '999',
            color: '#fff',
            'font-size': '13px',
            fontFamily: 'Microsoft YaHei',
            lineHeight: '1.5em',
            backgroundColor: 'rgba(0,0,0,0.4)',
            borderColor: '#408fc3',
            borderRadius: '5px',
            padding: '5px 8px',
            whiteSpace: 'nowrap',
            display: 'none'

        }, _this.opts.tooltip.style || {});
        //$('<div id=' +
        //    _this.opts.tooltip.id +
        //    '>' +
        //    '<h3 style="white-space:nowrap;font-size:14px;">西北</h3>' +
        //    '<p  style="white-space:nowrap;"><span class="fd-name-01">收案</span>：<span  class="fd-name-count-01">0</span></p>' +
        //    '<p  style="white-space:nowrap;"><span class="fd-name-02">结案</span>：<span  class="fd-name-count-02">0</span></p>' +
        //    '<p  style="white-space:nowrap;"><span class="fd-name-03">未结</span>：<span  class="fd-name-count-03">0%</span></p>' +
        //    '</div>').css(style).appendTo('body');
        $('<div id=' +
            _this.opts.tooltip.id +
            '>' +
            '<h3 style="white-space:nowrap;font-size:14px;">西北</h3>' +
            '</div>').css(style).appendTo('body');
    },
    /*
     * 渐变颜色
     * */
    gradientColors: function (colorArr, steps) {

        var gradientColorArr = [];
        if (colorArr.length < 2) {
            return colorArr;
        }
        //分割的段数 向上取整
        var segment = Math.ceil(steps / (colorArr.length - 1));
        for (var i = 0; i < (colorArr.length - 1); i++) {
            //定义开始颜色和结束颜色
            var startColor = Snap.color(colorArr[i]),
                endColor = Snap.color(colorArr[i + 1]);

            //获取颜色之间的差值
            var diffValue = {
                r: (endColor.r - startColor.r) / segment,
                g: (endColor.g - startColor.g) / segment,
                b: (endColor.b - startColor.b) / segment,
                opacity: (endColor.opacity - startColor.opacity) / segment
            };
            for (var j = (segment * i); j < (segment * (i + 1)); j++) {
                gradientColorArr.push(
                    'rgba(' +
                    (diffValue.r * (j - (segment * i)) + startColor.r) + ',' +
                    (diffValue.g * (j - (segment * i)) + startColor.g) + ',' +
                    (diffValue.b * (j - (segment * i)) + startColor.b) + ',' +
                    (diffValue.opacity * (j - (segment * i)) + startColor.opacity) + ')');
            }
        }
        return gradientColorArr;
    },
    /*
     * 根据数值获取对应的颜色值
     * @param {float} value 数值
     * @return {String}  颜色字符串
     * */
    getColorByValue: function (value) {
        var _this = this;
        //防止最大值等于最小值的情况index出现无穷大的情况

        if((_this.opts.xsMaxValue - _this.opts.xsMinValue) <= 0) {
            return _this.gradientColor[0];
        }
        var fill = '';
        value = parseFloat(value);

        //获取对应的索引
        var index = Math.floor(((value - _this.opts.xsMinValue) / (_this.opts.xsMaxValue - _this.opts.xsMinValue)) * _this.opts.STEPS);
        if (index < 0) {
            index = 0;
        } else if (index > (_this.gradientColor.length - 1)) {
            index = _this.gradientColor.length - 1;
        }
        fill = _this.gradientColor[index];
        return fill;
    },
    /*
     * 设置区域地图的填充颜色
     * */
    setAreaMapFillColor: function () {
        var _this = this;
        $.each(_this.areaMap, function (name, value) {
            var data = value.data('data');
            //如果当前元素时一个集合，则获取子集的path，否则子集则是一个path
            var _path = value.selectAll('path').length > 0 ? value.selectAll('path') : value;

            if(_this.opts.flagNew==1){
                _path.attr({
                    fill: "#047bdf", //根据案件合格率获取对应的颜色
                    opacity:'1'
                });
            }
            if(_this.opts.flagNew==2){
                _path.attr({
                    fill: _this.getColorByValue(data.drtj), //根据案件合格率获取对应的颜色
                    opacity:'0.30'
                });
            }
            if(_this.opts.flagNew==3){
                _path.attr({
                    fill: _this.getColorByValue(data.scsas), //根据案件合格率获取对应的颜色
                    opacity:'0.30'
                });
            }

        });
    },
    /*
     * 给地图添加交互效果
     * 需要给path路径、圆圈、文本统一添加上交互效果
     * */
    addAreaMapInteractionJxz: function () {
        var _this = this;
        var tooltip = $('#' + _this.opts.tooltip.id),
            tooltipTitle = tooltip.find('h3'),
            tooltipContent1Count = tooltip.find('.fd-name-count-01'),
            tooltipContent2Count = tooltip.find('.fd-name-count-02'),
            tooltipContent3Count = tooltip.find('.fd-name-count-03');
        var delt = 5;
        var winW = $(window).width();
        var winH = $(window).height();
        $.each(_this.areaMapData, function (name, value) {
            //对应的数据
            var mapData = _this.areaMapData[name];
            //热力图 鼠标滑过事件
            if(value[0]!=undefined){
                _this.setdivJxz(name,value[0]);
                value[0].mouseover(function (event) {
                        _this.clearAnimation();
                        var event = event || window.event;
                        _this.mapAreaClick(name, _this.opts.flag);
                        _this.setTooltipPositionJxz(event,name,value[0]);
                    }
                ).mouseout(function (event) {
                    // _this.resetActiveStyle();
                        //name map-110101-1001
                        var _name=name.substring(4,10);
                        setTimeout(function () {
                            _this.setMapBannerJxz(_name);
                        },1500)

                    }
                )
            }

        });

        $.each(_this.areaMapText, function (name, value) {
            //热力图 鼠标滑过事件
            if(value!=undefined){
                value.mouseover(function (event) {
                        var event = event || window.event;
                        _this.mapAreaClick(name, _this.opts.flag);
                        _this.setTooltipPositionJxz(event,name,value);
                    }
                ).mouseout(function (event) {
                    //_this.resetActiveStyle();
                        //name map-110101-1001
                        var _name=name.substring(4,10);
                        setTimeout(function () {
                            _this.setMapBannerJxz(_name);
                        },1500)
                    }
                )
            }

        });

    },
    /*
     * 给地图添加交互效果
     * 需要给path路径、圆圈、文本统一添加上交互效果
     * */
    addAreaMapInteraction: function () {
        var _this = this;
        var tooltip = $('#' + _this.opts.tooltip.id),
            tooltipTitle = tooltip.find('h3'),
            tooltipContent1Count = tooltip.find('.fd-name-count-01'),
            tooltipContent2Count = tooltip.find('.fd-name-count-02'),
            tooltipContent3Count = tooltip.find('.fd-name-count-03');
        var delt = 5;
        var winW = $(window).width();
        var winH = $(window).height();

        $.each(_this.areaMapSet, function (name, value) {
            //对应的数据
            var mapData = _this.areaMapData[name];
            //热力图 鼠标滑过事件
            if(value[0]!=undefined){

                value[0].mouseover(function (event) {
                        _this.clearAnimation();
                        var event = event || window.event;
                        _this.mapAreaClick(name, _this.opts.flag,event);
                        // debugger
                        _this.setTooltipPositionJxz(event,name,value[0]);
                    }
                ).mouseout(function (event) {
                    _this.opts.hoverCallback('')
                    _this.resetActiveStyle();
                    if(!($('.fd-map-item').hasClass('fd-hide'))){
                        $('.fd-map-item').addClass('fd-hide');
                    }
                }).click(function () {
                    _this.clearAnimation();
                    _this.opts.mapidJxzPrefix=name+'-';

                    var dataValue=name.substring(4,11);
                    _this.opts.mapName=dataValue;
                    $('.js-map-value').text(dataValue);
                    var dataName;
                    for(var i=0;i<_this.opts.list.length;i++){
                        if(_this.opts.list[i].value==dataValue){
                            dataName=_this.opts.list[i].name;
                        }
                    }
                    $('.js-map-name').text(dataName);
                    //_this.requestSvgMapJxz('../svg/'+name+'.svg');
                    _this.opts.clickCallback(dataName, dataValue);
                })

            }

        });

        $.each(_this.areaMapText, function (name, value) {
            // //热力图 鼠标滑过事件
            // if(value!=undefined){
            //     value.mouseover(function (event) {
            //         _this.clearAnimation();
            //             var event = event || window.event;
            //             _this.mapAreaClick(name, _this.opts.flag);
            //             _this.setTooltipPosition(event,name,value);
            //         debugger
            //         }
            //     ).mouseout(function (event) {
            //        // _this.resetActiveStyle();
            //
            //         setTimeout(function () {
            //             _this.setMapBanner();
            //         },1500);
            //
            //     })
            // }

        });

    },
    // 设置提示框位置
    setdivJxz:function(name,path){
        var _name = name;
        _name=name.substring(4,10);
        var _name2=name.substring(12,15);
        _name2=_name+_name2;
        var _event=$('#jsMap-'+_name2);
        var node=path.node;
        var rect=node.getBoundingClientRect();
        var content=document.querySelector('#jsMapBox').getBoundingClientRect();
        var left=rect.x+rect.width/2-content.x-25+'px';
        var top=rect.y+rect.height/2-content.y-0+'px';
        _event.css({
            left : left,
            top : top,
        });
    },
    // 设置提示框位置
    setdiv:function(name,path){
        var _name = name;
        _name=name.substring(4,10);
        var _event=$('#jsMap-'+_name);
        var node=path.node;
        var rect=node.getBoundingClientRect();
        var content=document.querySelector('#jsMapBox').getBoundingClientRect();
        var left=rect.x+rect.width/2-content.x-25+'px';
        var top=rect.y+rect.height/2-content.y-0+'px';
        _event.css({
            left : left,
            top : top,
        });
    },
    //街乡镇的地图轮训方法
    setMapBannerJxz: function (name) {
        var _this=this;

        var _name=name;
        var beijingsy=_this.opts.ssqList[name];
        if(_this.opts.ssqList[name]==undefined){
            return
        }
        var num = 0;
        var _length = beijingsy.length;

        /* var  end=_this.opts.TintervalJxz;
         var start = (end - 100) > 0 ? end -100 : 0;
         for(var i = start; i <= end; i++){

             clearInterval(i);


         }*/


    },
    //执行地图轮询的方法
    setMapBanner:function () {
        var _this=this;
        var beijingsy=[
            ['110102','110117'],//西城，平谷
            ['110105'], //朝阳
            ['110112','110109'], //通州，门头沟
            ['110101'], //东城
            ['110107','110117'],//石景山，平谷
            ['110113'], //顺义
            ['110229','110115'],//延庆，大兴
            ['110114','110117'],//昌平，平谷
            ['110108'],//海淀
            ['110116','110111'],//怀柔，房山
            ['110106','110117'],//丰台，平谷
        ]
        var num = 0;
        var _length = beijingsy.length;

        /*  var  end=_this.opts.TintervalJxz;
          var start = (end - 100) > 0 ? end -100 : 0;
          for(var i = start; i <= end; i++){

              clearInterval(i);

          }*/

    },
    clearAnimation: function () {
        var _this=this;
        $('.fd-map-items').addClass('fd-hide');
        $('.fd-map-items').removeClass('addAnimation');
        $('.fd-map-items-item').addClass('fd-hide');
        $('.fd-map-items-item').removeClass('addAnimation');
        //重置之前点击区域状态new
        _this.resetActiveStyleNew();
        //为了防止执行了动画的显示 没执行重置  所以把activeid清空
        _this.opts.activeMapId = '';
        _this.opts.activeMapId2 = '';
        window.clearInterval(window.Tinterval);
        window.clearInterval(window.TintervalJxz);

        /*
                    var  end=_this.opts.TintervalJxz;
                    var start = (end - 100) > 0 ? end -100 : 0;
                    for(var i = start; i <= end; i++){

                        clearInterval(i);

                    }*/
    },
    /*
     * 地图区域点击
     */
    mapAreaClickNew: function (name) {
        console.log('地图区域点击');
        var _this = this;
        //地图不存在区域圆
        var circle = _this.areaMapCircle[name];
        var outline = _this.areaMap[name] ? _this.areaMap[name] : circle;

        var _data = outline.data('data');
        var _path = outline.selectAll('path').length > 0 ? outline.selectAll('path') :
            (outline.selectAll('rect').length > 0 ? outline.selectAll('rect') : outline);
        //只保留了区域变色
        _path.attr({
            fill: _this.mapStyle.areaMap.hoverFill
        });


        outline.data('isActive', true);

    },
    /*
     * 重置活跃的区域索引
     * */
    resetActiveStyleNew: function() {
        var _this = this;
        //如果当前没有活跃的区域，则跳出该方法
        if(_this.opts.activeMapId === '') {
            return;
        }
        //隐藏之前选中区域id对应的icon及动画圆
        $('#jsCircleAnimateg-' + _this.opts.activeMapId).hide();
        $('.circleGroup').hide();
        var activeOutline = _this.areaMap[_this.mapidPrefix + _this.opts.activeMapId] ? _this.areaMap[_this.mapidPrefix + _this.opts.activeMapId] : _this.areaMapCircle[_this.mapidPrefix + _this.opts.activeMapId];
        var activePath = activeOutline.selectAll('path').length > 0 ? activeOutline.selectAll('path') :
            (activeOutline.selectAll('rect').length > 0 ? activeOutline.selectAll('rect') : activeOutline);
        // 获取当前区域的数据
        _this.setAreaMapFillColor()
        var curData = activeOutline.data('data');
        //如果是圆的话就不用换颜色
        if(activePath.type !== 'circle') {
            // 重置之前选中区域的颜色
            if(_this.opts.flagNew==1){
                activePath.attr({
                    fill: '#ffac00',
                    stroke: _this.mapStyle.mapBj.clickStroke,
                });
            }
        }
        activeOutline.data('isActive', false);
        $('.fd-map-item').addClass('fd-hide');
        $('.fd-map-items').removeClass('addAnimation');

        _this.opts.activeMapId = '';
        //第二个区域的重置
        if(_this.opts.activeMapId2!=''){
            //隐藏之前选中区域id对应的icon及动画圆
            $('#jsCircleAnimateg-' + _this.opts.activeMapId2).hide();
            $('.circleGroup').hide();
            var activeOutline = _this.areaMap[_this.mapidPrefix + _this.opts.activeMapId2] ? _this.areaMap[_this.mapidPrefix + _this.opts.activeMapId2] : _this.areaMapCircle[_this.mapidPrefix + _this.opts.activeMapId2];
            var activePath = activeOutline.selectAll('path').length > 0 ? activeOutline.selectAll('path') :
                (activeOutline.selectAll('rect').length > 0 ? activeOutline.selectAll('rect') : activeOutline);
            // 获取当前区域的数据
            var curData = activeOutline.data('data');
            //如果是圆的话就不用换颜色
            if(activePath.type !== 'circle') {
                // 重置之前选中区域的颜色
                if(_this.opts.flagNew==1){
                    activePath.attr({
                        fill: _this.getColorByValue(curData.sas),
                        stroke: _this.mapStyle.mapBj.stroke,
                    });
                }
            }
            activeOutline.data('isActive', false);
            $('.fd-map-item').addClass('fd-hide');
            $('.fd-map-items').removeClass('addAnimation');

            _this.opts.activeMapId2 = '';
        }

    },
    /*
     * 地图区域点击
     */
    mapAreaClick: function (name, flag,event) {
        var _this = this;
        var _id=name.split('-')[1];
        _this.opts.hoverCallback(_id);
        // debugger
        var _chooseName;

        for(var i=0;i<_this.opts.list.length;i++){
            if(_this.opts.list[i].value==_id){
                _chooseName=_this.opts.list[i].name;
            }
        }
        if(_this.opts.mapName==_chooseName){
            return
        }
        //每次点击地图 清空轮循动画及元素
        //$('.circleGroup').remove();
        //$('.CircleAnimateg').remove();
        //地图不存在区域圆
        var circle = _this.areaMapCircle[name];
        var outline = _this.areaMap[name] ? _this.areaMap[name] : circle;

        var _data = outline.data('data');
        var _path = outline.selectAll('path').length > 0 ? outline.selectAll('path') :
            (outline.selectAll('rect').length > 0 ? outline.selectAll('rect') : outline);
        _path.attr({
            fill: _this.mapStyle.areaMap.hoverFill
        });
        //重置之前点击区域状态
        _this.resetActiveStyle();
        //获取当前点击区域的id
        _this.opts.activeMapId = _data.mapId;


        var cx = _this.areaMapCircle[_this.mapidPrefix + _this.opts.activeMapId].attr('cx');
        var cy = _this.areaMapCircle[_this.mapidPrefix + _this.opts.activeMapId].attr('cy');




        _this.opts.animateObj.ellipse.circleAnimateg.attr({
            id: 'jsCircleAnimateg-' + _data.mapId
        });


        // 改变当前选中区域的颜色
        _path.attr({
            stroke: _this.mapStyle.areaMap.clickStroke
        });

        outline.data('isActive', true);
        //显示当前区域id对应的icon及动画圆
        /* $('#jsCircleAnimateg-' + _this.opts.activeMapId).show();
         $('.circleGroup').show();*/
    },
    // 设置提示框位置
    setTooltipPositionJxz:function (event,name,path) {
        var node=path.node;
        var rect=node.getBoundingClientRect();

        var content=document.querySelector('#jsMapArea').getBoundingClientRect();
        var left=rect.left+rect.width/2-content.left+'px';
        var top=rect.top+rect.height/2-content.top+'px';



        var tooltip= $('.fd-map-item');

        // 设置位置
        tooltip.css({
            left : left,
            top : top,
        });
        var _this = this;
        var data=_this.opts.qpData;
        //[_this.mapidPrefix + mapId] map-110105
        var newData;

        var _newName=name.substring(4,10);
        newData=data[_newName]
        $('.fd-area-title').text(newData.dqmc);
        $('.js-bqxf').text(newData.bqxfsljs);
        $('.js-zbw').text(newData.zbwxfsljs);
        // $('.js-fd-jzgm').text(newData.jzgm);
        //
        // var jzmj=_this.changeDataNumSW(newData.jzmj,2);
        // $('.js-fd-pfm').text(jzmj);
        // $('.js-fd-gdp').text(newData.gdp);
        // $('.js-fd-gdp-zz').text(newData.gdpzz);
        // $('.js-fd-zxwcdws').text(newData.zxwcl);
        // var _bfb=newData.zxwcjd.toString().substring(0,4);
        // _bfb=_bfb*100;
        // $('.js-fd-zxwcdws-jd').text(_bfb);
        // $('.js-fd-qzjb').text(newData.count);
        // $('.js-fd-qzjbbfb').text(newData.hb);
        tooltip.removeClass('fd-hide');
        /*tooltip.css({
         'visibility':'visible'
         })*/
        /*if(tooltip.is(':hidden')){
         // 显示提示
         this.showTooltip()
         }*/
    },
    //四舍五入 保留4位
    changeDataNumSW:function(v,e){
        if(v==null){
            return;
        }
        v=v.toString();
        v=v.replace(/[^\d.]/g,"");
        v=v.replace(/^\./g,"");
        v=v.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        var t=1;
        for(;e>0;t*=10,e--);
        for(;e<0;t/=10,e++);
        return Math.round(v*t)/t;
    },
    // 设置提示框位置
    setTooltipPosition:function (event,name,path) {
        var node=path.node;
        var rect=node.getBoundingClientRect();

        var content=document.querySelector('#jsMapArea').getBoundingClientRect();
        var left=rect.left+rect.width/2-content.left+'px';
        var top=rect.top+rect.height/2-content.top+'px';



        var tooltip= $('.fd-map-item');

        // 设置位置
        tooltip.css({
            left : left,
            top : top,
        });
        var _this = this;
        var data=_this.opts.qpData;
        //[_this.mapidPrefix + mapId] map-110105
        var newData;

        var _newName=name.substring(4,10);
        newData=data[_newName]
        $('.fd-area-title').text(newData.dqmc);
        $('.js-bqxf').text(newData.bqxfsljs);
        $('.js-zbw').text(newData.zbwxfsljs);
        // $('.js-fd-jzgm').text(newData.jzgm);
        //
        // var jzmj=_this.changeDataNumSW(newData.jzmj,2);
        // $('.js-fd-pfm').text(jzmj);
        // $('.js-fd-gdp').text(newData.gdp);
        // $('.js-fd-gdp-zz').text(newData.gdpzz);
        // $('.js-fd-zxwcdws').text(newData.zxwcl);
        // var _bfb=newData.zxwcjd.toString().substring(0,4);
        // _bfb=_bfb*100;
        // $('.js-fd-zxwcdws-jd').text(_bfb);
        // $('.js-fd-qzjb').text(newData.count);
        // $('.js-fd-qzjbbfb').text(newData.hb);
        tooltip.removeClass('fd-hide');
        /*tooltip.css({
         'visibility':'visible'
         })*/
        /*if(tooltip.is(':hidden')){
         // 显示提示
         this.showTooltip()
         }*/
    },
    /*
     * 重置活跃的区域索引
     * */
    resetActiveStyle: function() {
        var _this = this;
        //如果当前没有活跃的区域，则跳出该方法
        if(_this.opts.activeMapId === '') {
            return;
        }
        var activeOutline = _this.areaMap[_this.mapidPrefix + _this.opts.activeMapId] ? _this.areaMap[_this.mapidPrefix + _this.opts.activeMapId] : _this.areaMapCircle[_this.mapidPrefix + _this.opts.activeMapId];
        var activePath = activeOutline.selectAll('path').length > 0 ? activeOutline.selectAll('path') :
            (activeOutline.selectAll('rect').length > 0 ? activeOutline.selectAll('rect') : activeOutline);
        // 获取当前区域的数据
        var curData = activeOutline.data('data');
        //如果是圆的话就不用换颜色
        if(activePath.type !== 'circle') {
            // 重置之前选中区域的颜色
            if(_this.opts.flagNew==1){
                activePath.attr({
                    fill: "#047bdf",
                    stroke: _this.mapStyle.mapBj.stroke,
                });
            }
        }
        activeOutline.data('isActive', false);
        //隐藏之前选中区域id对应的icon及动画圆
        $('#jsCircleAnimateg-' + _this.opts.activeMapId).hide();
        $('.circleGroup').hide();
        $('.fd-map-item').addClass('fd-hide');
        $('.fd-map-items').removeClass('addAnimation');
        /*var tooltip= $('.fd-map-item');
         tooltip.css({
         'visibility':'hidden'
         })*/

        //$('#jsIconRect-' + _this.opts.activeMapId).hide();
        //$('#jsIconText-' + _this.opts.activeMapId).hide();

        //如果上一个选中的是强调的法院，则将其强调文本进行展现
        /*if (_this.opts.emphasizeId.indexOf(_this.opts.activeMapId) > -1) {
         _this.areaMapEmphasis[_this.mapidPrefix + _this.opts.activeMapId].attr({
         display: 'block'
         });
         }*/
        //文本展现
        /*_this.areaMapText[_this.mapidPrefix + _this.opts.activeMapId].attr({
         display: 'none'
         });*/
        //将活跃的法院置为空
        _this.opts.activeMapId = '';
    },

    /*
     * 展现对应的法院
     * @param {String} mapId 法院对应的id
     * */
    showFy: function (mapId) {
        var _this = this;
        //展现对应的圆
        _this.areaMapCircle[_this.mapidPrefix + mapId].attr({
            display: 'block'
        });
        //展现对应的文本
        _this.areaMapText[_this.mapidPrefix + mapId].attr({
            display: 'block'
        });
        /* //如果在强调法院中，则展现对应的强调元素
         if (_this.opts.emphasizeId.indexOf(mapId) > -1) {
         _this.areaMapEmphasis[_this.mapidPrefix + mapId].attr({
         display: 'block'
         })
         }*/
    },
    /*
     * 隐藏对应的法院
     * @param {String}
     * */
    hideFy: function (mapId) {
        var _this = this;
        //展现对应的圆
        _this.areaMapCircle[_this.mapidPrefix + mapId].attr({
            display: 'none'
        });
        //展现对应的文本
        _this.areaMapText[_this.mapidPrefix + mapId].attr({
            display: 'none'
        });
        /* //如果在强调法院中，则隐藏对应的强调元素
         if (_this.opts.emphasizeId.indexOf(mapId) > -1) {
         _this.areaMapEmphasis[_this.mapidPrefix + mapId].attr({
         display: 'none'
         });
         }*/
    },
    /*
     地图区域轮循选中
     */
    loopMapArea: function (index) {
        var _this = this;
        var prefix = 'id';//mapid前缀
        //var index = 0;
        _this.opts.flag = 2;
        _this.opts.mapTimer = setInterval(function () {
            var currentMapId = prefix + _this.mapIdArr[index];
            // 调用地图点击事件
            // _this.mapAreaClick(currentMapId, _this.opts.flag);

            if (index == _this.mapIdArr.length - 1) {
                index = 0;
            } else {
                index++;
            }
            //console.log(index)
        }, 4000);
    },
    /*
     * 获取圆及设置圆属性 cx cy id...
     * */
    getCirclePosition: function () {
        var _this = this;

        var arr = []; //存放 所有固定圆相关属性 的 数组
        $.each(_this.areaMapCircle, function (name, value) {
            //获取当前区域法院id
            var currentId = name.substring(6);

            // 获取法院名称
            var fyName = value.data('data').name;

            var obj = {
                cx: value.attr('cx'),
                cy: value.attr('cy'),
                id: currentId,
                fyName: fyName
            }
            arr.push(obj);
        });
        return arr;
    },
    /*
     *   处理动画圆 (根据默认圆点坐标绘制 动画圆坐标)
     */
    operateAnimateCircle: function (cx, cy) {
        var _this = this;

        //创建每个区域动画椭圆 （参数必须为对象形式）
        var ellipse = _this.CreateAnimateEllipse({
            cx: cx,
            cy: cy,
            rx: 20,
            ry: 10,
            tweenTime: 1200
        });

        //创建图标
        var circleIcon = _this.createCircleIcon(cx, cy);
        return {
            ellipse: ellipse,
            circleIcon: circleIcon
        }
    },
    /*
     * 创建圆形 动画圆
     */
    CreateAnimateCircle: function (updateOptions) {
        var _this = this;
        var snap = _this.snap;

        var obj = $.fn.extend({}, {
            x: 0,
            y: 0,
            r: 10,
            radius: 20,
            tweenTime: 400

        }, updateOptions || {}); // {x,y,r,radius,tweenTime}
        _this.x = obj.x;
        _this.y = obj.y;
        _this.r = obj.r;
        _this.radius = obj.radius;
        _this.tweenTime = obj.tweenTime;

        var timer = null;
        var r1,
            r2,
            r3,
            r4;
        r1 = _this.r;
        r2 = r1 + _this.radius * 0.33;
        r3 = r1 + _this.radius * 0.66;
        r4 = r1 + _this.radius;

        try {
            var circle01 = snap.paper.circle(_this.x, _this.y, r1).attr({
                stroke: "#fff45c",
                fill: "#fff45c",
                strokeWidth: 4 * _this.mapRatio,
                id: "animateCircle1"
            });
            var circle02 = circle01.clone().attr({fill: "none", r: r2});
            var circle03 = circle02.clone().attr({r: r3});
            var circle04 = circle02.clone().attr({r: r4});

            var circleAnimateg = snap.g(circle01, circle02, circle03, circle04).attr({
                id: "circleAnimateg",
                "display": "block",
                "pointer-events": "none"
            });

            // 动画方法
            function animateCircle() {
                circle02.animate({
                    r: r2,
                    opacity: 0.66
                }, _this.tweenTime);
                circle03.animate({
                    r: r3,
                    opacity: 0.33
                }, _this.tweenTime);
                circle04.animate({
                    r: r4,
                    opacity: 0
                }, _this.tweenTime);
            };

            // 停止当前动画方法
            function stopAnimateCircle() {
                circle02.stop().attr({
                    r: r1,
                    opacity: 1
                });
                circle03.stop().attr({
                    r: r2,
                    opacity: 0.66
                });
                circle04.stop().attr({
                    r: r3,
                    opacity: 0.33
                });
                animateCircle();
            };

            // 循环函数
            function loop() {
                if (timer)
                    clearTimeout(timer);
                stopAnimateCircle();
                timer = setTimeout(function () {
                    loop()
                }, _this.tweenTime);
            };
            loop();

            // update
            _this.update = function () {
                r1 = _this.r;
                r2 = r1 + _this.radius * 0.33;
                r3 = r1 + _this.radius * 0.66;
                r4 = r1 + _this.radius;
                circle01.attr({
                    cx: _this.x,
                    cy: _this.y,
                    r: r1
                });
                circle02.attr({
                    cx: _this.x,
                    cy: _this.y,
                    r: r2
                });
                circle03.attr({
                    cx: _this.x,
                    cy: _this.y,
                    r: r3
                });
                circle04.attr({
                    cx: _this.x,
                    cy: _this.y,
                    r: r4
                });
            };
            _this.update();

        } catch (e) {
            throw new Error(e + "createAnimateCircle(obj):obj的参数为对象，形式为{_this.x:num,y:num,r:num,radius:num,tweenTime:time}")
        }
    },

    /**
     *创建椭圆形 动画圆
     * @param updateOptions 参数必须为对象形式
     * @constructor
     */
    CreateAnimateEllipse: function (updateOptions) {
        var _this = this;
        var snap = _this.snap;

        var obj = $.fn.extend({}, {
            cx: 316.676,
            cy: 214.33,
            rx: 20,
            ry: 10,
            tweenTime: 1200,
            id: ''

        }, updateOptions || {}); // {x,y,r,radius,tweenTime}
        _this.cx = obj.cx;
        _this.cy = obj.cy;
        _this.rx = obj.rx;
        _this.ry = obj.ry;
        _this.tweenTime = obj.tweenTime;
        _this.id = obj.id;

        var timer = null;

        try {

            var circle01 = snap.paper.el("ellipse", {
                cx: _this.cx,
                cy: _this.cy,
                rx: _this.rx,
                ry: _this.ry,
                stroke: "#ffffff",
                fill: "rgba(255,255,255,.2)",
                strokeWidth: 4 * _this.mapRatio,
                id: "animateCircle1",
                opacity: 1
            })
            var circle02 = snap.paper.el("ellipse", {
                cx: _this.cx,
                cy: _this.cy,
                rx: 50,
                ry: 15,
                stroke: "#ffffff",
                fill: "rgba(255,255,255,.3)",
                strokeWidth: 4 * _this.mapRatio,
                id: "animateCircle1",
                opacity: 0.5
            })
            var circle03 = snap.paper.el("ellipse", {
                cx: _this.cx,
                cy: _this.cy,
                rx: 70,
                ry: 20,
                stroke: "#ffffff",
                fill: "rgba(255,255,255,.4)",
                strokeWidth: 4 * _this.mapRatio,
                id: "animateCircle1",
                opacity: 0.5
            })
            var circleAnimateg = snap.g(circle01, circle02, circle03).attr({
                id: "jsCircleAnimateg-" + _this.id,
                class: "CircleAnimateg",
                "display": "none",
                "pointer-events": "none"
            });

            // 动画方法
            function animateCircle() {
                circle02.animate({
                    rx: 50,
                    ry: 15,
                    opacity: 0.66
                }, _this.tweenTime);
                circle03.animate({
                    rx: 70,
                    ry: 20,
                    opacity: 0.33
                }, _this.tweenTime);
            };

            // 停止当前动画方法
            function stopAnimateCircle() {
                circle02.stop().attr({
                    rx: 20,
                    ry: 10,
                    opacity: 1
                });
                circle03.stop().attr({
                    rx: 50,
                    ry: 15,
                    opacity: 0.66
                });
                animateCircle();
            };

            // 循环函数
            function loop() {
                if (timer)
                    clearTimeout(timer);
                stopAnimateCircle();
                timer = setTimeout(function () {
                    loop()
                }, _this.tweenTime);
            };
            loop();

            // update
            _this.update = function () {
                circle01.attr({
                    cx: _this.cx-50,
                    cy: _this.cy-50,
                    rx: 20,
                    ry: 10
                });
                circle02.attr({
                    cx: _this.cx-50,
                    cy: _this.cy-50,
                    rx: 50,
                    ry: 15
                });
                circle03.attr({
                    cx: _this.cx-50,
                    cy: _this.cy-50,
                    rx: 70,
                    ry: 20
                });
            };
            _this.update();

        } catch (e) {
            throw new Error(e + "createAnimateCircle(obj):obj的参数为对象，形式为{_this.x:num,y:num,r:num,radius:num,tweenTime:time}")
        }
        return {
            circle1: circle01,
            circle2: circle02,
            circle3: circle03,
            circleAnimateg: circleAnimateg
        }
    },

    /**
     *  创建动画圆图标
     * @param x icon x偏移量
     * @param y icon y偏移量
     * @param id  icon id
     */
    createCircleIcon: function (x, y, id, fyName) {
        var _this = this;
        var snap = this.snap;
        //地图图片设置
        //var CircleIconImg = snap.paper.image("../images/icon-gh.png", x - 15, y - 25, 160 * _this.mapRatio, 170 * _this.mapRatio);
        //var CircleIconImg = snap.paper.image("../images/icon-pop-up.png", x - 145, y - 105, 291, 114);
        //var CircleIconImg = snap.paper.image("../images/icon-pop-up-01.png", x - 143, y - 145, 291, 158);
        //将云彩追加到svg文档最后面
        //  CircleIconImg.appendTo(snap);
        //配置云彩区域属性
        /* CircleIconImg.attr({
         "id": "jsIconImg-" + id,
         class: "Animate",
         "style": "cursor:pointer;",
         "display": 'block',
         "pointer-events": "none"
         });*/
        // 绘制存放法院名称的矩形区域
        var circleRect = snap.paper.rect(x - 100, y - 110, 230, 40);
        circleRect.appendTo(snap);
        circleRect.attr({
            "id": "jsIconRect-" + id,
            class: "Animate",
            "style": "cursor:pointer;",
            "display": 'block',
            "fill": 'transparent',
            "pointer-events": "none"
        });
        //绘制弹框上的对应的法院名称
        var rectText = snap.text(x + 45, y - 85, fyName).attr({
            "id": "jsIconText-" + id,
            class: "Animate",
            "style": "cursor:pointer;",
            "display": 'block',
            fill: 'none',
            textAnchor: 'middle',
            fontFamily: 'Microsoft YaHei',
        });
        /* _this.snap.paper.g(CircleIconImg, circleRect, rectText).attr({
         "class": "circleGroup",
         "display": 'none'
         });*/
        return {
            img: '',
            rect: circleRect,
            text: rectText
        };
    },

    /*
     * 更新数据
     * */
    updateData: function (dataSource) {

        var _this = this;
        _this.areaMapDataSource = dataSource; //赋值对应的数据的对象
        $.each(_this.areaMapDataSource, function (mapId, value) {
            // 更新所有数据对象
            _this.areaMapData[_this.mapidPrefix + mapId].mapId = mapId;
            _this.areaMapData[_this.mapidPrefix + mapId].fyjb = value.fyjb;
            _this.areaMapData[_this.mapidPrefix + mapId].name = $.trim(value.name);
            if(_this.opts.flagNew==1){
                _this.areaMapData[_this.mapidPrefix + mapId].sas = Number(value.sas);
                // 更新文字
                _this.areaMapText[_this.mapidPrefix + mapId].attr({
                    text: _this.areaMapData[_this.mapidPrefix + mapId].sas
                });
            }
            if(_this.opts.flagNew==2){
                _this.areaMapData[_this.mapidPrefix + mapId].drtj = Number(value.drtj);
                // 更新文字
                _this.areaMapText[_this.mapidPrefix + mapId].attr({
                    text: _this.areaMapData[_this.mapidPrefix + mapId].drtj
                });
            }
            if(_this.opts.flagNew==3){
                _this.areaMapData[_this.mapidPrefix + mapId].scsas = Number(value.scsas);
                // 更新文字
                _this.areaMapText[_this.mapidPrefix + mapId].attr({
                    text: _this.areaMapData[_this.mapidPrefix + mapId].scsas
                });
            }

            /* _this.areaMapData[_this.mapidPrefix + mapId].yj = Number(value.yj);
             _this.areaMapData[_this.mapidPrefix + mapId].wj = Number(value.wj);*/

        });
        _this.setAreaMapFillColor(); //设置区域的填充颜色
    }
};

export default mapCharts;