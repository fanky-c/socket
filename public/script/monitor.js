require.config({
          urlArgs: "bust=" +  (new Date()).getTime(),  //线上屏蔽
          paths: {
                jquery:"./lib/jquery-1.10.2.min",
                arttemple: "./lib/webyyAlttemple",
                bomConsole:"./lib/bomConsole"
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