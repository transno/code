### 关于单页应用(SPA)微信分享的问题解决方案

---

当我们使用SPA的形式开发应用的时候，通常使用的是hash模式，网页的url形式类似如下：`http://www.example.com/#/list?id=3`

微信端分享为了丰富分享卡片，能显示`图片`，`标题`,`简介`，我们一般都使用jssdk的分享api，不过在Android端，用户打开分享出来的链接，如果链接是使用的hash模式，会发现跳转到的是首页，微信会自动的屏蔽掉`url`的`hash`，即屏蔽掉`#`号后面所有的字符。

---

**解决方案：**

微信分享配置的url不要直接使用`window.location.href`，需要在`#`号签名拼接`?`号，可以参考如下代码，路由以vue-router为例：

```
let link = `${location.origin}${location.pathname}?#${this.$route.fullPath}`
```

使用如上的链接微信就不会屏蔽掉hash值了

具体原因还是不太清楚，猜想也许是在`#`号前面加了`?`，微信就会认为`?`后面都是为`location.search`，不会对`#`进行屏蔽吧


#### 补充

---

使用微信jssdk就需要配置`wx.config`，在获取签名的时候需要发送当前的`url`到后端进行签名，有如下几点需要注意：

- 发送给后端的`url`最好使用`window.location.href.split('#')[0]`

- 由于微信对`pushState`的支持不是很完美，建议路由模式使用`hash`，不要使用`history`

- 在SPA应用中，每个路由初始化的时候都要`wx.config`配置，防止分享`url`错误，只读取到第一次进入应用的`url`


#### 参考代码

---

以vue为例：

```javascript
// 获取签名信息
Vue.http.get(SHAREURL + '?url=' + window.location.href.split('#')[0]).then((data) => {
	let json = data.body
	wx.config({
		timestamp: json.timestamp,
		nonceStr: json.nonceStr,
		signature: json.signature,
		appId: json.appId,
		jsApiList: [
			"onMenuShareTimeLine",
			"onMenuShareAppMessage",
			"onMenuShareQQ"
		]
	})
})

/* ********* */

let link = `${location.origin}${location.pathname}?#${this.$route.fullPath}`
wx.onMenuShareAppMessage({
	title: '这里是分享的标题',
	imgUrl: '这里是分享的图片链接，必须是有可以访问的完整链接',
	desc: '这里是分享的简介',
	link: link
});
```