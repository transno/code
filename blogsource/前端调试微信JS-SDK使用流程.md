#前端调试微信JS-SDK使用流程
简单说明微信JS-SDK的前端使用流程，接口调用以及测试使用。

具体可以参考[微信公众平台开发者文档](http://mp.weixin.qq.com/wiki/home/index.html)

##准备工具
- [微信web开发者工具](https://mp.weixin.qq.com/wiki/10/e5f772f4521da17fa0d7304f68b97d7e.html)
- [QQ浏览器](http://browser.qq.com/)
- [公众号测试号](http://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login)

##填写测试号信息
进入测试号管理界面，我们可以在面板中看到`appID`和`appsecret`，这个是唯一标识，后面的操作需要使用到

然后在`js接口安全域名`模块填入需要使用测试地址域名，一般使用QQ浏览器生成的域名如下：

> qiwhwwdksx.proxy.qqbrowser.cc

##使用QQ浏览器搭建服务端
由于微信测试需要验证域名，这个对于前端是非常麻烦的，所以使用QQ浏览器提供的`微信调试工具`可以轻松的把本地搭建的服务器映射出去。相关知识可查阅[nginx](http://baike.baidu.com/link?url=b2lUE6lIV63OG8lGubLMqzZoAUm0_t8mbyi_nEcweqHgthAITEUhqKJFxoSGY1r2-k8kA_TqQapl_nzK7SMTD_)


具体操作如下：

- 下载[QQ浏览器](http://browser.qq.com/)
- 打开浏览器的`应用中心`查找`微信调试工具`并安装
- 进入`微信调试工具` - `服务器调试` - `绑定服务`（填写自己`本地端口号`） - 启动

启动成功后就会看到外部域名(URL)：

> http://qiwhwwdksx.proxy.qqbrowser.cc

使用`微信web开发者工具`直接访问即可

##权限签名算法
微信JS-SDK的使用需要签名验证

###获取access_token
access_token是公众号的全局唯一票据，公众号调用各接口时都需使用access_token。开发者需要进行妥善保存。access_token的存储至少要保留512个字符空间。access_token的有效期目前为2个小时，需定时刷新，重复获取将导致上次获取的access_token失效。前端调试测试可使用工具生成，后端实际开发官网文档有动态生成[例子](http://demo.open.weixin.qq.com/jssdk/sample.zip)。

公众号可以使用`AppID`和`AppSecret`调用本接口来获取access_token。AppID和AppSecret可在微信公众平台官网-开发者中心页中获得（需要已经成为开发者，且帐号没有异常状态）。注意调用所有微信接口时均需使用`https`协议。

**接口调用请求说明:**

```http
https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
```

**返回类似：**

```javascript
{
access_token: "1yJeXmK6L6RdmMiAyxIhCs7kXIDTZ4IJVnKR9fYb2T4nXWQcDT2_OENUSyMTurVaJJ6MPB6nwXA9knLYKhWHfs9E9qkScZvRr0XSFTJW1obglA6-q9JJAc16nhouV86OQNGbAFATQJ",
expires_in: 7200
}
```

###获取jsapi_ticket
生成签名之前必须先了解一下jsapi_ticket，jsapi_ticket是公众号用于调用微信JS接口的临时票据。正常情况下，jsapi_ticket的有效期为7200秒，通过access_token来获取。由于获取jsapi_ticket的api调用次数非常有限，频繁刷新jsapi_ticket会导致api调用受限，影响自身业务，开发者必须在自己的服务全局缓存jsapi_ticket 。

**从拿到的access_token采用http GET方式请求获得jsapi_ticket**

```http
https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi
```

**返回类似：**

```javascript
{
errcode: 0,
errmsg: "ok",
ticket: "kgt8ON7yVITDhtdwci0qeYJpTHtpAKcye45pnHeYPjV8VPaiILihLC8z7cyhyLz5m5UtqnNgH_I6GbprtvgWPg",
expires_in: 7200
}
```

###签名校验
可以使用微信的[校验工具](http://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign)

进入我们可以看到需要使用到4个参数来生成`signature`

- *jsapi_ticket* - 上个步骤生成的jsapi_ticket
- *noncestr* - 用户随机生成的字符串，可用附录[1]代码片段生成
- *timestamp* - 时间戳，可以直接`parseInt(new Date().getTime()/1000)`生成
- *url* - 当前网站的url。比如我使用QQ浏览器的微信调试工具，网站为`http://qiwhwwdksx.proxy.qqbrowser.cc/signin.html`，则输入`http://qiwhwwdksx.proxy.qqbrowser.cc/signin.html`。如果网址为`http://qiwhwwdksx.proxy.qqbrowser.cc/signin.html?type=wx`，就输入`http://qiwhwwdksx.proxy.qqbrowser.cc/signin.html?type=wx`。如果网址为`http://qiwhwwdksx.proxy.qqbrowser.cc/signin.html#abc`，则输入`http://qiwhwwdksx.proxy.qqbrowser.cc/signin.html`

###使用JS-SDK

####引入js
```
<script src="https://res.wx.qq.com/open/js/jweixin-1.1.0.js"></script>
```

####通过config接口注入权限验证配置
```javascript
wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，公众号的唯一标识
    timestamp: , // 必填，生成签名的时间戳，需要与签名校验的timestamp相同
    nonceStr: '', // 必填，生成签名的随机串，需要与签名校验的timestamp相同
    signature: '',// 必填，签名，签名校验生成的signature
    jsApiList: [] // 必填，需要使用的JS接口列表
});
```

####通过ready接口处理成功验证
```javascript
wx.ready(function(){

    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
});

```

####实现相应逻辑代码

具体操作可以查看[文档](http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html)

##附录1 - JS随机生成字符串

``` javascript
function randomString(len) {
　　len = len || 10;
　　var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}
console.log(randomString());
// 生成类似：9RI2ID3rEe
```

