define(['jquery','template','uploadify','cdeditor','region','datepicker','language','validate','form'],function ($,template,uploadify,CKEDITOR) {
  $.ajax({
    type:'get',
    url:'/api/teacher/profile',
    dataType:'json',
    success:function (data) {
      if(data.code==200){
        console.log(data);
        var html=template('settings',data.result);
        $(".settings").html(html);

        $("#upfile").uploadify({
          swf:'/public/assets/uploadify/uploadify.swf',
          uploader:'/api/uploader/avatar',
          fileObjName:'tc_avatar',
          width:120,
          height:120,
          buttonText:'',
          itemTemplate:'<span></span>',
          onUploadSuccess:function (file,data,response) {
            var imgObj=JSON.parse(data);

            // var html='<img src="'+imgObj.result.path+'">';
            // console.log(html);
            // $(".preview").html(html);

            $(".preview img").attr('src',imgObj.result.path);

          }
        });
        
        $("#pcd").region({
          url:'/public/assets/jquery-region/region.json'
        });

        CKEDITOR.replace('ckeditor');

        $("#settingForm").validate({
          sendForm:false, // 限制默认提交刷新
          valid:function () {
            var p=$("#p").find('option:selected').text();
            var c=$("#c").find('option:selected').text();
            var d=$("#d").find('option:selected').text();
            var hometown=p+'|'+c+'|'+d;
            console.log(hometown);

            for(var instance in CKEDITOR.instances){
              CKEDITOR.instances[instance].updateElement();
            }

            $(this).ajaxSubmit({
              type:'post',
              url:'/api/teacher/modify',
              data:{'tc_hometown':hometown},
              dataType:'json',
              success:function (data) {
                console.log(data);
                location.reload();
              }
            });
          }
        });

      }
    }
  });
});
