## 爱你不容易的JavaScript---Date对象

用JavaScript来处理本地日期和时间对象的时候，当然会运用到Date对象。下面就整理一下自己常用的Date对象使用方法。

**1.新建一个Date对象**
``` javascript
new Date();
// 输出为当日日期格式
// Wed Jul 13 2016 14:05:20 GMT+0800 (中国标准时间)
```
**2.返回1970年1月1日至今的毫秒数**
``` javascript
new Date().getTime();
// 输出为毫秒数
// 1468390299454
```
**3.获取当前年份**
``` javascript
new Date().getFullYear();
// 输出为当前年份
// 2016
```
**4.获取当前的月份**
``` javascript
new Date().getMonth();
// 输出为当前月份（0~11），所以一般使用在后面+1
// 6
```
**5.获取当前月的某日**
``` javascript
new Date().getDate();
// 输出为当前月份（1~31）
// 13
```
**6.获取当前周的某日**
``` javascript
new Date().getDay();
// 输出为当前月份（0~6），0为星期日
// 3
```
**7.获取当前小时数**
``` javascript
new Date().getHours();
// 输出为当前月份（0~23）
// 14
```
**8.获取当前分钟数**
``` javascript
new Date().getMinutes();
// 输出为当前月份（0~59）
// 25
```
**9.获取当前秒数**
``` javascript
new Date().getSeconds();
// 输出为当前月份（0~59）
// 23
```
**10.获取当前毫秒数**
``` javascript
new Date().getMilliseconds();
// 输出为当前月份（0~999）
// 604
```
**11.设置一个Date对象**
``` javascript
new Date(1418290269254);
// 输出 Thu Dec 11 2014 17:31:09 GMT+0800 (中国标准时间)
new Date('2014/6/6');
// 输出 Fri Jun 06 2014 00:00:00 GMT+0800 (中国标准时间)
new Date('2014/6/6 12:56:34');
// Fri Jun 06 2014 12:56:34 GMT+0800 (中国标准时间)
```
> 因为苹果设备对于`Y-M-D`这样的格式支持不好，所以在设置对象的时候最好采用`Y/M/D`的格式