;!function (window) {
    // var obj = document.getElementById('frontEndDetectionLog');
    // var activeName  = obj.getAttribute('data-title') || '';
    // var ajaxUrl = obj.getAttribute('data-url') || window.location.href;
    var bomConsole = {};
    var ajaxUrl = '172.19.33.164:80/log';
    var activeName = "my Project";
    var currentPageUrl = window.location.href;

    /****
      获取浏览器
    ****/
    function getBrowser(){
        var s = navigator.userAgent.toLowerCase();
        var match = /(webkit)[\/]([\w.]+)/.exec(s) ||
                    /(opera)(?:.*version)?[\/]([\w.]+)/.exec(s) ||
                    /(msie) ([\w.]+)/.exec(s) ||
                    !/compatible/.test(s) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(s) ||
                    [];

        return {name:match[1] || "",version:match[2] || "0"};      
    };

    /***
       获取操作系统
    ***/
    function getOs(){
       var os_type = "unknown os";
       var ua = navigator.userAgent;
       var pf = navigator.platform;
       
       if(/Windows/gi.test(ua)){
           os_type = 'Windows';  
       }
       else if(/Mac/gi.test(pf)){
           os_type = 'Mac'; 
       }
       else if(/Linux/gi.test(pf)){
           os_type = 'Lunix';
       }
       else if(/X11/gi.test(pf)){
           os_type = 'Unix';
       }
       else if(/android|adr/gi.test(ua)){
           os_type = 'android';
       }
       else if(/iphone/gi.test(ua)){
           os_type = 'iphone';
       }
       else if(/ipad/gi.test(ua)){
           os_type = 'ipad';
       }
       else if(/ipod/gi.test(ua)){
           os_type = 'ipod';
       }              

       return os_type;
    };

    /***
       ajax封装
    ***/
    function ajax(type, url, data, success, failed) {
        var xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }

        var type = type.toUpperCase();
        var random = Math.random();

        if (typeof data == 'object') {
            var str = '';
            for (var key in data) {
                str += key + '=' + data[key] + '&';
            }
            data = str.replace(/&$/, '');
        }

        if (type == 'GET') {
            if (data) {
                xhr.open('GET', url + '?' + data, true);
            } else {
                xhr.open('GET', url + '?t=' + random, true);
            }
            xhr.send();

        } else if (type == 'POST') {
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(data);
        }

        // 处理返回数据
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    success(xhr.responseText);
                } else {
                    if (failed) {
                        failed(xhr.status);
                    }
                }
            }
        }
    };

    /****
      脚本报错,提交错误信息
    ****/
    window.onerror = function (iMessage, iURL, iLine, iColumn, iError){
        window.setTimeout(function () {
            var iData = {
                    message:    iMessage,
                    url:        iURL,
                    line:       iLine,
                    column:     iColumn  ||  (window.event && window.event.errorCharacter)  ||  0, 
                    browser:    getBrowser().name || '',
                    browserVersion: getBrowser().version || '',
                    os: getOs() || '',
                    activeName: activeName || '',
                    currentPageUrl : currentPageUrl
                };
            
            //如果浏览器有堆栈信息 
            if (iError && iError.stack){           
                iData.stack = (iError.stack || iError.stacktrace).toString();
            } 
            //发送ajax
            //var type = iData.stack ? 'post' : 'get';
            var type = 'post';

            ajax(type, ajaxUrl, iData, function(data){
                    console.log('error错误提醒：'+data);
            },function(err){
                    console.log(err);
            });

            
            //导出相关数据
            bomConsole.iData = iData;

        }, 0);      
        return true;   
    };

  // RequireJS && SeaJS
  if (typeof define === 'function') {
      define(function() {
          return bomConsole;
      });
  // NodeJS
  } else if (typeof exports !== 'undefined') {
      module.exports = bomConsole;
  } else {
      window.bomConsole = bomConsole;
  }

}(window);
