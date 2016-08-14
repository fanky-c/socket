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
  shim:{
		 'highcharts': {
			exports: 'highcharts',
			deps:['jquery']
           }
	  }
});

require(['arttemple','io','highcharts'],function(arttemple,io){
        //var socket = io.connect('http://127.19.33.164:30031');
        var socket = io.connect('http://127.0.0.1:30031');
        socket.on('log', function (data) {
	        var json = data.log;
	        render(json,arttemple);
        });       
});

var timer = null;
var flag = true;
var json = {};

function render(data,arttemple){	
	$(function() {
		 json = {
			  data:JSON.parse(data)
		}
		flag && showHighcharts();
        arttemple.config({
        	openTag:'[[',
        	closeTag:']]'
        });
       $('#showErrorMessage').html(arttemple('errorTemplate', json))
	});
};

function showHighcharts() {
	var chart;
	var initLen = json.data.length || 0;
    
    flag = false;

	Highcharts.setOptions({
		global: {
			useUTC: false
		}
	});

	$('#container').highcharts({
		chart: {
			type: 'spline',
			animation: Highcharts.svg, // don't animate in old IE               
			marginRight: 10,
			events: {
				load: function() {
					// set up the updating of the chart each second             
					var series = this.series[0];
					timer && clearInterval(timer);
					timer = setInterval(function() {
						var x = (new Date()).getTime(), // current time         
							y = json.data.length || initLen;
						series.addPoint([x, y], true, true);
					}, 2000);
				},
				click: function() {
					alert('当前错误个数：'+json.data.length)
				}
			}
		},
		title: {
			text: '页面错误实时展示'
		},
		xAxis: {
			type: 'datetime',
			tickPixelInterval: 150
		},
		yAxis: {
			title: {
				text: '错误次数',
				style: {
					fontSize: '20px'
				}
			},
			plotLines: [{
				value: 0,
				width: 1,
				color: '#808080'
			}]
		},
		tooltip: {
			formatter: function() {
				return '<b>' + this.series.name + '</b><br/>' +
					Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
					Highcharts.numberFormat(this.y, 2);
			}
		},
		legend: {
			enabled: false
		},
		exporting: {
			enabled: false
		},
		series: [{
			name: '错误信息',
			data: (function() {
				// generate an array of random data                             
				var data = [],
					time = (new Date()).getTime(),
					i;

				for (i = -20; i < 0; i++) {
					data.push({
						x: time + i * 1000,
						y: Math.random()
					});
				}
				return data;
			})()
		}]
	});
}

