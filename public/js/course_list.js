define(['jquery', 'template'], function ($, template) {
  $.ajax({
    type: 'get',
    url: '/api/course',
    datatype: 'json',
    success: function (data) {
      console.log(data.result);
      var html=template('courseList',data);
      $("#course_list").html(html);
    }
  });
});