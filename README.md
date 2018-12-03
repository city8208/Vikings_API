####  Step1：Open root Permission and install Newest node.js(11.x)/fswebcam 
```
sudo su
curl -sL https://deb.nodesource.com/setup_11.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install nodejs -y
sudo apt-get install build-essential -y
sudo apt-get install fswebcam -y
sudo apt-get upgrade -y


```


####  Step2：install config/node-gyp
```
npm install -g config
npm install -g node-gyp

```

####  Step3：install Newest npm(11.x) and serialport 
```
sudo su
npm i -g npm-check-updates
npm-check-updates -u
npm install --unsafe-perm
npm install serialport --unsafe-perm
npm install config --unsafe-perm
npm install express --unsafe-perm
npm install node-webcam --unsafe-perm
npm install request-ip --unsafe-perm
```

####  Step4：Go Website Folder to restart Step2 and Step3 again
```
cd Vikinss_API
```

####  Step5：Start Vikinss_API and hope you like 
```
node Vikinss_API.js
```

####  Precautions：If you want to close this mode.Just stop it by this：
```
sudo killall -9 node
```


# API Input

### 1.JSON(Connect & Creat Data)(2018/12/2)

| `Coming Soon` |
| ------------- |

### 2.Table(Connect & Creat Table html)(2018/12/2)

| `Coming Soon` |
| ------------- |

### 3.Camera(Serial Port & Response image)(2018/12/2)

| Parameter  | Description |
| ------------- | ------------- |
| `Port`  | /dev/video0,video1,video2... |


### 4.Serialport(Connect Control panel & Get Response)(2018/12/2)

| Command | Description |
| ------------- | ------------- |
| `Port`  | /dev/tty0,tty1,ttyUSB0... |
| `Baudrate`  | 250000(MKS GEN) |
| `GcodeUrl`  | G1 X25 F3000....(Gcode) |

```
# System :
1.ASP(window server)
2.PHP(ubuntu)

# Example:
http://your.webUrl:3000/?API_type=Camera&System=PHP&Port=/dev/video1
http://your.webUrl:3000/?API_type=Serialport&System=PHP&Port=&GcodeUrl=M17&baudrate=250000

# if you want to open control panel:
http://your.webUrl:3000/?API_type=Serialport&System=PHP


```

