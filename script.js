const msgEl=document.getElementById('msg');

const randomNum=getRandomNumber();

//create a random number for the game
function getRandomNumber(){
return Math.floor(Math.random()*100)+1;
}

console.log(randomNum);
//intialize a speech recongintion object
window.SpeechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition;
// const randomNum= getRandomNumber();
// console.log(`Number: ${randomNum}`)




//intialize a new instance of the window.SpeachRecognization Object
let recognition= new window.SpeechRecognition();

//start recongition and game
recognition.start();

//listen 4 the result event
recognition.addEventListener('result', onSpeak);

function onSpeak(e){
    console.log(e)
    const msg=e.results[0][0].transcript;
    console.log(msg);
    writeMessage(msg);
    checkNumber(msg);
}


function writeMessage(msg){
    msgEl.innerHTML=`
    <div>You said:</div>
    <span class="box">${msg}</span>`
    ;
}


//checking message against number
function checkNumber(msg){
    const num= +msg;
    //check if a vaild number
    if (Number.isNaN(num)){
        msgEl.innerHTML+=`<div> That is not a valid number </div>`;
        return;
    }
    //check if it's in range
    if (num>100 || num<1){
        msgEl.innerHTML+=`<div> Your number must between 1 and 100 </div>`;
        return;
    }

    //check number against Randomly Generated Number 
    if (num===randomNum){
        document.body.innerHTML=`<h2> Congrats! You guessed the number correctly!<br><br>
        It was ${num}!</h2><button class="play-again" id="play-again">Play again?</button>`;
        return;
    } else if(num>randomNum){
        msgEl.innerHTML+=`<div> GO LOWER </div>`;

    } else{
        msgEl.innerHTML+=`<div> GO HIGHER </div>`;
    }

}

//Allow user to continue to guess-END
recognition.addEventListener('end',()=>recognition.start());

//make the play button work
document.body.addEventListener('click', e =>{
    if (e.target.id=='play-again'){
        window.location.reload();
    }
})