//Version 20181203 V 4

function onload() {
    ts('.icon.menu .item').tab();
    ts('.tabbed.menu .item').tab();
}
function callToggle() {
    if(document.getElementById("rightTable").classList.contains("visible") == true){
        document.getElementById("rightTable").classList.remove("visible");
        document.getElementById("rightTable").classList.add("disabled");
    }else{
        document.getElementById("rightTable").classList.remove("disabled");
        document.getElementById("rightTable").classList.add("visible");
    }
}

var CreatFileSubmithttp
var GcodeArray = [];
var GcodeArrayi = 0;
var GcodeportChoice
var Gcodebaudrate
function printGcode(portChoice,Gcode,baudrate) {
    GcodeportChoice = portChoice;
    Gcodebaudrate = baudrate;
    if(Gcode == "file"){
            var tmppath = URL.createObjectURL(document.getElementById("GcodeFile").files[0]);
            var UpdateSqlxmlhttp
            if (window.XMLHttpRequest)
            {// code for IE7+, Firefox, Chrome, Opera, Safari
                UpdateSqlxmlhttp=new XMLHttpRequest();
            }else{// code for IE6, IE5
                UpdateSqlxmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            }

            UpdateSqlxmlhttp.open("GET",tmppath,false);
            UpdateSqlxmlhttp.send();
            Gcode =UpdateSqlxmlhttp.responseText;
            document.getElementById("inputG_code").placeholder = 'Data From ：'+document.getElementById("GcodeFile").files[0].name+'\n\n'+Gcode;
    }
    CreatFileSubmithttp=GetCreatFilettpObject()
    var xhr = new XMLHttpRequest();
    if (CreatFileSubmithttp==null)
    {
        alert ("Browser does not support HTTP Request")
        return
    }
    var CreatFileurl ='http://'+location.hostname+":3000?API_type=Serialport&System=PHP&Port="+portChoice+"&GcodeUrl="+Gcode.replace(new RegExp('\n','g'),'--')+"&baudrate="+baudrate;
    CreatFileSubmithttp.onreadystatechange=getCreatFileMsg
    CreatFileSubmithttp.open("POST",CreatFileurl,true)
    CreatFileSubmithttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    CreatFileSubmithttp.send()
    //}
}
function getCreatFileMsg() {
    if (CreatFileSubmithttp.readyState==4 || CreatFileSubmithttp.readyState=="complete")
    {
        var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        document.getElementById("systemMsg").innerHTML = document.getElementById("systemMsg").innerHTML+CreatFileSubmithttp.responseText+'.........('+utc+')';
    }
}
function GetCreatFilettpObject()
{
    var CreatFileSubmithttp=null;
    try
    {
        // Firefox, Opera 8.0+, Safari
        CreatFileSubmithttp=new XMLHttpRequest();
    }
    catch (e)
    {
        //Internet Explorer
        try
        {
            CreatFileSubmithttp=new ActiveXObject("Msxml3.XMLHTTP");
        }
        catch (e)
        {
            CreatFileSubmithttp=new ActiveXObject("Microsoft2.XMLHTTP");
        }
    }
    return CreatFileSubmithttp;
}
//////////////////////////////////
function ReadPort(portChoice,baudrate) {
    GcodeportChoice = portChoice;
    Gcodebaudrate = baudrate;
    CreatFileSubmithttp=GetCreatFilettpObject()
    var xhr = new XMLHttpRequest();
    if (CreatFileSubmithttp==null)
    {
        alert ("Browser does not support HTTP Request")
        return
    }
    var CreatFileurl ='http://'+location.hostname+":3000?API_type=Serialport&System=PHP&Port="+portChoice+"&baudrate="+baudrate;
    CreatFileSubmithttp.onreadystatechange=getReadPortMsg
    CreatFileSubmithttp.open("POST",CreatFileurl,true)
    CreatFileSubmithttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    CreatFileSubmithttp.send()
    //}


}
function getReadPortMsg() {
    if (CreatFileSubmithttp.readyState==4 || CreatFileSubmithttp.readyState=="complete")
    {
        var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        document.getElementById("systemMsg").innerHTML = document.getElementById("systemMsg").innerHTML+inputAddHead+'.........('+utc+')';
    }
}
