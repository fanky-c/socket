# socket

前端错误、性能、安全日志收集系统，涉及到nodejs、mongodb、websocket等等内容
因为是针对自己的小组内的项目来做的，其他通用的功能点可以后续补上。

开启步骤：

1，安装mongodb数据库(socket==>users)

2，开启nodejs服务器 node ./bin/www (如果安装了supervisor ./bin/www) 



参数	类型	描述
ext_domain	string	域名
ext_path	string	页面
t_unload	number	上个文档的卸载时间
t_redirect	number	页面重定向的时间
t_dns	number	DNS解析时间
t_tcp	number	服务器连接时间
t_request	number	服务器响应时间
t_response	number	网页文档下载时间
t_paint	number	首次渲染时间
t_dom	number	DOM Ready时间（阶段）
t_domready	number	DOM Ready时间（总和）
t_load	number	onload时间（阶段）
t_onload	number	onload时间（总和）
t_white	number	白屏时间
t_all	number	全部过程时间
