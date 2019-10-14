//轮播图
window.onload = function() {
    var list = document.getElementById('list');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');

    //手动切换箭头效果
    function animate(offset) {
        //获取的是style.left，是相对左边获取距离，所以第一张图后style.left都为负值，
        //且style.left获取的是字符串，需要用parseInt()取整转化为数字。
        var newLeft = parseInt(list.style.left) + offset;
        list.style.left = newLeft + 'px';
        //判断偏移量
        if(newLeft<-4000){
            list.style.left = -1000 + 'px';
        }
        if(newLeft>-1000){
            list.style.left = -4000 + 'px';
        }
    }
    prev.onclick = function() {
        animate(1000);
    }
    next.onclick = function() {
        animate(-1000);
    }

    //setInterval()定时器
    var timer;
    function play() {
        timer = setInterval(function () {
            next.onclick();//将轮播图换成向右切换图片
            //prev.onclick();//将轮播图换成向左切换图片
        }, 2000)//切换时间
    }
    play();

    //获取整个轮播图区域
    var banner = document.getElementById('banner');
    function stop() {
        clearInterval(timer);
    }
    banner.onmouseover = stop;
    banner.onmouseout = play;

    //小圆点
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var index = 1;
    function buttonsShow() {
        //这里需要清除之前的样式
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == 'on') {
                buttons[i].className = '';
            }
        }
        //数组从0开始，故index需要-1
        buttons[index - 1].className = 'on';
    }
    prev.onclick = function() {
        index -= 1;
        if (index < 1) {
            index = 4;
        }
        buttonsShow();
        animate(1000);
    }
    next.onclick = function() {
        //由于上边定时器的作用，index会一直递增下去，我们只有5个小圆点，所以需要做出判断
        index += 1;
        if (index > 5) {
            index = 1;
        }
        buttonsShow();
        animate(-1000);
    }

    for (var i = 0; i < buttons.length; i++) {
        // 这里使用的是立即执行函数，
        (function(i) {
            buttons[i].onclick = function() {
                console.log(i);
                /* 偏移量获取：这里获得鼠标移动到小圆点的位置，用this把index绑定到对象buttons[i]上，去谷歌this的用法  */
                /* 由于这里的index是自定义属性，需要用到getAttribute()这个DOM2级方法，去获取自定义index的属性*/
                var clickIndex = parseInt(this.getAttribute('index'));
                var offset = 1000 * (index - clickIndex);
                animate(offset);//存放鼠标点击后的位置，用于小圆点的正常显示
                index = clickIndex;
                buttonsShow();
            }
        })(i)
    }
}
