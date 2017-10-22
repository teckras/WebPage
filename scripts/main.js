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
    f.style.color = "red"; 
    setTimeout(function() {
        f.style.color = 'white';
    }, 200);
  });

var HasStarted = false;
var StartTime;
var LastPressingTime;

document.onkeydown = function(e){
    if (HasStarted){
        attentionTest(e);
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