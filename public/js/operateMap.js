/**
 * @file operateMap.js3123123131
 * @author xieyq on 2017/7/12.
 * @version 1.0.0
 * @description 热力图svg操作的js文件
 */
// 定义地图图形的方法
let mapCharts = {
  version: '1.0.1'
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

var Tinterval,
  TintervalJxz;
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
      mapCount: [],
      xsMaxValue: 0,
      xsMinValue: 0,
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
          stroke: 'rgba(252,151,6,1)'
        },
        mapBj: {
          fill: '#e27934',
          shadow: {
            x: 15,
            y: 20,
            radius: 15,
            color: 'rgba(255,255,255,0.5)' //Snap.filter.shadow(30, 30, 15,'#2badfd')
          },
          stroke: 'rgba(1,231,252,1)',
          strokeWidth: 1
        },
        areaMap: {
          fill: 'rgba(20,167,209,0.3)',
          stroke: '#00aeff',
          strokeWidth: 15,
          outlineStroke: '#00aeff',
          outlineFill: '#82caee',
          textFill: '#fff',
          hoverFill: 'rgba(28,80,206,1)',//地图划过区域颜色
          clickFill: 'rgba(28,80,206,1)', //地图点击区域颜色
          clickStroke: '#ffd221'//地图点击区域描边颜色
        },
        circle: {
          stroke: 'rgba(0,70,156,1)',
          r: 24,
          fill: '#f7d66c' //圆的填充颜色
        },
        textStyle: {
          fontSize: 80,
          fill: '#5a616c',
          hoverFill: '#5a616c',
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
      data: {}, //对应的数据对象
      setGray: '#eceffc', //没数据的地图背景颜色
      setGrayStroke: '#333',
      mapidPrefix: 'map-', // mapid 的前缀
      mapidJxzPrefix: 'map-110115-', // mapid 的前缀
      activeMapId: '',//区分hover 和click 事件 切换id
      Matrix: '',//地图矩阵变量
      //选中范围中的视觉元素
      inRange: {
        //颜色
        color: ['#d5ddf5', '#dfe5f8', '#ebeffc'],
        colorSpot: ['#fb490e', '#df4e85', '#ac5aff', '#7269ff', '#4c7fff', '#33acff']
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
      clickCallback: function (_this, dataList, flag) {
      },
      blankclickCallback: function (dataList) {
      },
      flagNew: null,
      //气泡的数据
      qpData: {},
      //请求是否是市的地图
      requestBjs: null,
      //请求是否是区的地图
      requestQy: null,
      //请求的svg地址
      svgUrl: '',
      list: [
        {
          name: '北京市',
          value: '1100000',
          isShow: true
        },
        {
          name: '东城区',
          value: '110101',
          isShow: true
        },
        {
          name: '西城区',
          value: '110102',
          isShow: true
        },
        {
          name: '朝阳区',
          value: '110105',
          isShow: true
        },
        {
          name: '丰台区',
          value: '110106',
          isShow: true
        },
        {
          name: '石景山区',
          value: '110107',
          isShow: true
        },
        {
          name: '海淀区',
          value: '110108',
          isShow: true
        },
        {
          name: '门头沟区',
          value: '110109',
          isShow: true
        },
        {
          name: '房山区',
          value: '110111',
          isShow: true
        },
        {
          name: '通州区',
          value: '110112',
          isShow: true
        },
        {
          name: '顺义区',
          value: '110113',
          isShow: true
        },
        {
          name: '昌平区',
          value: '110114',
          isShow: true
        },
        {
          name: '大兴区',
          value: '110115',
          isShow: true
        },
        {
          name: '怀柔区',
          value: '110116',
          isShow: true
        },
        {
          name: '平谷区',
          value: '110117',
          isShow: true
        },
        {
          name: '密云区',
          value: '110228',
          isShow: true
        },
        {
          name: '延庆区',
          value: '110229',
          isShow: true
        }
      ],
      clickCallback: function (name, value) {
      },
      Tinterval: '',
      //街乡镇的动画
      TintervalJxz: '',
      activeMapId2: '',
      mapName: ''
    };
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
    var url = _this.opts.svgUrl;
    // 请求全市 svg地图
    _this.requestSvgMap(url);
  },
  /*
   * 设置svg地图
   * */
  setSvgMap: function (response) {
    var _this = this;
    // 地图加载完毕
    _this.dom.innerHTML = response;
    var snap = Snap('#svgMap');
    snap.attr({
      width: '100%',
      height: '100%'
    });
    _this.snap = snap;
    _this.render(); //渲染地图
  },
  /*
   * 请求svg地图
   * */
  requestSvgMap: function (url) {
    var _this = this;
    //  加载svg地图
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'text',
      success: function (response) {
        _this.setSvgMap(response); //设置svg地图
      },
      error: function (info) {
        throw new Error('加载地图失败' + info);
      }
    });
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
    //赋值渐变颜色 点的
    _this.gradientColorSpot = this.gradientColors(_this.opts.inRange.colorSpot, _this.opts.STEPS);
    //初始化地图区域
    this.initAreaMap();
    this.setAreaMapFillColor(); // 设置区域填充颜色
    this.setCircleFillColor(); // 设置圆点填充颜色
    //添加区域交互动效
    this.addAreaMapInteraction();
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

      _this.mapPathBjG.selectAll('path')
        .attr({
          stroke: _this.mapStyle.mapBj.stroke,
          fill: _this.opts.setGray, // 默认设置灰色
          strokeWidth: 2
        });
      // 隐藏所有的 -outline
      $('[id$="-outline"]')
        .css({
          display: 'none'
        });

      if ($('#xinjiang-group').length) {
        $('#xinjiang-outline')
          .css({
            display: 'block'
          });
      }
    }();

    if (_this.snap.select('	#mapid-nansha')) {
      _this.snap.select('#mapid-nansha')
        .attr({
          fill: 'rgba(255,255,255,1)', // 'rgba(168,208,248,0.8)',
          stroke: '#6699cc', // _this.mapStyle.mapBj.stroke,
          strokeWidth: '6px'
        });
    }

    // 设置默认元素
    +function setOriginalElement() {
      //_this.snap.selectAll('text').remove(); // 移除默认文本
      _this.snap.selectAll('circle')
        .attr({ // 隐藏所有的圆
          display: 'none'
        });
      _this.snap.selectAll('polily')
        .attr({ // 隐藏所有的圆
          display: 'none'
        });
      // 移除默认文本
      _this.snap.selectAll('ellipse')
        .attr({ // 隐藏所有的圆
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
    _this.snap.selectAll('text')
      .attr({
        /* display:'none',*/
        fontSize: _this.mapStyle.textStyle.fontSizeRatio + 'px',
        fill: _this.opts.flagNew === 1 ? _this.mapStyle.textStyle.fill:'#5a616c',
        strokeWidth: 0,
        // filter: _this.snap.filter(_this.mapStyle.textStyle.shadowFilter),
        fontFamily: 'Microsoft YaHei',
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        cursor: 'pointer',
        color: '#ffffff'
      });
    $.each(_this.areaMapDataSource, function (index, value) {
      _this.opts.mapCount.push(value.sas);
    });

    //假设第一个值为最大值
    _this.opts.xsMaxValue = _this.opts.mapCount[0];
    //假设第一个值为最小值
    _this.opts.xsMinValue = _this.opts.mapCount[0];
    for (var i = 0; i < _this.opts.mapCount.length; i++) {
      if (_this.opts.mapCount[i] > _this.opts.xsMaxValue) {
        _this.opts.xsMaxValue = _this.opts.mapCount[i];
      }
      if (_this.opts.mapCount[i] < _this.opts.xsMinValue) {
        _this.opts.xsMinValue = _this.opts.mapCount[i];
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
          stroke: '#ffffff',
          strokeWidth: 1,
          fill: _this.mapStyle.areaMap.outlineFill,
          cursor: 'pointer',
          display: 'block'
        })
          .data('data', _this.areaMapData[_this.mapidPrefix + mapId])
          .data('isActive', false)
          .data('index', _this.mapIdArr.length);//添加对应的数据对象 data('isActive', false)为了区分hover和click事件冲突问题

        // 不置灰就用data里保留的颜色
        if (_this.areaMap[_this.mapidPrefix + mapId].selectAll('path').length > 0) {
          _this.areaMap[_this.mapidPrefix + mapId].selectAll('path')
            .attr({
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
        //设置对应的圆的样式
        _this.areaMapCircle[_this.mapidPrefix + mapId].attr({
          stroke: '#fff',
          fill: '#fff',
          strokeWidth: 5,
          display: 'block',
          opacity: _this.opts.flagNew === 1 ? 1 : 0
        })
          .data('data', _this.areaMapData[_this.mapidPrefix + mapId])
          .data('index', _this.mapIdArr.length)
          .appendTo(_this.snap);
        // _this.opts.lineConverge.startPoints.indexOf(mapId) === -1 && _this.areaMapSet[_this.mapidPrefix + mapId].push(_this.areaMapCircle[_this.mapidPrefix + mapId]);
        // 创建数据本对象
        _this.areaMapText[_this.mapidPrefix + mapId] = _this.snap.select('#' + _this.mapidPrefix + mapId + '-text');
        //TODO
        _this.mapPathBjG.selectAll('text')
          .attr({
            stroke: '#ffffff' // 默认设置灰色
          });
      }
    }
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
    if ((_this.opts.xsMaxValue - _this.opts.xsMinValue) <= 0) {
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
 * 根据数值获取对应的颜色值
 * @param {float} value 数值
 * @return {String}  颜色字符串
 * */
  getColorByValueQy: function (value) {
    var _this = this;
    //设置颜色渐变分档
    colorgradientList = [
      {
        color:_this.snap.paper.gradient('l(0.5,0,1,1)#0945af-#3c3bc7')
      },
      {
        color:_this.snap.paper.gradient('l(0.5,0,1,1)#0c68e5-#12bde7')
      }
    ];
    //防止最大值等于最小值的情况index出现无穷大的情况
    if ((_this.opts.xsMaxValue - _this.opts.xsMinValue) <= 0) {
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
    // fill = _this.gradientColor[index];
    var Color = net.brehaut.Color;
    var _color = Color(_this.gradientColor[index]);
    var _gradient = _this.snap.paper.gradient('l(0.5,0,1,1)' + _color.lightenByRatio(0.1) + '-' + _color.darkenByRatio(0.2))
    return _gradient;
    // return fill;
  },
  /*
   * 根据数值获取对应的颜色值  点的值
   * @param {float} value 数值
   * @return {String}  颜色字符串
   * */
  getColorByValueSpot: function (value) {
    var _this = this;
    //防止最大值等于最小值的情况index出现无穷大的情况

    if ((_this.opts.xsMaxValue - _this.opts.xsMinValue) <= 0) {
      return _this.gradientColorSpot[0];
    }
    var fill = '';
    value = parseFloat(value);

    //获取对应的索引
    var index = Math.floor(((value - _this.opts.xsMinValue) / (_this.opts.xsMaxValue - _this.opts.xsMinValue)) * _this.opts.STEPS);
    if (index < 0) {
      index = 0;
    } else if (index > (_this.gradientColorSpot.length - 1)) {
      index = _this.gradientColorSpot.length - 1;
    }
    fill = _this.gradientColorSpot[index];
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
      _path.attr({
        fill: _this.getColorByValue(data.sas) // 根据案件合格率获取对应的颜色
      });
      if(_this.opts.flagNew == 2){
        for(var i in _this.opts.qyData){
          if(i===data.mapId){
            //如果当前元素时一个集合，则获取子集的path，否则子集则是一个path
            var _id ='#map-'+data.mapId+'-text'
            $(_id).attr('fill','#fff')
            var _path = value.selectAll('path').length > 0 ? value.selectAll('path') : value;
            var g2 = _this.snap.paper.gradient("l(0, 0, 1, 1)#6e89ff-#5da3f7-#52b3f3");
            _path.attr({
              fill: g2 // 根据案件合格率获取对应的颜色
            });
          }
        }
      }
    });
  },
  /*
  * 设置区域地图的点的填充颜色
  * */
  setCircleFillColor: function () {
    var _this = this;
    $.each(_this.areaMapCircle, function (name, value) {
      var data = value.data('data');
      // 如果当前元素时一个集合，则获取子集的path，否则子集则是一个path
      var _circle = value.selectAll('circle').length > 0 ? value.selectAll('circle') : value;
      if (_this.opts.flagNew == 1) {
        _circle.attr({
          stroke: _this.getColorByValueSpot(data.sas),
          fill: _this.getColorByValueSpot(data.sas)
        });
        var _color = _this.getColorByValueSpot(data.sas);
        _this.CreateAnimateCircle(value, _color);
      }else{
        _this.setTooltipPosition(event, name, value);
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
    var winW = $(window)
      .width();
    var winH = $(window)
      .height();
    $.each(_this.areaMapCircle, function (name, value) {
      //对应的数据
      // var mapData = _this.areaMapData[name];
      //热力图 鼠标滑过事件
      if (value != undefined) {
        if (_this.opts.flagNew == 1) {
          value.hover(function (event) {
            _this.clearAnimation();
            var event = event || window.event;
            _this.setTooltipPosition(event, name, value);
          }, function () {
            _this.resetActiveStyle();
          });
        }
      }
    });

    $.each(_this.areaMapText, function (name, value) {
      //热力图 鼠标滑过事件
      if (value != undefined) {
        if (_this.opts.flagNew == 1) {
          value.hover(function (event) {
            _this.clearAnimation();
            var event = event || window.event;
            _this.setTooltipPosition(event, name, value);
          }, function (event) {
            _this.resetActiveStyle();
          });
        }
      }
    });
  },
  // 设置提示框位置
  setdiv: function (name, path) {
    var _name = name;
    _name = _name.substring(4, 10);
    var _event = $('#jsMap-' + _name);
    var node = path.node;
    var rect = node.getBoundingClientRect();
    var content = document.querySelector('#jsMapBox')
      .getBoundingClientRect();
    var left = rect.x + rect.width / 2 - content.x - 25 + 'px';
    var top = rect.y + rect.height / 2 - content.y - 0 + 'px';
    _event.css({
      left: left,
      top: top
    });
  },
  clearAnimation: function () {
    var _this = this;
    $('.fd-map-items')
      .addClass('fd-hide');
    $('.fd-map-items')
      .removeClass('addAnimation');
    $('.fd-map-items-item')
      .addClass('fd-hide');
    $('.fd-map-items-item')
      .removeClass('addAnimation');
    // 为了防止执行了动画的显示 没执行重置  所以把activeid清空
    _this.opts.activeMapId = '';
    _this.opts.activeMapId2 = '';
    window.clearInterval(window.Tinterval);
    window.clearInterval(window.TintervalJxz);
  },
  // 设置提示框位置
  setTooltipPosition: function (event, name, path) {
    var node = path.node;
    var rect = node.getBoundingClientRect();
    var content = document.querySelector('#jsFdMap')
      .getBoundingClientRect();
    var left = rect.left + rect.width / 2 - content.left + 30 + 'px';
    var top = rect.top + rect.height / 2 - content.top - 20 + 'px';

    var tooltip = $('.fd-map-tips');
    // 设置位置
    tooltip.css({
      left: left,
      top: top
    });
    var _this = this;
    var data = _this.opts.data;
    //[_this.mapidPrefix + mapId] map-110105
    var newData;
    var _newName = name.substring(4, 10);
    for (var i in data) {
      if (i === _newName) {
        newData = data[i];
      }
    }
    $('.js-wtxszs')
      .text(newData.sas);
    $('.js-bjs')
      .text(newData.jas);
    tooltip.removeClass('fd-hide');
  },
  /*
   * 重置活跃的区域索引
   * */
  resetActiveStyle: function () {
    var _this = this;
    $('.fd-map-tips')
      .addClass('fd-hide');
    // 将活跃的法院置为空
    _this.opts.activeMapId = '';
  },
  //动画(内圆 + 闪烁  + 光环)
  CreateAnimateCircle: function (cirecle, color) {
    var _this = this;
    let _cx1 = cirecle.attr('cx');
    var _cy1 = cirecle.attr('cy');
    var _id = cirecle.attr('id');
    _id = _id.substring(4, 10);
    var updateOptions = {
      x: _cx1,
      y: _cy1,
      r: 5,
      radius: 5,//动画半径默认
      tweenTime: 600//动画间隔时间
    };

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
      var circle01 = _this.snap.paper.circle(_this.x, _this.y, r1)
        .attr({
          stroke: color,
          fill: color,
          strokeWidth: 1,
          class: 'circleAnimateg1'
        });
      var circle02 = circle01.clone()
        .attr({
          fill: 'none',
          r: r2,
          class: 'circleAnimateg2'
        });
      var circle03 = circle02.clone()
        .attr({
          r: r3,
          class: 'circleAnimateg3'
        });
      var circle04 = circle02.clone()
        .attr({
          r: r4,
          class: 'circleAnimateg4'
        });

      var circleAnimateg = _this.snap.g(circle01, circle02, circle03, circle04)
        .attr({
          id: 'circleAnimateg' + _id,
          'class': 'circle_point',
          'display': 'block',
          //"pointer_events": "none"
          'pointer_events': 'visiblePainted'
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
        circle02.stop()
          .attr({
            r: r1,
            opacity: 1
          });
        circle03.stop()
          .attr({
            r: r2,
            opacity: 0.66
          });
        circle04.stop()
          .attr({
            r: r3,
            opacity: 0.33
          });
        animateCircle();
      };

      // 循环函数
      function loop() {
        if (timer) {
          clearTimeout(timer);
        }
        stopAnimateCircle();
        timer = setTimeout(function () {
          loop();
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
      throw new Error(e
        + 'createAnimateCircle(obj):obj的参数为对象，形式为{_this.x:num,y:num,r:num,radius:num,tweenTime:time}');
    }
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
      if (_this.opts.flagNew == 1) {
        _this.areaMapData[_this.mapidPrefix + mapId].sas = Number(value.sas);
        // 更新文字
        _this.areaMapText[_this.mapidPrefix + mapId].attr({
          text: _this.areaMapData[_this.mapidPrefix + mapId].sas
        });
      }
      if (_this.opts.flagNew == 2) {
        _this.areaMapData[_this.mapidPrefix + mapId].drtj = Number(value.drtj);
        // 更新文字
        _this.areaMapText[_this.mapidPrefix + mapId].attr({
          text: _this.areaMapData[_this.mapidPrefix + mapId].drtj
        });
      }
      if (_this.opts.flagNew == 3) {
        _this.areaMapData[_this.mapidPrefix + mapId].scsas = Number(value.scsas);
        // 更新文字
        _this.areaMapText[_this.mapidPrefix + mapId].attr({
          text: _this.areaMapData[_this.mapidPrefix + mapId].scsas
        });
      }
    });
    _this.setAreaMapFillColor(); //设置区域的填充颜色
  }
};


