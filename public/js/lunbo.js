$(".o-right").click(function () {
    // console.log(1);
    var i = parseInt($(".second-k").css("left"));
    console.log(i);
    if (i == 0) {
        $(".second-k").css("zIndex","2");
        $(".third-k").css("zIndex","3");
        $(".four-k").css("zIndex","2");
        $(".first-k").css("zIndex","1");
        $(".first-k").css("left", "1300px");
        $(".second-k").css("left", "-650px");
        $(".third-k").css("left", "0px");
        $(".four-k").css("left", "650px");
    } else if (i == 650) {
        $(".second-k").css("zIndex","3");
        $(".third-k").css("zIndex","2");
        $(".four-k").css("zIndex","1");
        $(".first-k").css("zIndex","2");
        $(".third-k").css("left", "650px");
        $(".first-k").css("left", "-650px");
        $(".second-k").css("left", "0px");
        $(".four-k").css("left", "1300px");
    } else if (i == -650) {
        $(".second-k").css("zIndex","1");
        $(".third-k").css("zIndex","2");
        $(".four-k").css("zIndex","3");
        $(".first-k").css("zIndex","2");
        $(".second-k").css("left", "1300px");
        $(".third-k").css("left", "-650px");
        $(".first-k").css("left", "650px");
        $(".four-k").css("left", "0px");
    }else if(i == 1300){
        $(".second-k").css("zIndex","2");
        $(".third-k").css("zIndex","1");
        $(".four-k").css("zIndex","2");
        $(".first-k").css("zIndex","3");
        $(".second-k").css("left", "650px");
        $(".third-k").css("left", "1300px");
        $(".first-k").css("left", "0px");
        $(".four-k").css("left", "-650px");
    }
})
$(".o-left").click(function () {
    // console.log(1);
    var i = parseInt($(".second-k").css("left"));
    if (i == 0) {
        $(".second-k").css("zIndex","2");
        $(".third-k").css("zIndex","2");
        $(".four-k").css("zIndex","1");
        $(".first-k").css("zIndex","3");
        $(".first-k").css("left", "0px");
        $(".second-k").css("left", "650px");
        $(".third-k").css("left", "1300px");
        $(".four-k").css("left", "-650px");
    }else if (i == 650) {
        $(".second-k").css("zIndex","2");
        $(".third-k").css("zIndex","1");
        $(".four-k").css("zIndex","3");
        $(".first-k").css("zIndex","2");
        $(".third-k").css("left", "-650px");
        $(".first-k").css("left", "650px");
        $(".second-k").css("left", "1300px");
        $(".four-k").css("left", "0px");
    } else if (i == -650) {
        $(".second-k").css("zIndex","3");
        $(".third-k").css("zIndex","2");
        $(".four-k").css("zIndex","2");
        $(".first-k").css("zIndex","1");
        $(".second-k").css("left", "0px");
        $(".third-k").css("left", "650px");
        $(".first-k").css("left", "-650px");
        $(".four-k").css("left", "1300px");
    }else if (i == 1300) {
        $(".second-k").css("zIndex","1");
        $(".third-k").css("zIndex","3");
        $(".four-k").css("zIndex","2");
        $(".first-k").css("zIndex","2");
        $(".second-k").css("left", "-650px");
        $(".third-k").css("left", "0px");
        $(".first-k").css("left", "1300px");
        $(".four-k").css("left", "650px");
    }
})