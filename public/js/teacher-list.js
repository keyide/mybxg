define(['jquery','template','utils','bootstrap'],function ($,template,utils) {

  utils.setMenu(location.pathname);

  $.ajax({
    type:'get',
    url:'/api/teacher',
    dataType:'json',
    success:function (data) {
      var html=template('teacherList',data);
      $("#teacher-list").html(html);

      $(".onOff").on('click',function () {
        var that=$(this);
        var tc_id=that.closest('td').attr('data-id');
        var tc_status=that.closest('td').attr('data-status');
        //console.log(tc_id);
        //console.log(tc_status);
        $.ajax({
          type:'post',
          url:'/api/teacher/handle',
          data:{
            tc_id:tc_id,
            tc_status:tc_status
          },
          dataType:'json',
          success:function (data) {
            console.log(data.result.tc_status);
            if(data.result.tc_status==1){
              that.html('注销');
            }else{
              that.html('启用');
            }
            that.closest('td').attr('data-status',data.result.tc_status);
          }
        });
      });

      $(".searchBar").on('click',function () {
        var that=$(this);
        var tc_id=that.closest('td').attr('data-id');
        $.ajax({
          type:'get',
          url:'/api/teacher/view',
          data:{tc_id:tc_id},
          dataType:'json',
          success:function (data) {
            if(data.code==200){
              var html=template('teacherBar',data.result);
              $('#teacherModal').html(html);

              $('#teacherModal').modal();  //弹窗
            }
          }
        });

      });
    }
  });



});