      /*var kekka;*/
      var u = new SpeechSynthesisUtterance();
      u.text = '';
      u.lang = 'ja-JP';
      /*var recognition = new webkitSpeechRecognition();
      recognition.lang = "ja-JP";
      
      //ずっと認識する
      recognition.continuous = true;
      
      function recognitionStart(){
        recognition.start();
        $("#saying").text("しゃべってください");
      }

      recognition.onsoundstart = function(){
        $("#saying").text("解析中");
        console.log("onsoundstart");
      };

      //エラー
      recognition.onerror= function(e){
        if (e.error === "no-speech"){
          console.log("no-speech");
        }else{
          $("#saying").text("error");
          console.error(e);
        }
      };

      //話し声の認識終了
      recognition.onsoundend = function(){
        //console.log("onsoundend");
      };

      recognition.onresult = function(event) {
          var length = event.results.length;
          if (length > 0) {
            kekka = event.results[length-1][0].transcript;
            console.log(kekka);
            $("#saying").text(kekka);
            if(kekka){
              if(kekka !== "認識終了"){
                u.text = kekka;
              }else{
                u.text = "音声認識を終了します";
              }
              recognition.stop();
              //speechSynthesis.speak(u);
              u.text = "";
              socket.emit("saying",kekka);
            }else{
              console.error("認識失敗");
            }
          }
      }

      recognition.onnomatch = function(){
        console.error("onnomatch");
      }

      recognition.onend = function(){
        console.log("onend");
        if(kekka === ""&&kekka !=="認識終了"){
          recognitionStart();
        }
      };*/

      u.onstart = function(){
        //console.log("u.onstart");
      }
      u.onend = function(){
        console.log("u.onend");
        /*if(kekka !=="認識終了"){
          //recognitionStart();
        //}else{
          kekka = "";
        }*/
      }

//オフライン用
      function say(saying){
          u.text = saying;
          speechSynthesis.speak(u);
          u.text = "";
      }