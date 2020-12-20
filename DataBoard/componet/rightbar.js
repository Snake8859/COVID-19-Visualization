let rightbar_template = `
<div id="RightBar" class="sideBar right opacity0">
    <div class="bar-content" id="rightContent">
        <!--右侧标题栏-->
        <div class="first-right">
            <div>
                <p class="first-text">
                    中国疫情
                </p>
                <span class="first-entext">
                    China Epidemic
                </span>
            </div>
        </div>

        <!--右侧区域级疫情数据情况-->
        <div class="second-right" style="width: 100%;height: 30%;">
            <div class="second-right-box">
                <p>
                    {{region_name}}
                </p>
            </div>
            <div class="second-right-box">
                <div id="regional_numchange0" class="second-subbox" >
                    <div id="regional_aa" class="second-larger-text" style="color: #fbd71e;" data-count="this"
                    data-from="1" :data-to="currentConfirmedCount" data-suffix="" data-duration="1" data-easing="false">
                        
                    </div>
                    <p class="second-small-text">
                        现存确诊 
                        <span v-if="!currentCCIncrFlag&&showIncrFlag" style="color: springgreen;">&nbsp;{{currentConfirmedIncr}}</span>
                        <span v-if="currentCCIncrFlag&&showIncrFlag" style="color: orangered;">&nbsp;+{{currentConfirmedIncr}}</span>
                    </p>
                </div>
                <div id="regional_numchange1" class="second-subbox" >
                    <div id="regional_bb" class="second-larger-text" style="color: #FFA500;" data-count="this"
                    data-from="1" :data-to="suspectedCount" data-suffix="" data-duration="1" data-easing="false">
                        
                    </div>
                    <p class="second-small-text">
                        疑似确诊
                        <span v-if="!seriousIncrFlag&&showIncrFlag" style="font-size: 10px;color: springgreen;">&nbsp;{{seriousIncr}}</span>
                        <span v-if="seriousIncrFlag&&showIncrFlag" style="font-size: 10px;color: orangered;">&nbsp;+{{seriousIncr}}</span>
                    </p>
                </div>
            </div>
            <div class="second-right-box">
                <div id="regional_numchange2" class="second-subbox" >
                    <div id="regional_cc" class="second-middle-text" style="color: #17a2b8;" data-count="this"
                    data-from="1" :data-to="confirmedCount" data-suffix="" data-duration="1" data-easing="false">
                        
                    </div>
                    <p class="second-small-text" style="font-size: 10px">
                        累计确诊
                        <span v-if="!confirmedIncrFlag&&showIncrFlag" style="font-size: 10px;color: springgreen;">&nbsp;{{confirmedIncr}}</span>
                        <span v-if="confirmedIncrFlag&&showIncrFlag" style="font-size: 10px;color: orangered;">&nbsp;+{{confirmedIncr}}</span>
                    </p>
                </div>
                <div id="regional_numchange3" class="second-subbox" >
                    <div id="regional_dd" class="second-middle-text" style="color: #008000;" data-count="this"
                    data-from="1" :data-to="curedCount" data-suffix="" data-duration="1" data-easing="false">
                        
                    </div>
                    <p class="second-small-text" style="font-size: 10px">
                        累计治愈
                        <span v-if="curedIncrFlag&&showIncrFlag" style="font-size: 10px;color: springgreen;">&nbsp;+{{curedIncr}}</span>
                        <span v-if="!curedIncrFlag&&showIncrFlag" style="font-size: 10px;color: orangered;">&nbsp;{{curedIncr}}</span>
                    </p>
                </div>
                <div id="regional_numchange4" class="second-subbox" >
                    <div id="regional_ee" class="second-middle-text" style="color:#DC143C;" data-count="this"
                    data-from="1" :data-to="deadCount" data-suffix="" data-duration="1" data-easing="false">
                        
                    </div>
                    <p class="second-small-text" style="font-size: 10px">
                        累计死亡
                        <span v-if="!deadIncrFlag&&showIncrFlag" style="font-size: 10px;color: springgreen;">&nbsp;{{deadIncr}}</span>
                        <span v-if="deadIncrFlag&&showIncrFlag" style="font-size: 10px;color: orangered;">&nbsp;+{{deadIncr}}</span>
                    </p>
                </div>
            </div>
        </div>

        
        <!--右侧散点曲线图-->
        <!--<div style="width:100%;height:30%;" id="regional_curve"></div>-->


        <!--右侧柱状图-->
        <div id="regional_bar" class="third-right-box"></div>

        <!--右侧搜索框-->
        <div class="row">
            <div class="col-lg-12">
                <div class="input-group">
                    <input type="text" class="form-control" v-model="searchValue" @keyup.enter="moveToProvinceBySearch">
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="button" @click="moveToProvinceBySearch()">
                            搜索
                        </button>
                    </span>
                </div>
            </div>
        </div>

        <!--左侧底部列表-->
        <div class="fourth-right-box pre-scrollable">
            <table class="table table-hover table-striped-custom">
                <thead>
                    <tr>
                        <th>区域</th>
                        <th>状态</th>
                        <th>现存人数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="cursor: pointer;" v-for="item in right_list" @click="_moveToProvince(item.provinceEnglishName,item.name,item.count)">
                        <td>{{item.name}}</td>

                        <td v-if="item.flag==0">
                            <p style="margin:0px;color:green">安全</p>
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

    <span id="rightClickSpan" class="glyphicon glyphicon-option-vertical opration-handler"
    aria-hidden="true" @click="rightShrink">
	</span>
</div>
`;

//全局注册异步组件
Vue.component('rightbar', function (resolve, reject) {
  //定时器：5秒加载右侧组件
  let timer6 = setTimeout(function () {
    //向 `resolve` 回调传递组件定义
    resolve({
      data: function () {
        return {
          region_name: '',
          chinaDataCache: [], //中国疫情缓存

          showIncrFlag: true, //变化是否显示

          currentConfirmedCount: '', //现存确诊
          currentConfirmedIncr: '', //现存确诊-较昨日增加量
          currentCCIncrFlag: true, //现存确诊变化正负颜色渲染标识

          suspectedCount: '', //疑似确诊
          seriousIncr: '', //疑似确诊-较昨日增加量
          seriousIncrFlag: true, //疑似确诊变化正负颜色渲染标识

          confirmedCount: '', //累计确诊
          confirmedIncr: '', //累计确诊-较昨日增加量
          confirmedIncrFlag: true, //累计确诊变化正负颜色渲染标识

          curedCount: '', //治愈
          curedIncr: '', //治愈-较昨日增加量
          curedIncrFlag: true, //治愈变化正负颜色渲染标识

          deadCount: '', //死亡
          deadIncr: '', //死亡-较昨日增加量
          deadIncrFlag: true, //死亡变化正负颜色渲染标识

          //echart图表1配置
          regional_bar_option: {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              right: '0%',
              top: '-1%',
              data: ['现存确诊', '疑似病例'],
              textStyle: {
                color: '#FFFFFF',
                fontSize: 10
              }
            },
            title: {
              left: 'center',
              right: 'center',
              bottom: '90%',
              text: '',
              textStyle: {
                color: 'navajowhite',
                fontSize: 11
              }
            },
            grid: {
              height: '90%',
              left: '2%',
              right: '4%',
              top: '10%',
              bottom: '0%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#FFFFFF'
                }
              }
            },
            yAxis: [
              {
                type: 'category',
                axisLine: {
                  lineStyle: {
                    color: '#FFFFFF'
                  }
                },
                axisLabel: {
                  interval: 0,
                  fontSize: 10
                },
                data: []
              }
            ],
            series: [
              {
                name: '现存确诊',
                type: 'bar',
                stack: '总量',
                // itemStyle:{
                // 	color:'red'
                // },
                data: []
              },
              {
                name: '疑似病例',
                type: 'bar',
                stack: '总量',
                // itemStyle:{
                // 	color:'red'
                // },
                data: []
              }
            ]
          },

          //底部列表数据
          right_list: [],
          //图层id
          right_layer_list: [],
          //右侧收缩标识
          clickRightCount: 0,

          //渲染色带
          colorCard: ['#CCFF99', '#D9E68C', '#E6CC80', '#F2B373', '#FF9966'],

          searchValue: '',

          //echart图表2配置(作废)
          regional_curve_option: {
            tooltip: {
              //提示框组件
              trigger: 'axis', //触发类型 坐标轴触发
              position: function (point) {
                //提示框位置
                //固定在顶部
                return [point[0], '5%'];
              }
            },
            dataZoom: [
              {
                //内置型数据区域缩放组件
                type: 'inside',
                start: 0,
                end: 100
              },
              {
                //滑动条型数据区域缩放组件
                start: 0,
                end: 10,
                handleIcon:
                  'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
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
            title: {
              //标题
              left: 'center',
              top: '10%',
              text: '中国每日疫情报告',
              textStyle: {
                color: 'navajowhite',
                fontSize: 11
              }
            },
            xAxis: {
              //x轴
              type: 'category',
              boundaryGap: false,
              axisLine: {
                lineStyle: {
                  color: '#FFFFFF'
                }
              },
              data: []
            },
            yAxis: {
              //y轴
              type: 'value',
              name: '人数/个',
              nameTextStyle: {
                color: '#FFFFFF'
              },
              axisLine: {
                lineStyle: {
                  color: '#FFFFFF'
                }
              },
              boundaryGap: [0, '100%']
            },
            series: [
              //数据
              {
                name: '模拟数据',
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
          }
        };
      },
      props: ['map', 'chinaLayerData', 'chianStatistics'],
      watch: {
        //子组件监听父组件的值，防止父组件异步数据请求延迟，导致子组件得不到值
        chianStatistics: {
          immediate: true,
          handler(val) {
            if (val != undefined) {
              this._initRightOverAllData();
            }
          }
        }
      },
      methods: {
        _initRightBar: function () {
          // this._initRightOverAllData();
          this._initRightChart();
          /** 
                    //x轴时间数据和y轴模拟数据数据
                    var base = +new Date(2020, 1, 13);
                    var regional_date = []
                    var oneDay = 24 * 3600 * 1000;
                    var regional_data = [Math.random()*300];
                    for(var i = 1; i<90; i++){
                        var now = new Date(base += oneDay);
                        regional_date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
                        regional_data.push(Math.round((Math.random() - 0.5) * 20 + regional_data[i - 1]));
                    }
                    this.regional_curve_option.xAxis.data = regional_date
                    this.regional_curve_option.series[0].data = regional_data
                    //配置图表2
                    var right_chart2 = echarts.init(document.getElementById('regional_curve'))
                    right_chart2.setOption(this.regional_curve_option)
                    */
        },
        _numchange: function (id, end) {
          $('#' + id + ' [data-from][data-to]').each((i, b) => {
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
                  suffix: this._attrDefault(c, 'suffix', '')
                },
                $count = this._attrDefault(c, 'count', 'this') == 'this' ? c : c.find(c.data('count')),
                from = this._attrDefault(c, 'from', 0),
                // to = this._attrDefault(c, 'to', 100),
                to = end,
                duration = this._attrDefault(c, 'duration', 2.5),
                delay = this._attrDefault(c, 'delay', 0),
                decimals = new String(to).match(/\.([0-9]+)/) ? new String(to).match(/\.([0-9]+)$/)[1].length : 0,
                counter = new countUp($count.get(0), from, to, decimals, duration, a);
              setTimeout(function () {
                counter.start();
              }, delay * 1000);
              sm.destroy();
            });
          });
        },
        _attrDefault: function (a, b, c) {
          if (typeof a.data(b) != 'undefined') {
            return a.data(b);
          }
          return c;
        },
        //初始化中国疫情概况数据
        _initRightOverAllData: function () {
          this.currentConfirmedCount = this.chianStatistics.currentConfirmedCount; //中国现存确诊
          this.currentConfirmedIncr = this.chianStatistics.currentConfirmedIncr; //中国现存确诊-变化
          if (this.currentConfirmedIncr < 0) {
            //若人数减少
            this.currentCCIncrFlag = false;
          }

          this.suspectedCount = this.chianStatistics.suspectedCount; //中国疑似确诊
          this.seriousIncr = this.chianStatistics.seriousIncr; //中国疑似确诊-变化
          if (this.seriousIncr < 0) {
            //若人数减少
            this.seriousIncrFlag = false;
          }

          this.confirmedCount = this.chianStatistics.confirmedCount; //中国累计确诊
          this.confirmedIncr = this.chianStatistics.confirmedIncr; //中国累计确诊-变化
          if (this.confirmedIncr < 0) {
            //若人数减少
            this.confirmedIncrFlag = false;
          }

          this.curedCount = this.chianStatistics.curedCount; //中国治愈
          this.curedIncr = this.chianStatistics.curedIncr; //中国治愈-变化
          if (this.curedIncr < 0) {
            //若人数减少
            this.curedIncrFlag = false;
          }

          this.deadCount = this.chianStatistics.deadCount; //中国死亡
          this.deadIncr = this.chianStatistics.deadIncr; //中国死亡-变化
          if (this.deadIncr < 0) {
            //若人数减少
            this.deadIncrFlag = false;
          }

          this.$nextTick(() => {
            //确保内数据渲染完成，再调用数字变化动画
            //初始化数字变化动画
            this._numchange('regional_numchange0', this.currentConfirmedCount);
            this._numchange('regional_numchange1', this.suspectedCount);
            this._numchange('regional_numchange2', this.confirmedCount);
            this._numchange('regional_numchange3', this.curedCount);
            this._numchange('regional_numchange4', this.deadCount);
          });

          this.region_name = '中国';
          //子组件省份名称变化时，传递给父组件
          this.$emit('watchProvinceName', this.region_name);
          //显示疫情较昨日变化
          this.showIncrFlag = true;
        },
        //初始化中国省份疫情现状报告(接口调用)
        _initRightChart: function () {
          //清除原有数据
          this.regional_bar_option.yAxis[0].data.length = 0;
          this.regional_bar_option.series[0].data.length = 0;
          this.regional_bar_option.series[1].data.length = 0;

          // axios.get(configOptions.COVID.chinaAreaData) //【原始数据接口】
          axios
            .get(configOptions.MyService.chinaAreaData) //【自行数据接口】
            .then(response => {
              this.chinaDataCache = response.data.results; //获取数据集并放入缓存
              for (let index in this.chinaDataCache) {
                let item = this.chinaDataCache[index]; //
                if (item.cities != null) {
                  //提取中国各省份的疫情信息
                  let currentConfirmedCount = item.currentConfirmedCount; //省份当前确诊
                  let suspectedCount = item.suspectedCount; //疑似确诊
                  let provinceName = item.provinceName; //省份名
                  if (currentConfirmedCount != 0 && suspectedCount >= 0) {
                    //若确诊人数不为0，且疑似病例大于等于0，显示在柱状图中
                    this.regional_bar_option.yAxis[0].data.push(provinceName);
                    this.regional_bar_option.series[0].data.push(currentConfirmedCount);
                    this.regional_bar_option.series[1].data.push(suspectedCount);
                  }
                }
              }

              //设置标题
              this.regional_bar_option.title.text = '中国各省份疫情现况';

              this.$nextTick(() => {
                //确保内数据渲染完成，再调用滚动条设置和初始化底部数据列表
                //配置图表1
                let right_chart1 = echarts.init(document.getElementById('regional_bar'));
                right_chart1.setOption(this.regional_bar_option);

                //初始化底部数据列表
                this._initRightListData();
              });
            })
            .catch(error => {
              // handle error
              console.log(error);
            })
            .then(() => {
              // always executed
            });
        },
        //初始化底部数据列表
        _initRightListData: function () {
          for (let index in this.chinaDataCache) {
            //遍历中国疫情现状缓存
            // console.log(results[index]);
            let item = this.chinaDataCache[index]; //每一项数据
            if (item.cities != null) {
              //提取中国各省份的疫情信息
              // console.log(item.provinceName+':'+item.currentConfirmedCount);
              let flag = 0; //默认为安全
              let provinceName = item.provinceName; //省份名
              //处理香港，澳门和台湾名称不对应问题
              if (provinceName == '台湾') {
                provinceName = '台湾省';
              }
              // if (provinceName == '香港') {
              //     provinceName = '香港特别行政区';
              // } else if (provinceName == '澳门') {
              //     provinceName = '澳门特别行政区';
              // } else if (provinceName == '台湾') {
              //     provinceName = '台湾省';
              // }
              let provinceEnglishName = item.provinceEnglishName; //省份英文名
              let currentConfirmedCount = item.currentConfirmedCount; //省份当前确诊
              if (currentConfirmedCount > 0 && currentConfirmedCount < 15) {
                //确诊人数在0~15之间，状态为一般
                flag = 1;
              } else if (currentConfirmedCount >= 15) {
                //确诊人数大于15，状态为严重
                flag = 2;
              }
              this.right_list.push({
                name: provinceName,
                provinceEnglishName: provinceEnglishName,
                flag: flag,
                count: item.currentConfirmedCount
              });
            }
          }

          //排序 从大到小
          this.right_list.sort((obj1, obj2) => {
            return obj2.count - obj1.count;
          });

          this.$nextTick(() => {
            //确保内数据渲染完成，再调用滚动条设置
            $.mCustomScrollbar.defaults.theme = 'light-thin';
            $('.pre-scrollable').mCustomScrollbar({
              scrollbarPosition: 'outside',
              autoHideScrollbar: true
            });
            $('.mCSB_draggerContainer').css('margin-left', '5px');
            $('.graph-title').css('border-left', '5px solid #00b4ff');

            //将每个省份疫情情况数据加入到中国各省份疫情图层中
            this.chinaLayerData.features.forEach(element => {
              // console.log(element);
              for (let index in this.right_list) {
                let provinceName = this.right_list[index].name;
                if (element.properties.name == provinceName) {
                  let count = this.right_list[index].count;
                  element.properties.count = count;
                  break;
                }
              }
            });
          });
        },
        //移动至对应省份
        _moveToProvince: function (provinceEnglishName, provinceName, count) {
          // console.log(provinceEnglishName+' '+provinceName);
          let map = this.map;
          // console.log(map);
          let chinaLayerData = this.chinaLayerData;
          // console.log(chinaLayerData);

          let chinaFeatures = chinaLayerData.features; //获得要素数据
          let bounds = undefined; //定义地理边界框
          let feature = undefined;

          //图层渲染颜色
          let color;

          if (count == 0) {
            color = this.colorCard[0];
          } else if (count > 0 && count <= 5) {
            color = this.colorCard[1];
          } else if (count > 5 && count <= 10) {
            color = this.colorCard[2];
          } else if (count > 10 && count <= 15) {
            color = this.colorCard[3];
          } else if (count > 15) {
            color = this.colorCard[4];
          }

          for (let index in chinaFeatures) {
            //遍历中国要素数据
            feature = chinaFeatures[index];
            let name = feature.properties.name;

            //处理香港，澳门和台湾名称不对应问题
            if (provinceName == '台湾') {
              provinceName = '台湾省';
            }
            // if (provinceName == '香港特别行政区') {
            //     provinceName = '香港';
            // } else if (provinceName == '澳门特别行政区') {
            //     provinceName = '澳门';
            // } else if (provinceName == '台湾') {
            //     provinceName = '台湾省';
            // }

            if (name == provinceName) {
              //若为所点击省份的名称
              // console.log(feature);
              let provinceLayer = map.getLayer(name); //省份疫情图层
              let layerType = undefined; //省份疫情图层类型
              bounds = new mapboxgl.LngLatBounds(); //实例化地理边界框
              //均为复杂多边形,取面积最大作为地理边界框
              let maxId = 0,
                maxLength = 0;
              let coordinates = feature.geometry.coordinates;
              for (id in coordinates) {
                //取出面积最大的多边形
                let polygon = coordinates[id][0];
                let length = polygon.length;
                if (length > maxLength) {
                  maxLength = length;
                  maxId = id;
                }
              }
              // console.log(maxLength,maxId)
              coordinates[maxId][0].forEach(lnglat => {
                bounds.extend([lnglat[0], lnglat[1]]);
              });

              layerType = 'MultiPolygon';

              // console.log(provinceLayer);
              // console.log(layerType);
              //加载省份疫情状态图层
              if (provinceLayer == undefined && layerType != undefined) {
                map.addLayer({
                  id: name,
                  type: 'fill',
                  source: {
                    type: 'geojson',
                    data: {
                      type: layerType,
                      coordinates: feature.geometry.coordinates
                    }
                  },
                  layout: {},
                  paint: {
                    'fill-color': color,
                    'fill-outline-color': 'black',
                    'fill-opacity': 0.8
                  }
                });
                this.right_layer_list.push(name);
              }
              break;
            }
          }

          // console.log(bounds);
          if (bounds != undefined) {
            map.fitBounds(bounds);
          }

          this._generateProvinceStatus(provinceEnglishName, provinceName);
          this._generateProvinceBar(provinceEnglishName, provinceName);

          //子组件省份名称变化时，传递给父组件
          this.$emit('watchProvinceName', this.region_name);
        },
        //生成省份疫情概况数据
        _generateProvinceStatus: function (provinceEnglishName, provinceName) {
          //中国疫情缓存取出对应省份疫情信息
          for (let index in this.chinaDataCache) {
            let item = this.chinaDataCache[index];
            if (item.provinceEnglishName == provinceEnglishName) {
              this.region_name = provinceName; //更新省份名称
              //更新省份疫情信息
              this.currentConfirmedCount = item.currentConfirmedCount;
              this.suspectedCount = item.suspectedCount;
              this.confirmedCount = item.confirmedCount;
              this.curedCount = item.curedCount;
              this.deadCount = item.deadCount;
              //不显示变化情况
              this.showIncrFlag = false;
              break;
            }
          }

          this.$nextTick(() => {
            //确保内数据渲染完成，再调用数字变化动画
            //初始化数字变化动画
            this._numchange('regional_numchange0', this.currentConfirmedCount);
            this._numchange('regional_numchange1', this.suspectedCount);
            this._numchange('regional_numchange2', this.confirmedCount);
            this._numchange('regional_numchange3', this.curedCount);
            this._numchange('regional_numchange4', this.deadCount);
          });
        },
        //生成省份各地区疫情现况报告
        _generateProvinceBar: function (provinceEnglishName, provinceName) {
          //清除原有数据
          this.regional_bar_option.yAxis[0].data.length = 0;
          this.regional_bar_option.series[0].data.length = 0;
          this.regional_bar_option.series[1].data.length = 0;

          //中国疫情缓存取出对应省份疫情信息
          for (let index in this.chinaDataCache) {
            let item = this.chinaDataCache[index];
            if (item.provinceEnglishName == provinceEnglishName) {
              // console.log(item);
              cities = item.cities;
              // console.log(cities);
              if (provinceEnglishName == 'Beijing') {
                //若为北京市，提示北京市数据存在问题
                alert(item.comment);
              } else if (cities.length != 0) {
                for (let id in cities) {
                  let city = cities[id];
                  this.regional_bar_option.yAxis[0].data.push(city.cityName);
                  this.regional_bar_option.series[0].data.push(city.currentConfirmedCount);
                  this.regional_bar_option.series[1].data.push(city.suspectedCount);
                }
              } else {
                //若为香港，澳门和台湾
                this.regional_bar_option.yAxis[0].data.push(item.provinceName);
                this.regional_bar_option.series[0].data.push(item.currentConfirmedCount);
                this.regional_bar_option.series[1].data.push(item.suspectedCount);
              }
              break;
            }
          }

          //设置标题
          this.regional_bar_option.title.text = provinceName + '疫情现况';

          this.$nextTick(() => {
            //确保内数据渲染完成，再调用滚动条设置
            //配置图表1
            let right_chart1 = echarts.init(document.getElementById('regional_bar'));
            right_chart1.setOption(this.regional_bar_option);
          });
        },
        //生成中国各省份疫情现在报告(缓存调用)
        _generateChinaBar: function () {
          //清除原有数据
          this.regional_bar_option.yAxis[0].data.length = 0;
          this.regional_bar_option.series[0].data.length = 0;
          this.regional_bar_option.series[1].data.length = 0;
          for (let index in this.chinaDataCache) {
            let item = this.chinaDataCache[index]; //
            if (item.cities != null) {
              //提取中国各省份的疫情信息
              let currentConfirmedCount = item.currentConfirmedCount; //省份当前确诊
              let suspectedCount = item.suspectedCount; //疑似确诊
              let provinceName = item.provinceName; //省份名
              if (currentConfirmedCount != 0 && suspectedCount >= 0) {
                //若确诊人数不为0，且疑似病例大于等于0，显示在柱状图中
                this.regional_bar_option.yAxis[0].data.push(provinceName);
                this.regional_bar_option.series[0].data.push(currentConfirmedCount);
                this.regional_bar_option.series[1].data.push(suspectedCount);
              }
            }
          }
          //设置标题
          this.regional_bar_option.title.text = '中国各省份疫情现况';
          //配置图表1
          let right_chart1 = echarts.init(document.getElementById('regional_bar'));
          right_chart1.setOption(this.regional_bar_option);
        },
        //右侧栏收缩
        rightShrink: function () {
          var rightwidth = $('#RightBar').width();
          if (this.clickRightCount % 2 == 0) {
            $('.right').css('right', 10 - rightwidth);
            $('#BottomBar').css('right', '10px');
            this.clickRightCount++;
            emitter.emit('changeTimeBoxPositionRight', '-5%');
          } else {
            $('.right').css('right', '0px');
            $('#BottomBar').css('right', rightwidth);
            this.clickRightCount++;
            emitter.emit('changeTimeBoxPositionRight', '14%');
          }
          $(window).trigger('resize');
        },
        //加载中国疫情分级颜色渲染图层
        loadChinaColorLayer: function (status) {
          // console.log(this.chinaLayerData);
          this.$parent.chinaFlag = !this.$parent.chinaFlag;
          let layerIdList = this.right_layer_list;
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
          this.right_layer_list.length = 0;
          //添加世界疫情色彩渲染图层
          let map = this.map; //从父组件获得map对象

          if (status) {
            //选中加载
            map.addLayer({
              id: 'province',
              type: 'fill',
              source: {
                type: 'geojson',
                data: {
                  type: 'FeatureCollection',
                  features: this.chinaLayerData.features
                }
              },
              layout: {},
              paint: {
                'fill-color': {
                  property: 'count', // this will be your property form you geojson
                  stops: [
                    [0, this.colorCard[0]],
                    [5, this.colorCard[1]],
                    [10, this.colorCard[2]],
                    [15, this.colorCard[3]],
                    [20, this.colorCard[4]]
                  ]
                },
                'fill-outline-color': 'white',
                'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0.8]
              }
            });

            // Create a popup, but don't add it to the map yet.
            var popup = new mapboxgl.Popup({
              closeButton: false,
              closeOnClick: false
            });

            var hoveredLayer = null;

            // Add Event
            map.on('mousemove', 'province', e => {
              // console.log(e);
              if (hoveredLayer) {
                map.setFeatureState({ source: 'province', id: hoveredLayer.id }, { hover: false });
              }
              hoveredLayer = e.features[0];
              let count = hoveredLayer.properties.count;
              let status = '安全';
              let color = 'green';
              if (count == 0) {
                //确诊人数为0，状态为安全
                status = '安全';
                color = 'green';
              } else if (count > 0 && count < 15) {
                //确诊人数在0~15之间，状态为一般
                status = '一般';
                color = 'orange';
              } else if (count >= 15) {
                //确诊人数大于15，状态为严重
                status = '严重';
                color = 'red';
              }
              map.getCanvas().style.cursor = 'pointer';
              popup
                .setLngLat([e.lngLat.lng, e.lngLat.lat])
                .setHTML(
                  "<div><strong style='color:red'>" +
                    hoveredLayer.properties.name +
                    '</strong>' +
                    "<br/><strong style='color:black'>" +
                    '当前确诊: ' +
                    count +
                    '/人' +
                    '</strong>' +
                    "<br/><strong style='color:" +
                    color +
                    "'>" +
                    status +
                    '</strong>' +
                    '</div>'
                )
                .addTo(map);
              map.setFeatureState({ source: 'province', id: hoveredLayer.id }, { hover: true });
            });

            map.on('mouseleave', 'province', e => {
              if (hoveredLayer != null) {
                map.setFeatureState({ source: 'province', id: hoveredLayer.id }, { hover: false });
              }
              hoveredLayer = null;
              map.getCanvas().style.cursor = '';
              popup.remove();
            });

            map.on('click', 'province', e => {
              // console.log(hoveredLayer);
              if (hoveredLayer != null) {
                let count = hoveredLayer.properties.count;
                let provinceCN = hoveredLayer.properties.name;
                let provinceEN = hoveredLayer.properties.provinceEN;
                this._moveToProvince(provinceEN, provinceCN, count);
              }
            });

            map.flyTo({
              center: [104.3692, 40.4239],
              zoom: 3
            });
          } else {
            //取消加载
            this.map.removeLayer('province');
            this.map.removeSource('province');
          }
        },
        moveToProvinceBySearch: function () {
          // console.log(this.searchValue);
          if (this.searchValue != '') {
            let countFlag = 0;
            for (let index in this.right_list) {
              let provinceName = this.right_list[index].name;
              //处理香港，澳门和台湾名称不对应问题
              // if(provinceName == '香港'){
              //     provinceName = '香港特别行政区';
              // }
              // else if(provinceName =='澳门'){
              //     provinceName = '澳门特别行政区';
              // }
              // else if(provinceName == '台湾'){
              //     provinceName = '台湾省';
              // }
              if (this.searchValue == provinceName) {
                let provinceEnglishName = this.right_list[index].provinceEnglishName;
                let count = this.right_list[index].count;
                this._moveToProvince(provinceEnglishName, provinceName, count);
                countFlag++;
                break;
              }
            }
            if (countFlag == 0) {
              alert('未搜索到相应省份');
              this.searchValue = '';
            }
          } else {
            alert('输入内容不能为空');
          }
        }
      },
      mounted: function () {
        //显示右边栏
        $('.sideBar.right').removeClass('opacity0').removeClass('fadeOutRight').addClass('animated fadeInRight');
        //初始化右侧栏数据
        this._initRightBar();
      },
      template: rightbar_template
    });
  }, 5000);
});
