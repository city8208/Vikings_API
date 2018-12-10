function onload() {
    ts('.icon.menu .item').tab();
    ts('.tabbed.menu .item').tab();
    ts('.menu .item').tab();
    loadSlick();
    ///ts('.sub.header').tab();
}
function loadSlick() {
    $('.mobile-class').slick({

        infinite: true,         //重覆輪播
        slidesToShow:1,         //輪播顯示個數
        slidesToScroll: 1,      //輪播捲動個數
        autoplay: true,         //autoplay : 自動播放
        speed: 300,
        adaptiveHeight: true,
        responsive: [

            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows:false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows:false
                }
            }]
    });
    $('.PC-class').slick({

        infinite: true,         //重覆輪播
        slidesToShow:3,         //輪播顯示個數
        slidesToScroll: 1,      //輪播捲動個數
        autoplay: true,         //autoplay : 自動播放
        speed: 300,
        adaptiveHeight: true,
        responsive: [

            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows:false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows:false
                }
            }]
    });
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
function ShowLogin() {
    ts('#closableModal').modal("show");
    document.getElementById("closableModal").style.height ="100%";
    document.getElementById("closableModal").innerHTML ='        <div class="header">\n' +
        '            <div class="sub header" style="font-size: 15px;">選擇公司：\n' +
        '                <select class="ts basic dropdown">\n' +
        '                    <option>總公司</option>\n' +
        '                    <option>台中</option>\n' +
        '                </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="content" style="height: 76%;">\n' +
        '            <div class="ts vertical fluid inputs">\n' +
        '                <div class="ts input">\n' +
        '                    <input type="text" placeholder="帳號">\n' +
        '                </div>\n' +
        '                <div class="ts input">\n' +
        '                    <input type="password" placeholder="密碼">\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="actions" style="text-align: center;">\n' +
        '            <button class="ts positive button" onclick="Login(\'in\');">\n' +
        '                登入\n' +
        '            </button>\n' +
        '            <button class="ts deny button" onclick="CloseModal();">\n' +
        '                關閉\n' +
        '            </button>\n' +
        '        </div>';
    callToggle();
}
function Login(state) {
    if(state == 'in'){
        CloseModal()
        document.getElementById("MainMenu_2").classList.remove("disabled");
        document.getElementById("MainMenu_3").classList.remove("disabled");
        document.getElementById("MainMenu_4").classList.remove("disabled");
        document.getElementById("orderListItem").classList.remove("disabled");
        document.getElementById("BusinessListItem").classList.remove("disabled");
        document.getElementById("ReplenishmentListItem").classList.remove("disabled");
        document.getElementById("ARListItem").classList.remove("disabled");
        document.getElementById("orderListItem").style.display ="block";
        document.getElementById("BusinessListItem").style.display ="block";
        document.getElementById("ReplenishmentListItem").style.display ="block";
        document.getElementById("ARListItem").style.display ="block";

        document.getElementById("BillBoardBox").disabled = false;
        document.getElementById("logBTN").setAttribute("onclick","Login('out');");
        document.getElementById("logBTN").innerHTML = '<i class="sign out alt icon"></i> 登出';
    }else{
        document.getElementById("MainMenu_2").classList.add("disabled");
        document.getElementById("MainMenu_3").classList.add("disabled");
        document.getElementById("MainMenu_4").classList.add("disabled");
        document.getElementById("orderListItem").classList.add("disabled");
        document.getElementById("BusinessListItem").classList.add("disabled");
        document.getElementById("ReplenishmentListItem").classList.add("disabled");
        document.getElementById("ARListItem").classList.add("disabled");
        document.getElementById("orderListItem").style.display ="none";
        document.getElementById("BusinessListItem").style.display ="none";
        document.getElementById("ReplenishmentListItem").style.display ="none";
        document.getElementById("ARListItem").style.display ="none";
        document.getElementById("BillBoardBox").disabled = true;
        document.getElementById("logBTN").setAttribute("onclick","ShowLogin();");
        callToggle();
        document.getElementById("logBTN").innerHTML = '<i class="sign in alt icon"></i> 登入';
    }
}
function CallChoice(ChoiceNum) {
    ts('#closableModal').modal("show");
    document.getElementById("closableModal").style.height ="auto";
    document.getElementById("closableModal").innerHTML ='<div class="header">\n' +
        '            <div class="sub header" style="font-size: 15px;">' +
        '<div id="ModalCusName">'+document.getElementById("CusName"+ChoiceNum).innerHTML+'</div>\n' +
        '</div>\n' +
        '        </div>\n' +
        '        <div class="content" style="height: auto;">\n' +
        '    <div class="item" style="font-size:25px;height: 35px;" data-tab="third" data-tab-group="main" onclick="CallMap('+ChoiceNum+');">\n' +
        '        <i class="calendar alt icon"></i> 行程導航\n' +
        '    </div>\n' +
        '    <div class="item" style="font-size:25px;height: 35px;" data-tab="four" data-tab-group="main" onclick="CallUserData('+ChoiceNum+');">\n' +
        '        <i class="file icon"></i> 客戶明細\n' +
        '    </div>\n' +
        '    <div class="item" style="font-size:25px;height: 35px;" data-tab="seven" data-tab-group="main" onclick="CallUserOrder('+ChoiceNum+');">\n' +
        '        <i class="shopping cart icon"></i> 訂單狀態\n' +
        '    </div>\n' +
        '    <div class="item" style="font-size:25px;height: 35px;" data-tab="eight" data-tab-group="main" onclick="CallUserBusiness('+ChoiceNum+');">\n' +
        '        <i class="male icon"></i> 銷售訂單\n' +
        '    </div>\n' +
        '    <div class="item" style="font-size:25px;height: 35px;" data-tab="nine" data-tab-group="main" onclick="CallUserReplenishment('+ChoiceNum+')">\n' +
        '        <i class="building icon"></i> 提貨單\n' +
        '    </div>\n' +
        '    <div class="item" style="font-size:25px;height: 35px;" data-tab="five" data-tab-group="main" onclick="CallUserAR('+ChoiceNum+');">\n' +
        '        <i class="phone icon"></i> 應收帳款\n' +
        '    </div>\n' +
        '        </div>\n' +
        '        <div class="actions" style="text-align: center;"></div>';
    ts('.content .item').tab();
}
function GetChoice() {

}
function CallCusChoice(functionName,datatab) {
    ts('#closableModal').modal("show");
    var FuctionName = 'CallUser'+functionName+'(document.getElementById("CusSelect").value);';
    document.getElementById("closableModal").style.height ="auto";
    document.getElementById("closableModal").innerHTML ='<div class="header">\n' +
        '        </div>\n' +
        '        <div class="content" style="height: 76%;">\n' +
        '            <div class="sub header" style="font-size: 15px;">選擇客戶：\n' +
        '                <select id="CusSelect" class="ts basic dropdown">\n' +
        '                    <option value="1">402055 - 美都</option>\n' +
        '                    <option value="2">57008 - 賓姿</option>\n' +
        '                    <option value="3">358001 - 欣姿</option>\n' +
        '                </select>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="actions" style="text-align: center;">\n' +
        '            <button class="ts positive button" data-tab="'+datatab+'" data-tab-group="main" onclick='+FuctionName+'>\n' +
        '                選擇\n' +
        '            </button>\n' +
        '            <button class="ts deny button" onclick="CloseModal();">\n' +
        '                關閉\n' +
        '            </button>\n' +
        '        </div>';
    ts('.actions .button').tab();
    callToggle();
}
function CallMap(CusNum) {
    CloseModal();
    var CusAddress = document.getElementById("header"+CusNum).innerHTML;
    if(CusAddress.indexOf("台灣") == -1){
        CusAddress = "台灣"+CusAddress;
    }
    document.getElementById("AllContent3").innerHTML = '<iframe width="100%" height="350" frameborder="0" style="border:0" marginheight="0" marginwidth="0" src="http://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q='+CusAddress+'&z=16&output=embed&t=" allowfullscreen></iframe>';
}
function CallUserData(CusNum) {
    CloseModal()
}
function CallUserBusiness(CusNum) {
    CloseModal()
    document.getElementById("BusinessCus").innerHTML = document.getElementById("CusName"+CusNum).innerHTML;
    document.getElementById("BusinessTable").innerHTML = '                    <div class="ts stackable grid" style="bottom: 20px;width: 80%;text-align: center;left: 10%;">\n' +
        '                        <div id="Businessdefault" class="ts primary card" style="display: block;width: 100%;top: 30px;display: none;">\n' +
        '                            <div class="content">\n' +
        '                                <div class="description">\n' +
        '                                    <div class="ts form">\n' +
        '                                        <div class="ts mini form">\n' +
        '                                            無對應產品\n' +
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="Business_1" class="four wide column" >\n' +
        '                            <div class="ts card">\n' +
        '                                <div class="image">\n' +
        '                                    <img src="http://'+location.hostname+'/3dplus/Vikings_API/APP/image/defaultPic.png">\n' +
        '                                    <div class="header">\n' +
        '                                        0002 - 1KG空罐 <i class="image icon"></i>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <div class="content" style="text-align: left">\n' +
        '                                    <p style="display: inline;">公司倉：</p><div class="ts input" style="display: inline;"><input type="text" placeholder="0" value="0" style="width: 20%;">箱<input type="text" placeholder="0" value="0" style="width: 20%;">瓶</div><br>\n' +
        '                                    <p style="display: inline;">業務倉：</p><div class="ts input" style="display: inline;"><input type="text" placeholder="0" value="0" style="width: 20%;">箱<input type="text" placeholder="0" value="0" style="width: 20%;">瓶</div><br>\n' +
        '                                    <p style="display: inline;">銷售價：</p><input type="text" placeholder="0" value="0" style="width: 40%;">元<div class="right floated author"><button class="ts icon button"><i class="save icon"></i></button> </div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="Business_2" class="four wide column">\n' +
        '                            <div class="ts card">\n' +
        '                                <div class="image">\n' +
        '                                    <img src="http://'+location.hostname+'/3dplus/Vikings_API/APP/image/defaultPic.png">\n' +
        '                                    <div class="header">\n' +
        '                                        0003 - 小平板膏空罐 <i class="image icon"></i>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <div class="content" style="text-align: left">\n' +
        '                                    <p style="display: inline;">公司倉：</p><div class="ts input" style="display: inline;"><input type="text" placeholder="0" value="0" style="width: 20%;">箱<input type="text" placeholder="0" value="0" style="width: 20%;">瓶</div><br>\n' +
        '                                    <p style="display: inline;">業務倉：</p><div class="ts input" style="display: inline;"><input type="text" placeholder="0" value="0" style="width: 20%;">箱<input type="text" placeholder="0" value="0" style="width: 20%;">瓶</div><br>\n' +
        '                                    <p style="display: inline;">銷售價：</p><input type="text" placeholder="0" value="0" style="width: 40%;">元<div class="right floated author"><button class="ts icon button"><i class="save icon"></i></button> </div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="Business_3" class="four wide column">\n' +
        '                            <div class="ts card">\n' +
        '                                <div class="image">\n' +
        '                                    <img src="http://'+location.hostname+'/3dplus/Vikings_API/APP/image/defaultPic.png">\n' +
        '                                    <div class="header">\n' +
        '                                        E 09 - 1KG髮油(白花) <i class="image icon"></i>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <div class="content" style="text-align: left">\n' +
        '                                    <p style="display: inline;">公司倉：</p><div class="ts input" style="display: inline;"><input type="text" placeholder="0" value="0" style="width: 20%;">箱<input type="text" placeholder="0" value="0" style="width: 20%;">瓶</div><br>\n' +
        '                                    <p style="display: inline;">業務倉：</p><div class="ts input" style="display: inline;"><input type="text" placeholder="0" value="0" style="width: 20%;">箱<input type="text" placeholder="0" value="0" style="width: 20%;">瓶</div><br>\n' +
        '                                    <p style="display: inline;">銷售價：</p><input type="text" placeholder="0" value="0" style="width: 40%;">元<div class="right floated author"><button class="ts icon button"><i class="save icon"></i></button></div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="Business_4" class="four wide column">\n' +
        '                            <div class="ts card">\n' +
        '                                <div class="image">\n' +
        '                                    <img src="http://'+location.hostname+'/3dplus/Vikings_API/APP/image/defaultPic.png">\n' +
        '                                    <div class="header">\n' +
        '                                        H 04-1 - 桑黛兒提袋(黑白) <i class="image icon"></i>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <div class="content" style="text-align: left">\n' +
        '                                    <p style="display: inline;">公司倉：</p><div class="ts input" style="display: inline;"><input type="text" placeholder="0" value="0" style="width: 20%;">箱<input type="text" placeholder="0" value="0" style="width: 20%;">瓶</div><br>\n' +
        '                                    <p style="display: inline;">業務倉：</p><div class="ts input" style="display: inline;"><input type="text" placeholder="0" value="0" style="width: 20%;">箱<input type="text" placeholder="0" value="0" style="width: 20%;">瓶</div><br>\n' +
        '                                    <p style="display: inline;">銷售價：</p><input type="text" placeholder="0" value="0" style="width: 40%;">元<div class="right floated author"><button class="ts icon button"><i class="save icon"></i></button> </div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>';
}
function CallUserReplenishment(CusNum) {
    callToggle();
    document.getElementById("ReplenishmentTable").innerHTML = '                    <div class="ts stackable grid" style="bottom: 20px;width: 80%;text-align: center;left: 10%;">\n' +
        '                        <div id="Replenishmentdefault" class="ts primary card" style="display: block;width: 100%;top: 30px;display: none;">\n' +
        '                            <div class="content">\n' +
        '                                <div class="description">\n' +
        '                                    <div class="ts form">\n' +
        '                                        <div class="ts mini form">\n' +
        '                                            無對應產品\n' +
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="Replenishment_1" class="four wide column" >\n' +
        '                            <div class="ts card">\n' +
        '                                <div class="image">\n' +
        '                                    <img src="http://'+location.hostname+'/3dplus/Vikings_API/APP/image/defaultPic.png">\n' +
        '                                    <div class="header">\n' +
        '                                        0002 - 1KG空罐 <i class="image icon"></i>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <div class="content" style="text-align: left">\n' +
        '                                    <p style="display: inline;">公司倉：</p><div class="ts input" style="display: inline;"><input type="text" placeholder="0" value="0" style="width: 20%;">箱<input type="text" placeholder="0" value="0" style="width: 20%;">瓶</div> <div class="right floated author"><button class="ts icon button"><i class="save icon"></i></button> </div><br>\n' +
        '                                    <p style="display: inline;">業務倉：</p><div class="ts input" style="display: inline;"><input type="text" placeholder="0" value="0" style="width: 20%;">箱<input type="text" placeholder="0" value="0" style="width: 20%;">瓶</div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="Replenishment_2" class="four wide column">\n' +
        '                            <div class="ts card">\n' +
        '                                <div class="image">\n' +
        '                                    <img src="http://'+location.hostname+'/3dplus/Vikings_API/APP/image/defaultPic.png">\n' +
        '                                    <div class="header">\n' +
        '                                        0003 - 小平板膏空罐 <i class="image icon"></i>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <div class="content" style="text-align: left">\n' +
        '                                    <p style="display: inline;">公司倉：</p><div class="ts input" style="display: inline;"><input type="text" placeholder="0" value="0" style="width: 20%;">箱<input type="text" placeholder="0" value="0" style="width: 20%;">瓶</div> <div class="right floated author"><button class="ts icon button"><i class="save icon"></i></button> </div><br>\n' +
        '                                    <p style="display: inline;">業務倉：</p><div class="ts input" style="display: inline;"><input type="text" placeholder="0" value="0" style="width: 20%;">箱<input type="text" placeholder="0" value="0" style="width: 20%;">瓶</div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="Replenishment_3" class="four wide column">\n' +
        '                            <div class="ts card">\n' +
        '                                <div class="image">\n' +
        '                                    <img src="http://'+location.hostname+'/3dplus/Vikings_API/APP/image/defaultPic.png">\n' +
        '                                    <div class="header">\n' +
        '                                        E 09 - 1KG髮油(白花) <i class="image icon"></i>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <div class="content" style="text-align: left">\n' +
        '                                    <p style="display: inline;">公司倉：</p><div class="ts input" style="display: inline;"><input type="text" placeholder="0" value="0" style="width: 20%;">箱<input type="text" placeholder="0" value="0" style="width: 20%;">瓶</div> <div class="right floated author"><button class="ts icon button"><i class="save icon"></i></button> </div><br>\n' +
        '                                    <p style="display: inline;">業務倉：</p><div class="ts input" style="display: inline;"><input type="text" placeholder="0" value="0" style="width: 20%;">箱<input type="text" placeholder="0" value="0" style="width: 20%;">瓶</div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="Replenishment_4" class="four wide column">\n' +
        '                            <div class="ts card">\n' +
        '                                <div class="image">\n' +
        '                                    <img src="http://'+location.hostname+'/3dplus/Vikings_API/APP/image/defaultPic.png">\n' +
        '                                    <div class="header">\n' +
        '                                        H 04-1 - 桑黛兒提袋(黑白) <i class="image icon"></i>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                                <div class="content" style="text-align: left">\n' +
        '                                    <p style="display: inline;">公司倉：</p><div class="ts input" style="display: inline;"><input type="text" placeholder="0" value="0" style="width: 20%;">箱<input type="text" placeholder="0" value="0" style="width: 20%;">瓶</div> <div class="right floated author"><button class="ts icon button"><i class="save icon"></i></button> </div><br>\n' +
        '                                    <p style="display: inline;">業務倉：</p><div class="ts input" style="display: inline;"><input type="text" placeholder="0" value="0" style="width: 20%;">箱<input type="text" placeholder="0" value="0" style="width: 20%;">瓶</div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>';
}
function CallUserAR(CusNum) {
    CloseModal();
    //document.getElementById("closableModal").style.height ="auto";
    //document.getElementById("closableModal").innerHTML ='        <div class="header">客戶應收款項通知</div>\n' +
    //    '        <div class="content" style="height: 76%;">\n' +
    //    '            <div class="ts vertical fluid inputs">此顧客尚無應收款項</div>\n' +
    //    '        </div>';
    document.getElementById("ARCus").innerHTML = document.getElementById("CusName"+CusNum).innerHTML;
    document.getElementById("ARTable").innerHTML = '<table id="ARTB" class="ts sortable table">\n' +
        '    <thead>\n' +
        '        <tr>\n' +
        '            <th style="position: sticky;top: 0;z-index: 9;">產品ID</th>\n' +
        '            <th style="position: sticky;top: 0;z-index: 9;">產品名</th>\n' +
        '            <th style="position: sticky;top: 0;z-index: 9;">數量</th>\n' +
        '            <th style="position: sticky;top: 0;z-index: 9;">單位</th>\n' +
        '            <th style="position: sticky;top: 0;z-index: 9;">單價</th>\n' +
        '            <th style="position: sticky;top: 0;z-index: 9;">折扣</th>\n' +
        '            <th style="position: sticky;top: 0;z-index: 9;">折扣單價</th>\n' +
        '            <th style="position: sticky;top: 0;z-index: 9;">折扣總計</th>\n' +
        '        </tr>\n' +
        '    </thead>\n' +
        '    <tbody>\n' +
        '        <tr>\n' +
        '            <td>F 585</td>\n' +
        '            <td>芝染髮膏非常淺褐色5ml</td>\n' +
        '            <td>50</td>\n' +
        '            <td>盒</td>\n' +
        '            <td>150</td>\n' +
        '            <td>無折扣</td>\n' +
        '            <td>150</td>\n' +
        '            <td>7500</td>\n' +
        '        </tr>\n' +
        '        <tr>\n' +
        '            <td>SU31-S</td>\n' +
        '            <td>藝思晨香水極潤瞬間隔離霜(5ml)</td>\n' +
        '            <td>10</td>\n' +
        '            <td>支</td>\n' +
        '            <td>350</td>\n' +
        '            <td>無折扣</td>\n' +
        '            <td>350</td>\n' +
        '            <td>3500</td>\n' +
        '        </tr>\n' +
        '        <tr>\n' +
        '            <td>0002</td>\n' +
        '            <td>1KG空罐</td>\n' +
        '            <td>10</td>\n' +
        '            <td>瓶</td>\n' +
        '            <td>0</td>\n' +
        '            <td>無折扣</td>\n' +
        '            <td>0</td>\n' +
        '            <td>0</td>\n' +
        '        </tr>\n' +
        '    </tbody>\n' +
        '</table>';
    ts('#ARTB').tablesort();
}
function CallUserOrder(CusNum) {
    CloseModal();
    //document.getElementById("closableModal").style.height ="auto";
    //document.getElementById("closableModal").innerHTML ='        <div class="header">客戶應收款項通知</div>\n' +
    //    '        <div class="content" style="height: 76%;">\n' +
    //    '            <div class="ts vertical fluid inputs">此顧客尚無應收款項</div>\n' +
    //    '        </div>';
    document.getElementById("OrderCus").innerHTML = document.getElementById("CusName"+CusNum).innerHTML;
    document.getElementById("OrderTable").innerHTML = '<table id="OrderTB" class="ts sortable table">\n' +
        '    <thead>\n' +
        '        <tr>\n' +
        '            <th style="position: sticky;top: 0;z-index: 9;width: 15%;">訂單號碼</th>\n' +
        '            <th style="position: sticky;top: 0;z-index: 9;">訂單日期</th>\n' +
        '            <th style="position: sticky;top: 0;z-index: 9;">出貨日期</th>\n' +
        '            <th style="position: sticky;top: 0;z-index: 9;">執行動作</th>\n' +
        '        </tr>\n' +
        '    </thead>\n' +
        '    <tbody>\n' +
        '        <tr>\n' +
        '            <td>1</td>\n' +
        '            <td>2018-11-16</td>\n' +
        '            <td>2018-11-25</td>\n' +
        '            <td><div class="ts fluid stackable buttons"><button class="ts very compact button">明細</button><button class="ts very compact positive button">編輯</button><button class="ts very compact primary button">上傳</button></div></td>\n' +
        '        </tr>\n' +
        '        <tr>\n' +
        '            <td>2</td>\n' +
        '            <td>2018-11-16</td>\n' +
        '            <td>2018-12-03</td>\n' +
        '            <td><div class="ts fluid stackable buttons"><button class="ts very compact button">明細</button><button class="ts very compact positive button">編輯</button><button class="ts very compact primary button">上傳</button></div></td>\n' +
        '        </tr>\n' +
        '        <tr>\n' +
        '            <td>3</td>\n' +
        '            <td>2018-11-30</td>\n' +
        '            <td>2018-12-10</td>\n' +
        '            <td><div class="ts fluid stackable buttons"><button class="ts very compact button">明細</button><button class="ts very compact disabled primary button">已上傳</button></div></td>\n' +
        '        </tr>\n' +
        '    </tbody>\n' +
        '</table>';
    ts('#OrderTB').tablesort();
}
function CloseModal() {
    ts('#closableModal').modal("hide");
}
var AllhtmlLength =0;
function CallKeyWord(){
    ////check Any type type is Used now
    if(AllhtmlLength == 0){
        AllhtmlLength = document.getElementById("indexBody").innerHTML.split("AllContent").length-1;
    }
    var CheckWhatOnUse =0;
    for(AllhtmlLengthi =1 ;AllhtmlLengthi <= AllhtmlLength;AllhtmlLengthi++){
        var ClassString =document.getElementById("AllContent"+AllhtmlLengthi).classList.toString();
        if( ClassString.indexOf('active') != -1){
            CheckWhatOnUse = AllhtmlLengthi;
        }
    }
    ///Use CheckWhatOnUse to set motion
    if(CheckWhatOnUse != 0){
        var KeyType ="";
        if(CheckWhatOnUse == 2){
            KeyType = "Cus";
            ///now is use Cus Page,Keyword search Cus
        }else if(CheckWhatOnUse == 6){
            KeyType = "Item";
        }else if(CheckWhatOnUse == 8){
            KeyType = "Business";
        }else if(CheckWhatOnUse == 9){
            KeyType = "Replenishment";
        }
        var keyTypeLength = document.getElementById("AllContent"+CheckWhatOnUse).innerHTML.split('id="'+KeyType+"_").length-1;
        if(document.getElementById("Keyword").value == "" ){
            for(keyTypeLengthi =1 ;keyTypeLengthi<=keyTypeLength;keyTypeLengthi++){
               document.getElementById(KeyType+"_"+keyTypeLengthi).style.display = "block";
            }
        }else{
            for(keyTypeLengthi =1 ;keyTypeLengthi<=keyTypeLength;keyTypeLengthi++){
                if(document.getElementById(KeyType+"_"+keyTypeLengthi).innerHTML.indexOf(document.getElementById("Keyword").value) != -1){
                    document.getElementById(KeyType+"_"+keyTypeLengthi).style.display = "block";
                }else{
                    document.getElementById(KeyType+"_"+keyTypeLengthi).style.display = "none";
                }
            }
        }
        if((document.getElementById("AllContent"+CheckWhatOnUse).innerHTML.split('style="display: block;"').length-1) <1){
            document.getElementById(KeyType+"default").style.display = "block";
        }else{
            document.getElementById(KeyType+"default").style.display = "none";
        }

    }
}