/*
 *	js添加末尾省略号
 */

$(document).ready(function() {
    var tof = $('.textOverFlow');
    // 定义最大字符数
    var maxwidth = 23;
    
    if(tof.text().length > maxwidth){
    	tof.text(tof.text().substring(0, maxwidth));
    	tof.html(tof.text() + '...');
    }
});
