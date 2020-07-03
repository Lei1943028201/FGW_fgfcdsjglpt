/**
 * @file mapHandler.js
 * @author xieyq
 * @createTime 2018/12/4
 * @updateTime 2018/12/4
 * @version 1.0.0
 * @description 地图操作
 */
import $ from 'jquery'
export default {
	// 数据
	data() {
		return {};
	},
	// 方法
	methods: {
		// 设置每个区域的颜色
		setAreaMapFillColor: function () {
			const _this = this;
			$.each(_this.areaMap, function (name, value) {
				// 是区域块，需要进行循环所有path.分别设置颜色
				if (Array.isArray(value)) {
					value.forEach(function (item) {
						_this.setAreaMapItemColor(item);
					});
				} else {
					_this.setAreaMapItemColor(value);
				}
			});
		},
		// 设置最小值
		setMinValue: function () {
			const _this = this;
			_this.areaMapMinValue = 0;
			// 循环数据
			$.each(_this.areaMapDataSource, function (index, value) {
				const _value = Math.abs(value.val);
				if ($.type(_value) === 'number' && (!isNaN(_value)) && _value < _this.areaMapMinValue) {
					_this.areaMapMinValue = _value;
				}
			});
		},
		// 设置最大值
		setMaxValue: function () {
			const _this = this;
			_this.areaMapMaxValue = 0;
			// 循环数据
			$.each(_this.areaMapDataSource, function (index, value) {
				const _value = Math.abs(value.val);
				if ($.type(_value) === 'number' && (!isNaN(_value)) && _value > _this.areaMapMaxValue) {
					_this.areaMapMaxValue = _value;
				}
			});

			let TempArray = [];
			let Tempmax=0;
			for (let i=0;i<_this.areaMapDataSource.length;i++) {
				if (i!=0) {
					TempArray.push(_this.areaMapDataSource[i])
				}
			}
			$.each(TempArray, function (index, value) {
				const _value1 = Math.abs(value.val);
				if ($.type(_value1) === 'number' && (!isNaN(_value1)) && _value1 > Tempmax) {
					Tempmax = _value1;
				}
			});
			let cf = '';
			for (let i=0;i<String(Tempmax).length;i++) {
				cf = cf + '0';
			}
			let realycf = Number('1'+ cf)/10;
			//
			//
			_this.legendMaxValue = Math.round(Tempmax/realycf)*realycf;
		},
		// 修改每个区域的填充颜色方法
		mendAreaMapFillColor: function () {
			const _this = this;
			// 修改每个区域的填充颜色
			$.each(_this.areaMapData, function (name, value) {
				// 设置填充颜色
				value.fillColor = _this.getAreaFill(Math.abs(value.val));
			});
		},

		// 获取区域的填充颜色
		getAreaFill(value) {
			const _this = this;
			// 获取当前所有数据
			let _newData = _this.areaMapDataSource;

			_newData.sort(function(a,b){
				return a.val - b.val;
			});
			// 获取属性对应的分割段数的位置索引
			let cIndex;
			for (var i=0;i<_newData.length;i++) {
				if (_newData[i].val == value) {
					cIndex =i
				}
			}
			if(cIndex == 16) {
				return this.areaMapColor[0];
			}
			return this.areaMapColor[cIndex];
		},

		// 根据id设置高亮的区域
		setHighLightMapById(id) {
			const _this = this;
			const _mapArea = this.areaMap[this.mapidPrefix + id];
			_this.setAreaMapFillColor();
			if (_mapArea) {
				if (Array.isArray(_mapArea)) {
					_mapArea.forEach(function (item) {
						_this.setHighLightMapArea(item);
					});
				} else {
					_this.setHighLightMapArea(_mapArea);
				}
			}
		},
		clickCallback (event, _this, dataList) {
			let id = dataList.code;
			this.setHighLightMapById(id);

			// 需要把id传出去
			this.$emit('centCode',dataList)
		},
		// 设置高亮的地图区域
		setHighLightMapArea: function (target) {
			const _this = this;
			// 如果有高亮条目
			if (_this.highLightAreaMap) {
				const _activeMapId = _this.highLightAreaMap.data('mapid');
				// 还原颜色
				if (Array.isArray(_this.areaMap[_this.mapidPrefix + _activeMapId])) {
					_this.areaMap[_this.mapidPrefix + _activeMapId].forEach(function (item) {
						item.attr({
							stroke: _this.mapStyle.areaMap.stroke,
							strokeWidth : _this.mapStyleStrokeWidth,
							fill:_this.mapStyle.areaMap.fill,
						});
					});
				} else {
					_this.areaMap[_this.mapidPrefix + _activeMapId].attr({
						stroke: _this.mapStyle.areaMap.stroke,
						strokeWidth : _this.mapStyleStrokeWidth,
						fill:_this.mapStyle.areaMap.fill,
					});
				}
			}
			// 激活
			if (Array.isArray(_this.areaMap[_this.mapidPrefix + target.data('mapid')])) {
				_this.areaMap[_this.mapidPrefix + target.data('mapid')].forEach(function (item) {
					item.attr({
						fill:_this.snap.paper.gradient('l(0,1,0,0)#f68b17-#f9c83f')
					});
				});
			} else {
				target.attr({
					stroke: _this.mapStyle.areaMap.activeStroke,
					strokeWidth : _this.mapStyleStrokeWidth
				});
			}
			// 赋值
			_this.highLightAreaMap = target;
		},

		// 取消高亮区域
		cancelHighLightMapArea: function () {
			const _this = this;
			// 如果有高亮条目
			if (_this.highLightAreaMap) {
				const _activeMapId = _this.highLightAreaMap.data('mapid');
				// 还原颜色
				if (Array.isArray(_this.areaMap[_this.mapidPrefix + _activeMapId])) {
					_this.areaMap[_this.mapidPrefix + _activeMapId].forEach(function (item) {
						item.attr({
							stroke: _this.mapStyle.areaMap.stroke,
							strokeWidth : _this.mapStyleStrokeWidth
						});
					});
				} else {
					_this.areaMap[_this.mapidPrefix + _activeMapId].attr({
						stroke: _this.mapStyle.areaMap.stroke,
						strokeWidth : _this.mapStyleStrokeWidth
					});
				}

				// 清空激活对象
				_this.highLightAreaMap = null;
			}
		}
	}
};
