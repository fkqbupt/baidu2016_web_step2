/**
 * aqiData���洢�û�����Ŀ���ָ������
 * ʾ����ʽ��
 * aqiData = {
 *    "����": 90,
 *    "�Ϻ�": 40
 * };
 */
var city=[];
var num=[];
var aqiData=[];
var i=0;         //ָʾ����������ݵĴ���,���ڼ�������
var count=0;     //count��¼�ɹ��������ݵĴ����������ж��Ƿ�ӱ�ͷ
/**
 * ���û������л�ȡ���ݣ���aqiData������һ������
 * Ȼ����Ⱦaqi-list�б���������������
 * �û�����ĳ���������Ϊ��Ӣ���ַ�����������ָ������Ϊ����
 * �û�����ĳ������ֺͿ�������ָ����Ҫ����ǰ��ȥ�ո񼰿��ַ�����trim��
 * �û����벻�Ϲ��ʱ����Ҫ������ʾ��������alert��Ҳ�������ж�����ʾ��ʽ��
 * �û����Ե��������еġ�ɾ������ť��ɾ����һ�е�����
 */

/**  ȥ���ַ���ǰ�����пո�
*  ȥ���ַ��������пո�(�����м�ո�,��Ҫ���õ�2������Ϊg)
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
    city[i]=aqiCity.trim();         //ȥ���ַ�����β�ո�
    num[i]=aqiNum.trim();
    if(!city[i].match(/^[a-zA-z\u4e00-\u9fa5]+$/)){
        alert("����������Ϊ��Ӣ���ַ���");
        return;
    }
    if(!num[i].match(/^\d+$/)){
        alert("����ָ������Ϊ��������");
        return;
    }
    aqiData.push(city[i]);
    aqiData.push(num[i]);
                        //aqiData[city]=num;     ����д��----��cityΪ�±��������
                        //delete aqiData[city];    ����д��---ֱ�Ӵ�aqiData[city]������ɾ������
                        //����ֱ��Ϊ������ӱ�ǩ����ǩ���ݣ����÷ǵ���DOM����
                        //var items = "<tr><td>����</td><td>��������</td><td>����</td></tr>";
                        //for(var city in aqiData){
                        //    items += "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button data-city='"+city+"'>ɾ��</button></td></tr>"
                        //}
                        //document.getElementById("aqi-table").innerHTML = city ? items : "";

    //������ʽ��ȥ���ո񣬻�û��
    var table=document.getElementById("aqi-table");
    var tableTr0=document.createElement("tr");
    var tableTd01=document.createElement("td");
    var tableTd02=document.createElement("td");
    var tableTd03=document.createElement("td");

    var tableTr=document.createElement("tr");
    var tableTd1=document.createElement("td");
    var tableTd2=document.createElement("td");
    var tableBtn=document.createElement("button");
    //����ǵ�һ����ӣ�����ӱ��ͷ����������ݣ�����ֻ������ݡ�td���ӵ�tr�ϣ�tr���ӵ�table�ϡ�
    if(count==0){
        tableTd01.innerHTML="����";
        tableTr0.appendChild(tableTd01);
        tableTd02.innerHTML="��������";
        tableTr0.appendChild(tableTd02);
        tableTd03.innerHTML="����";
        tableTr0.appendChild(tableTd03);
        table.appendChild(tableTr0);
    }
    tableTd1.innerHTML=city[i];
    tableTr.appendChild(tableTd1);
    tableTd2.innerHTML=num[i];
    tableTr.appendChild(tableTd2);
    tableBtn.innerHTML="<button onClick='delBtnHandle(this)'>ɾ��</button>";
    tableTr.appendChild(tableBtn);
    table.appendChild(tableTr);
    count =count+1;

}

/**
 * ��Ⱦaqi-table���
 */
function renderAqiList() {
    var tBody=document.getElementById('aqi-table');
    var trs=tBody.getElementsByTagName('tr');
    var i;
    for(i=1;i<trs.length;i++){
        trs[i].onmouseover=function() {
            this.style.backgroundColor = "#f2f2f2";
            //this ָ��������� trs[i]
        }
        trs[i].onmouseout=function(){
            this.style.backgroundColor="#fff";
        }
    }
}

/**
 * ���add-btnʱ�Ĵ����߼�
 * ��ȡ�û����룬�������ݣ�������ҳ����ֵĸ���
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * �������ɾ����ť��ʱ��Ĵ����߼�
 * ��ȡ�ĸ��������ݱ�ɾ��ɾ�����ݣ����±����ʾ
 */
function delBtnHandle(obj) {
    // do sth.
    // ��ȡ���obj ���ڵ��У���ȡ���obj���ڵ�table����table��ɾ�����tr
    var tBody=obj.parentNode.parentNode.parentNode;
    var tr1=obj.parentNode.parentNode;
    tBody.removeChild(tr1);
    renderAqiList();
}

function init() {

    // ���������add-btn��һ������¼������ʱ����addBtnHandle����
    //document.getElementById("add-btn").addEventListener("click",addBtnHandle);
    // ��취��aqi-table�е�����ɾ����ť���¼�������delBtnHandle����
    //document.getElementById("aqi-table").addEventListener("click",function(event){
    //    if(event.target.nodeName.toLowerCase() === 'button'){
    //        delBtnHandle.call(null,event.target.dataset.city);
    //    }
    //})
}

init();