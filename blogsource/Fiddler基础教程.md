## Fiddler基础教程

---

身为一个切图仔，平时做项目只要使用浏览器的开发者工具就已经够用了，看看dom结构，看看数据请求，谷歌的开发者工具已经很友好了。但是针对移动端的数据请求调试，单纯的使用谷歌的开发者工具自我感觉还是比较麻烦。于是乎，就踏上了一度以为很高逼格的**抓包**之路，在网上看了很多，最后锁定了一款抓包工具--[Fiddler](http://www.telerik.com/fiddler)。

#### 一、安装

---

安装其实没啥好说的，到[官网](http://www.telerik.com/fiddler)直接点击**Free download**，然后下一步下一步就可以了。

####二、设置捕获https会话

---

如今使用https也越来越多了，也需要设置一下才能捕获到https的会话。

打开Fiddler->Tools->Telerik Fiddler Options->HTTPS，按如下图进行，安装证书然后确定即可

![enter image description here](http://wyguang.net/blog/wp-content/uploads/2017/02/1.png)

![enter image description here](http://wyguang.net/blog/wp-content/uploads/2017/02/2.png)

####三、在移动端使用

---

首先用命令行执行`ipconfig`查看自身的IPv4地址

![enter image description here](http://wyguang.net/blog/wp-content/uploads/2017/02/3.png)

然后在手机打开Wifi的设置，将自己的连接点代理设置改为手动，在代理主机名填上自己的ip地址，端口号Fiddler默认为8888，可以通过Fiddler->Tools->Telerik Fiddler Options->Connections修改

![enter image description here](http://wyguang.net/blog/wp-content/uploads/2017/02/4.png)

Fiddler里设置允许访问Fiddler->Tools->Telerik Fiddler Options->Connections，如图，设置完成切记要**重启软件**

![enter image description here](http://wyguang.net/blog/wp-content/uploads/2017/02/5.png)

在移动端打开任意浏览器，输入ip地址+端口号，如下图，然后点击安装证书

![enter image description here](http://wyguang.net/blog/wp-content/uploads/2017/02/6.png)

安装成功后我们用浏览器打开一个网页，这样就能看到网络请求了

![enter image description here](http://wyguang.net/blog/wp-content/uploads/2017/02/7.png)

