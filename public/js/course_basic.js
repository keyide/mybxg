define(['jquery','template','utils','form'],function ($,template,utils) {
  utils.setMenu('/course/course_add');

  var cs_id=utils.getUrl('cs_id');
  //console.log(cs_id);
  var flag=utils.getUrl('flag');
  $.ajax({
    type:'get',
    url:'/api/course/basic',
    data:{
      cs_id:cs_id
    },
    dataType:'json',
    success:function (data) {
      console.log(data);
      if(flag){
        data.result.text='添加课程';
      }else{
        data.result.text='编辑课程';
      }
      var html=template('courseBasic',data.result);
      $("#course_basic").html(html);
      
      $("#firstSelect").change(function () {
        var cg_id=$(this).val();
        console.log(cg_id);
        $.ajax({
          type:'get',
          url:'/api/category/child',
          data:{
            cg_id:cg_id
          },
          dataType:'json',
          success:function (data) {
            var tpl = '<option value="">请选择</option>' +
                      '{{ each result }}' +
                        '<option value="{{ $value.cg_id }}">{{ $value.cg_name }}</option>' +
                      '{{ /each }}';
            var html=template.render(tpl,data);
            $("#secondSelect").html(html);
          }
        });
      });

      $("#basicBtn").click(function () {
        $("#basicForm").ajaxSubmit({
          type:'post',
          url:'/api/course/update/basic',
          data:{
            cs_id:cs_id
          },
          dataType:'json',
          success:function (data) {
            if(data.code==200){
              location.href="course_picture?flag=1&cs_id="+data.result.cs_id;
            }
          }
        });
      });
    }
  });

});