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
    region:'jquery-region/jquery.region',
    common:'../js/common',
    //login:'../js/login',
    teacherList:'../js/teacher-list',
    teacherAdd:'../js/teacher-add',
    settings:'../js/settings'
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
    }
  }
});