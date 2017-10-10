define(['jquery','template','utils','datepicker','language','validate','form'],function ($,template,utils) {

  utils.setMenu('/teacher/teacher_list');
  //console.log(location.pathname);

  console.log(utils.getUrl("tc_id"));
  var tc_id=utils.getUrl("tc_id");
  //console.log(tc_id);
  if(tc_id){
    $.ajax({
      type:'get',
      url:'/api/teacher/edit',
      data:{
        tc_id:tc_id
      },
      dataType:'json',
      success:function (data) {
        data.result.titleBar='讲师编辑';
        console.log(data);
        var html=template('teacherAdd',data.result);
        $("#teacherBar").html(html);

        submitForm('/api/teacher/update');
      }
    });
  }else {
    var html=template('teacherAdd',{titleBar:'讲师添加'});
    $("#teacherBar").html(html);
    submitForm('/api/teacher/add');
  }

  /*function submitForm(url) {
    $("#addBtn").click(function () {
      $.ajax({
        type:'post',
        url:url,
        data:$("#teacherAddForm").serialize(),
        dataType:'json',
        success:function (data) {
          if(data.code==200){
            //console.log(data);
            location.href='/teacher/teacher_list';
          }
        }
      });
    });
  }*/


  function submitForm(url) {
    $("#teacherAddForm").validate({
      sendForm:false, // 限制默认提交刷新
      valid:function () {
        $(this).ajaxSubmit({
          url:url,
          dataType:'json',
          success:function (data) {
            if(data.code==200){
              //console.log(data);
              location.href='/teacher/teacher_list';
            }
          }
        });
      },
      description:{
        tcName:{
          required:'用户名不能为空'
        },
        tcPass:{
          required:'密码不能为空',
          pattern:'必须是六位数字'
        },
        tcJoinData:{
          required:'日期不能为空'
        }
        // tcGender:{
        //   required:'性别不能为空'
        // }
      }
    });
  }

});
