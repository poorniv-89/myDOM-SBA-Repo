const userResponseYes = document.getElementById('user-response-yes');
const userResponseNo = document.getElementById('user-response-no');
const mainEl = document.querySelector('div');
const gameOptions = ['rock', 'paper', 'scissors'];
console.log(mainEl);


userResponseYes.addEventListener('click',handleUserResponse);
userResponseNo.addEventListener('click',handleUserResponse);

function handleUserResponse(e)
{
    let userResponse = e.target.textContent.toLowerCase();
    if( userResponse == 'yes'){
    console.log(e.target.textContent , "User wants to play the game");
    createUserName();
    }
    else
    {
        while (mainEl.firstChild) {
            mainEl.firstChild.remove();
        }
        let textEl = document.createElement('h1');
        textEl.textContent="Goodbye! Thanks for visiting the page!"
        document.body.appendChild(textEl);
        setTimeout(function() {
            window.close();}, 3000);
    }
}
function createUserName()
{
    console.log(mainEl);
    while (mainEl.firstChild) {
        mainEl.firstChild.remove();
    }
    let newForm = document.createElement('form');
    let userNameLabel = document.createElement('label');
    userNameLabel.textContent = "Enter your Username";
    let username = document.createElement("input");
    let userNameBtn = document.createElement('button');
    userNameBtn.textContent='Enter';
    username.type='text';
    newForm.appendChild(userNameLabel);  
    newForm.appendChild(username);
    newForm.appendChild(userNameBtn);
    mainEl.appendChild(newForm);
    newForm.addEventListener('submit', validateUserName);
    function validateUserName(e)
    {
        e.preventDefault();
        if(!username.value)
        {
            alert("Please enter your username before starting the game!");
            return;
        }
        startGame(username.value);
    }
}
function startGame(username) {
        while (mainEl.firstChild) {
            mainEl.firstChild.remove();
        }
        let fragment = document.createDocumentFragment();

        gameOptions.forEach(option => {
            let btn = document.createElement("button");
            let img = document.createElement("img");
    
            img.src = `../images/${option}.jpg`;  
            img.alt = option;
            img.width = 150;           
            btn.appendChild(img);
            btn.addEventListener('click', playGame);
            
            fragment.appendChild(btn); 
        });
    
        mainEl.appendChild(fragment); 
    }
        function playGame(e){
            // e.preventDefault();
            let userChoice = e.target.alt;
            console.log(userChoice);
            let computerChoice = gameOptions[Math.floor(Math.random()*3)];
            console.log(computerChoice);
           
            if (userChoice === computerChoice) {
                console.log("It's a tie!");
            } else if (
                (userChoice === "rock" && computerChoice === "scissors") ||
                (userChoice === "paper" && computerChoice === "rock") ||
                (userChoice === "scissors" && computerChoice === "paper")
            ) {
                console.log("You win!");
            } else {
                console.log("You lose!");

            }
        }

