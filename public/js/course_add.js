define(['jquery','template','form'],function ($,template) {

  $('#courseBtn').click(function () {
    $('#courseForm').ajaxSubmit({
      type:'post',
      url:'/api/course/create',
      dataType:'json',
      success:function (data) {
        console.log(data);
        location.href='course_basic?flag=1&cs_id='+data.result.cs_id;
      }
    });
  });
});