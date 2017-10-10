define(['jquery','template','utils','uploadify','form','Jcrop'],function ($,template,utils,uploadify) {
  utils.setMenu('/course/course_add');
  var cs_id=utils.getUrl('cs_id');
  var flag=utils.getUrl('flag');
  //定义图片存储
  var newCrop=null;

  $.ajax({
    type:'get',
    url:'/api/course/picture',
    data:{
      cs_id:cs_id
    },
    dataType:'json',
    success:function (data) {
      if(data.code==200){
        if(flag){
          data.result.text='添加课程';
        }else{
          data.result.text='编辑课程';
        }
        console.log(data);
        var html=template('pictureList',data.result);
        $("#coursePicture").html(html);

        $("#pictureLoad").uploadify({
          swf:'/public/assets/uploadify/uploadify.swf',
          uploader:'/api/uploader/cover',
          fileObjName:'cs_cover_original',
          buttonText:'选择图片',
          itemTemplate:'<span></span>',
          formData:{
            cs_id:cs_id
          },
          buttonClass:'btn btn-success btn-sm',
          width:80,
          height:'auto',
          onUploadSuccess:function (a,b,c) {
            var imgObj=JSON.parse(b);
            //console.log(imgObj);
            $('.preview img').attr('src',imgObj.result.path);
            //直接执行图片裁剪
            imgJcrop($(".preview img"),'.thumb',$("#cropForm"));
            $("#pictureBtn").text('保存图片').attr('data-flag',1);
          }
        });

        $("#pictureBtn").click(function () {
          var flag=$(this).attr('data-flag');
          if(flag){
            $("#cropForm").ajaxSubmit({
              type:'post',
              url:'/api/course/update/picture',
              data:{
                cs_id:cs_id
              },
              dataType:'json',
              success:function (data) {
                console.log(data);
                if(data.code==200){
                  location.href='course_lesson?flag=1&cs_id='+data.result.cs_id;
                }
              }
            });
          }else{
            //第一次点击进入
            $(this).text('保存图片').attr('data-flag',1);
            //裁剪
            imgJcrop($(".preview img"),'.thumb',$("#cropForm"));
          }
        });

        function imgJcrop(img,ele,form) {
          img.Jcrop({
            aspectRatio:2
          },function () {
            //如果有保存的img对象，清除
            newCrop&&newCrop.destroy();
            //将新的img对象保存
            newCrop=this;

            $(ele).html('');//清除页面已经渲染的图片，不然就挡住了

            this.initComponent('Thumbnailer',{
              width:240,
              height:120,
              mythumb: ele
            });
            //定位选区初始位置
            var width=this.ui.stage.width;
            var height=this.ui.stage.height;
            var x=0;
            var y=(height-width/2)/2;
            var w=width;
            var h=width/2;
            //动态创建选区
            this.newSelection();
            this.setSelect([x,y,w,h]);

            //选框位置检测
            img.parent().on('cropstart cropmove cropend',function (a,b,c) {
              //console.log(c);
              var inputList=form.find('input');
              inputList.eq(0).val(c.x);
              inputList.eq(1).val(c.y);
              inputList.eq(2).val(c.w);
              inputList.eq(3).val(c.h);
            });

          });
        }

      }
    }
  });

});