NProgress.start();

NProgress.done();

$('.navs ul').prev('a').on('click', function () {
  $(this).next().slideToggle();
});

$("#loginOut").on('click', function () {
  $.ajax({
    type: 'post',
    url: '/api/logout',
    dataType: 'json',
    success: function (data) {
      console.log("111");
      if (data.code == 200) {
        location.href = 'login';
      }
    }
  });
});

var flag=$.cookie('PHPSESSID');
if(!flag && (location.pathname != '/main/login')){
  location.href='login';
}
var loginInfo=$.cookie('loginInfo');
loginInfo= loginInfo&&JSON.parse(loginInfo);
var userName=loginInfo.tc_name;
var imgSrc=loginInfo.tc_avatar;
//console.log(userName);
//console.log(imgSrc);
$(".profile >h4").html(userName);
$("#imgRander").attr('src',imgSrc);

