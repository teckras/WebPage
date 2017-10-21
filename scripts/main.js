document.onkeypress = function(e){
    var hasStarted = document.querySelector("#HasStarted");
    if (hasStarted.textContent == "true"){
        attentionTest(e);
     }

}

function Start(event){
    var hasStarted = document.querySelector("#HasStarted");
    hasStarted.textContent = "true";
    var charDisplayed = document.querySelector("#TestArea");
    charDisplayed.textContent = "A";
    var startTime = new Date().getTime();
    var startTimeField = document.querySelector("#StartTime");
    startTimeField.textContent = startTime.toString();
    var errorField =  document.querySelector("#NumberOfErrors");
    errorField.textContent = "0";   
    var currentCharacterListField = document.querySelector("#ListOfCharacters");
    currentCharacterListField.textContent = "";
    var elem = document.getElementById("DemoButton");
    elem.parentNode.removeChild(elem);
}

function attentionTest(e){
    var currentTime = new Date().getTime();
    var startTime = parseInt(document.querySelector("#StartTime").textContent);
    var charDisplayed = document.querySelector("#TestArea");
    var currentCharacter = charDisplayed.textContent;
    var isSpaceStruck = e.code == "Space";
    var isRightArrowStruck = e.code == "ArrowRight";
    var errorField =  document.querySelector("#NumberOfErrors");
    var errorNumber = parseInt(errorField.textContent);
    var currentCharacterListField = document.querySelector("#ListOfCharacters");
    var currentCharacterList = currentCharacterListField.textContent;
    currentCharacterList += currentCharacter;
    currentCharacterListField.textContent = currentCharacterList;

    if(currentCharacter == "X" && isSpaceStruck){
        errorNumber += 1;
    }else if (currentCharacter != "X" && isRightArrowStruck){
        errorNumber += 1;
    }
    errorField.textContent = errorNumber;
    if ((currentTime - startTime) <= 60000)
    {
        var rand = Math.random();
        var charNumberFloat =  65 + 26 * rand;
        var charNumber = Math.floor(charNumberFloat);
        
        charDisplayed.textContent = String.fromCharCode(charNumber);
    }else{
        var hasStarted = document.querySelector("#HasStarted");
        hasStarted.textContent = "false";
        charDisplayed.textContent = "Test is now completed, thank you"
    }

}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }