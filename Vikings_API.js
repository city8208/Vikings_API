//Version 20181210 V 5

///////////////////Set Web POST/GET
var http = require('http'),
    url = require('url'),
    util = require('util'),
    fs = require('fs'),
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
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
            //res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
            //////////////GET
            var params = url.parse(req.url, true).query;
            if(req.url != "/" && params.API_type != undefined  && params.System != undefined ){
                /////////////Print Response Code
                function printResponse(PrintResponse) {
                    if(PrintResponse != undefined ){
                        if(PrintResponse.length > 10){
                            if(res){
                                res.write('<br>serialPort@ Vikings$');
                            }
                            console.log(PrintResponse);
                        }
                        res.write(" "+PrintResponse.split("$Close")[0]);
                        //console.log(PrintResponse);
                        //console.log(PrintResponse.indexOf("$Close"));
                        if(PrintResponse.indexOf("$Close") != -1){
                            console.log('Task finish...');
                            if(params.Port != undefined) {
                                res.end();
                            }
                        }
                    }
                }
                module.exports.printResponse = printResponse;
                ///////////////////////Check GET input//////////
                if(params.API_type  == "JSON"){
                    res.write("Success "+params.API_type+" " + params.System);
                }else if(params.API_type  == "Table"){
                    res.write("Success "+params.API_type+" " + params.System);
                }else if(params.API_type  == "Camera") {
                    PrintCamera = require('./Camera/Camera.js');
                    PrintCamera.callCamera(params.Port);
                }else if(params.API_type  == "Serialport") {
                    ////檢測Port狀態
                    if(params.Port != undefined){
                        requestIp = require('request-ip');// inside middleware handler
                        var IP = requestIp.getClientIp(req);
                        console.log("New task to Port:"+params.Port+"...From '"+IP+"'");
                        ///////////////////Set SerialPort
                        PrintCode = require('./GCODE/Print.js');
                        //res.write("New task to Port:  "+params.Port+"<br>");
                        console.log('Baudrate:'+params.baudrate);

                        var PrintResponse ="";
                        if(params.GcodeUrl == undefined || params.GcodeUrl == '' ){
                            PrintResponse = PrintCode.printGcode(params.Port,'',params.baudrate,params.speed);
                        }else{
                            var Gcode_Array  =  params.GcodeUrl.split('--').filter(d=>d);
                            var inputGcode = Gcode_Array[0];
                                ///console.log('G-code:');
                            if(params.baudrate != ''){
                                for(Gcode_Arrayi = 0;Gcode_Arrayi <Gcode_Array.length;Gcode_Arrayi++){
                                    res.write('<br>serialPort@ Vikings$ Code:');
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
                            fs.readFile('APP/index.html', function(err,data){
                                if(err){
                                    res.write(err);
                                }else{
                                    //res.write("http://"+req.headers.host.split(":")[0]+"/Vikings_API/APP/");
                                    var ReturnString =data.toString();
                                    res.write(ReturnString.replace(/APIUrl/g,"http://"+req.headers.host.split(":")[0]+"/Vikings_API").replace(/PortSelectBox/g,PortSelectBox));
                                }
                                res.end();
                            });

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

