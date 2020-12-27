let main_container_template = `
<div id="main_container">
    <div class="main-container">
        <div id="map">

            <!--===== 世界各国疫情 start -->
            <div id="worldmap" v-show="worldFlag">
                <div id="rightMark" style="z-index: 100;bottom:6%;">
                    <div>
                        <span class="mark_title">疫情严重程度</span>
                    </div>
                    <div class="worldmap_linear_color"></div>
                    <span class="blue mark_text color_span">未知</span>
                    <span class="green mark_text color_span">隐患</span>
                    <span class="yellow mark_text color_span">一般</span>
                    <span class="red mark_text color_span">严重</span>
                    <span class="result_red mark_text color_span">危险</span>
                </div>
            </div>
            <!--===== 世界各国疫情 end -->

            <!--===== 中国各国疫情 start -->
            <div id="chinamap" v-show="chinaFlag">
                <div id="centerMark" style="z-index: 100;bottom:6%; ">
                    <div>
                        <span class="mark_title">疫情严重程度</span>
                    </div>
                    <div class="chinamap_linear_color"></div>
                    <span class="blue mark_text color_span">安全</span>
                    <span class="green mark_text color_span">隐患</span>
                    <span class="yellow mark_text color_span">一般</span>
                    <span class="red mark_text color_span">严重</span>
                    <span class="result_red mark_text color_span">危险</span>
                </div>
            </div>
            <!--===== 中国各国疫情 end -->
    

            <!--=====人流量热力图 start-->
            <div id="heatmap" v-show="heatFlag">
                <div id="rightMark" style="z-index: 100">
                    <div>
                        <span class="mark_title">颜色对应人口密度</span>
                        <span class="mark_text" style="float:right;padding-top:5px" id="heatmap_mark_density">人/100平方米</span>
                    </div>
                    <div class="heatmap_linear_color"></div>
                    <span class="blue mark_text color_span">0-5</span>
                    <span class="green mark_text color_span">6-11</span>
                    <span class="yellow mark_text color_span">12-17</span>
                    <span class="red mark_text color_span">18-20</span>
                    <span class="result_red mark_text color_span">&gt;20</span>
                </div>

                <div id="heatmap_date" :style="{right:timeBoxRight}">
                  <div class='col-md-8'>
                      <label>
                          时间&nbsp;&nbsp;&nbsp;
                      </label>
                      <div class='input-group date'>
                          <!-- <input type='text' class='form-control'  id='heat_datetimepicker'  @blur='_peopleAnalysisByDay()'/> -->
                          <input type='text' class='form-control'  id='heat_datetimepicker'/>
                      </div>
                  </div>
                  <button class='btn btn-primary btn-sm' style="margin-top:10%" @click='play(heatPlay)'>
                      {{playInfo}}
                  </button>
                </div>
            </div>

            <div id="heatmap_bar" :style="{position: 'absolute',width: '100%',bottom: '2%',backgroundColor: 'rgba(199, 199, 199, 0.6)',zIndex: 100,pointerEvents}" v-show="heatFlag">
                <div class='ystep-container ystep-lg ystep-blue'>
                </div>
            </div>
            <!--=====人流量热力图 end-->

            <!--=====地铁客流图 start-->
            
            <div id="subway" v-show="subwayFlag">
                <div id="rightMark" style="z-index: 100">
                    <div>
                        <span class="mark_title">颜色对应客流密度</span>
                        <span class="mark_text" style="float:right;padding-top:5px" id="subway_mark_density">人</span>
                    </div>
                    <div class="subway_linear_color"></div>
                    <span class="blue mark_text color_span">{{colorList[0]}}</span>
                    <span class="green mark_text color_span">{{colorList[1]}}</span>
                    <span class="yellow mark_text color_span">{{colorList[2]}}</span>
                    <span class="red mark_text color_span">{{colorList[3]}}</span>
                    <span class="result_red mark_text color_span">&gt;{{colorList[4]}}</span>
                </div>
            </div>
           
           
            <div id="subway_bar" style="position: absolute;width: 100%;bottom: 2%;background-color: rgba(199, 199, 199, 0.6);z-index: 100;" v-show="subwayFlag">
                <div class='ystep-container ystep-lg ystep-blue'>
                </div>
                <button class='btn btn-primary btn-sm center-block' @click='play(subwayPlay)'>
                    {{playInfo}}
                </button>
            </div>
            <!--=====地铁客流图 end-->
        </div>

        <leftbar :map="map" :worldLayerData="worldLayerData" :worldStatistics="worldStatistics" :chinaLayerData="chinaLayerData" @watchCountryName="watchCountryName"></leftbar>
        <rightbar :map="map" :chinaLayerData="chinaLayerData" :chianStatistics="chianStatistics" @watchProvinceName="watchProvinceName"></rightbar>
        <bottombar></bottombar>
    </div>
    <div v-if="loading" class="loader-2"><div class="loading-container"><div class="img-div"><img src="./images/icons/loading.gif"></div></div></div>
</div>
`;
//全局注册组件
Vue.component('main-container', {
  data: function () {
    return {
      map: undefined, //地图对象
      timeBoxRight: '-5%', // 加载岳麓山图层之后的时间选择box的right位置
      //世界图层geojson，世界疫情概况数据和国家名称
      worldLayerData: undefined,
      worldStatistics: undefined,
      countryName: undefined,
      worldFlag: false, //世界图例显示标识

      //中国图层geojson，中国疫情概况数据和省份名称
      chinaLayerData: undefined,
      chianStatistics: undefined,
      provinceName: undefined,
      chinaFlag: false, //中国图例显示标识

      heatFlag: false, //热力图显示标识
      heatPlay: 'heatDemo',
      subwayFlag: false, //客流量显示标识
      subwayPlay: 'subwayDemo',
      hzSubWayLineData: undefined, //杭州地铁线geojson
      colorCard: ['#3300FF', '#5C0AD6', '#8514AD', '#AD1F85', '#D6295C', '#FF3333'],
      colorList: [],
      playInfo: '播放', //播放按钮
      heatMapData: undefined, //热力图数据
      pauseTime: '00', //暂停的时间点
      loading: false,
      worker: null,
      pointerEvents: 'none'
    };
  },
  methods: {
    //初始化地图
    _initMap: function () {
      //加载底图
      mapboxgl.accessToken = configOptions.mapbox.mapboxToken;
      let map = new mapboxgl.Map({
        container: 'map', // container id
        style: configOptions.mapbox.styleId, // stylesheet location
        center: configOptions.mapbox.home.center, // starting position [lng, lat]
        zoom: configOptions.mapbox.home.zoom, // starting zoom
        attributionControl: false
      });
      this.map = map;

      //添加地图缩放控制事件
      this._zoomLevelControl();
    },
    //加载geojson数据
    _loadGeoJsonData: function () {
      //加载世界国家geojson数据
      axios
        .get(configOptions.geojson.world)
        .then(response => {
          // console.log(response);
          let worldLayerData = response.data;
          this.worldLayerData = worldLayerData;
        })
        .catch(error => {
          // handle error
          console.log(error);
        })
        .then(() => {
          // always executed
        });

      //加载中国各省份geojson数据
      axios
        .get(configOptions.geojson.china)
        .then(response => {
          // console.log(response);
          let chinaLayerData = response.data;
          this.chinaLayerData = chinaLayerData;
        })
        .catch(error => {
          // handle error
          console.log(error);
        })
        .then(() => {
          // always executed
        });
    },
    //加载疫情概况数据
    _loadOverAllData: function () {
      //加载世界和中国疫情概况数据
      axios
        .get(configOptions.MyService.overAllData) //【自行数据接口】
        // axios.get(configOptions.COVID.overAllData) //【原始数据接口】
        .then(response => {
          // console.log(response);
          let globalStatistics = response.data.results[0].globalStatistics; //获得世界疫情概况
          let chianStatistics = response.data.results[0]; //中国疫情概况
          this.worldStatistics = globalStatistics; //放入缓存并传递至左侧子组件
          this.chianStatistics = chianStatistics; //放入缓存并传递至右侧子组件
        })
        .catch(error => {
          // handle error
          console.log(error);
        })
        .then(() => {});
    },
    //缩放级别到达某个级别时，恢复世界疫情概况和中国疫情概况
    _zoomLevelControl: function () {
      this.map.on('zoomend', e => {
        // console.log('地图缩放级别控制');
        // console.log(e.target.getZoom());
        // console.log(e.target.getCenter());
        //当前缩放级别
        let zoomLevel = e.target.getZoom();
        // console.log(zoomLevel);
        if (zoomLevel <= 2 && this.countryName != '世界') {
          //若zoomLevel小于等于2，则需要调用子组件重新初始化世界概况
          //调用子组件方法，重新初始化世界疫情概况
          this.$children[0]._initLeftOverAllData();
          this.$children[0]._generateLeftCurve();
        }
        if (zoomLevel <= 3 && this.provinceName != '中国') {
          //若zoomLevel小于等于3，则需要调用子组件重新初始化中国概况
          //调用子组件方法，重新初始化中国疫情概况
          this.$children[1]._initRightOverAllData();
          this.$children[1]._generateChinaBar();
        }
      });
    },
    //监听左侧国家名称变话
    watchCountryName: function (countryName) {
      // console.log(countryName);
      this.countryName = countryName;
    },
    //监听右侧省份名称变化
    watchProvinceName: function (provinceName) {
      // console.log(provinceName);
      this.provinceName = provinceName;
    },

    //加载岳麓山人口密度热力图监控界面
    _loadPeopleAnalysis: function (status) {
      let map = this.map;
      if (status) {
        //若选中
        this.heatFlag = true;

        //进度条插件初始化
        step = new SetStep({
          content: '#heatmap_bar',
          showBtn: false,
          steps: [
            '00:00',
            '01:00',
            '02:00',
            '03:00',
            '04:00',
            '05:00',
            '06:00',
            '07:00',
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
            '20:00',
            '21:00',
            '22:00',
            '23:00'
          ]
        });
        //时间插件初始化
        $('#heat_datetimepicker')
          .datetimepicker({
            viewMode: 'days',
            format: 'YYYY-MM-DD'
          })
          .on('dp.change', async e => {
            this.pointerEvents = 'auto';
            // 停止时间轴的移动
            this.intervalTime && clearInterval(this.intervalTime);
            // 将时间轴节点归0
            step.setZero();
            // 停止播放
            this.playInfo = '播放';
            // console.log(e);
            // console.log($('#heat_datetimepicker').val());
            const datetime = $('#heat_datetimepicker').val();

            this.worker && this.worker.terminate();
            this.worker = new Worker('./worker/index.js');
            this.worker.postMessage({ datetime });

            const startTime = new Date();
            this.loading = true;
            for (let i = 0; i < 12; i++) {
              const hour = i < 10 ? `0${i}` : `${i}`;
              try {
                const buffer = await readInYueluMountainCrowdDb(datetime + '-' + hour);
              } catch (err) {
                console.log(`${err}，开始写入indexedDB`);
                await this.requestCrowdInHour(datetime, hour);
              }
            }
            console.log(`耗时${(new Date() - startTime) / 1000}s`);
            this.loading = false;
          });

        //加载岳麓山边界
        axios
          .get(configOptions.geojson.yls)
          .then(res => {
            // console.log(res);
            map.addLayer({
              id: 'yls',
              type: 'fill',
              source: {
                type: 'geojson',
                data: {
                  type: res.data.type,
                  features: res.data.features
                }
              },
              layout: {},
              paint: {
                'fill-color': 'rgba(255,255,255,0)',
                'fill-outline-color': 'white',
                'fill-opacity': 0.8
              }
            });
          })
          .catch(err => {
            console.log(err);
          })
          .then(() => {
            // always executed
            map.flyTo({
              center: configOptions.mapbox.yls.center,
              zoom: configOptions.mapbox.yls.zoom
            });
          });
      } else {
        this.heatFlag = false;
        if (map.getLayer('heatLayer')) {
          //若是已有图层，则删除
          map.removeLayer('heatLayer');
          map.removeSource('heatLayer');
        }
        if (map.getLayer('yls')) {
          //若是已有图层，则删除
          map.removeLayer('yls');
          map.removeSource('yls');
        }
      }
    },

    //加载杭州地铁客流量密度颜色渲染监控界面
    _loadSubwayAnalysis: function (status) {
      let map = this.map;
      if (status) {
        //若选中
        this.subwayFlag = true;

        //进度条插件初始化
        step = new SetStep({
          content: '#subway_bar',
          showBtn: false,
          steps: ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
        });
        //时间插件初始化
        $('#subway_datetimepicker').datetimepicker({
          viewMode: 'days',
          format: 'YYYY-MM-DD'
        });

        //加载地铁线要素
        axios
          .get(configOptions.geojson.hz)
          .then(res => {
            // console.log(res);
            this.hzSubWayLineData = res.data;
          })
          .catch(err => {
            console.log(err);
          })
          .then(() => {
            // always executed
            map.flyTo({
              center: configOptions.mapbox.hzSubway.center,
              zoom: configOptions.mapbox.hzSubway.zoom
            });
          });
      } else {
        this.subwayFlag = false;
        if (map.getLayer('lineLayer')) {
          //若是已有图层，则删除
          map.removeLayer('lineLayer');
          map.removeSource('lineLayer');
        }
      }
    },

    //播放
    play: function (play) {
      if (this.playInfo == '播放') {
        //若播放
        // console.log("播放");
        this.playInfo = '暂停';
        step.autoPlay();
      } else {
        //若暂停
        // console.log("暂停");
        this.playInfo = '播放';
        this.pauseTime = '23';
        // clearInterval(interval);
      }
    },

    // 请求岳麓山每日各个时间点的人流量数据
    async requestCrowdInHour(datetime, hour, isRender = false) {
      try {
        const res = await axios.get(configOptions.people.dataUrl, {
          params: {
            dateTime: datetime,
            hour: hour
          }
        });

        // console.log(res);
        if (res.data.code == '200') {
          //热力图生成成功
          // console.log(res);
          let heatData = res.data.data;

          let heatGeoJson = {
            type: 'FeatureCollection',
            features: []
          };

          heatData.forEach(element => {
            //构建单个要素
            let feature = {
              geometry: {
                coordinates: undefined,
                type: 'Point'
              },
              tpye: 'Feature',
              properties: {
                count: undefined
              }
            };
            feature.geometry.coordinates = [parseFloat(element.lng), parseFloat(element.lat)];
            feature.properties.count = parseInt(element.count);
            heatGeoJson.features.push(feature);
          });

          // console.log(heatGeoJson, new Date() - startTime);
          addToYueluMountainCrowdDb({ time: datetime + '-' + hour, data: heatGeoJson });
          if (isRender) {
            this._generateHeatMapByHour(heatGeoJson);
            step.autoPlay(this.pauseTime !== '23');
          }
        } else {
          // alert(res.data.msg + ',该时间暂无人流量数据');
          // clearInterval(interval);
          // this.playInfo = '播放';
          console.log(`${datetime} ${hour}点暂无人流量数据`);
        }
      } catch (err) {
        console.error(err);
      }
    },

    //岳麓山人流量密度监控 按小时
    _peopleAnalysisByHour: async function () {
      let hour;
      let datetime = $('#heat_datetimepicker').val();
      if (datetime === '') {
        alert('请先选择时间');
        return;
      }
      if (!$('#heatmap_bar li.ystep-step-active').html()) {
        hour = '00';
      } else {
        hour = $('#heatmap_bar li.ystep-step-active').html().split(':')[0];
      }
      if (hour === '23') this.playInfo = '播放';
      this.pauseTime = hour;
      // console.log($('#heatmap_bar li.ystep-step-active'));
      // console.log(hour); // 00
      // console.log(datetime); // 2020-12-24
      // const startTime = new Date();

      try {
        const buffer = await readInYueluMountainCrowdDb(datetime + '-' + hour);
        // console.log(buffer);
        this._generateHeatMapByHour(buffer);
        console.log(this.pauseTime);
        this.intervalTime && clearInterval(this.intervalTime);
        this.intervalTime = setInterval(() => {
          step.autoPlay(this.pauseTime !== '23');
        }, 2000);
      } catch (err) {
        console.log('读取缓存失败，开启降级方案请求数据');
        this.intervalTime && clearInterval(this.intervalTime);
        await this.requestCrowdInHour(datetime, hour);
        this._peopleAnalysisByHour();
      }
    },

    //生成热力图 按小时
    _generateHeatMapByHour: function (heatGeoJson) {
      // console.log(heatGeoJson);
      let map = this.map;
      if (map.getLayer('heatLayer')) {
        //若是已有图层，则删除
        map.removeLayer('heatLayer');
        map.removeSource('heatLayer');
      }
      map.addLayer({
        id: 'heatLayer',
        type: 'heatmap',
        source: {
          type: 'geojson',
          data: {
            type: heatGeoJson.type,
            features: heatGeoJson.features
          }
        },
        paint: {
          'heatmap-weight': {
            property: 'count',
            type: 'exponential',
            stops: [
              [1, 0],
              [20, 1]
            ]
          },
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0,
            'rgba(33,102,172,0)',
            0.2,
            'rgb(103,169,207)',
            0.4,
            'rgb(209,229,240)',
            0.6,
            'rgb(253,219,199)',
            0.8,
            'rgb(239,138,98)',
            1,
            'rgb(178,24,43)'
          ]
        }
      });
    },

    //人流量密度监控 按天
    _peopleAnalysisByDay: function () {
      let date = $('#heat_datetimepicker').val();
      if (date != '') {
        axios
          .get(configOptions.people.allDataUrl, {
            params: {
              date: date
            }
          })
          .then(res => {
            console.log(res);
            if (res.data.code == '200') {
              //热力图生成成功
              this.heatMapData = res.data;
            }
          })
          .catch(err => {
            console.log(err);
          })
          .then(() => {
            // always executed
          });
      } else {
        alert('请先选择日期');
      }
    },

    //生成热力图 按天
    _generateHeatMapByDay: function () {
      let day = $('#heat_datetimepicker').val();
      if (day != '') {
        let hour = $('div#heatmap_bar li.ystep-step-active').html().split(':')[0];
        let dateKey = day + ' ' + hour + ':00:00';
        // console.log(dateKey);
        let hourData = this.heatMapData.data[dateKey];
        // console.log(hourData);

        let map = this.map;
        if (map.getLayer('heatLayer')) {
          //若是已有图层，则删除
          map.removeLayer('heatLayer');
          map.removeSource('heatLayer');
        }
        map.addLayer({
          id: 'heatLayer',
          type: 'heatmap',
          source: {
            type: 'geojson',
            data: {
              type: hourData.type,
              features: hourData.features
            }
          },
          paint: {
            'heatmap-weight': {
              property: 'count',
              type: 'exponential',
              stops: [
                [1, 0],
                [20, 1]
              ]
            },
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(33,102,172,0)',
              0.2,
              'rgb(103,169,207)',
              0.4,
              'rgb(209,229,240)',
              0.6,
              'rgb(253,219,199)',
              0.8,
              'rgb(239,138,98)',
              1,
              'rgb(178,24,43)'
            ]
          }
        });
      } else {
        alert('请先选择日期');
      }
    },

    //客流量密度监控
    _subwayAnalysis: function () {
      let hour = parseInt($('div#subway_bar li.ystep-step-active').html().split(':')[0]);
      axios
        .get(configOptions.subway.dataUrl)
        .then(res => {
          // console.log(res);
          //获得时间的客流量数据
          let subwayFlowData = res.data[hour];
          // console.log(subwayFlowData);
          let lineGeoJson = this.hzSubWayLineData;
          //添加到geojson的属性内
          for (let i in lineGeoJson.features) {
            //遍历每一个要素
            let feature = lineGeoJson.features[i];
            // console.log(feature);
            let id = feature.properties.id; //取id
            for (let j in subwayFlowData) {
              if (subwayFlowData[j][0] == id) {
                //若id和数据集对应，则赋予客流量值
                feature.properties.count = subwayFlowData[j][1];
                break;
              }
            }
          }

          //取数据中最大和最小
          let tempList = [];
          for (let i in subwayFlowData) {
            // console.log(res.data[i]);
            tempList.push(subwayFlowData[i][1]);
          }
          // console.log(temp_list);
          let max = Math.max.apply(null, tempList);
          let min = Math.min.apply(null, tempList);
          // console.log(max,min);
          //6等分间隔
          let subwayDataLength = (max - min) / 6;
          this.colorList.length = 0;
          for (let i = 0; i < 6; i++) {
            this.colorList.push(parseInt(min + subwayDataLength * i));
          }
          // console.log(colorList);
          this._generateLineMap(lineGeoJson, this.colorList, hour);
        })
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          // always executed
        });
    },

    //地铁客流量显示渲染
    _generateLineMap: function (lineGeoJson, colorList, hour) {
      // console.log(lineGeoJson);
      let map = this.map;
      if (map.getLayer('lineLayer')) {
        //若是已有图层，则移除事件和图层
        map.off('mouseenter', 'lineLayer');
        map.off('mouseleave', 'lineLayer');
        map.removeLayer('lineLayer');
        map.removeSource('lineLayer');
      }
      map.addLayer({
        id: 'lineLayer',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: lineGeoJson.type,
            features: lineGeoJson.features
          }
        },
        paint: {
          'line-color': {
            property: 'count', // this will be your property form you geojson
            stops: [
              [colorList[0], this.colorCard[0]],
              [colorList[1], this.colorCard[1]],
              [colorList[2], this.colorCard[2]],
              [colorList[3], this.colorCard[3]],
              [colorList[4], this.colorCard[4]],
              [colorList[5], this.colorCard[5]]
            ]
          },
          'line-width': 4
        }
      });

      // Create a popup, but don't add it to the map yet.
      var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });
      // Add Event
      map.on('mouseenter', 'lineLayer', e => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
        // console.log(e);
        var properties = e.features[0].properties;
        // console.log(properties.name,properties.count);
        popup
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .setHTML("<div><strong style='color:red'>" + properties.name + '</strong>' + "<p style='color:black'>" + hour + '点客流量：' + properties.count + '/人' + '</p></div>')
          .addTo(map);
      });
      map.on('mouseleave', 'lineLayer', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });
    },

    _hideLoader2: function () {
      //隐藏加载logo2
      !$('.page-overlay').hasClass('loaded') && $('.page-overlay').addClass('loaded');
      // $(".page-overlay").hasClass("clear") && $(".page-overlay").removeClass("clear")
    },
    animationRight(val) {
      const tmp = parseFloat(this.timeBoxRight.replace('%', '')) + val;
      if (tmp > -6 && tmp < 15) {
        this.timeBoxRight = tmp + '%';
        requestAnimationFrame(() => this.animationRight(val));
      }
    }
  },
  beforeMount() {
    emitter.on('changeTimeBoxPositionRight', data => {
      // this.timeBoxRight = data;
      if (data === '14%') requestAnimationFrame(() => this.animationRight(0.5));
      else if (data === '-5%') requestAnimationFrame(() => this.animationRight(-0.5));
    });
  },
  mounted: function () {
    this._initMap(); //初始化地图

    this._loadGeoJsonData(); //加载geojson数据

    this._loadOverAllData(); //加载疫情概况数据

    //定时器：8秒后隐藏加载框
    let timer3 = setTimeout(() => {
      this._hideLoader2(); //隐藏加载状态
    }, 8000);
  },
  beforeDestroy() {
    emitter.off('changeTimeBoxPositionRight');
  },
  template: main_container_template
});
