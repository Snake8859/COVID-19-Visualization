let page_overlay_template = `
<div id="page_overlay">
    <div class="page-overlay">
        <h3 class="animated_text">Covid DataBoard Center</h3>
        <h2 class="title opacity0">
            疫情可视化中心
        </h2>
    </div>
</div>
`
    //全局注册组件
Vue.component('page-overlay', {
    data: function() {
        return {

        }
    },
    methods: {
        _initPageUI: function() {
            //字体定义样式定义
            var x = {
                size: 180,
                weight: 8,
                color: ["#E77826", "#f8f8f8", "#f8f8f8", "#f8f8f8", "#f8f8f8", "#f8f8f8", "#E77826", "#f8f8f8", "#f8f8f8", "#f8f8f8", "#f8f8f8", "#f8f8f8", "#f8f8f8", "#f8f8f8", "#f8f8f8", "#f8f8f8", "#E77826", "#f8f8f8", "#f8f8f8", "#f8f8f8", "#f8f8f8", "#f8f8f8", "#E77826", "#f8f8f8", "#f8f8f8", "#f8f8f8", "#f8f8f8", "#f8f8f8"],
                duration: 0.35,
                delay: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1, 2.2, 2.3, 2.4],
                fade: 0.35,
                individualDelays: true,
                easing: d3_ease.easeSinInOut.ease
            };
            var z = new Letters($(".animated_text")[0], x); //实例化字体展示对象
            z.show();
            //定时器：2.5秒后展示title和logo
            let timer1 = setTimeout(() => {
                $(".title").addClass("animated bounceIn");
                $(".logo-list").addClass("animated fadeInUp");
            }, 2500);
            // 1秒，暂停时间（观看时间）
            //定时器：3.5秒后隐藏欢迎界面
            let timer2 = setTimeout(() => {
                //隐藏欢迎界面
                !$(".page-overlay").hasClass("loaded") && $(".page-overlay").addClass("loaded");
                //加载状态logo
                this._showLoader2();
            }, 3500);
        },
        _showLoader2: function() { //显示加载logo2
            $(".page-overlay").html('<div class="loader-2"><div class="loading-container"><div class="img-div"><img src="./images/icons/loading.gif"></div></div></div>');
            !$(".page-overlay").hasClass("clear") && $(".page-overlay").addClass("clear");
            $(".page-overlay").hasClass("loaded") && $(".page-overlay").removeClass("loaded")
        },
    },
    mounted: function() {
        this._initPageUI()
    },
    template: page_overlay_template
})