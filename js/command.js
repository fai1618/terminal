    //getDATE
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth()+1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var day = time.getDay();
    switch (day) {
        case 0: day = "Sun";break;
        case 1: day = "Mon";break;
        case 2: day = "Tues";break;
        case 3: day = "Wed";break;
        case 4: day = "Thurs";break;
        case 5: day = "Fri";break;
        case 6: day = "Sat";break;
    }
    if(hours < 10){
        hours = "0"+hours;
    }
    if(minutes < 10){
        minutes = "0"+minutes;
    }
    if(seconds < 10){
        seconds = "0"+seconds;
    }

var terminalHeight = $(window).height()*0.8;//terminalの領域の高さ
var count = 1;

var allUserName = [
                   "user",
                   "kouhei"
                   ];

var allCommand = ["pwd","audio [option]",
                  "ls","mkdir [directoryName]",
                  "rmdir [directoryName]","now",
                  "cd [Absolute path]","startGL",
                  "stopGL","up (only when GLmode)",
                  "down (only　when GLmode)",
                  /*"login",*/"logout or exit",
                  "chat",
                  "talk"
                  ];

var allMusic = ["bgm.mp3","bird.mp3",
                "bootstrap-3.3.1-dist.mp3",
                "cyrf_cloudbase.mp3",
                "cyrf_mp3_disaster_of_legend.mp3",
                "cyrf_mp3_glitch.mp3",
                "cyrf_mp3_viewing.mp3",
                "devil.mp3",
                "Fantasy.mp3",
                "Fred-Breathe.mp3",
                "goodbye.mp3",
                "hoshinonagare.mp3",
                "plankton.mp3",
                "Racial.mp3",
                "Sacred.mp3",
                "Strobe(deadmau5).mp3"
                ];

var comName = "PCName";//"kouhei";
var dir = {"/":{}};
var nowDirName = "/";
var nowDir = dir["/"];
var userName = allUserName[0];

var keydownCheck = 0;

var chatTF = false;//chatの判別
var talkTF = false;//talkの判別

var audiod;

var speedplane;

var GL;//GLmodeの判別

$(document).ready(function(){
                    $("#login").text("login:"+year+"/"+month+"/"+date+" "+hours+":"+minutes+":"+seconds);
                    $("#input").prepend(comName+":"+nowDirName+" "+userName+"$");
                    $("#terminal").css("height",terminalHeight);
                  
                    audiod = document.getElementById("audio");
                    //audiod.currentTime = 4;
                  });

$(window).resize(function(){
                    if(GL === 1){
                        terminalHeight = $(window).height()*0.15;
                    }else{
                        terminalHeight = $(window).height()*0.8;
                    }
                    $("#terminal").css("height",terminalHeight);
                 });

$(window).keydown(function commandswitch(e){
                  $('input').focus();
                  console.log("all"+e.which);
                  if(e.which === 13){
                    //入力済みのdiv処理
                    var command = $("#input input").val();
                    $("#input").append(" "+command);
                    $("#input input").remove();
                    $('#input').attr('id', count);
                    //command判別
                    $("#terminal").append("<div id=\"res"+count+"\" class=\"res\"></div>");
                    

                if(chatTF === false && talkTF === false){
                    switch (command){
                        case "pwd": pwd(); break;
                        case "exit": end(); break;
                        case "logout": end(); break;
                        case "ls": ls(); break;
                        case "help": help(); break;
                        case "\"help\"": help(); break;
                        case "now": now(); break;
                        case "mkdir": dirError(); break;
                        case "rmdir": dirError(); break;
                        case "cd": dirError(); break;
                        case "startGL": startGL(); break;
                        case "stopGL": stopGL(); break;
                        case "up": speed(0.5);break;
                        case "down": speed(0.1);break;
                        //case "login": login();break;
                        case "chat": chat();break;
                        case "talk": talk();break;
                        default: commandJudge(command); break;
                  }
                }else{
                    if(chatTF === false ){//chatが無効なら
                        talk(command);
                    }else{
                        if(talkTF === false){//talkが無効なら
                            chat(command);
                        }else{
                            console.error("talk,chat両方が有効");
                        }
                    }
                }
                    e.preventDefault();
                    count++;
                  }
                  });

//--------------------------------command--------------------------------\\

function help(){//使用可能コマンド一覧
    var response = "<ol>";
    for(var f=0;f<allCommand.length;f++){
        response += "<li>"+allCommand[f]+"</li>";
    }
    response += "</ol>";
    $("#res"+count).append(response)
    next();
    console.log("command: help");
}

//-----------pepper用---------------------
function chat(saying){
    var res;
    if(chatTF === false){
        chatTF = true;
        res = "===chatモード===";
    }
    else{
        res = ">";
        switch(saying){
            case "こんにちは":res += saying;break;
            case "こんばんは":res += saying;break;
            case "あなたの名前は?":res += "私の名前はペッパーです。";break;//chatOnly[?]
            case "あなたの名前は？":res += "私の名前はペッパーです。";break;//chatOnly[？] //?or？
            case "":res += "...何か言ってくださいよ";break;//chatOnly[空白]
            case "終了":res = "===chatモード終了===";chatTF = false;break;
            case "end":res = "===chatモード終了===";chatTF = false;break;//chatOnly[英語]
            default:res += "わかりません";break;
        }
    }

    $("#res"+count).append(res);
    next();
    console.log("command: chat");
}

function talk(saying){
    var res;
    if(talkTF === false){
        talkTF = true;
        res = "===talkモード===";
    }
    else{
        res = ">";
        switch(saying){
            case "こんにちは":res += saying;break;
            case "こんばんは":res += saying;break;
            case "あなたの名前は":res += "私の名前はペッパーです。";break;//talkOnly[?なし]
            case "あなたの名前は":res += "私の名前はペッパーです。";break;//talkOnly[？なし] //?or？
            //case "":res += "...何か言ってくださいよ";break;//chatOnly[空白]
            case "終了":res = "===talkモード終了===";talkTF = false;break;
            default:res += "わかりません";break;
        }
    }
    $("#res"+count).append(res);
    next();
    console.log("command: talk");
}

//----------------------------------------



/*
function login(){
    console.log("login");
    keydownCheck = 1;
    console.log("keydownCheck: "+keydownCheck);
    var logincheck = 0;
    $("#res"+count).append("login: "+"<input id=\"login\" autofocus>");
        $(window).keydown(function(e){
                          keydownCheck = 1;
                          console.log("keydownCheck: "+keydownCheck);
                          $("#login").focus();
                          if(e.which === 13){
                            $("#res"+count).append("<div id=\"loginres\"></div>");
                            var loginname = $("#login").val();
                            $("#loginres").append(" "+loginname+"<br>");
                            $("#login").remove();
                            for(var g=0;g<allUserName.length;g++){
                                if(allUserName[g] === loginname){
                                    $("#loginres").append("password:<input id=\"pass\" type=\"password\" autofocus>");
                                    logincheck = 1;
                                    break;
                                }
                            }
                            if(logincheck === 0){
                                $("#loginres").append("login incorrect");
                                next();
                            }else{
                                password(loginname);
                            }
                            e.preventDefault();
                          }
                          keydownCheck=0;
                          });
}

function password(loginname){
    $(window).keydown(function(e){
        $("#pass").focus();
        if(e.which === 13){
            $("#res"+count).append("<div id=\"passres\"></div>");
            var passw = $("#pass").val();
            $("#pass").remove();
            if(passw === "asdfg"){
                userName = loginname;
            }
            else{
                $("#passres").append("login incorrect");
            }
            next();
            e.preventDefault();
        }
    });
}
*/

function speed(a){
    if(GL === 1){
        speedplane = a;
    }else{
        $("#res"+count).append("<div class=\"warning\">Not GLmode</div>");
    }
    next();
}

function end(){//exit,logout
    $("#res"+count).prepend("<br>[END]");
    console.log("-END-");
    $("#terminal").scrollTop(terminalHeight*1000);
    $("#terminal").css("display","none");
    window.open('about:blank','_self').close();
}

function dirError(){//mkdir,rmdir,cdでディレクトリ名が指定されていなかった時
    $("#res"+count).prepend("<div class=\"warning\">error:No directory name</div>");
    next();
}

function startGL(){
    $("canvas").css("display","block");
    GL = 1;
    render();
    audiod.play();
    next();
    $("#res"+count).css("display","none");
    terminalHeight = $(window).height()*0.15;
    $("#terminal").css("height",terminalHeight);
}

function stopGL(){
    $("canvas").css("display","none");
    GL = 0;
    audiod.pause();
    //audiod.currentTime = 4;
    next();
    terminalHeight = $(window).height()*0.8;
    $("#terminal").css("height",terminalHeight);
}

function now(){//現在の時間表示
    var nowTime = new Date();
    var nowYear = nowTime.getFullYear();
    var nowMonth = nowTime.getMonth()+1;
    var nowDate = nowTime.getDate();
    var nowHours = nowTime.getHours();
    var nowMinutes = nowTime.getMinutes();
    var nowSeconds = nowTime.getSeconds();
    var nowDay = nowTime.getDay();
    switch (nowDay) {
        case 0: nowDay = "Sun";break;
        case 1: nowDay = "Mon";break;
        case 2: nowDay = "Tues";break;
        case 3: nowDay = "Wed";break;
        case 4: nowDay = "Thurs";break;
        case 5: nowDay = "Fri";break;
        case 6: nowDay = "Sat";break;
    }
    if(nowHours < 10){
        nowHours = "0"+nowHours;
    }
    if(nowMinutes < 10){
        nowMinutes = "0"+nowMinutes;
    }
    if(nowSeconds < 10){
        nowSeconds = "0"+nowSeconds;
    }
    $("#res"+count).prepend("--"+nowYear+"/"+nowMonth+"/"+nowDate+" "+nowHours+":"+nowMinutes+":"+nowSeconds+"--");
    next();
    console.log("command: now");
}

function ls(){
    var countLs = 1;
    for(var keyStrLs in nowDir){
        $("#res"+count).append(countLs+": "+keyStrLs+"<br>");
        countLs++;
    }
    next();
    console.log("command: ls");
}

function pwd(){
    $("#res"+count).prepend(nowDirName);
    next();
    console.log("command: pwd");
}

function mkdir(command){
    var mkdirJudge = new RegExp("[m][k][d][i][r][ ]([0-9a-zA-Z]+)?");
    if(command.match(mkdirJudge)){
        console.log("command: mkdir");
        var dirName = command.split(" ")[1];
        
        for(var keyStrMk in nowDir){
            if(keyStrMk == dirName){
                $("#res"+count).prepend("<div class=\"warning\">error:Such file or directory exists</div>");
                
                break;
            }
        }
        nowDir[dirName] = {};
        console.log(nowDir);
        return 0;
    }else{return 1;}
}

function rmdir(command){
    var rmdirJudge = new RegExp("[r][m][d][i][r][ ]([0-9a-zA-Z]+)?");
    if(command.match(rmdirJudge)){
        console.log("command: rmdir");
        var dirName = command.split(" ")[1];
        
        for(var keyStrRm in nowDir){
            if(keyStrRm == dirName){
                delete nowDir[keyStrRm];
                console.log(nowDir[keyStrRm]);
                return 0;
                break;
            }
        }
        $("#res"+count).prepend("<div class=\"warning\">error:No such file or directory</div>");
    }else{return 1;}
}

function cd(command){
    var cddirJudge = new RegExp("[c][d][ ][/]([0-9a-zA-Z]*)?");
    if(command.match(cddirJudge)){
        console.log("command: cd");
        var cdDirName = command.split(" ")[1];
        cdDirName = cdDirName.split("/");
        cdDirName[0] = "/";
        
        var pname = nowDirName;
        var pdir = nowDir;
        
        if(cdDirName[1] === ""){//[cd /]
            nowDirName ="/";
            nowDir = dir["/"];
        }else{
            if(cdDirName[1] === ".."){
                //今の一個前からの参照(複数の../対応させる!)
            }
            else{
                nowDirName ="";
                nowDir = dir["/"];
                for(var l=1;l<cdDirName.length;l++){
                    if(nowDir[cdDirName[l]] != undefined){
                        nowDir = nowDir[cdDirName[l]];
                        nowDirName += "/"+cdDirName[l];
                    }
                    else{
                        $("#res"+count).prepend("<div class=\"warning\">error:No such file or directory</div>");
                        nowDir = pdir;
                        nowDirName = pname;
                        break;
                    }
                }
            }
        }
        return 0;
    }
    else{return 1;}
}

function next(){//次の入力用意
    console.log("next!");
    $("#terminal").append("<div id=\"input\"><input autofocus></div>");
    var nowDIrName2
    //for(var q=0;q<nowDirName.length;q++){
    //}
    $("#input").prepend(comName+":"+nowDirName+" "+userName+"$");
    $("#input input").focus();
}

function audio(command){
    var audioCommandList = "audio: play , pause , stop , volume [0~1] , mute , src , list , name";
    var audioJudge = new RegExp("[a][u][d][i][o]");
    if(command.match(audioJudge)){
        console.log("command: audio");
    var audiocom = command.split(" ");
    console.log(audiocom);
        if(audiocom[1] == "pause"){
            //audiod.pause();
            //audiod.currentTime = 4;
            $("#res"+count).prepend("<div class=\"warning\">error: This command is unavailable currently</div>");
            return 0;
        }
        else{
            if(audiocom[1] == "play"){
                if(audiod.src == "file:///Users/kohei/Desktop/terminal/music/Strobe(deadmau5).mp3" && audiod.currentTime <= 4){
                    audiod.currentTime = 3.5;
                }
                audiod.play();
                return 0;
            }
            else{
                if(audiocom[1] == "volume"){
                    audiod.volume = audiocom[2]/1;
                    return 0;
                }
                else{
                    if(audiocom[1] == "mute"){
                        if(audiod.muted){
                            audiod.muted = false;
                        }else{
                            audiod.muted = true;
                        }
                        return 0;
                    }
                    else{
                        if(audiocom[1] == "stop"){
                            audiod.pause();
                            //audiod.currentTime = 4;
                            return 0;
                        }
                        else{
                            if(audiocom[1] == "src"){
                                console.log(audiod.src);
                                for(var h=0;h<allMusic.length;h++){
                                    if(audiocom[2] == allMusic[h]){
                                        audiod.src = "music/"+audiocom[2];
                                        if(audiod.src == "file:///Users/kohei/Desktop/terminal/music/Strobe(deadmau5).mp3"){
                                            audiod.currentTime = 3.5;
                                        }
                                        audiod.play();
                                        console.log(audiod.src);
                                        return 0;
                                        break;
                                    }
                                }
                                $("#res"+count).append("<div class=\"warning\">No such music</div>");//
                                return 0;
                            }
                            else{
                                if(audiocom[1] == "list"){
                                    var audioList = "<ol>";
                                    for(var s=0;s<allMusic.length;s++){
                                        audioList += "<li>"+allMusic[s]+"</li>";
                                    }
                                    audioList += "</ol>";
                                    $("#res"+count).append(audioList);
                                    return 0;
                                }
                                else{
                                    if(audiocom[1] == "name"){
                                        $("#res"+count).append(audiod.src);
                                    }else{
                                        $("#res"+count).prepend(audioCommandList);
                                        return 0;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        //next();
    }else{
        return 1;
    }
}

function commandJudge(command){//mkdirの判別,NotFoundの処理
    /*return 0:そのコマンドが正常終了
             1:そのコマンドではない*/
    var mk;
    var rm;
    var cdJud;
    var bgm;
    mk = mkdir(command);
    if(mk === 1){
        rm = rmdir(command);
        if(rm === 1){
            cdJud = cd(command);
            if(cdJud === 1){
                var bgm = audio(command);
                if(bgm === 1){
                    $("#res"+count).prepend("<div class=\"warning\">error:"+command+": command not found</div>");
                }
            }
        }
    }
    next();
}
//-----------------------------------------------------------------------//