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
	        var json = data.log;
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
			flag && highChar(data);
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

function highChar(data){
	    var data = data;
	    var totleSize = JSON.parse(data).length || 1;
	    var p1 = (getArrayLen(data,'types',1)/totleSize).toFixed(2)*1;
	    var p2 = (getArrayLen(data,'types',2)/totleSize).toFixed(2)*1;
	    var p3 = (getArrayLen(data,'types',3)/totleSize).toFixed(2)*1;
	    var p4 = (getArrayLen(data,'types',4)/totleSize).toFixed(2)*1;
	    var p5 = (getArrayLen(data,'types',5)/totleSize).toFixed(2)*1;
	    var p6 = (getArrayLen(data,'types',6)/totleSize).toFixed(2)*1;
	    var p7 = (getArrayLen(data,'types',7)/totleSize).toFixed(2)*1;
	    var p8 = (getArrayLen(data,'types',8)/totleSize).toFixed(2)*1;

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
					['拦截可疑内联事件,type=1', p1],
					['拦截可疑javascript代码,type=2', p2],
					['拦截到可疑iframe,type=3',p3],
					['拦截可疑静态脚本,type=4',p4], 
					['拦截可疑动态脚本,type=5', p5],
					['拦截可疑document-write,type=6', p6],
					['拦截可疑setAttribute,type=7', p7],
					['页面被嵌入iframe中,type=8',p8]
				]
			}]
		});
}


/**
    求出数组中某个元素出现的次数
**/
function getArrayLen(arrayObj, attr, target){
	var sum = 0;
	var obj = isObj(arrayObj) ? arrayObj : JSON.parse(arrayObj);
	for (var i = 0; i < obj.length; i++) {
		if (obj[i][attr] == target) {
			sum++;
		}
	}
	return sum;

	function isObj(o){
		return Object.prototype.toString.call(o) === '[object Object]';
	}
}




