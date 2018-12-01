Step1：Open root Permission and install Newest node.js(11.x)/fswebcam 
```
sudo su
curl -sL https://deb.nodesource.com/setup_11.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install nodejs -y
sudo apt-get install build-essential -y
sudo apt-get install fswebcam -y
sudo apt-get upgrade -y


```


Step2：install config/node-gyp
```
npm install -g config
npm install -g node-gyp

```

Step3：install Newest npm(11.x) and serialport 
```
sudo su
npm i -g npm-check-updates
npm-check-updates -u
npm install --unsafe-perm
npm install serialport --unsafe-perm
npm install config --unsafe-perm
npm install express --unsafe-perm
npm install node-webcam --unsafe-perm

```

Step4：Go Website Folder to restart Step2 and Step3 again
```
cd Vikinss_API
```

Step5：Start Vikinss_API and hope you like 
```
node Vikinss_API.js
```

Precautions：If you want to close this mode.Just stop it by this：
```
sudo killall -9 node
```


API Input
```
API_type :
1.JSON(Connect & Creat Data)(2018/12/2)
2.Table(Connect & Creat Table html)(2018/12/2)
3.Camera(Serial Port & Response image)(2018/12/2)
4.Serialport(Connect Control panel & Get Response)(2018/12/2)

System :
1.ASP(window server)
2.PHP(ubuntu)

Port :
1.Any serialport like /dev/video0 , /dev/ttyUSB0  

```

