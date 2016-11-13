# socket

前端错误、性能、安全日志收集系统，涉及到nodejs、mongodb、websocket等等内容
因为是针对自己的小组内的项目来做的，其他通用的功能点可以后续补上。

开启步骤：

1，安装mongodb数据库(socket==>users)

2，开启nodejs服务器 node ./bin/www (如果安装了supervisor ./bin/www) 


说明：
   1，收集页面js错误信息

   2，页面性能检测（页面渲染、页面白屏、用户可操作）
   
   3，页面安全检测（页面域名劫持、iframe广告、xxs安全攻击）
