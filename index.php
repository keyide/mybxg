<?php
    header('content-type:text/html; charset=utf8;');

    //echo '<div>123</div>';
    //include('/views/main/login.html');

    //var_dump($path);

    $dir='main';
    $fileName='login';

    if(array_key_exists('PATH_INFO',$_SERVER)){
        $path = $_SERVER['PATH_INFO'];
        $str=substr($path,1);
        $strArr=explode('/',$str);
        if(count($strArr)==2){
            $dir=$strArr[0];
            $fileName=$strArr[1];
        }else{
            $fileName='login';
        }
    }

    //var_dump('/views/'.$dir.'/'.$fileName.'.html');
    include('./views/'.$dir.'/'.$fileName.'.html');
?>