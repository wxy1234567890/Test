#bsmanage-ui
管理后台

#使用方法

1.安装nodejs

2.安装依赖包

- Windows环境使用install.bat
- Linux环境使用install.sh

3.启动开发服务器

- Windows环境使用start-server.bat
- Linux环境使用start-server.sh
开发服务器默认启动在```http://localhost:3001```, ip和端口可以在server.js中进行修改

4.打包发布
我们提供了两种打包方式，
- build-dev.bat(build-dev.sh) 用于测试环境，便于问题定位和bug修改。打包文件放在build/中
- build-prod.bat(build-prod.sh) 用于生产环境，将对代码进行混淆和压缩处理，提高性能。打包文件放在dist/中