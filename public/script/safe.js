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
        var socket = io.connect('http://127.0.0.1:30031');
        socket.on('safelog', function (data) {
	        var json = data.safelog;
	        render(json,arttemple);
        });    
});

var timer = null;
var flag = true;
var json = {};

function render(data,arttemple){
	$(function(){
			json = {
				data: JSON.parse(data)
			}
			flag && highChar();
            arttemple.helper('dateFormat',function(time,format){       
						var date = new Date(time*1);
						var map = {
							"M": date.getMonth() + 1, //月份 
							"d": date.getDate(), //日 
							"h": date.getHours(), //小时 
							"m": date.getMinutes(), //分 
							"s": date.getSeconds(), //秒 
							"q": Math.floor((date.getMonth() + 3) / 3), //季度 
							"S": date.getMilliseconds() //毫秒 
						};
						format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
							var v = map[t];
							if (v !== undefined) {
								if (all.length > 1) {
									v = '0' + v;
									v = v.substr(v.length - 2);
								}
								return v;
							} else if (t === 'y') {
								return (date.getFullYear() + '').substr(4 - all.length);
							}
							return all;
						});
						return format;
            })			
			arttemple.config({
				openTag: '[[',
				closeTag: ']]'
			});
			$('#showErrorMessage').html(arttemple('errorTemplate', json))

	})
}

function highChar(){
		$('#container').highcharts({
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false
			},
			title: {
				text: '网站安全反馈'
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %',
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					}
				}
			},
			series: [{
				type: 'pie',
				name: '网站安全份额',
				data: [
					['拦截可疑内联事件', 45.0],
					['拦截可疑javascript:代码', 26.8], 
					{
						name: '拦截可疑静态脚本',
						y: 12.8,
						sliced: true,
						selected: true
					},
					['拦截可疑动态脚本', 8.5],
					['拦截可疑document-write', 6.2],
					['拦截可疑setAttribute', 0.4],
					['页面被嵌入iframe中',0.3]
				]
			}]
		});
}

