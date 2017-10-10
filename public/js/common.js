define(['jquery','utils','cookie'],function ($,utils) {
  //NProgress.start();
  //NProgress.done();

  console.log(location.pathname);
  utils.setMenu(location.pathname);

  //控制左侧菜单的折叠和展开
  $('.navs ul').prev('a').on('click', function () {
    $(this).next().slideToggle();
  });

  //退出功能
  $("#loginOut").on('click', function () {
    $.ajax({
      type: 'post',
      url: '/api/logout',
      dataType: 'json',
      success: function (data) {
        console.log("111");
        if (data.code == 200) {
          //$.removeCookie('PHPSESSID');
          location.href = '/login';
        }
      }
    });
  });

  //验证登录信息
  var flag=$.cookie('PHPSESSID');
  //console.log(location.pathname);
  if(!flag && (location.pathname != '/main/login')){
    location.href='/main/login';
  }

  //头部渲染
  var loginInfo=$.cookie('loginInfo');
  loginInfo= loginInfo&&JSON.parse(loginInfo);
  var userName=loginInfo.tc_name;
  var imgSrc=loginInfo.tc_avatar;
  //console.log(userName);
  //console.log(imgSrc);
  $(".profile >h4").html(userName);
  $("#imgRander").attr('src',imgSrc);


  //  遮罩层效果
  $(document).ajaxStart(function () {
    $(".overlay").show();
  });
  $(document).ajaxStop(function () {
    setTimeout(function () {
      $(".overlay").hide();
    }, 200);
  });

});






