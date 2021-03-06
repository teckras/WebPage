var  CurrentCharacter = {
    aInternal: "A",
    aListener: function(val) {},
    set a(val) {
      this.aInternal = val;
      this.aListener(val);
    },
    get a() {
      return this.aInternal;
    },
    registerListener: function(listener) {
      this.aListener = listener;
    }
  }

  CurrentCharacter.registerListener(function(val) {
    var f = $("#TestArea");
    f.textContent = CurrentCharacter.a;
    setTimeout(function() {
        f.style.color = 'red';
    }, 500); 
    setTimeout(function() {
        f.style.color = 'white';
    }, 800);
  });

var HasStarted = false;
var StartTime;
var LastPressingTime;
var QCounter = 0;

document.onkeydown = function(e){
    if (HasStarted){
        if (e.key == "q")
        {
            QCounter += 1;
            if (QCounter == 5){
                HasStarted = false;
                $("#TestArea").textContent = "The test has been cancelled you naughty kid";
                $("#TestArea").style.color = "red";
                stopwatch.stop();
            }else{
                attentionTest(e);
            }
        }else{
            QCounter = 0;
            attentionTest(e);
        }
     }
}


function Start(event){
    HasStarted = true;
    StartTime = new Date().getTime();
    $("#Errors").textContent = "";   
    $("#ListOfCharacters").textContent = "";
    var elem = document.getElementById("DemoButton");
    elem.parentNode.removeChild(elem);
    CurrentCharacter.a = "A";
    LastPressingTime = StartTime;
    stopwatch.start();
}

function attentionTest(e){
    var currentTime = new Date().getTime();
    var isSpaceStruck = e.code == "Space";
    var isRightArrowStruck = e.code == "ArrowRight";
    var pressingTime = (currentTime - LastPressingTime);
    LastPressingTime = currentTime;
    $("#PressingTimes").textContent += pressingTime + ",";
    $("#ListOfCharacters").textContent += CurrentCharacter.a + ",";
    var currentCharacterList = $("#ListOfCharacters").textContent;
    var errorText = "C,";
    if(CurrentCharacter.a == "X" && !isRightArrowStruck){
        errorText = "W,"
    }else if (CurrentCharacter.a != "X" && !isSpaceStruck){
        errorText = "W,"
    }
    $("#Errors").textContent += errorText;
    if ((currentTime - StartTime) <= 60000)
    {
        var n = currentCharacterList.length;
        if (n>= 10){
            var subString = currentCharacterList.substr(n-10);
            if (subString.indexOf("X") > -1){
                CurrentCharacter.a = GenerateRandomCharacter(CurrentCharacter.a);              
            }else{
                var rand = Math.random();
                if (rand >= 0.6){
                    CurrentCharacter.a = "X";
                }else{
                    CurrentCharacter.a = GenerateRandomCharacter(CurrentCharacter.a);
                }
            }
        }else{
            CurrentCharacter.a = GenerateRandomCharacter(CurrentCharacter.a);
        }
    }else{
        HasStarted = false;
        $("#TestArea").textContent = "The test is now completed, thank you";
        $("#TestArea").style.color = "red";
        stopwatch.stop();
    }
}

function $(name){
    return document.querySelector(name);
}


function GenerateRandomCharacter(currentCharacter){
    var rand = Math.random();
    var charNumberFloat =  65 + 26 * rand;
    var charNumber = Math.floor(charNumberFloat);
    if (currentCharacter == String.fromCharCode(charNumber)) 
        return GenerateRandomCharacter(currentCharacter);   
    else
        return String.fromCharCode(charNumber);
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }
