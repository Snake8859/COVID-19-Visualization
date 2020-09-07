let navbar_template = `
<div id = "navbar">
    <nav class="navbar navbar-glass navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="index.html">
                    <img alt="logo" src="./images/icons/logo_navbar.png">
                    <div class="navbar-title">
                        <span class="navbar-brand-text">
                            COVID-19疫情可视化平台
                        </span>
                        <span class="navbar-brand-subtext">
                            COVID-19 Visualization Platform
                        </span>
                    </div>
                </a>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-left">
                    <li class="date-line">
                        <div class="navbar-title">
                            <span class="navbar-brand-subtext" id="date">
                            {{date}}
                            </span>
                            <span class="navbar-brand-text" id="clock">
                                <span style="float:left">
                                    {{hour}}
                                </span>
                                <span id="online" style="width:16px; display:block; float:left">
                                    :
                                </span>
                                <span style="float:left">
                                    {{minute}}
                                </span>
                                <span id="online2" style="width:16px; display:block; float:left">
                                    :
                                </span>
                                <span style="float:left">
                                    {{second}}
                                </span>
                            </span>
                        </div>
                    </li>
                </ul>
                <!--对接高德地图天气API-->
                <ul class="nav navbar-nav navbar-right" id="exit">
                    <li id="weather">
                        <div class="dropdown-toggle" data-toggle="dropdown">
                            <div class="weatherdiv">
                                <div class="weatherdetail col-sm-10">
                                <p style="font-size:8px" id="todaytemper">
                                    当前位置：{{cname}}
                                </p>
                                <p style="font-size: 18px; margin-bottom:3px" id="todayweather">
                                    {{current_weather}}&nbsp{{current_temperature}}
                                </p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <!-- 按钮的分割线 -->
                        <li>
                            <div id="line">
                            </div>				
                        </li>

                    <li id="TOC">
                        <div class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                            <div class="tocdiv">
                                <div class="weatherdetail col-sm-12" style="font-size:25px;">
                                    <img style="width:34px;margin-left:18px;margin-top:9px" src="./images/icons/layer_list.png">
                                </div>
                            </div>
                        </div>

                        <ul class="dropdown-menu tocul" style="margin:0px">
                            <li>
                                <div id="mapcontent" class="mCustomScrollbar _mCS_1 mCS-autoHide mCS_no_scrollbar"
                                style="position: relative; overflow: visible;">
                                    <dl class="layer-list">
                                        <dt>
                                            世界各国疫情图层
                                            <input type="checkbox" class="pull-right iswitch iswitch-orange" title="打开/关闭图层"
                                            name=""
                                            v-model="worldStatus" @change="loadWorldCOVID19Layer(worldStatus)">
                                        </dt>
                                        <dt>
                                            中国各省份疫情图层
                                            <input type="checkbox" class="pull-right iswitch iswitch-orange" title="打开/关闭图层"
                                            name=""
                                            v-model="chinaStatus" @change="loadChinaCOVID19Layer(chinaStatus)">
                                        </dt>
                                        <dt>
                                            岳麓山人流密度图层
                                            <input type="checkbox" class="pull-right iswitch iswitch-orange" title="打开/关闭图层"
                                            name=""
                                            v-model="vFlowStatus" @change="loadYLSVisitorsFlowLayer(vFlowStatus)">
                                        </dt>
                                        <dt>
                                            杭州地铁客流预测图层
                                            <input type="checkbox" class="pull-right iswitch iswitch-orange" title="打开/关闭图层"
                                            name=""
                                            v-model="tFlowStatus" @change="loadHZSubwayFlowLayer(tFlowStatus)">
                                        </dt>
                                    </dl>
                                                
                                    <!--
                                    <div id="mCSB_1" class="mCustomScrollBox mCS-light-thin mCSB_vertical mCSB_outside"
                                    tabindex="0">
                                        <div id="mCSB_1_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y"
                                        style="position:relative; top:0; left:0;" dir="ltr">
                                            
                                        </div>
                                    </div>
                                    -->
                                    
                                </div>
                            </li>
                        </ul>
                    </li>

                    <!-- 按钮的分割线 -->
                        <li>
                            <div id="line">
                            </div>				
                        </li>
                    <li>
                        <a href="#">
                            <span class="glyphicon glyphicon-off" aria-hidden="true" @click="refresh()">
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</div>
`

//全局注册组件
Vue.component('navbar', {
    data: function() {
        return {
            date: '',
            hour: '',
            minute: '',
            second: '',
            cname: '',
            current_weather: '',
            current_temperature: '',
            worldStatus: false,
            chinaStatus: false,
            vFlowStatus: false,
            tFlowStatus: false
        }
    },
    methods: {
        //时间显示
        _showClock: function() {
            //1秒执行一次更新时间
            setInterval(() => {
                var w = new Date();
                var H = w.getFullYear();
                var G = w.getMonth() + 1;
                var z = w.getDate();
                var I = w.getDay();
                var C = w.getHours();
                var B = w.getMinutes();
                var x = w.getSeconds();
                var L = (G < 10) ? "0" + G : G;
                var J = (z < 10) ? "0" + z : z;
                var K = (C < 10) ? "0" + C : C;
                var D = (B < 10) ? "0" + B : B;
                var A = (x < 10) ? "0" + x : x;
                var F = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
                var y = K + " : " + D + " : " + A;
                var z = H + " " + L + " " + J + " " + F[I];

                this.date = z
                this.hour = K
                this.minute = D
                this.second = A
            }, 1000)
        },
        //初始化天气控件
        _initWeatherPart: function() {
            // console.log(returnCitySN);
            this.cname = returnCitySN.cname; //根据ip获取城市名称
            let cid = returnCitySN.cid; //根据ip获取城市编号
            axios.get('https://restapi.amap.com/v3/weather/weatherInfo?city=' + cid + '&key=daa4e1759839a0efc584e06f2d9d106e')
                .then((response) => {
                    // console.log(response);
                    this.current_weather = response.data.lives[0].weather;
                    this.current_temperature = response.data.lives[0].temperature + '°C';
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })
                .then(() => {
                    // always executed
                });
        },
        //页面刷新
        refresh: function() {
            location.reload();
        },
        //加载世界疫情图层
        loadWorldCOVID19Layer: function(status) {
            // console.log('加载世界疫情图层');
            // console.log(status);
            this.$parent.$children[1].$children[0].loadWorldColorLayer(status);
            if (!this.chinaStatus && !this.vFlowStatus && !this.tFlowStatus) { //若中国图层，岳麓山图层和杭州地铁图层已加载，就不必收缩，避免重复收缩
                //收缩数据栏
                // this.$parent.$children[1].$children[0].leftShrink();
                this.$parent.$children[1].$children[1].rightShrink();
                this.$parent.$children[1].$children[2].bottomShrink();
            }
        },
        //加载中国疫情图层
        loadChinaCOVID19Layer: function(status) {
            // console.log('加载中国疫情图层');
            this.$parent.$children[1].$children[1].loadChinaColorLayer(status);
            if (!this.worldStatus && !this.vFlowStatus && !this.tFlowStatus) { //若世界图层，岳麓山图层和杭州地铁图层已加载，就不必收缩，避免重复收缩
                //收缩数据栏
                this.$parent.$children[1].$children[0].leftShrink();
                // this.$parent.$children[1].$children[1].rightShrink();
                this.$parent.$children[1].$children[2].bottomShrink();
            }
        },
        //加载岳麓山人流量分布图层
        loadYLSVisitorsFlowLayer: function(status) {
            // console.log('加载岳麓山人流密度图层');
            this.$parent.$children[1]._loadPeopleAnalysis(status);
            if (!this.chinaStatus && !this.worldStatus && !this.tFlowStatus) { //若世界图层，中国图层和杭州地铁图层已加载，就不必收缩，避免重复收缩
                //收缩数据栏
                this.$parent.$children[1].$children[0].leftShrink();
                this.$parent.$children[1].$children[1].rightShrink();
                this.$parent.$children[1].$children[2].bottomShrink();
            }
        },
        //加载杭州地铁客流量分布图层
        loadHZSubwayFlowLayer: function(status) {
            // console.log('加载杭州客流图层');
            this.$parent.$children[1]._loadSubwayAnalysis(status);
            if (!this.chinaStatus && !this.worldStatus && !this.vFlowStatus) { //若世界图层，中国图层和岳麓山图层已加载，就不必收缩，避免重复收缩
                //收缩数据栏
                this.$parent.$children[1].$children[0].leftShrink();
                this.$parent.$children[1].$children[1].rightShrink();
                this.$parent.$children[1].$children[2].bottomShrink();
            }
        }
    },
    mounted: function() {
        this._showClock()
        this._initWeatherPart()
    },
    template: navbar_template
})