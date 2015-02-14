/*
 *	检测所用浏览器的环境
*/

// 获取navigator对象
var userA = navigator.userAgent,

	// 判断是不是Android
	isAndroid = userA.match("Android"),

	// 判断是不是Iphone产品
	isPhone = userA.match("iPhone") ||　userA.match("iPad"),

	// 判断是不是PC
	isWindows = function(){
		var newArray = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
		var flag = true;

		for (var v = 0; v < newArray.length; v++) { 
			if (userA.indexOf(newArray[v]) > 0) { flag = false; break; } 
		}

		return flag;
	};

if(isAndroid){
	/* do something */
}
if(isPhone){
	/* do something */
}
if(isWindows()){
	/* do something */
}