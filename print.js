var serialport = require("serialport"),
    fs = require('fs'),
    argv = require('optimist').argv,
    GCODE = require('./GCODE/module.js');

var printCommands = [],
    printPosition = 0;

var settings = {
    printFile : undefined,
    serialPort : undefined,
    baudrate : undefined,
    printing : false,
    paused : false
}

//===========================================================
// Self executing function - Will run before the file load
// Usage: node [options] print.js --port [SERIAL PORT] --file [FILE PATH] --speed [SPEED MULTIPLIER]
//===========================================================

var handleArguments = (function(){

    if (argv.port){
        settings.serialPort = argv.port;
    } else {
        console.log("No serial port passed. Exiting");
        process.exit(1);
    }

    if(argv.baudrate){
        console.log(argv.baudrate);
        settings.baudrate = argv.baudrate;
    } else {
        console.log("No Baudrate passed for serial port. Exiting");
        process.exit(1);
    }

    if(argv.file){
        settings.printFile = argv.file;
        console.log(settings.printFile);
    } else {
        console.log("No print file passed. Exiting");
        console.log(argv.file);
        process.exit(1);
    }

    //Optional :: The multiplying factor that affects the travelling speed of the printhead
    if(argv.speed){
        console.log("Speed multiplying factor:" + argv.speed);
        GCODE.settings.speedMultiplier = argv.speed;
    }

})();

fs.readFile(settings.printFile, 'utf8', function (err,data) {

    if (err) {
        return console.log(err);
    }

    printCommands = GCODE.deconstruct(data);

});

var SerialPort = serialport.SerialPort;
var Readline = serialport.parsers.Readline;
var sp = new serialport(settings.serialPort, {
    parser: new Readline("\n"),
    baudrate : settings.baudRate
});

sp.on("open", function () {
    console.log("Serial Port " + settings.serialPort + " is open.");
    printPosition = 0;
    sp.on('data', function(data) {
        setTimeout(function(){
            if(settings.paused !== true){
                if(GCODE.reconstruct(printCommands[printPosition]) != undefined){
                    printerCommand(GCODE.reconstruct(printCommands[printPosition]));
                }
            }
        },50);

    });

});


function printerCommand(comm){

    if(comm !== undefined && comm.indexOf(" ") === comm.length - 1){
        console.log(comm.slice(comm.length - 1, comm.length));
        comm = comm.substring(0, comm.length - 1);

    }

    console.log((printPosition + 1) + " / " + printCommands.length + ": " + comm);

    sp.write(comm + "\n", function(err, results) {

        if(err){
            console.log(">>>ERR");
            console.log(err);
            console.log("<<<");
        }

        if(comm !== "M105"){
            printPosition += 1;
        }

    });

}

process.on('exit', function() {
    console.log("Issuing Stop Command");
    printerCommand("M112");

});