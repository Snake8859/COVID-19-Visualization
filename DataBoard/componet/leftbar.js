let leftbar_template = `
<div id="leftBar" class="sideBar left opacity0">
    <div class="bar-content" id="leftContent">
        <!--左侧标题栏-->
        <div class="first-left">
            <div>
                <p class="first-text">
                    世界疫情
                </p>
                <span class="first-entext">
                    World Epidemic
                </span>
            </div>
        </div>

        <!--左侧国家级疫情数据情况-->
        <div class="second-left">
            <div class="second-left-box">
                <p>
                    {{country_name}}
                </p>
            </div>
            <div class="second-left-box">
                <div id="national_numchange0">
                    <div id="national_aa" class="second-larger-text" style="color: #fbd71e;" data-count="this"
                    data-from="1" :data-to="currentConfirmedCount" data-suffix="" data-duration="1" data-easing="false">
                    </div>
                    <p class="second-small-text">
                        现存确诊
                        <span v-if="!currentCCIncrFlag&&showIncrFlag" style="color: springgreen;">&nbsp;{{currentConfirmedIncr}}</span>
                        <span v-if="currentCCIncrFlag&&showIncrFlag" style="color: orangered;">&nbsp;+{{currentConfirmedIncr}}</span>
                    </p>
                </div>

                <!--
                    <div id="national_numchange1" class="col-sm-6" style="text-align: right;height:100%">
                        <div id="national_bb" class="super-large" style="color: #FFA500;" data-count="this"
                        data-from="1" :data-to="suspectedCount" data-suffix="" data-duration="1" data-easing="false">
                            
                        </div>
                        <p class="numberp">
                            疑似确诊
                            <span v-if="!seriousIncrFlag&&showIncrFlag" style="font-size: 10px;color: springgreen;">&nbsp;{{seriousIncr}}</span>
                            <span v-if="seriousIncrFlag&&showIncrFlag" style="font-size: 10px;color: orangered;">&nbsp;+{{seriousIncr}}</span>
                        </p>
                    </div>
                -->

            </div>
            <div class="second-left-box">
                <div id="national_numchange2" class="second-subbox">
                    <div id="national_cc" class="second-middle-text" style="color: #17a2b8;" data-count="this"
                    data-from="1" :data-to="confirmedCount" data-suffix="" data-duration="1" data-easing="false">
                    </div>
                    <p class="second-small-text">
                        累计确诊
                        <span v-if="!confirmedIncrFlag&&showIncrFlag" style="color: springgreen;">&nbsp;{{confirmedIncr}}</span>
                        <span v-if="confirmedIncrFlag&&showIncrFlag" style="color: orangered;">&nbsp;+{{confirmedIncr}}</span>
                    </p>
                </div>
                <div id="national_numchange3" class="second-subbox">
                    <div id="national_dd" class="second-middle-text" style="color: #008000;" data-count="this"
                    data-from="1" :data-to="curedCount" data-suffix="" data-duration="1" data-easing="false">
                        
                    </div>
                    <p class="second-small-text" >
                        累计治愈
                        <span v-if="curedIncrFlag&&showIncrFlag" style="color: springgreen;">&nbsp;+{{curedIncr}}</span>
                        <span v-if="!curedIncrFlag&&showIncrFlag" style="color: orangered;">&nbsp;{{curedIncr}}</span>
                    </p>
                </div>
                <div id="national_numchange4" class="second-subbox">
                    <div id="national_ee" class="second-middle-text" style="color:#DC143C;" data-count="this"
                    data-from="1" :data-to="deadCount" data-suffix="" data-duration="1" data-easing="false">
                        
                    </div>
                    <p class="second-small-text" >
                        累计死亡
                        <span v-if="!deadIncrFlag&&showIncrFlag" style="color: springgreen;">&nbsp;{{deadIncr}}</span>
                        <span v-if="deadIncrFlag&&showIncrFlag" style="color: orangered;">&nbsp;+{{deadIncr}}</span>
                    </p>
                </div>
            </div>
        </div>
        <!--左侧直方图-->
        <div  id="national_curve" class="third-left-box"></div>
        <!--左侧搜索框-->
        <div class="row">
            <div class="col-lg-12">
                <div class="input-group">
                    <input type="text" class="form-control" v-model="searchValue">
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="button" @click="moveToCountryBySearch()">
                            搜索
                        </button>
                    </span>
                </div>
            </div>
        </div>
        <!--左侧底部列表-->
        <div class="fourth-left-box pre-scrollable">
            <table class="table table-hover table-striped-custom">
                <thead>
                    <tr>
                        <th>区域</th>
                        <th>状态</th>
                        <th>现存人数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="cursor: pointer;" v-for="item in left_list" @click="moveToCountry(item.countryEnglishName,item.name,item.count)">
                        <td>{{item.name}}</td>

                        <td v-if="item.flag==0">
                            <p style="margin:0px;color:gray">隐患</p>
                        </td>
                        <td v-if="item.flag==1">
                            <p style="margin:0px;color:orange">一般</p>
                        </td>
                        <td v-if="item.flag==2">
                            <p style="margin:0px;color:red">严重</p>
                        </td>

                        <td>{{item.count}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <span id="leftClickSpan" class="glyphicon glyphicon-option-vertical opration-handler"
	aria-hidden="true" @click="leftShrink">
	</span>
</div>
`

//全局注册异步组件
Vue.component('leftbar', function(resolve, reject) {
    //定时器：4秒后加载左侧组件
    let timer4 = setTimeout(function() {
        //向 `resolve` 回调传递组件定义
        resolve({
            data: function() {
                return {
                    country_name: '',

                    worldDataCache: [], //世界疫情缓存

                    showIncrFlag: true, //变化是否显示

                    currentConfirmedCount: 0, //现存确诊
                    currentConfirmedIncr: 0, //现存确诊-较昨日增加量
                    currentCCIncrFlag: true, //现存确诊变化正负颜色渲染标识

                    suspectedCount: 0, //疑似确诊
                    seriousIncr: 0, //疑似确诊-较昨日增加量
                    seriousIncrFlag: true, //疑似确诊变化正负颜色渲染标识

                    confirmedCount: 0, //累计确诊
                    confirmedIncr: 0, //累计确诊-较昨日增加量
                    confirmedIncrFlag: true, //累计确诊变化正负颜色渲染标识

                    curedCount: 0, //治愈
                    curedIncr: 0, //治愈-较昨日增加量
                    curedIncrFlag: true, //治愈变化正负颜色渲染标识

                    deadCount: 0, //死亡
                    deadIncr: 0, //死亡-较昨日增加量
                    deadIncrFlag: true, //死亡变化正负颜色渲染标识
                    //echart图表配置
                    national_curve_option: {
                        tooltip: { //提示框组件
                            trigger: 'axis', //触发类型 坐标轴触发
                            position: function(point) { //提示框位置
                                //固定在顶部
                                return [point[0], '5%']
                            }
                        },
                        dataZoom: [{ //内置型数据区域缩放组件
                                type: 'inside',
                                start: 0,
                                end: 100
                            },
                            { //滑动条型数据区域缩放组件
                                start: 0,
                                end: 10,
                                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                                handleSize: '80%',
                                handleStyle: {
                                    color: '#fff',
                                    shadowBlur: 3,
                                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                                    shadowOffsetX: 2,
                                    shadowOffsetY: 2
                                }
                            }
                        ],
                        title: { //标题
                            left: 'center',
                            text: '',
                            textStyle: {
                                color: 'navajowhite',
                                fontSize: 14
                            }
                        },
                        xAxis: { //x轴
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {
                                lineStyle: {
                                    color: '#FFFFFF',
                                }
                            },
                            data: []
                        },
                        yAxis: { //y轴
                            type: 'value',
                            name: '人数/万',
                            nameTextStyle: {
                                color: '#FFFFFF'
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#FFFFFF',
                                }
                            },
                            boundaryGap: [0, '100%']
                        },
                        series: [ //数据
                            {
                                name: '疫情人数',
                                type: 'line',
                                smooth: true,
                                symbol: 'none',
                                sampling: 'average',
                                itemStyle: {
                                    color: '#FF0000'
                                },
                                data: []
                            }
                        ]
                    },
                    //底部列表数据
                    left_list: [],
                    //图层id
                    left_layer_list: [],
                    //收缩标识
                    clickLeftCount: 0,
                    //渲染色带
                    colorCard: [
                        '#F8E4CC',
                        '#CF6C73',
                        '#B65558',
                        '#B5385D',
                        '#A7273D'
                    ],
                    searchValue: ""
                }
            },
            props: ['map', 'worldLayerData', 'worldStatistics', 'chinaLayerData'],
            methods: {
                _initLeftBar: function() {
                    // this._initLeftOverAllData();

                    this._initLeftListData();

                    this._generateLeftCurve();

                },
                _numchange: function(id, end) {
                    $("#" + id + " [data-from][data-to]").each((i, b) => {
                        var c = $(b),
                            sm = scrollMonitor.create(b);
                        // console.log(c)
                        sm.fullyEnterViewport(() => {
                            var a = {
                                    useEasing: this._attrDefault(c, 'easing', true),
                                    useGrouping: this._attrDefault(c, 'grouping', true),
                                    separator: this._attrDefault(c, 'separator', ','),
                                    decimal: this._attrDefault(c, 'decimal', '.'),
                                    prefix: this._attrDefault(c, 'prefix', ''),
                                    suffix: this._attrDefault(c, 'suffix', ''),
                                },
                                $count = this._attrDefault(c, 'count', 'this') == 'this' ? c : c.find(c.data('count')),
                                from = this._attrDefault(c, 'from', 0),
                                // to = this._attrDefault(c, 'to', 100),
                                to = end,
                                duration = this._attrDefault(c, 'duration', 2.5),
                                delay = this._attrDefault(c, 'delay', 0),
                                decimals = new String(to).match(/\.([0-9]+)/) ? new String(to).match(/\.([0-9]+)$/)[1].length : 0,
                                //数字滚动的动画
                                counter = new countUp($count.get(0), from, to, decimals, duration, a);
                            setTimeout(function() {
                                    counter.start()
                                },
                                delay * 1000);
                            sm.destroy()
                        })
                    })
                },
                _attrDefault: function(a, b, c) {
                    if (typeof a.data(b) != 'undefined') {
                        return a.data(b)
                    }
                    return c
                },
                //初始化世界概况数据
                _initLeftOverAllData: function() {
                    this.currentConfirmedCount = this.worldStatistics.currentConfirmedCount; //世界当前确诊
                    this.currentConfirmedIncr = this.worldStatistics.currentConfirmedIncr; //世界现存确诊-变化
                    if (this.currentConfirmedIncr < 0) { //若人数减少
                        this.currentCCIncrFlag = false;
                    }

                    this.confirmedCount = this.worldStatistics.confirmedCount; //世界累计确诊
                    this.confirmedIncr = this.worldStatistics.confirmedIncr; //世界累计确诊-变化
                    if (this.confirmedIncr < 0) { //若人数减少
                        this.confirmedIncrFlag = false;
                    }

                    this.curedCount = this.worldStatistics.curedCount; //世界累计治愈
                    this.curedIncr = this.worldStatistics.curedIncr; //世界治愈-变化
                    if (this.curedIncr < 0) { //若人数减少
                        this.curedIncrFlag = false;
                    }

                    this.deadCount = this.worldStatistics.deadCount; //世界累计死亡
                    this.deadIncr = this.worldStatistics.deadIncr; //世界死亡-变化
                    if (this.deadIncr < 0) { //若人数减少
                        this.deadIncrFlag = false;
                    }

                    this.country_name = '世界';

                    //子组件国家名称变化时，传递给父组件
                    this.$emit('watchCountryName', this.country_name);

                    this.$nextTick(() => { //确保内数据渲染完成，再调用数字变化动画
                        //数字滚动动画
                        this._numchange('national_numchange0', this.currentConfirmedCount);
                        this._numchange('national_numchange1', this.suspectedCount);
                        this._numchange('national_numchange2', this.confirmedCount);
                        this._numchange('national_numchange3', this.curedCount);
                        this._numchange('national_numchange4', this.deadCount);
                    });
                    //显示疫情较昨日变化
                    this.showIncrFlag = true;
                },
                //初始化底部数据列表
                _initLeftListData: function() {
                    // axios.get(configOptions.COVID.worldAreaData) //【原始数据接口】
                    axios.get(configOptions.MyService.worldAreaData) //【自行数据接口】
                        .then((response) => {
                            // console.log('===左侧访问===');
                            // console.log(response);
                            this.worldDataCache = response.data.results; //获取数据集，并放入缓存
                            for (let index in this.worldDataCache) {
                                let item = this.worldDataCache[index];
                                if (item.cities == null) {
                                    // console.log(item);
                                    let countryName = item.countryName; //国家名
                                    let countryEnglishName = item.countryEnglishName; //国家英文名
                                    let currentConfirmedCount = item.currentConfirmedCount; //国家当前确诊
                                    let flag; //状态标识
                                    if (currentConfirmedCount >= 0 && currentConfirmedCount <= 500) { //确诊人数0~500之间，状态存在隐患
                                        flag = 0;
                                    } else if (currentConfirmedCount > 500 && currentConfirmedCount < 50000) { //确诊人数500~50000之间，状态一般
                                        flag = 1;
                                    } else if (currentConfirmedCount >= 50000) { //确诊人数大于50000
                                        flag = 2;
                                    }

                                    if (currentConfirmedCount >= 0) { //排除新西兰有误的信息
                                        this.left_list.push({
                                            name: countryName,
                                            countryEnglishName: countryEnglishName,
                                            flag: flag,
                                            count: currentConfirmedCount
                                        });
                                    }

                                }
                            }
                            //排序 从大到小
                            this.left_list.sort(
                                (obj1, obj2) => {
                                    return obj2.count - obj1.count
                                }
                            );
                            this.$nextTick(() => { //确保内数据渲染完成，再调用滚动条设置
                                $.mCustomScrollbar.defaults.theme = "light-thin";
                                $('.pre-scrollable').mCustomScrollbar({
                                    scrollbarPosition: 'outside',
                                    autoHideScrollbar: true
                                });
                                $('.mCSB_draggerContainer').css('margin-left', '5px');
                                $('.graph-title').css('border-left', '5px solid #00b4ff');

                                //将每个国家疫情情况加入到世界国家疫情图层中
                                this.worldLayerData.features.forEach(element => {
                                    // console.log(element);
                                    for (let index in this.left_list) {
                                        let countryEnglishName = this.left_list[index].countryEnglishName;
                                        if (element.properties.name == countryEnglishName) {
                                            let count = this.left_list[index].count;
                                            element.properties.count = count;
                                            break;
                                        }
                                    }
                                });

                            });
                        })
                        .catch((error) => {
                            // handle error
                            console.log(error);
                        })
                        .then(() => {
                            // always executed
                        });
                },
                //移动至对应国家
                moveToCountry: function(countryEnglishName, countryName, count) {
                    let map = this.map; //从父组件获得map对象
                    // console.log(map);
                    let worldLayerData = this.worldLayerData; //从父组件获得世界图层数据
                    // console.log(worldLayerData);
                    let worldFeatures = worldLayerData.features; //获得要素数据
                    let bounds = undefined; //定义地理边界框
                    let feature = undefined;

                    //图层渲染颜色
                    let color;
                    if (count > 0 && count <= 100) {
                        color = this.colorCard[0];
                    } else if (count > 100 && count <= 1000) {
                        color = this.colorCard[1];
                    } else if (count > 1000 && count <= 10000) {
                        color = this.colorCard[2];
                    } else if (count > 10000 && count <= 100000) {
                        color = this.colorCard[3];
                    } else if (count > 100000) {
                        color = this.colorCard[4];
                    }

                    for (let index in worldFeatures) { //遍历世界要素数据
                        feature = worldFeatures[index];
                        let name = feature.properties.name;
                        if (name == countryEnglishName) { //若为所点击的国家列表要素数据

                            let countryLayer = map.getLayer(name); //国家疫情图层
                            let layerType = undefined; //国家疫情图层类型
                            bounds = new mapboxgl.LngLatBounds(); //实例化地理边界框

                            // console.log(feature);
                            if (feature.geometry.coordinates.length > 1) { //若为复杂多边形,则取面积最大
                                let maxId = 0,
                                    maxLength = 0;
                                let coordinates = feature.geometry.coordinates
                                for (id in coordinates) { //取出面积最大的多边形
                                    let polygon = coordinates[id][0];
                                    let length = polygon.length;
                                    if (length > maxLength) {
                                        maxLength = length;
                                        maxId = id;
                                    }
                                }
                                // console.log(maxLength,maxId)
                                coordinates[maxId][0].forEach((lnglat) => {
                                    bounds.extend([lnglat[0], lnglat[1]]);
                                })

                                layerType = 'MultiPolygon';


                            } else { //若为简单多边形.则直接操作
                                feature.geometry.coordinates.forEach((polygon) => {
                                    // console.log(polygon);
                                    polygon.forEach((lnglat) => {
                                        bounds.extend([lnglat[0], lnglat[1]]); //拓展地理边界框,即计算该坐标集合范围地理边界
                                    })
                                })
                                layerType = 'Polygon';
                            }
                            // console.log(layerType);
                            // console.log(countryLayer);
                            //加载国家疫情状态图层
                            if (countryLayer == undefined && layerType != undefined) {
                                if (name == "China") { //使用正规的中国geojson
                                    map.addLayer({
                                        'id': 'China',
                                        'type': 'fill',
                                        'source': {
                                            'type': 'geojson',
                                            'data': {
                                                'type': 'FeatureCollection',
                                                "features": this.chinaLayerData.features
                                            }
                                        },
                                        'layout': {},
                                        'paint': {
                                            'fill-color': color,
                                            'fill-outline-color': 'white',
                                            'fill-opacity': 0.8
                                        }
                                    });
                                } else {
                                    map.addLayer({
                                        'id': name,
                                        'type': 'fill',
                                        'source': {
                                            'type': 'geojson',
                                            'data': {
                                                'type': layerType,
                                                "coordinates": feature.geometry.coordinates
                                            }
                                        },
                                        'layout': {},
                                        'paint': {
                                            'fill-color': color,
                                            'fill-outline-color': 'black',
                                            'fill-opacity': 0.8
                                        }
                                    });
                                }
                                this.left_layer_list.push(name);
                            }
                            break;
                        }
                    }
                    // console.log(countryEnglishName);
                    // console.log(feature);
                    // console.log(bounds);
                    if (bounds != undefined) {
                        map.fitBounds(bounds);
                    }
                    this._generateCountryStatus(countryEnglishName, countryName); //信息变化
                    this._generateLeftCurve(countryEnglishName, countryName); //曲线变化
                    //子组件国家名称变化时，传递给父组件
                    this.$emit('watchCountryName', this.country_name);
                },
                //生成国家疫情信息
                _generateCountryStatus: function(countryEnglishName, countryName) {
                    // console.log(countryEnglishName,countryName);
                    //世界疫情缓存取出对应国家疫情信息
                    for (let index in this.worldDataCache) {
                        let item = this.worldDataCache[index];
                        if (item.countryEnglishName == countryEnglishName) {
                            this.country_name = countryName; //更新国家名
                            //更新国家疫情信息
                            this.currentConfirmedCount = item.currentConfirmedCount;
                            this.suspectedCount = item.suspectedCount;
                            this.confirmedCount = item.confirmedCount;
                            this.curedCount = item.curedCount;
                            this.deadCount = item.deadCount;
                            //不显示变化情况
                            this.showIncrFlag = false;
                            break
                        }
                    }
                    this.$nextTick(() => { //确保内数据渲染完成，再调用数字变化动画
                        //数字滚动动画
                        this._numchange('national_numchange0', this.currentConfirmedCount);
                        this._numchange('national_numchange1', this.suspectedCount);
                        this._numchange('national_numchange2', this.confirmedCount);
                        this._numchange('national_numchange3', this.curedCount);
                        this._numchange('national_numchange4', this.deadCount);
                    });
                },
                //生成每日疫情报告曲线
                _generateLeftCurve: function(countryEnglishName = 'globalStatistics', countryName = '世界') {
                    axios.get(configOptions.geojson.countryFolder + countryEnglishName + '.json')
                        .then((response) => {
                            // console.log(response);

                            //清除原有数据
                            this.national_curve_option.xAxis.data.length = 0;
                            this.national_curve_option.series[0].data.length = 0;

                            //每日疫情数据
                            let dailyData = response.data;
                            for (let index in dailyData) {
                                let item = dailyData[index];
                                if (item['currentConfirmedCount'] != '该值缺失') {
                                    //取时间
                                    let updateTime = item['updateTime'].split(' ')[0];
                                    this.national_curve_option.xAxis.data.push({
                                        value: updateTime,
                                        textStyle: {
                                            fontSize: 10
                                        }
                                    });
                                    //取人数
                                    let currentConfirmedCount = parseFloat(item['currentConfirmedCount']) / 10000
                                    this.national_curve_option.series[0].data.push(currentConfirmedCount);
                                }
                            }

                            if (countryName != '世界') {
                                this.national_curve_option.title.text = countryName + '-每日疫情变化曲线'
                            } else {
                                this.national_curve_option.title.text = '世界-每日疫情变化曲线'
                            }

                            this.$nextTick(() => { //确保内数据渲染完成，再配置图表
                                //配置图表
                                var left_chart = echarts.init(document.getElementById('national_curve'));
                                left_chart.setOption(this.national_curve_option);
                            })

                        })
                        .catch((error) => {
                            // handle error
                            console.log(error);
                            alert("该国家暂无每日疫情统计数据");
                        })
                        .then(() => {
                            // always executed
                        });

                },
                //左侧栏收缩
                leftShrink: function() {
                    var leftwidth = $('#leftBar').width()
                    if (this.clickLeftCount % 2 == 0) {
                        $('.left').css('left', 10 - leftwidth)
                        $('#BottomBar').css('left', '10px');
                        this.clickLeftCount++;
                    } else {
                        $('.left').css('left', '0px')
                        $('#BottomBar').css('left', leftwidth);
                        this.clickLeftCount++;
                    }
                    $(window).trigger('resize');
                },
                //加载世界疫情分级颜色渲染图层
                loadWorldColorLayer: function(status) {
                    this.$parent.worldFlag = !this.$parent.worldFlag;
                    let layerIdList = this.left_layer_list;
                    //移除移动时加载的简单图层
                    for (let index in layerIdList) {
                        let simpleLayer = this.map.getLayer(layerIdList[index]);
                        // console.log(simpleLayer);
                        if (simpleLayer != undefined) {
                            this.map.removeLayer(layerIdList[index]);
                            this.map.removeSource(layerIdList[index]);
                        }
                    }
                    //图层id数组清空
                    this.left_layer_list.length = 0;
                    // console.log(this.worldLayerData);
                    //添加世界疫情色彩渲染图层
                    let map = this.map; //从父组件获得map对象
                    if (status) { //选中加载
                        map.addLayer({
                            'id': 'world',
                            'type': 'fill',
                            'source': {
                                'type': 'geojson',
                                'data': {
                                    'type': 'FeatureCollection',
                                    "features": this.worldLayerData.features
                                }
                            },
                            'layout': {},
                            'paint': {
                                'fill-color': {
                                    property: 'count', // this will be your property form you geojson
                                    stops: [
                                        [100, this.colorCard[0]],
                                        [1000, this.colorCard[1]],
                                        [10000, this.colorCard[2]],
                                        [100000, this.colorCard[3]],
                                        [1000000, this.colorCard[4]],
                                    ]

                                },
                                'fill-outline-color': 'white',
                                'fill-opacity': [
                                    "case", ["boolean", ["feature-state", "hover"], false],
                                    1,
                                    0.8
                                ]
                            }
                        });

                        // Create a popup, but don't add it to the map yet.
                        var popup = new mapboxgl.Popup({
                            closeButton: false,
                            closeOnClick: false
                        });

                        var hoveredLayer = null;

                        // Add Event
                        map.on('mousemove', 'world', (e) => {
                            // console.log(e);
                            if (hoveredLayer) {
                                map.setFeatureState({ source: 'world', id: hoveredLayer.id }, { hover: false });
                            }
                            map.getCanvas().style.cursor = 'pointer';
                            hoveredLayer = e.features[0];
                            let count = hoveredLayer.properties.count;
                            if (count != undefined) {
                                let status = '隐患'
                                let color = 'gray'
                                if (count >= 0 && count <= 500) { //确诊人数0~500之间，状态存在隐患
                                    status = '隐患'
                                    color = 'gray'
                                } else if (count > 500 && count < 50000) { //确诊人数500~50000之间，状态一般
                                    status = '一般'
                                    color = 'orange'
                                } else if (count >= 50000) { //确诊人数大于50000
                                    status = '危险'
                                    color = 'red'
                                }
                                popup.setLngLat([e.lngLat.lng, e.lngLat.lat])
                                    .setHTML("<div><strong style='color:red'>" + hoveredLayer.properties.countryCN + "</strong>" +
                                        "<br/><strong style='color:black'>" + "当前确诊: " + count + "/人" + "</strong>" +
                                        "<br/><strong style='color:" + color + "'>" + status + "</strong>" +
                                        "</div>")
                                    .addTo(map);
                                map.setFeatureState({ source: 'world', id: hoveredLayer.id }, { hover: true });
                            } else {
                                popup.setLngLat([e.lngLat.lng, e.lngLat.lat])
                                    .setHTML("<div><strong style='color:black'>未知</strong></div>")
                                    .addTo(map);
                            }
                        });

                        map.on('mouseleave', 'world', (e) => {
                            if (hoveredLayer != null) {
                                map.setFeatureState({ source: 'world', id: hoveredLayer.id }, { hover: false });
                            }
                            hoveredLayer = null;
                            map.getCanvas().style.cursor = '';
                            popup.remove();

                        });

                        map.on('click', 'world', (e) => {
                            // console.log(hoveredLayer);
                            if (hoveredLayer != null) {
                                let count = hoveredLayer.properties.count;
                                let countryEnglishName = hoveredLayer.properties.name;
                                let countryChineseName = hoveredLayer.properties.countryCN;
                                this.moveToCountry(countryEnglishName, countryChineseName, count);
                            }

                        })

                        map.flyTo({
                            center: [147.5719, 36.0226],
                            zoom: 1.5,
                        });


                    } else { //取消加载
                        this.map.removeLayer('world');
                        this.map.removeSource('world');
                    }
                },
                //通过搜索按钮移动至对应国家
                moveToCountryBySearch: function() {
                    // console.log(this.searchValue);
                    if (this.searchValue != "") {
                        let countFlag = 0;
                        for (let index in this.left_list) {
                            let coutryName = this.left_list[index].name;
                            if (this.searchValue == coutryName) {
                                let countryEnglishName = this.left_list[index].countryEnglishName;
                                let count = this.left_list[index].count;
                                this.moveToCountry(countryEnglishName, coutryName, count);
                                countFlag++;
                                break;
                            }
                        }
                        if (countFlag == 0) {
                            alert('未搜索到相应国家');
                            this.searchValue = "";
                        }
                    } else {
                        alert("输入内容不能为空");
                    }
                }
            },
            watch: {
                //子组件监听父组件的值，防止父组件异步数据请求延迟，导致子组件得不到值
                worldStatistics: {
                    immediate: true,
                    handler(val) {
                        if (val != undefined) {
                            this._initLeftOverAllData();
                        }
                    }
                }
            },
            mounted: function() {
                //显示左侧栏
                $(".sideBar.left").removeClass("opacity0").removeClass("fadeOutLeft").addClass("animated fadeInLeft")
                    //初始化左侧栏数据
                this._initLeftBar()


            },

            template: leftbar_template
        })
    }, 4000)
})