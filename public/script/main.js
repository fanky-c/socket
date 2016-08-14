require.config({
          urlArgs: "bust=" +  (new Date()).getTime(),  //线上屏蔽
          paths: {
                jquery:"./jquery-1.10.2.min",
                arttemple: "./webyyAlttemple",
                bomConsole:"./bomConsole"
      　　},        
      　　shim: {
                // 'jsonp':{
                //    exports: '$.jsonp' 
                // },
                // 'IScroll':{
                //   exports: 'IScroll'
                // }              
      　　}
});
require(["jquery","arttemple"],function(jquery,arttemple){
       
});