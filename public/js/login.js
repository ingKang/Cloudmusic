$(function() {
        // console.log(document.cookie)
        // console.log(getCookie('phone'), getCookie('password'), getCookie('checked'));
        function getCookie(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg)) {
                return arr[2];
            } else {
                return null;
            }
        }
        if (getCookie('checked') == 'true') {
            $('#check').prop('checked', true);
            $('#user-phone').val(getCookie('phone'));
            $('#user-password').val(getCookie('password'));
        } else {
            $('#check').prop('checked', false);
            $('#user-phone').val('');
            $('#user-password').val('');
        }

    })
    //close   
$('header>span:last-child').click(function() {
    $('#login-box').hide();
    $('#modal').hide();
    //只有脚本打开的窗口才可以使用close关闭
})


//地区选择
$('section a:first').click(function(e) {
    e.stopPropagation();
    $('section ul').slideToggle();
})
$('#login-box').click(function() {
    $('section ul').hide()
})
$('.area-country>li').click(function() {
        var str = $(this).children('span:nth-child(2)').text();
        $('section a>span:first-child').text(str);
    })
    //login
    //输入验证 
var reg1 = /^1[345789]\d{9}$/;
var reg2 = /^[\d\w]{6,16}$/;
$('#user-phone,#user-password').blur(function() {
        var phone = $('#user-phone').val();
        var password = $('#user-password').val();
        if (phone == '') {
            $('.tip').show().text('请输入手机号');
        } else if (password == '') {
            $('.tip').show().text('请输入密码');
        } else if (!reg1.test(phone)) {
            $('.tip').show().text('手机号有误哦>_<，请重新输入');
        } else if (!reg2.test(password)) {
            $('.tip').show().text('密码为6-16位数字和字母组成');
        } else {
            $('.tip').hide();
        }
    })
    // $('#user-password').blur(function() {
    //     var phone = $('#user-phone').val();
    //     var password = $('#user-password').val();
    //     if (!reg2.test(password)) {
    //         $('.tip').show().text('密码为6-16位数字和字母组成')
    //     } else if (!reg1.test(phone)) {
    //         $('.tip').text('手机号有误哦>_<，请重新输入')
    //     } else {
    //         $('.tip').hide()
    //     }
    // })


//登录验证
$('section>button').click(function() {
    var phone = $('#user-phone').val();
    var password = $('#user-password').val();
    var completePhone = $('section a>span:first-child').text() + $('#user-phone').val();
    //符合标准则发送请求
    if (reg1.test(phone) && reg2.test(password)) {
        $.ajax({
            type: 'post',
            url: '/user/login',
            // cache: false,
            data: {
                phone: completePhone,
                password: password
            },
            success: function(res) {
                // console.log(res.name);
                var name = res.name;
                $('.tip').show();
                //存在该用户则跳转主页
                if (res.data == 1) {
                    $('.tip').text(res.msg);
                    // 设置cookies
                    function setCookie(name, value, day) {
                        var Days = day;
                        var date = new Date();
                        date.setTime(date.getTime() + Days * 24 * 60 * 60 * 1000);
                        document.cookie = name + "=" + escape(value) + ";expires=" + date.toGMTString();
                    }
                    if ($('#check').prop('checked') == true) {
                        setCookie('phone', phone, 7);
                        setCookie('password', password, 7);
                        setCookie('checked', $('#check').prop('checked'), 7)
                    } else {
                        setCookie('checked', $('check').prop('checked'), -1)
                    }
                    // window.open('http://localhost:3000/cloudmusic.html', '_self')
                    //登录成功则隐藏并将name替换左上角登录,同时modal打开
                    $('#login-box,#modal').hide();
                    $('#user-phone,#user-password').val('');
                    $('.tip').text('')
                    $('.denglu').html(`<p>您好！${name}</p>`)

                } else if (res.data == -1) {
                    $('.tip').text(res.msg)
                } else {
                    $('.tip').text(res.msg)
                }
            }
        })
    } else if (phone == '') {
        $('.tip').text('请输入手机号')
    } else if (password == '') {
        $('.tip').text('请输入密码')
    }
})


// 注册验证
$('footer>span').click(function() {
    $('aside').fadeIn(1000);
    $('footer>p').show();
    $('footer>span').hide();
})
$('footer>p').click(function() {
    $('aside').fadeOut(1000);
    $('footer>p').hide();
    $('footer>span').show();
    $('#user-phone,#user-password').val('');
    $('.tip').text('')
})
var reg = /.{2,6}/
var regp = /^\+(86|852|853|886|1|44|33|81|82){1}1[345789]\d{9}$/
$('aside>button').click(function() {
    var register_name = $('aside>input:nth-child(3)').val();
    var register_phone = $('aside>input:nth-child(6)').val();
    var register_password = $('aside>input:nth-child(9)').val();
    // console.log(register_name, register_phone, register_password)
    if (regp.test(register_phone) && reg2.test(register_password) && reg.test(register_name)) {
        $.ajax({
            type: 'post',
            url: '/user/register',
            data: {
                name: register_name,
                phone: register_phone,
                password: register_password
            },
            success: (res) => {
                $('#register_tip').show().html(`<h4>${res.msg}</h4>`);
                if (res.data == 1) {
                    setTimeout(function() {
                        $('aside input').val('');
                        $('#register_tip').hide();
                        $('aside').hide();
                        $('footer>p').hide();
                        $('footer>span').show();
                    }, 600)
                }

            }
        })
    } else if (!reg.test(register_name)) {
        $('#register_tip').show().html('<h4>name为2-6位任意字符</h4>');
        $('aside>input:nth-child(3)')[0].focus();
    } else if (!regp.test(register_phone)) {
        $('#register_tip').show().html('<h4>账号格式：+地区号+手机号</h4>');
        $('aside>input:nth-child(6)')[0].focus();
    } else {
        $('#register_tip').show().html('<h4>密码为6-16位数字和字母组成</h4>');
        $('aside>input:nth-child(9)')[0].focus();
    }
})

$('footer>p').click(function() {
    $('aside').fadeOut(1000);
    $('footer>p').hide();
    $('footer>span').show();
    $('#user-phone,#user-password').val('');
    $('.tip').text('')
})
var reg = /.{2,6}/
var regp = /^\+(86|852|853|1|44|33|81|82){1}1[345789]\d{9}$/
$('aside>button').click(function() {
    var register_name = $('aside>input:nth-child(3)').val();
    var register_phone = $('aside>input:nth-child(6)').val();
    var register_password = $('aside>input:nth-child(9)').val();
    // console.log(register_name, register_phone, register_password)
    if (regp.test(register_phone) && reg2.test(register_password) && reg.test(register_name)) {
        $.ajax({
            type: 'post',
            url: '/user/register',
            data: {
                name: register_name,
                phone: register_phone,
                password: register_password
            },
            success: (res) => {
                $('#register_tip').show().html(`<h4>${res.msg}</h4>`);
                if (res.data == 1) {
                    setTimeout(function() {
                        $('aside input').val('');
                        $('#register_tip').hide();
                        $('aside').hide();
                        $('footer>p').hide();
                        $('footer>span').show();
                    }, 600)
                }

            }
        })
    } else if (!reg.test(register_name)) {
        $('#register_tip').show().html('<h4>name为2-6位任意字符</h4>');
        $('aside>input:nth-child(3)')[0].focus();
    } else if (!regp.test(register_phone)) {
        $('#register_tip').show().html('<h4>账号格式：+地区号+手机号</h4>');
        $('aside>input:nth-child(6)')[0].focus();
    } else {
        $('#register_tip').show().html('<h4>密码为6-16位数字和字母组成</h4>');
        $('aside>input:nth-child(9)')[0].focus();
    }
})


//主页操作
$('a').click(function(e) {
    e.preventDefault();
})


$('.denglu').click(() => {
    $('#login-box').show();
    $('#modal').show();
    $('.area-country').scroll((e) => {
        // alert('aa')
        e.stopPropagation();
        // $('html').scrollTop(0);
    })
})