//Available in nodejs
Main = require('../Vikings_API.js');

function callCamera(Port) {
    var NodeWebcam = require( "node-webcam" );


//Default options

    var defaultopts = {

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
    var opts =defaultopts;

//Creates webcam instance
    if(Port != undefined){
        opts['device'] = Port;
    }

    var Webcam = NodeWebcam.create( opts );
    Webcam.list( function( list ) {
        if(Port != undefined){
            //Will automatically append location output type
            Webcam.capture( Port.split("/dev/")[1], function( err, data ) {
                if(!err){
                    var opts = {
                        callbackReturn: "base64"
                    };
                    NodeWebcam.capture( Port.split("/dev/")[1], opts, function( err, data ) {
                        if(!err){
                            var image = "<br>"+Port.split("/dev/")[1]+"<br><img src='" + data + "'>";
                        }else{
                            image ="Error:"+err;
                        }
                        Main.printResponse(image+"$Close");
                    });
                }
            } );
        }else{
            Port = list[0];
            image = "Error:None Port,You can use list of :<br>";
            console.log('Error:None Port,You can use list of :');
            for(listi=0;listi<list.length;listi++){
                if(list[listi].indexOf(".jpg") == -1){
                    image += list[listi]+'<br>';
                    console.log(list[listi]);
                }
            }

            Main.printResponse(image+"$Close");
        }
    });





//Return type with base 64 image


}
module.exports.callCamera = callCamera;
