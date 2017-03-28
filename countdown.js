//倒计时总时间，根据需求定
var cookieTimes = 60;
$(document).ready(function() {
    // 实际开发环境中是在向后台获取验证码成功后触发
    $('#code').click(function() {
        //点击获取验证码设置cookie
        var phoNum = $('#phone-num').val();
        $.cookie('timecount', cookieTimes, { path: '/' }); //设置倒计时
        $.cookie('phoneNum', phoNum, { path: '/' }); //记录用户手机号
        $.cookie('timejump', (Date.parse(new Date())) / 1000, { path: '/' });
        countDown('timecount', '#code');
    });

});

// 刷新页面或者页面调转回来后依然进行倒计时
if (typeof $.cookie('timecount') === 'undefined' || typeof $.cookie('phoneNum') === 'undefined' || parseInt($.cookie('timecount')) === 0) {
    $('#phone-num').val('');
} else {
    countDown('timecount', '#code');
    var phonum = $.cookie('phoneNum');
    $('#phone-num').val('phonum');
}


//获取验证码方法封装
function countDown(cookieTime, target) {
    var waitTime = parseInt($.cookie(cookieTime));
    var waitTarget = $(target);
    currentTime = parseInt((Date.parse(new Date())) / 1000);
    var timeJump = parseInt($.cookie('timejump'));
    // 解决页面跳转出去或者关闭倒计时暂定问题，正常情况下diffTime每秒减一，页面跳转出去的就是减去中间间隔时间
    diffTime = currentTime - timeJump;
    if (!isNaN(waitTime) && waitTime > 0 && diffTime <= cookieTimes) {
        waitTime = cookieTimes - diffTime;
        waitTarget.css('background', '#c7c3c3').val(waitTime + '秒后重新获取').attr('disabled', 'true');
        var timer = setTimeout(function() {
            countDown(cookieTime, target);
        }, 1000);
    } else {
        waitTarget.css('background', '#ffab2f').val('获取验证码').removeAttr('disabled');
        clearTimeout(timer);
        return;
    }

}
