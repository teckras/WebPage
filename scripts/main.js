document.onkeypress = function(e){
    if (e.code === "Space"){
        attentionTest(e);
     }

}


function attentionTest(e){
    var startTime = new Date().getTime();
    var currentTime = startTime;
    var charDisplayed = document.querySelector("#TestArea");
    //while ((currentTime - startTime) <= 60000)
    {
        var rand = Math.random();
        var charNumberFloat =  65 + 26 * rand;
        var charNumber = Math.floor(charNumberFloat);
        
        charDisplayed.textContent = String.fromCharCode(charNumber);
    }
    //charDisplayed.textContent = "Test is now completed, thank you"
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }