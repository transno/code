##gulp搭建前端切图仔工作流
----

身为一个切图仔，平时的工作就单单是静态页面切图，也没有运用到当下流行的angular、react、Vue等框架，着实无聊。看着网上各种各样前端工程化，各种各样流行框架都运用的飞起，自身的业务又运用不到，心里极其难受。于是乎，退而求其次，自己用gulp搭建一个符合自己业务的工作流。

####一.安装nodejs
由于搭建gulp工作流需要运用到nodejs，所以第一步当然要安装它了。安装其实很简单，只要上其[官网](https://nodejs.org/en/)的下载中心下载稳定版本安装即可。

####二.安装gulp
#####1.官方给出的简易安装步骤
首先全局安装gulp
```  
$ npm install --global gulp
```
进入项目目录，安装开发依赖
```
$ npm install --save-dev gulp
```
在根目录创建**gulpfile.js**文件，在该文件内编写gulp工作流相关
```javascript
var gulp = require('gulp');
gulp.task('default',function(){
	// 默认代码
});
```
运行代码，如果gulp后面不加上任务名，会默认执行**default**任务
```
$ gulp
```
#####2.通过**package.json**建立已有工作流
当已经建立过一次工作流并且已经添加了插件，根目录会有一个**package.json**文件来记录这个项目的版本号、说明、gulp插件版本等构建信息。我们只要保存好该文件以后其它的项目需要使用相同规则就可以一键安装所有的插件了。只需一个简单的命令：
```
$ npm install
```
>如没有**package.json**文件，可通过 $ npm init 建立

我的