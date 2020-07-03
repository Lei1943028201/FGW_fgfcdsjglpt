/**
 * @file mapHandler.js
 * @author xieyq
 * @createTime 2018/12/4
 * @updateTime 2018/12/4
 * @version 1.0.0
 * @description 地图操作
 */
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
            _this.areaMapMinValue2 = 0;
            // 循环数据
            $.each(_this.areaMapDataSource, function (index, value) {
                const _value = Math.abs(value.value);
                if ($.type(_value) === 'number' && (!isNaN(_value)) && _value < _this.areaMapMinValue) {
                    _this.areaMapMinValue = _value;
                }
            });
            // 循环数据
            $.each(_this.areaMapDataSource, function (index, value) {
                const _value = Math.abs(value.value2);
                if ($.type(_value) === 'number' && (!isNaN(_value)) && _value < _this.areaMapMinValue2) {
                    _this.areaMapMinValue2 = _value;
                }
            });
        },
        // 设置最大值
        setMaxValue: function () {
            const _this = this;
            _this.areaMapMaxValue = 0;
            _this.areaMapMaxValue2 = 0;
            // 循环数据
            $.each(_this.areaMapDataSource, function (index, value) {
                const _value = Math.abs(value.value);
                if ($.type(_value) === 'number' && (!isNaN(_value)) && _value > _this.areaMapMaxValue) {
                    _this.areaMapMaxValue = _value;
                }
            });
            // 循环数据
            $.each(_this.areaMapDataSource, function (index, value) {
                const _value = Math.abs(value.value2);
                if ($.type(_value) === 'number' && (!isNaN(_value)) && _value > _this.areaMapMaxValue2) {
                    _this.areaMapMaxValue2 = _value;
                }
            });
        },
        // 修改每个区域的填充颜色方法
        mendAreaMapFillColor: function () {
            const _this = this;
            // 修改每个区域的填充颜色
            $.each(_this.areaMapData, function (name, value) {
                // 设置填充颜色
                value.fillColor = _this.getAreaFill(Math.abs(value.value));
            });
        },

        // 获取区域的填充颜色
        getAreaFill(value) {
            // 获取属性对应的分割段数的位置索引
            let cIndex = Math.floor(((value - this.areaMapMinValue) / (this.areaMapMaxValue - this.areaMapMinValue)) * this.STEPS);
            // 如果最大值等于最小值 直接赋值0
            if (this.areaMapMaxValue === this.areaMapMinValue) {
                cIndex = 0;
            }
            if (cIndex < 0) {
                cIndex = 0;
            } else if (cIndex > (this.STEPS - 1)) {
                cIndex = this.STEPS - 1;
            }
            return this.areaMapColor[cIndex];
        },

        // 根据id设置高亮的区域
        setHighLightMapById(id) {
            const _this = this;
            const _mapArea = this.areaMap[this.mapidPrefix + id];
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
                            strokeWidth : _this.mapStyleStrokeWidth
                        });
                    });
                } else {
                    _this.areaMap[_this.mapidPrefix + _activeMapId].attr({
                        stroke: _this.mapStyle.areaMap.stroke,
                        strokeWidth : _this.mapStyleStrokeWidth
                    });
                }
            }
            // 激活
            if (Array.isArray(_this.areaMap[_this.mapidPrefix + target.data('mapid')])) {
                _this.areaMap[_this.mapidPrefix + target.data('mapid')].forEach(function (item) {
                    item.attr({
                        stroke: _this.mapStyle.areaMap.activeStroke,
                        // eslint-disable-next-line no-magic-numbers
                        strokeWidth : _this.mapStyleStrokeWidth * 4
                    });
                });
            } else {
                target.attr({
                    stroke: _this.mapStyle.areaMap.activeStroke,
                    // eslint-disable-next-line no-magic-numbers
                    strokeWidth : _this.mapStyleStrokeWidth * 4
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
