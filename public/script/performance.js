require.config({
  urlArgs: "bust=" +  (new Date()).getTime(),  //线上屏蔽
  paths: {
        jquery:"./lib/jquery-1.10.2.min",
        io:'./lib/socket.io',
        highcharts:'./lib/highcharts/highcharts',
        highcharts3d:'./lib/highcharts/highcharts-3d',
        highchartsmore:'./lib/highcharts/highcharts-more',
        arttemple: "./lib/webyyAlttemple"
　　},
  shim: {
    'highcharts': {
      exports: 'highcharts',
      deps: ['jquery']
    }
  }
});


require(['arttemple','io','highcharts'],function(arttemple,io){
       var socket = io.connect('http://127.0.0.1:30031');
        socket.on('performancelog', function (data) {
          var json = data.log;
          console.log(json)
          render(json,arttemple);
        });       
})


var timer = null;
var flag = true;
var json = {};


function render(json,arttemple){
     $(function(){
          json = {
            data: JSON.parse(json)
          }
          arttemple.config({
            openTag:'[[',
            closeTag:']]'
          });
          $('#showErrorMessage').html(arttemple('performanceTemplate', json))
     })
}

