## npm使用淘宝镜像方式

由于生活在墙内在下载npm的资源时总会因连接失败而中断下载，虽然有翻墙软件，但是也有不稳定的时候。不过幸好有万能的淘宝，下面收罗来两个方法，使用淘宝镜像来下载npm上的资源

1.  添加镜像源。在node安装目录找到**node_modules->npm->npmrc**，添加修改
```
registry = http://registry.npm.taobao.org
```
不过此方法并不是很稳定，最好采取第2种方法
	
2.  替换**npm**
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
之后使用**npm**的时候可换成**cnpm**