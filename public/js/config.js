require.config({
  baseUrl: '/public/assets',
  paths: {
    jquery:'jquery/jquery.min',
    bootstrap:'bootstrap/js/bootstrap',
    //nprogress:'nprogress/nprogress.js',
    cookie:'jquery-cookie/jquery.cookie',
    template:'template/template-web',
    datepicker:'bootstrap-datepicker/js/bootstrap-datepicker',
    language:'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
    validate:'validate-master/jquery-validate',
    form:'form-master/jquery.form',
    uploadify:'uploadify/jquery.uploadify.min',
    cdeditor:'ckeditor/ckeditor',
    region:'jquery-region/jquery.region',
    Jcrop:'Jcrop/js/Jcrop',
    common:'../js/common',
    //login:'../js/login',
    index:'../js/index',
    teacherList:'../js/teacher-list',
    teacherAdd:'../js/teacher-add',
    utils:'../js/utils',
    settings:'../js/settings',
    courseList:'../js/course_list',
    courseAdd:'../js/course_add',
    courseBasic:'../js/course_basic',
    coursePicture:'../js/course_picture',
    courseLesson:'../js/course_lesson',
    echarts:'echarts/echarts.min'
  },
  shim: {
    bootstrap:{
      deps : ['jquery']
    },
    language:{
      deps : ['jquery','datepicker']
    },
    validate:{
      deps : ['jquery']
    },
    form:{
      deps : ['jquery']
    },
    uploadify:{
      deps : ['jquery']
    },
    region:{
      deps : ['jquery']
    },
    cdeditor:{
      exports:'CKEDITOR'
    },
    Jcrop:{
      deps : ['jquery']
    },
    echarts:{
      deps : ['jquery']
    }

  }
});