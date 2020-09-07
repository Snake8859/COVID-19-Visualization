let bottombar_template = `
<div id="BottomBar" class="bottomBar opacity0">
    <div class="bar-content-bottom" id="bottomContent">
            <div class="bottom-left" id="bottomLeftPart">
                <ul >
                    <li v-for="news in news_list">
                        <a :href = "news.sourceUrl" target="_blank">
                            <div class="bottom-item">
                                <div>
                                    <img src="images/icons/news.png">
                                </div>
                                <div class="bottom-item-info">
                                    <p>
                                        {{news.pubDate}}
                                    </p>
                                    <p>
                                        {{news.infoSource}}：{{news.title}}
                                    </p>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>

            <div class="bottom-right" id="bottomRightPart">
                <ul >
                    <li  v-for="rumor in rumor_list">
                        <div class="bottom-item" @click="showRumorBody(rumor)">
                            <div>
                                <img src="images/icons/rumor.png">
                            </div>

                            <div class="bottom-item-info">
                                <p>
                                    {{rumor.title}}
                                </p>
                                <p>
                                    {{rumor.mainSummary}}
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
    </div>
    <span id="bottomClickSpan" class="glyphicon glyphicon-option-horizontal opration-handler"
    aria-hidden="true" @click="bottomShrink">
    </span>
</div>
`

//全局注册异步组件
Vue.component('bottombar', function(resolve, reject) {

    //定时器6秒后加载底部组件
    let timer8 = setTimeout(function() {
        //向 `resolve` 回调传递组件定义
        resolve({
            data: function() {
                return {
                    news_list: [],
                    rumor_list: [],
                    //底部收缩标识
                    clickBottomCount: 0
                }
            },
            methods: {
                //初始化底部数据栏
                _initBottomBar: function() {
                    this._realTimeNews();
                    this._realTimeRumor();

                    //原始数据接口 频率要求
                    // let timer9 = setTimeout(() => { //7.5秒后再请求，防止频繁请求接口
                    //     this._realTimeRumor();
                    // }, 1500);
                },
                //实时新闻展示：1小时时间间隔
                _realTimeNews: function() {
                    // axios.get(configOptions.COVID.newsData) //【原始数据接口】
                    axios.get(configOptions.MyService.newsData) //【自行数据接口】
                        .then((response) => {
                            // handle success
                            let news_list = response.data.results;
                            for (index in news_list) {
                                // console.log(news_list[index]);
                                news = news_list[index];
                                //时间戳转时间
                                news.pubDate = this._transformTime(parseInt(news.pubDate));
                            }
                            this.news_list = news_list;
                            this.$nextTick(() => { //确保li内数据渲染完成，再调用vTicker。否则获取不到li节点内容
                                // 在这里面去获取DOM
                                // console.log($('#bottomLeftPart').html())
                                $('#bottomLeftPart').vTicker({
                                    speed: 500, //滚动速度，单位毫秒。
                                    pause: 3000, //暂停时间，就是滚动一条之后停留的时间，单位毫秒。
                                    showItems: 1, //显示内容的条数。
                                    animation: 'fade', //动画效果，默认是fade，淡出。
                                    mousePause: true, //鼠标移动到内容上是否暂停滚动，默认为true。
                                    height: 350, //滚动内容的高度。
                                    direction: 'up' //滚动的方向，默认为up向上，down则为向下滚动。
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
                //实时谣言展示
                _realTimeRumor: function() {
                    // axios.get(configOptions.COVID.rumorData) //【原始数据接口】
                    axios.get(configOptions.MyService.rumorData) //【自行数据接口】
                        .then((response) => {
                            // console.log('==底部范围==')
                            // console.log(response);
                            this.rumor_list = response.data.results;
                            this.$nextTick(() => { //确保li内数据渲染完成，再调用vTicker。否则获取不到li节点内容
                                // 在这里面去获取DOM
                                // console.log($('#bottomLeftPart').html())
                                $('#bottomRightPart').vTicker({
                                    speed: 500, //滚动速度，单位毫秒。
                                    pause: 3000, //暂停时间，就是滚动一条之后停留的时间，单位毫秒。
                                    showItems: 1, //显示内容的条数。
                                    animation: 'fade', //动画效果，默认是fade，淡出。
                                    mousePause: true, //鼠标移动到内容上是否暂停滚动，默认为true。
                                    height: 350, //滚动内容的高度。
                                    direction: 'up' //滚动的方向，默认为up向上，down则为向下滚动。
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
                //跳转新闻来源
                // toNewSource: function(news) {
                //     // console.log('新闻跳转');
                //     sourceUrl = news.sourceUrl; //获取url
                //     window.open(sourceUrl, '_blank'); //跳转新页面
                // },
                //显示谣言主体内容
                showRumorBody: function(rumor) {
                    // console.log('谣言弹框');
                    //暂时使用简单的弹窗实现
                    alert(rumor.body);
                },
                //时间戳转时间
                _transformTime: function(timestamp) {
                    if (timestamp != undefined) {
                        var time = new Date(timestamp);
                        var y = time.getFullYear();
                        var M = time.getMonth() + 1;
                        var d = time.getDate();
                        var h = time.getHours();
                        var m = time.getMinutes();
                        var s = time.getSeconds();
                        return y + '-' + this._addZero(M) + '-' + this._addZero(d) + ' ' + this._addZero(h) + ':' +
                            this._addZero(m) + ':' + this._addZero(s);
                    } else {
                        return '';
                    }
                },
                //时间加0
                _addZero: function(m) {
                    return m < 10 ? '0' + m : m;
                },
                bottomShrink: function() {
                    var bottomheight = $('#BottomBar').height()
                    if (this.clickBottomCount % 2 == 0) {
                        $('#BottomBar').css('bottom', 15 - bottomheight);
                        this.clickBottomCount++;
                    } else {
                        $('#BottomBar').css('bottom', 0);
                        this.clickBottomCount++;
                    }
                    $(window).trigger('resize');
                }
            },
            mounted: function() {
                //显示底部数据栏
                $(".bottomBar").removeClass("opacity0").removeClass("fadeOutDown").addClass("animated fadeInUp");
                //初始化底部数据栏
                this._initBottomBar();
            },
            template: bottombar_template
        })
    }, 6000)

})