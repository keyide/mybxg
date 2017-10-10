define(['jquery'],function ($) {

  return {
    //获取url数据
    getUrl:function (key) { // location.search = '?tc_id=2&abc=123'
      var one=location.search.substr(1); //tc_id=2&abc=123
      if(one){
        var two=one.split("&"); // ["tc_id=2","abc=123"]
        var res=null;
        two.forEach(function (item,i) {
          var val=item.split("="); // ["tc_id","2"]
          if(key==val[0]){
            res=val[1];
            return false; // 跳出forEach
          }
        });
        return res;
      }
    },
    setMenu:function (k) {
      $(".aside .navs a[href='"+k+"']").addClass('active').closest('ul').show();
    }

  };





});