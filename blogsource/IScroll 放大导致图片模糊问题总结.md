#IScroll 放大导致图片模糊问题总结 
---

在使用IScroll的Zoom属性进行放大缩小的时候，会发现其中的图片在放大的情况下会变得模糊。

官方给予的解释是：
>Some browsers (notably webkit based ones) take a snapshot of the zooming area as soon as they are placed on the hardware compositing layer (say as soon as you apply a transform to them). This snapshot is used as a texture for the zooming area and it can hardly be updated. This means that your texture will be based on elements at `scale 1` and zooming in will result in blurred, low definition text and images.
>A simple solution is to load content at double (or triple) its actual resolution and scale it down inside a `scale(0.5)` div. This should be enough to grant you a better result. I hope to be able to post more demos soon

简单的理解是：
>我们可以渲染出一张比原图还要大1倍的图片，然后让包裹它的外框缩小0.5倍

当然在实际项目中我们并不能每次都能渲染出大于原图的图片。个人认为比较理想的解决方案为：
>当原始图片小于IScroll的滚动框时，就按原始尺寸显示；当大于滚动框时，就使用缩小外框的办法让图片不会模糊

**举个栗子：**

HTML结构如下：
``` html
<div class="galleryZoom" id="galleryZoom">
	<div class="wrapper">
		<div class="img"><img src="images/pic1.jpg"></div>
	</div>
</div>
```
>IScroll的HTML需要有个wrapper包裹层，具体信息可以查阅[IScroll官方文档](https://github.com/cubiq/iscroll)

CSS如下：
``` css
.galleryZoom { position: fixed; z-index: 9999; top: 0; left: 0; display: block; overflow: hidden; width: 100%; height: 100%; background-color: #000; }
.galleryZoom .wrapper { position: absolute; z-index: 1; top: 0; right: 0; bottom: 0; left: 0; }
.galleryZoom .img { position: absolute; top: 50%; left: 50%; transform-origin: left top; -webkit-transform-origin: left top;  }
.galleryZoom .img img { display: inline-block; -webkit-transform: translate3d(0,0,0)}
```
>IScroll的最外层必须得定义高宽，不然将会出现不能上下滑动的BUG

JS如下：
``` javascript
var wh = $(window).height();
var ww = $(window).width();
var radio = 1;
var maxZoom = 3;
var img = new Image();
img.src = 'images/pic1.jpg';
var radioW = ww / img.width;
var radioH = wh / img.height;

if (radioW < 1) {
	radio = radioW;
	maxZoom = 1 / radio;
} else if (radioH < 1) {
	radio = radioH;
	maxZoom = 1 / radio;
}

$('#galleryZoom .img').css({
	'transform': 'scale(' + radio + ') translate(-50%,-50%)',
	'-webkit-transform': 'scale(' + radio + ') translate(-50%,-50%)'
});

var zoomScroll = new IScroll('#galleryZoom', {
	click: true,
	scrollY: true,
	scrollX: true,
	zoom: true,
	wheelAction: 'zoom',
	mouseWheel: true,
	tap: true,
	zoomMax: maxZoom
});
```
>以屏幕整体的高宽作为滚动可视区域。用该高宽与图片的高宽进行比较，得到一个`scale`值，然后通过JS动态赋予图片外包层的缩放大小