### 通过exif.js简单处理手机照片拍摄图片旋转问题

在移动端拍照获取图片后，然后使用canvas压缩图片，有时我们会发现输出的图片是旋转过的。

其实当我们旋转手机拍照的时候，就会产生一个角度问题，生成的图片都会有[EXIF meta data](https://en.wikipedia.org/wiki/Exif)。然后我们可以通过一个js插件[exif-js]来读取图片的`EXIF meta data`中的角度数值，再通过canvas对图片进行旋转处理，这样我们就可以输出正常角度的图片了。

具体的`EXIF meta data`可以参考如下：[http://www.impulseadventure.com/photo/exif-orientation.html](http://www.impulseadventure.com/photo/exif-orientation.html)

下面就简单的介绍一下实现步骤，具体的代码参考这里：[传送门](https://github.com/transno/code/blob/master/html/use-exif.html)


#### 使用input file获取本地的图片

---

获取本地图片我们使用简单的`input file`标签，然后在`onchange`事件里获取图片的相关信息

```javascript
<input type="file" accept="image/*" id="uploadImage" capture="camera" onchange="selectFileImage(this);"/>
```

通过`input file`获取到图片`file`对象，然后使用`FileReader`对象获取到内容数据。

```javascript
function selectFileImage (file){
	var imgFile = file.files[0];
	var oReader = new FileReader();
	
	oReader.onload = function (e) {
		console.log('图片信息', e.target.result);
	}
	
	oReader.readAsDataURL(imgFile);
}
```

#### 使用exif-js获取到图片的旋转角度

---

这个就比较简单了，简单调用下接口就可以实现

```javascript
EXIF.getData(imgFile, function () {
	var allTags = EXIF.getAllTags(this);
	var orientation = allTags.Orientation;
})
```

####  通过canvas转化压缩图片

---

根据实际情况判断自己需要的图片大小，然后进行缩放，最后通过`toDataURL`方法转成base64格式

```javascript
var image = new Image();
image.src = e.target.result;
image.onload = function () {
	var expectWidth = this.naturalWidth;
    var expectHeight = this.naturalHeight;
    var newWidth;
    var newHeight;
    if (expectWidth > expectHeight && expectWidth > 640) {
	    newWidth = 640;
        newHeight = newWidth * expectHeight / expectWidth;
    } else if (expectHeight > expectWidth && expectHeight > 640) {
        newHeight = 640;
        newWidth = newHeight * expectWidth / expectHeight;
    } else {
        newWidth = expectWidth;
        newHeight = expectHeight;
    }
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.drawImage(this, 0, 0, newWidth, newHeight);
    // canvas.toDataURL('image/jpeg');
}
```

#### 旋转图片

---

通过上述`EXIF`获取到的旋转角度，我们再通过canvas把图片旋转到正确的角度

```javascript
if (orientation != "" && orientation != 1) {
    switch (orientation) {
        case 6:
	        //需要顺时针（向左）90度旋转
			_this.rotateImg(this, '90', canvas, newWidth, newHeight);
            break;
        case 8:
            //需要逆时针（向右）90度旋转
            _this.rotateImg(this, '270', canvas, newWidth, newHeight);
            break;
        case 3:
            //需要180度旋转
            _this.rotateImg(this, '180', canvas, newWidth, newHeight);
            break;
    }
}

function rotateImg (img, angle) {
	var width = img.width;
	var height = img.height;
	var ocanvas = document.createElement('canvas');
	var ctx = ocanvas.getContext("2d");
	var degree = angle * Math.PI / 180;

	switch (angle) {
		case '0':
			ocanvas.width = width;
            ocanvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            break;
        case '90':
            ocanvas.width = height;
            ocanvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height, width, height);
            break;
        case '180':
            ocanvas.width = width;
            ocanvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height, width, height);
            break;
        case '270':
            ocanvas.width = height;
            ocanvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0, width, height);
            break;
    }
}
```

#### 总结一下

---

- 由于以上的方式获取到的图片都是base64格式，所以在读取信息上会有些缓慢，建议`EXIF.getData`公共获取图片信息后再对图片进行压缩处理，有能力的话可以使用`Promise`处理
- 需要熟练使用canvas的API，当时在图片旋转的时候就多花了些时间理解`drawImage`