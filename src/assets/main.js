let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');



function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here

    if(answer.value=='' || attempt.value == ''){
        setHiddenFields();
    }

    if(!validateInput(input.value))
    {
        return false;
    }
    attempt.value = parseInt(attempt.value, 10) + 1;

    if(getResults(input.value))
    {
        setMessage('You Win! :)');
        showAnswer(true);
        showReplay();
    }
    else if(!getResults && parseInt(attempt.value, 10) >= 10)
    {
        setMessage('You Lose! :(');
        showAnswer(false);
        showReplay();
    }
    else{
        setMessage('Incorrect, try again.');
    }
}

//implement new functions here

function setHiddenFields(){
    
    attempt.value=0;
    for(var i=0; i<4; i++){
        answer.value+=Math.floor(Math.random()*10).toString();
    }
  
}

function setMessage(message){
    document.getElementById('message').innerHTML = message;
}

function validateInput(input){
    if(input.length == 4)
    {
        return true;
    }

    setMessage('Guesses must be exactly 4 characters long.');
    return false;
}

function getResults(input){
    var resultsDiv= document.createElement('div');
    resultsDiv.className='col-md-6';
    var correctGuesses=0;
    for(var i=0; i< input.length; i++){
        let digit = input.charAt(i);
        if(digit == answer.value.charAt(i)) {
            // bull
            resultsDiv.innerHTML+='<span class="glyphicon glyphicon-ok"></span>';
            correctGuesses+=1;
            continue;
        }
        
        let j = 0;
        let found = false;
        while (j < answer.value.length) {
            if (digit == answer.value.charAt(j)) {
                found = true;
                break;
            }
            j++;
        }
        if (found) {
            resultsDiv.innerHTML += '<span class="glyphicon glyphicon-transfer"></span>';
        } else {
            resultsDiv.innerHTML += '<span class="glyphicon glyphicon-remove"></span>';
        }
        //resultsDiv.innerHTML += '<span class="glyphicon glyphicon-' + (found ? "transfer" : "remove") + '"></span>';
        // not a bull =>check if it is a cow
        // if(answer.value.indexOf(digit) >= 0)
        // {
        //     // it is a cow
        //     resultsDiv.innerHTML+='<span class="glyphicon glyphicon-transfer"></span>';
        // }
        // else{
        //     // it is not a cow
        //     resultsDiv.innerHTML+='<span class="glyphicon glyphicon-remove"></span>';
        // }
    }

    document.getElementById('results').innerHTML +='<div class="row"><span class="col-md-6">' + input + '</span>' + resultsDiv.outerHTML + '</div>';
    if(correctGuesses==4){
        return true;
    }
    else{
        return false;
    }
}

function showAnswer(success){
    var codeDiv = document.getElementById('code');
    codeDiv.innerHTML=answer.value;
    if(success)
    {
        codeDiv.className+=' success';
    }
    else{
        codeDiv.className+=' failure';
    }
}
function showReplay(){
    document.getElementById('guessing-div').style.display='none';
    document.getElementById('replay-div').style.display='block';
}
