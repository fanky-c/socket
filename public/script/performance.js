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
          showChart(json);
     })
}


function showChart(json){
  $(function() {
    $('#container').highcharts({
      chart: {
        type: 'column'
      },
      title: {
        text: '当前被检测地址'
      },
      subtitle: {
        text: 'URL: <a href="'+json.data[0]["ext_domain"]+'">'+json.data[0]['ext_domain']+'</a>'
      },
      xAxis: {
        type: 'category',
        labels: {
          rotation: -45,
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: '消耗时间(毫秒)'
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        pointFormat: '<b>{point.y:.1f}毫秒</b>'
      },
      series: [{
        name: 'Population',
        data: [
          ['上个文档的卸载时间', json.data[0]["t_unload"]*1],
          ['重定向时间', json.data[0]["t_redirect"]*1],
          ['DNS查询时间', json.data[0]["t_dns"]*1],
          ['服务器连接时间', json.data[0]["t_tcp"]*1],
          ['服务器响应时间', json.data[0]["t_request"]*1],
          ['网页下载时间', json.data[0]["t_response"]*1],
          ['首次渲染时间', json.data[0]["t_paint"]*1],
          ['dom ready时间（阶段）', json.data[0]["t_dom"]*1],
          ['dom ready时间（总和）', json.data[0]["t_domready"]*1],
          ['onload时间（阶段）', json.data[0]["t_load"]*1],
          ['onload时间（总和）', json.data[0]["t_onload"]*1],
          ['白屏时间', json.data[0]["t_white"]*1],
          ['整个过程的时间之和',json.data[0]["t_all"]*1]
        ],
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: '{point.y:.1f}', // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      }]
    });
  });

}

