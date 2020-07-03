/**
 * @file touchHandler.js
 * @author xieyq
 * @createTime 2018/11/29
 * @updateTime 2018/11/29
 * @version 1.0.0
 * @description
 */
import _ from 'lodash'
export default {
  data () {
    return {
      // 移动端操作对象
      hammer: null,
      // 缩放元素
      scaleEle: null,
      // 触摸元素
      touchEle: null,
      // 透视图层的尺寸
      perspectiveSize: {
        width: 0,
        height: 0
      },
      // 是否触屏
      isTouch: false,
      // 拖拽
      isDrag: false,
      // 缩放选项
      scaleOpts: {
        currentScale: 1,
        maxScale: 20, // 最大
        minScale: 1, // 最小
        addScaleVariable: 0.2, // 增量
      },
      // 拖拽坐标
      dragPosition: {
        canDrag: false,    // 是否可以拖拽
        dragTime: false, // 拖拽时间
        startX: 0,   // 开始点 x
        startY: 0,   // 开始点 y
        endX: 0,     // 结束点  x
        endY: 0,     // 结束点  y
        moveX: 0,   // 移动点 x
        moveY: 0,    // 移动点 y
        originX: 0,   // 开始点 x
        originY: 0,   // 开始点 y
        translateX: 0,
        translateY: 0
      },
      start: null,
      end: null
    }
  },
  methods: {
    // 缩小
    pinchIn () {
      if(this.activeAreaMap) {
        return
      }
      this.setContainScale(this.scaleOpts.currentScale - this.scaleOpts.addScaleVariable, true)
    },
    // 放大
    pinchOut() {
      if(this.activeAreaMap) {
        return
      }
      this.setContainScale(this.scaleOpts.currentScale + this.scaleOpts.addScaleVariable, true)
    },
    /**
     * 重置缩放
     * */
    resetScale() {
      // 设置缩放
      this.setContainScale(1, true)
    },
    /**
     * 重置位移
     * */
    resetTranslate() {
      this.setTranslate(0, 0, true)
    },
    /**
     * 重置样式
     * */
    resetStyle() {
      // 设置透视图大小
      /*if(this.perspectiveGroup) {
        let _box = this.perspectiveGroup.getBBox()
        this.perspectiveSize.width = _box.width
        this.perspectiveSize.height = _box.height
      }*/
      this.resetScale();
      this.resetTranslate()
    },
    // 获取距离
    getDistance (p1, p2) {
      var x = p2.pageX - p1.pageX,
        y = p2.pageY - p1.pageY;
      return Math.sqrt((x * x) + (y * y));
    },
    // 设置大小
    setContainScale: function (scale, isSetValue, position, isEnd) {
      var _this = this;
      let _currentScale = _this.scaleOpts.currentScale + (scale - 1);
      // 设置缩放
      if(isSetValue) {
        _currentScale = scale
      }
      if(_currentScale > _this.scaleOpts.maxScale) {
        _currentScale = _this.scaleOpts.maxScale
      } else if(_currentScale < _this.scaleOpts.minScale) {
        _currentScale = _this.scaleOpts.minScale
      }
      // 如果缩放中心点对象存在
      if(position) {
        let _translateX = 0, _translateY = 0
        // 宽度、高度
        let _width = _this.touchEle.width(), _height = _this.touchEle.height()
        let _x = position.x, _y = position.y
        if(_x > _width / 2) {
          _translateX = (_width / 2 - _x)
        } else if(_x < _width / 2) {
          _translateX = _x
        }
        if(_y > _height / 2) {
          _translateY = (_height / 2 - _y)
        } else if (_y < _height / 2) {
          _translateY = _y
        }
        // 更新对应的位置
        _this.setTranslate(_translateX * (scale - 1), _translateY * (scale - 1))
      }

      // 地图区域进行缩放
      _this.scaleEle.css({
        transform: 'scale(' + _currentScale + ')'
      });
      // 区域地图设置缩放大小
      if (_this.scaleEle) {
        _this.setScale(_currentScale)
      }
      // 如果是设置值，或者缩放结束，赋值给当前的缩放属性
      if(isSetValue || isEnd) {
        this.scaleOpts.currentScale = _currentScale
      }
    },
    // 设置偏移
    setTranslate: function (x, y, isSetValue, isAbsolute) {
      var _this = this;
      // 拖拽元素
      let $dragConEle = this.touchEle
      var _x = x;
      var _y = y;
      // 是设置值
      if (!isSetValue) {
        _x = this.dragPosition.translateX + (x * (1 / _this.scaleOpts.currentScale));
        _y = this.dragPosition.translateY + (y * (1 / _this.scaleOpts.currentScale));
        // 容器的宽度和高度
        let _containWidth = $dragConEle.width(), _containHeigth = $dragConEle.height()
        // 元素的宽度和高度
        let _perGroup = _this.perspectiveGroup
        let _ratio = _perGroup ? Math.min(_this.scaleEle.width()/_this.viewBox.width, _this.scaleEle.height()/_this.viewBox.height) : 0

        /*// 地图背景
        let _areaMapBj = _this.areaMapBj
        // 透视图大小
        let _perGroupSize = {
          width: _perGroup ? _perGroup.getBBox().width : 0,
          height: _perGroup ? _perGroup.getBBox().height : 0
        }
        // 背景大小
        let _bjSize = {
          width: _areaMapBj ? _areaMapBj.getBBox().width : 0,
          height: _areaMapBj ? _areaMapBj.getBBox().height : 0
        }

        let _eleWidth = (_perGroup || _areaMapBj) ? Math.max(_perGroupSize.width, _bjSize.width) * _ratio : _this.scaleEle.width(), _eleHeight = (_perGroup || _areaMapBj) ? Math.max(_perGroupSize.height, _bjSize.height) * _ratio : _this.scaleEle.height()*/
        let _width = 0, _height = 0
        if(_this.perspectiveGroup) {
          let _box = this.perspectiveGroup.getBBox()
          _width = _box.width * _ratio + 20
          _height = _box.height * _ratio + 20
        }
        let _eleWidth = _this.perspectiveGroup ? _width : _this.scaleEle.width(), _eleHeight = _this.perspectiveGroup ? _height : _this.scaleEle.height()
        let _xMax = Math.abs( (_eleWidth - _containWidth) / 2), _yMax = Math.abs((_containHeigth - _eleHeight) / 2)
        if(_x > _xMax) {
          _x = _xMax
        } else if (_x < - _xMax) {
          _x = -_xMax
        }
        if(_y > _yMax) {
          _y = _yMax
        } else if (_y < - _yMax) {
          _y = - _yMax
        }
      }
      // 如果是绝对位移
      if(isAbsolute) {
        _x = this.dragPosition.translateX + x;
        _y = this.dragPosition.translateY + y;
      }
      // 赋值新的x和y
      this.dragPosition.translateX = _x
      this.dragPosition.translateY = _y
      $dragConEle.css({
        transform: 'translate(' + _x + 'px,' + _y + 'px)'
      })
    },
    /**
    * 缩放方法
    * */
    pinchHandler (event) {
      let _this = this
      if(_this.activeAreaMap) {
        return
      }
      let _position = event.position
      // 进行缩放
      _this.setContainScale(event.scale, false, _position)
    },
    // 绑定缩放事件
    bindPinch () {
      let _this = this
      this.hammer.get('pinch').set({ enable: true });
      this.hammer.on('pinch', _.throttle(_this.pinchHandler, 100));
      this.hammer.on('pinchend', (event) => {
        if(_this.activeAreaMap) {
          return
        }
        let _position = event.position
        // 进行缩放
        _this.setContainScale(event.scale, false, _position, true)
      });
    },
    /**
     * 拖拽方法
     * */
    dragHandler (event) {
      let _this = this
      if(_this.activeAreaMap) {
        return
      }
      // 结束点的位置
      _this.dragPosition.endX = event.deltaX
      _this.dragPosition.endY = event.deltaY
      // 移动距离
      _this.dragPosition.moveX = _this.dragPosition.endX - _this.dragPosition.startX;
      _this.dragPosition.moveY = _this.dragPosition.endY - _this.dragPosition.startY;
      // 设置位移
      this.setTranslate(_this.dragPosition.moveX, _this.dragPosition.moveY)

      // 赋值开始点
      _this.dragPosition.startX = _this.dragPosition.endX;
      _this.dragPosition.startY = _this.dragPosition.endY;
    },
    // 绑定拖拽
    bindDrag() {
      let _this = this
      this.hammer.on('panstart', (event) => {
        if(_this.activeAreaMap) {
          return
        }
        _this.dragPosition.startX = event.deltaX
        _this.dragPosition.startY = event.deltaY
      });
      this.hammer.on('pan', _.throttle(this.dragHandler, 100));
    },
    // 绑定事件
    bindEvent() {
      let _this = this
      // 创建自己的hammer对象
      this.hammer = new Hammer(this.touchEle[0])
      // 绑定缩放
      this.bindPinch()
      // 绑定拖拽
      this.bindDrag()
    }
  },
  mounted () {
    // this.bindEvent()
    // 触摸元素
    this.touchEle = $(this.$refs.dragContain)
    // 缩放元素
    this.scaleEle = $(this.$refs.map)
  }
}