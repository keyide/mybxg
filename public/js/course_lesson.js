define(['jquery', 'template','utils','form','bootstrap'], function ($, template,utils) {
  utils.setMenu('/course/course_add');
  var cs_id=utils.getUrl('cs_id');
  var flag=utils.getUrl('flag');

  $.ajax({
    type:'get',
    url:'/api/course/lesson',
    data:{
      cs_id:cs_id
    },
    dataType:'json',
    success:function (data) {
      if(data.code==200) {
        if (flag) {
          data.result.text = '添加课程';
        } else {
          data.result.text = '编辑课程';
        }
        console.log(data);
        var html = template('courseLesson', data.result);
        $("#course_lesson").html(html);

        $(".lessonChange").click(function () {
          var ct_id=$(this).attr('data-id');
          //console.log(ct_id);
          $.ajax({
            type:'get',
            url:'/api/course/chapter/edit',
            data:{
              ct_id:ct_id
            },
            dataType:'json',
            success:function (data) {
              if(data.code==200){
                data.result.text = '编辑课程';
                console.log(data);
                var html=template('lessonBar',data.result);
                $("#chapterModal").html(html);

                $("#saveBtn").click(function () {
                  $("#lessonFoem").ajaxSubmit({
                    type:'post',
                    url:'/api/course/chapter/modify',
                    data:{
                      ct_id:ct_id
                    },
                    dataType:'json',
                    success:function (data) {
                      if(data.code==200){
                        location.reload();
                      }
                    }
                  });
                });
              }
            }
          });

          $("#chapterModal").modal('show');
        });

        $("#lessonAdd").click(function () {
          var html=template('lessonBar',data.result);
          $("#chapterModal").html(html).modal('show');

          $("#saveBtn").click(function () {
            $("#lessonFoem").ajaxSubmit({
              type:'post',
              url:'/api/course/chapter/add',
              data:{
                ct_cs_id:cs_id
              },
              dataType:'json',
              success:function (data) {
                if(data.code==200){
                  console.log(data);
                  location.reload();
                }
              }
            });
          });
        });
      }
    }
  });
});