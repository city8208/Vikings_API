//Version 20181115 V 3

///////////////////Set Web POST/GET
var http = require('http'),
    url = require('url'),
    util = require('util'),
    querystring = require('querystring');
///////////////////Set Serail Port
var serialport = require("serialport"),
    argv = require('optimist').argv,
    GCODE = require('./GCODE/module.js');
////////////////////////
var settings = {
    printFile : undefined,
    serialPort : undefined,
    baudrate : undefined,
    printing : false,
    paused : false
}
//////////////////////////////////////
////UI for Nodejs Web POST/GET ///
if(argv.port){
    //===========================================================
    // Self executing function - Will run before the file load
    // Usage: node [options] print.js --port [SERIAL PORT] --file [FILE PATH] --speed [SPEED MULTIPLIER]
    //===========================================================
    console.log("=Code Mode Start=");
    settings.serialPort = argv.port;
    settings.baudrate = argv.baudrate;
    settings.printFile = argv.file;
    settings.speedMultiplier = argv.speed;
    PrintCode = require('./GCODE/Print.js');
    PrintCode.printGcode(argv.port,argv.file,argv.baudrate,argv.speed);
}else{
    console.log("=WebAPI Mode Start=");
    http.createServer(function (req, res) {
        var body = "";
        /////////////
        req.on('data', function (chunk) {
            body += chunk;
        });
        req.on('end', function () {
            // check Url
            body = querystring.parse(body);
            // Set Body/Head string
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
            //////////////GET
            var params = url.parse(req.url, true).query;
            if(req.url != "/" && params.API_type != undefined  && params.System != undefined ){
                /////////////GET
                ///////////////////////Check GET input//////////
                if(params.API_type  == "JSON"){
                    res.write("Success "+params.API_type+" " + params.System);
                }else if(params.API_type  == "Table"){
                    res.write("Success "+params.API_type+" " + params.System);
                }else if(params.API_type  == "Camera") {
                    //if(params.Port != undefined){
                        res.write("Success "+params.API_type+" " + params.System);
//Available in nodejs

                    var NodeWebcam = require( "node-webcam" );


//Default options

                    var opts = {

                        //Picture related

                        width: 1280,

                        height: 720,

                        quality: 100,


                        //Delay to take shot

                        delay: 0,


                        //Save shots in memory

                        saveShots: true,


                        // [jpeg, png] support varies
                        // Webcam.OutputTypes

                        output: "jpeg",


                        //Which camera to use
                        //Use Webcam.list() for results
                        //false for default device

                        device: false,


                        // [location, buffer, base64]
                        // Webcam.CallbackReturnTypes

                        callbackReturn: "location",


                        //Logging

                        verbose: false

                    };


//Creates webcam instance

                    var Webcam = NodeWebcam.create( opts );


//Will automatically append location output type

                    Webcam.capture( "test_picture", function( err, data ) {} );


//Also available for quick use

                    NodeWebcam.capture( "test_picture", opts, function( err, data ) {
                        if(err){
                            res.write("Something Error :"+err);
                        }
                    });


//Get list of cameras

                    Webcam.list( function( list ) {

                        //Use another device

                        var anotherCam = NodeWebcam.create( { device: list[ 0 ] } );

                    });

//Return type with base 64 image

                    var opts = {
                        callbackReturn: "base64"
                    };
                    NodeWebcam.capture( "test_picture", opts, function( err, data ) {
                        if(err){
                            res.write("<br>Something Error :"+err);
                        }else{
                            var image = "<img src='" + data + "'>";
                            res.write("<br>"+image);
                        }
                        res.end();
                    });

                    //}

                }else if(params.API_type  == "Serialport") {
                    function printResponse(PrintResponse) {
                        if(PrintResponse != undefined ){
                            if(PrintResponse.length > 10){
                                res.write('<br>serialPort@ Vikinss$');
                            }
                            res.write(PrintResponse.split("port close")[0]);
                            if(PrintResponse.indexOf("port close") != -1){
                                res.end();
                            }
                        }
                    }
                    module.exports.printResponse = printResponse;
                    ////檢測Port狀態
                    if(params.Port != undefined){
                        console.log("New task to Port:"+params.Port+"...");
                        ///////////////////Set SerialPort
                        //res.write("New task to Port:  "+params.Port+"<br>");
                        console.log('Baudrate:'+params.baudrate);
                        PrintCode = require('./GCODE/Print.js');
                        var PrintResponse ="";
                        if(params.GcodeUrl == undefined || params.GcodeUrl == ''){
                            PrintResponse = PrintCode.printGcode(params.Port,'',params.baudrate,params.speed);
                        }else{
                            var Gcode_Array  =  params.GcodeUrl.split('--').filter(d=>d);
                            var inputGcode = Gcode_Array[0];
                                console.log('G-code:');
                            if(params.baudrate != ''){
                                for(Gcode_Arrayi = 0;Gcode_Arrayi <Gcode_Array.length;Gcode_Arrayi++){
                                    res.write('<br>serialPort@ Vikinss$ Code:');
                                    res.write(Gcode_Array[Gcode_Arrayi]);
                                }
                                PrintCode.printGcode(params.Port,params.GcodeUrl.replace(new RegExp('--','g'),'\n'),params.baudrate,params.speed);
                            }
                        }
                        //////
                    }else{
                        console.log("Error:None Port,You can use list of :");
                        var PortSelectBox ='';
                        serialport.list(function (err, ports) {
                            ports.forEach(function(port) {
                                if(port.pnpId != undefined){
                                    console.log(port.comName);
                                    //console.log(port.pnpId);
                                    //console.log(port.manufacturer);
                                    PortSelectBox = PortSelectBox+'<option value="'+port.comName+'">'+port.comName+'('+port.pnpId+','+port.manufacturer+')</option>';
                                    //res.write("COM_Name："+port.comName+"("+port.pnpId+","+port.manufacturer+")<br>");
                                }
                            });
                            var resText='<!DOCTYPE html>\n' +
                                '<html lang="en">\n' +
                                '<head>\n' +
                                '    <meta charset="UTF-8">\n' +
                                '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
                                '    <title>Vikinss</title>\n' +
                                '    <!-- Tocas UI：CSS 與元件 -->\n' +
                                '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tocas-ui/2.3.3/tocas.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/tocas-ui/2.3.3/tocas.js"></script><script src="http://'+req.headers.host.split(":")[0]+'/3dplus/Vikinss_API/GCODE/js/PrintClient.js"></script>\n' +
                                '</head>\n' +
                                '<body onload="onload();">\n' +
                                '<div class="ts menu" style="height: 80px;">\n' +
                                '    <div class="header stretched center aligned item"></div>\n' +
                                '    <a class="item">\n' +
                                '        <i class="plug icon"></i> <div class="tablet or large device only">官網</div>\n' +
                                '    </a>\n' +
                                '    <div class="right menu">\n' +
                                '        <a class="item"  onclick="callToggle();">\n' +
                                '            <i class="bars icon"></i> <div class="tablet or large device only">功能清單</div>\n' +
                                '        </a>\n' +
                                '        <div class="large screen only fitted item">\n' +
                                '            <div class="ts fluid borderless basic icon inverted input">\n' +
                                '                <input type="text" placeholder="搜尋 ...">\n' +
                                '                <i class="search icon"></i>\n' +
                                '            </div>\n' +
                                '        </div>\n' +
                                '    </div>\n' +
                                '</div>\n' +
                                '<div id="rightTable" class="ts static right sidebar disabled" style="height: auto;width: auto;" >\n' +
                                '    <div class="ts vertical big menu">\n' +
                                '        <a class="item">\n' +
                                '            <i class="shopping cart icon"></i> 用戶設定\n' +
                                '        </a>\n' +
                                '        <a class="item">\n' +
                                '            <i class="map pin icon"></i> 零件庫存\n' +
                                '        </a>\n' +
                                '        <a class="item">\n' +
                                '            <i class="phone icon"></i> 維修匯報\n' +
                                '        </a>\n' +
                                '        <a class="item">\n' +
                                '            <i class="sign in alt icon"></i> 登入\n' +
                                '        </a>\n' +
                                '    </div>\n' +
                                '</div>\n' +
                                '<div id="AllContent1" data-tab="first" data-tab-group="main" class="ts active bottom attached tab segment" style="height: 100%"><br><br>\n' +
                                '    <div class="ts stackable grid" style="width: 80%;text-align: center;left: 10%;">\n' +
                                '        <div class="four wide column">\n' +
                                '            <div class="ts card">\n' +
                                '                <div class="image">\n' +
                                '                    <img src="image/defaultPic.png">\n' +
                                '                    <div class="header">\n' +
                                '                        商品標題\n' +
                                '                        <div class="sub header">子標題</div>\n' +
                                '                    </div>\n' +
                                '                </div>\n' +
                                '                <div class="content">\n' +
                                '                    <p>商品內容1</p>\n' +
                                '                </div>\n' +
                                '                <div class="extra content">\n' +
                                '                    <div class="right floated author">\n' +
                                '                        <img class="ts circular avatar image" src="image/defaultHead.png"> 客戶1\n' +
                                '                    </div>\n' +
                                '                </div>\n' +
                                '            </div>\n' +
                                '        </div>\n' +
                                '        <div class="four wide column">\n' +
                                '            <div class="ts card">\n' +
                                '                <div class="image">\n' +
                                '                    <img src="image/defaultPic.png">\n' +
                                '                    <div class="header">\n' +
                                '                        商品標題\n' +
                                '                        <div class="sub header">子標題</div>\n' +
                                '                    </div>\n' +
                                '                </div>\n' +
                                '                <div class="content">\n' +
                                '                    <p>商品內容2</p>\n' +
                                '                </div>\n' +
                                '                <div class="extra content">\n' +
                                '                    <div class="right floated author">\n' +
                                '                        <img class="ts circular avatar image" src="image/defaultHead.png"> 客戶2\n' +
                                '                    </div>\n' +
                                '                </div>\n' +
                                '            </div>\n' +
                                '        </div>\n' +
                                '        <div class="four wide column">\n' +
                                '            <div class="ts card">\n' +
                                '                <div class="image">\n' +
                                '                    <img src="image/defaultPic.png">\n' +
                                '                    <div class="header">\n' +
                                '                        商品標題\n' +
                                '                        <div class="sub header">子標題</div>\n' +
                                '                    </div>\n' +
                                '                </div>\n' +
                                '                <div class="content">\n' +
                                '                    <p>商品內容3</p>\n' +
                                '                </div>\n' +
                                '                <div class="extra content">\n' +
                                '                    <div class="right floated author">\n' +
                                '                        <img class="ts circular avatar image" src="image/defaultHead.png"> 客戶3\n' +
                                '                    </div>\n' +
                                '                </div>\n' +
                                '            </div>\n' +
                                '        </div>\n' +
                                '        <div class="four wide column">\n' +
                                '            <div class="ts card">\n' +
                                '                <div class="image">\n' +
                                '                    <img src="image/defaultPic.png">\n' +
                                '                    <div class="header">\n' +
                                '                        商品標題\n' +
                                '                        <div class="sub header">子標題</div>\n' +
                                '                    </div>\n' +
                                '                </div>\n' +
                                '                <div class="content">\n' +
                                '                    <p>商品內容4</p>\n' +
                                '                </div>\n' +
                                '                <div class="extra content">\n' +
                                '                    <div class="right floated author">\n' +
                                '                        <img class="ts circular avatar image" src="image/defaultHead.png"> 客戶4\n' +
                                '                    </div>\n' +
                                '                </div>\n' +
                                '            </div>\n' +
                                '        </div>\n' +
                                '    </div>\n' +
                                '</div>\n' +
                                '<div id="AllContent2" data-tab="second" data-tab-group="main" class="ts bottom attached tab segment" style="height: 100%">\n' +
                                '<select id="portChoice" class="ts basic inverted dropdown" style="width: 100%">'+PortSelectBox +'</select>\n' +
                                '<div class="ts labeled input" style="width:100%;">\n' +
                                '    <div class="ts label">\n' +
                                '        Baudrate：\n' +
                                '    </div>\n' +
                                '    <input id="baudrate" type="text" placeholder="Connect Port" style="width: 100%;">\n' +
                                '<button class="ts primary basic button" onclick=printGcode(document.getElementById("portChoice").value,"",document.getElementById("baudrate").value);>Read</button>\n' +
                                '</div>\n' +
                                '<div class="ts resizable input" style="width: 100%;height: 150px">\n' +
                                ' <textarea id="inputG_code" placeholder="Gcode..."  style="width: 100%;height: 100%"></textarea>\n' +
                                '</div>\n' +
                                    '<div class="ts fluid bottom attached buttons" style="width: 100%;">\n' +
                                    '    <div class="ts positive button" onclick=printGcode(document.getElementById("portChoice").value,document.getElementById("inputG_code").value,document.getElementById("baudrate").value);>Send Code</div>\n' +
                                   '    <div class="ts inverted button" ><label for="GcodeFile">Open File</label></div><input id="GcodeFile" type="file" onchange=printGcode(document.getElementById("portChoice").value,"file",document.getElementById("baudrate").value); style="display:none;">\n' +
                                    '    <div class="ts negative button" onclick=document.getElementById("inputG_code").value="";document.getElementById("inputG_code").placeholder="Gcode...";>cancel</div>\n' +
                                    '</div>\n' +
                                    '<div id="systemMsg" class="ts inverted segment" style="width: 100%;height: 230px;overflow: auto;">\n' +
                                    '    <div>serialPort@ Vikinss$ </div>\n' +
                                    '</div>\n' +
                                '</div>\n' +
                                '<div id="AllContent3" data-tab="third"  data-tab-group="main"  class="ts bottom attached tab segment" style="height: 100%">\n' +
                                '    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.0397948620125!2d120.43728571531052!3d23.49507608471589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e95d6f67dea23%3A0xa808ffb15aadf16a!2zNjAw5ZiJ576p5biC6KW_5Y2A5LiW6LOi6Lev5LiA5q61MjUw6Jmf!5e0!3m2!1szh-TW!2stw!4v1540879754947" width="100%" height="350" frameborder="0" style="border:0" allowfullscreen></iframe>\n' +
                                '</div>\n' +
                                '<div id="MainMenu" class="ts mini borderless bottom fixed evenly divided labeled icon menu">\n' +
                                '    <a data-tab="first" data-tab-group="main" class="active item">\n' +
                                '        <i class="star icon"></i>\n' +
                                '        本日排程\n' +
                                '    </a>\n' +
                                '    <a data-tab="second" data-tab-group="main" class="item">\n' +
                                '        <i class="browser icon"></i>\n' +
                                '        工程模式\n' +
                                '    </a>\n' +
                                '    <a data-tab="third" data-tab-group="main" class="item">\n' +
                                '        <i class="compass icon"></i>\n' +
                                '        設備位置導航\n' +
                                '    </a>\n' +
                                '    <a href="#!" class="mobile only item">\n' +
                                '        <i class="search icon"></i>\n' +
                                '        搜尋\n' +
                                '    </a>\n' +
                                '</div>\n' +
                                '</body>\n' +
                                '</html>';
                            res.write(resText);
                            res.end();
                        });
                    }
                }
                ///res.write("<br>");
                ///////////////////////////////////////////////
                ///res.write("Show_GET(API_type)：" + params.API_type);
                ///res.write("<br>");
                ///res.write("Show_GET(System)：" + params.System);
                ///res.write("<br>");
                /////////////POST
                //if(body.name && body.url) { // 输出提交的数据
                //    res.write("Show_POST(name)：" + body.name);
                //    res.write("<br>");
                //    res.write("Show_POST(url)：" + body.url);
                    //res.end();
                //} else {  // 输出表单
                //    res.write("Error：API Post not set");
                    //res.end();
                //}
            }else{////if GET State not found
                res.write("Error：API Name not set");
                res.end();
            }



        });
    }).listen(3000);
}
