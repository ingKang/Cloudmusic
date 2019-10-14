 // 保存元素
 var $carousel = $("#carousel");
 // 获取li们
 var $imgLis = $("#carousel .imgs ul li");
 // 获取小圆点们
 var $circles = $("#circles ol li");
 var $leftBtn = $("#leftBtn");
 var $rightBtn = $("#rightBtn");
 // 数量
 var amount = $circles.length;
 // console.log(amount);


 // 定时器
 var timer = setInterval(rightBtnFun, 3000);
 // 鼠标进入carousel 停止
 $carousel.mouseenter(function() {
     // 停止timer
     clearInterval(timer);
 });
 // 鼠标离开重新开启
 $carousel.mouseleave(function() {
     // 设表先关
     clearInterval(timer);
     // 重新开启
     timer = setInterval(rightBtnFun, 3000);
 });


 // 信号量
 var idx = 0;
 // 右按钮点击事件
 // 左右按钮防流氓 图片不运动才接收新任务
 // 可以将匿名函数提取 将函数名书写在小括号
 $rightBtn.click(rightBtnFun);
 // rightBtnFun();
 // 声明右按钮点击事件
 function rightBtnFun() {
     // 图片在运动，什么事情都不做
     if ($imgLis.is(":animated")) {
         return;
     }
     // 图片不运动，才会执行这些语句
     // 老图消失
     $imgLis.eq(idx).fadeOut(800);
     // 信号量改变
     idx++;
     // 验证
     if (idx > amount - 1) {
         idx = 0;
     }
     // 新图淡入
     $imgLis.eq(idx).fadeIn(1000);
     // 小圆点改变
     $circles.eq(idx).addClass("cur").siblings().removeClass("cur");
 }

 console.log(idx);
 // 左按钮点击事件
 $leftBtn.click(function() {
     // 图片在不运动才接收新任务
     if (!$imgLis.is(":animated")) {
         // 老图淡入
         $imgLis.eq(idx).fadeOut(800);
         // 信号量改变
         idx--;
         if (idx < 0) {
             idx = amount - 1;
         }
         // 新图淡入
         $imgLis.eq(idx).fadeIn(1000);
         // 小圆点改变
         $circles.eq(idx).addClass("cur").siblings().removeClass("cur");
     }
 });
 console.log(idx);


 // 小圆点鼠标进入事件
 // 防流氓 立即触发
 $circles.mouseenter(function() {
     // 老图淡出
     $imgLis.eq(idx).stop(true).fadeOut(800);
     // 信号量改变 $(this)触发 的小圆点
     idx = $(this).index();
     // 新图淡入 stop()方法停止当前动画
     $imgLis.eq(idx).stop(true).fadeIn(1000);
     // 小圆点改变
     $(this).addClass("cur").siblings().removeClass("cur");
 });

 $("tr:even td").css("backgroundColor", "white");
 // console.log($("tr:odd"));
 $("ul.middle li").click(function(e) {
     e.preventDefault();
     $("ul.middle li").css("backgroundColor", "#c20c0c");
     $(this).css("backgroundColor", "#820909");
     var i = parseInt($(this).attr("index"));
     $("div.big>div").css("display", "none");
     $(`div.big>div:nth-child(${i})`).css("display", "block");
 })