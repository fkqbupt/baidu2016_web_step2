/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var city=[];
var num=[];
var aqiData=[];
var i=0;         //指示尝试添加内容的次数,便于加入数组
var count=0;     //count记录成功加入内容的次数，便于判断是否加表头
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 * 用户输入的城市名必须为中英文字符，空气质量指数必须为整数
 * 用户输入的城市名字和空气质量指数需要进行前后去空格及空字符处理（trim）
 * 用户输入不合规格时，需要给出提示（允许用alert，也可以自行定义提示方式）
 * 用户可以点击表格列中的“删除”按钮，删掉那一行的数据
 */

/**  去除字符串前后所有空格
*  去除字符串中所有空格(包括中间空格,需要设置第2个参数为g)
*/
//function trim(str,is_global){
//    var result;
//    result=str.replace(/(^\s+)|(^\s+$)/g,"");
//    //if(is_global.toLowerCase()=="g")
//    //    result = result.replace(/\s/g,"");
//    return result;
//}

function addAqiData() {
    i=i+1;
    var aqiCity=document.getElementById("aqi-city-input").value;
    var aqiNum=document.getElementById("aqi-value-input").value;
    city[i]=aqiCity.trim();         //去除字符串首尾空格
    num[i]=aqiNum.trim();
    if(!city[i].match(/^[a-zA-z\u4e00-\u9fa5]+$/)){
        alert("城市名必须为中英文字符！");
        return;
    }
    if(!num[i].match(/^\d+$/)){
        alert("空气指数必须为正整数！");
        return;
    }
    aqiData.push(city[i]);
    aqiData.push(num[i]);
                        //aqiData[city]=num;     巧妙写法----以city为下标添加内容
                        //delete aqiData[city];    巧妙写法---直接从aqiData[city]数组中删除内容
                        //可以直接为变量添加标签，标签内容，不用非得用DOM操作
                        //var items = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
                        //for(var city in aqiData){
                        //    items += "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button data-city='"+city+"'>删除</button></td></tr>"
                        //}
                        //document.getElementById("aqi-table").innerHTML = city ? items : "";

    //正则表达式，去掉空格，还没做
    var table=document.getElementById("aqi-table");
    var tableTr0=document.createElement("tr");
    var tableTd01=document.createElement("td");
    var tableTd02=document.createElement("td");
    var tableTd03=document.createElement("td");

    var tableTr=document.createElement("tr");
    var tableTd1=document.createElement("td");
    var tableTd2=document.createElement("td");
    var tableBtn=document.createElement("button");
    //如果是第一次添加，则添加表格头，并添加内容；否则只添加内容。td附加到tr上，tr附加到table上。
    if(count==0){
        tableTd01.innerHTML="城市";
        tableTr0.appendChild(tableTd01);
        tableTd02.innerHTML="空气质量";
        tableTr0.appendChild(tableTd02);
        tableTd03.innerHTML="操作";
        tableTr0.appendChild(tableTd03);
        table.appendChild(tableTr0);
    }
    tableTd1.innerHTML=city[i];
    tableTr.appendChild(tableTd1);
    tableTd2.innerHTML=num[i];
    tableTr.appendChild(tableTd2);
    tableBtn.innerHTML="<button onClick='delBtnHandle(this)'>删除</button>";
    tableTr.appendChild(tableBtn);
    table.appendChild(tableTr);
    count =count+1;

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var tBody=document.getElementById('aqi-table');
    var trs=tBody.getElementsByTagName('tr');
    var i;
    for(i=1;i<trs.length;i++){
        trs[i].onmouseover=function() {
            this.style.backgroundColor = "#f2f2f2";
            //this 指向这个对象 trs[i]
        }
        trs[i].onmouseout=function(){
            this.style.backgroundColor="#fff";
        }
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(obj) {
    // do sth.
    // 获取这个obj 所在的行，获取这个obj所在的table，从table中删除这个tr
    var tBody=obj.parentNode.parentNode.parentNode;
    var tr1=obj.parentNode.parentNode;
    tBody.removeChild(tr1);
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    //document.getElementById("add-btn").addEventListener("click",addBtnHandle);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    //document.getElementById("aqi-table").addEventListener("click",function(event){
    //    if(event.target.nodeName.toLowerCase() === 'button'){
    //        delBtnHandle.call(null,event.target.dataset.city);
    //    }
    //})
}

init();