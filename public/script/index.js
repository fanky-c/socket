!function(){
   var index = {};
    
   //登录操作
   index.login = function(){
      var btn = $('#login');
       btn.on('click',function(){
           var account = $('#account').val();
           var password = $('#password').val();
           var isSetCookie = $('.checkboxWrap .checkbox').attr('data-check');
            $.ajax({
              url: '/login',
              cache: true,
              dataType: 'json',
              data: {
                name: account,
                password: password,
                isSetCookie: isSetCookie
              },
              type: 'post',
              success: function(json) {
                if (json.result === 1) {
                    // if(isSetCookie*1){
                    //      setCookie('name',account,1);
                    // }
                   window.location.href = "./warn.html";
                } else {
                   alert('登录失败！')
                }
              },
              error: function(err) {
                console.log('error:' + err);
              },
              exception: function(ex) {
                console.log('exception:' + ex);
              }
            });
       });
   };

   //是否保存cookie
   !function(){
       var btn = $('.checkboxWrap');
       var flag = 0;
       btn.on('click',function(){
          if(flag++ % 2 == 1){
             $('.checkboxWrap .checkbox').addClass('checkboxActive');
             $('.checkboxWrap .checkbox').attr('data-check',"1");
          }else{
             $('.checkboxWrap .checkbox').removeClass('checkboxActive');
             $('.checkboxWrap .checkbox').attr('data-check',"0");            
          }
       });
   }();

    
    //设置cookie 
    function setCookie(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }else{
            var expires = "";
        }
        document.cookie = name+"="+value+expires+"; path=/";
    }
     
    // 获取cookie
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
     
    // 删除cookie
    function deleteCookie(name) {
        setCookie(name,"",-1);
    }   
   
   
   //导出
   if(typeof define === 'function'){
         define(function(){
         	  return index;
         });
   }else if(typeof exports !== 'undefined'){
          module.exports = index;
   }
   else{
   	      window.index = index;
   };
}()