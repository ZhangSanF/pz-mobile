
/**
 * 对象数组排序
 * @param {对象中需要比较的键} p 
 */
export const compare = p => { //这是比较函数
    return function(m,n){
        var a = m[p];
        var b = n[p];
        return b - a; //降序
    }
}

/**
 **格式化日期
 * formatDate(new Date().getTime());                          //2017-05-12
 * formatDate(new Date().getTime(),'YY年MM月DD日');            //2017年05月12日
 * formatDate(new Date().getTime(),'今天是YY/MM/DD hh:mm:ss'); //今天是2017/05/12 10:07:45
 */
export const formatDate = (time,format='YY-MM-DD') => {
    let date = new Date(time);
  
    let year = date.getFullYear(),
      month = date.getMonth()+1,//月份是从0开始的
      day = date.getDate(),
      hour = date.getHours(),
      min = date.getMinutes(),
      sec = date.getSeconds();
    let preArr = Array.apply(null,Array(10)).map(function(elem, index) {
      return '0'+index;
    });
  
    let newTime = format.replace(/YY/g,year)
      .replace(/MM/g,preArr[month]||month)
      .replace(/DD/g,preArr[day]||day)
      .replace(/hh/g,preArr[hour]||hour)
      .replace(/mm/g,preArr[min]||min)
      .replace(/ss/g,preArr[sec]||sec);
  
    return newTime;
  }

/**
 * 那地址栏参数
 * @param {地址栏字段} name 
 */
export const  getUrlKey = (name) => {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || ''
}

// 广告图片跳转
export const goImgUrl = (url) => {
  if (url == '' || url == undefined) {
    return 
  } else {
    window.open(url);
  } 
}

/**
 * 数字转 xx万 xx亿
 * @param {value} value 
 * @param {symbol} symbol 
 */
export const format = (value,symbol) =>{  //两个参数，一个是值，一个是货币类型（￥,$）
  var obj = {
    symbol:symbol||"",    //货币类型
    int:undefined,    //整数位
    dec:undefined,  //小数位
    targ:"",          //正负
    times:['','万','亿','万亿','亿亿']
  }
  value = String(value);
  var reg = /^-?\d+\.?\d+$/;
  if(!reg.test(value)){
    alert("请输入数字");
    return false;
  }
  
  if(value[0]=="-"){
    obj.targ = "-";
    value = value.substring(1,value.length)
  }
  
  var times = 0;
  value = Number(value);
  while(value > 10000){
    value = value/10000;
    times++;
  }

  value = value.toFixed(2)

  var arr = String(value).split(".")
  obj.dec = arr[1];
  obj.int = arr[0];
  if(obj.int.length>3){
    obj.int = obj.int.replace(/(.{1})/,'$1,')
  }

  return obj.symbol+obj.targ+obj.int+"."+obj.dec+obj.times[times];
}
