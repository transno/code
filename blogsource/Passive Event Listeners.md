## Passive Event Listeners

说说起因吧。在使用[iscroll](https://github.com/cubiq/iscroll)制作区域滚动的功能时，查看console的时候发现竟然提出警告`Unable to preventDefault inside passive event listener due to target being treated as passive.`。

我的天呐，这到底是怎么回事，抱着需要知道真相的好奇心，上网查询了很多资料。

> A new feature in the DOM spec that enable developers to opt-in to better scroll performance by eliminating the need for scrolling to block on touch and wheel event listeners.
>
> Developers can annotate touch and wheel listeners with {passive: true} to indicate that they will never invoke preventDefault.

简单的说就是为了提高页面的滚动流畅度。

之前我们阻止页面滚动的时候一般都使用的是监听`touchmove`事件

```javascript
document.addEventListener('touchmove', function(e){
    e.preventDefault();
}, false);
```

然而现在增加了一个新属性`passive`，比如在监听 `mousewheel` 或者` touch `事件中，增加了 passive 为 true 的设置，它就不会调用 preventDefault 来阻止默认滑动行为

```javascript
document.addEventListener('touchmove', func, {passive: true})
```

从以下版本的浏览器开始，属性`passive`默认值为`true`

> Chrome desktop    56
> Chrome for Android    56
> Android Webview    56
> Opera desktop    44
> Opera for Android    44

当然，网上已经有很多解决方案了。

参考文档：

[https://www.chromestatus.com/features/5093566007214080](https://www.chromestatus.com/features/5093566007214080)

[https://zhuanlan.zhihu.com/p/24385322](https://zhuanlan.zhihu.com/p/24385322)

[https://github.com/WICG/EventListenerOptions/blob/gh-pages/EventListenerOptions.polyfill.js](https://github.com/WICG/EventListenerOptions/blob/gh-pages/EventListenerOptions.polyfill.js)

[https://github.com/cubiq/iscroll/issues/1119](https://github.com/cubiq/iscroll/issues/1119)