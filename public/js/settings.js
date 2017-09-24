define(['jquery','template','uploadify','region'],function ($,template,uploadify) {
  $.ajax({
    type:'get',
    url:'/api/teacher/profile',
    dataType:'json',
    success:function (data) {
      if(data.code==200){
        var html=template('settings',data.result);
        $(".settings").html(html);

        $("#upfile").uploadify({
          swf:'/public/assets/uploadify/uploadify.swf',
          uploader:'/api/uploader/avatar',
          fileObjName:'tc_avatar',
          width:120,
          height:120,
          buttonText:"",
          onUploadSuccess:function (file,data,response) {
            var imgObj=JSON.parse(data);

            var html='<img src="'+imgObj.result.path+'">';
            console.log(html);
            $(".preview").html(html);
          }
        });
        
        $("#pcd").region({
          url:'/public/assets/jquery-region/region.json'
        });
      }
    }
  });
});
