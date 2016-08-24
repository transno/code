## 小tips之background-size在Android上的那些事
曾几何时，我以为background-size的兼容性不错的了，上[caniuse](http://caniuse.com/#search=background-size)上看也是绿油油的一片

![caniuse-background-size](http://wyguang.net/blog/wp-content/uploads/2016/08/caniuse-background-size.png)

然后的然后当我在做个按钮效果1px宽的图片repeat-x填充背景，并且高度不定，我很平常的使用如下代码

``` css 
.bg { backgournd: url(images/bg.jpg) center repeat-x; background-size: auto 100%; }
```

刷新页面看看效果，然后浏览器模拟移动设备也看看效果，完美！

项目上线后使用Android手机一看，WTF，这闹哪样，我的背景呢

![canloadimage](http://wyguang.net/blog/wp-content/uploads/2016/08/20160824111323.png)

再瞅一眼[caniuse](http://caniuse.com/#search=background-size)，看到如下一句话

> Android 4.3 browser and below are reported to not support percentages in background-size

好吧，看来是不支持百分比，那我就把代码改成如下：

``` css 
.bg { backgournd: url(images/bg.jpg) center repeat-x; background-size: auto 2rem; }
```

自信满满的再刷新页面，天啦噜，还是没变，缓存，一定是缓存。清了再瞅瞅，还是没变！

再好好想想，不支持百分比是不是不支持不固定的值，那试试这样

``` css 
.bg { backgournd: url(images/bg.jpg) center repeat-x; background-size: 1px 2rem; }
```

怀着紧张的心情刷新一看，呼~出现了。

#####总结一下

background-size的不定值不是完全的不兼容，只是当运用在1px的图片使用了**repeat-x**这个属性的时候，在Android手机上浏览才会不出现效果。所以在使用的时候只能退一步全部都使用固定的数值了。