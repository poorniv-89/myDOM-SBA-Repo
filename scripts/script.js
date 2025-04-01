const userResponseYes = document.getElementById('user-response-yes-btn');
const userResponseNo = document.getElementById('user-response-no-btn');
const mainEl = document.querySelector('div');
const gameOptions = ['rock', 'paper', 'scissors'];
let currentUsername = '';
console.log(mainEl);
userResponseYes.classList.add("response-btn");
userResponseNo.classList.add("response-btn");
userResponseYes.addEventListener('click', handleUserResponse);
userResponseNo.addEventListener('click', handleUserResponse);

function handleUserResponse(e) {
    let userResponse = e.target.textContent.toLowerCase();
    if (userResponse == 'yes') {
        createUserName();
    }
    else {
        while (mainEl.firstChild) {
            mainEl.firstChild.remove();
        }
        let textEl = document.createElement('h1');
        textEl.textContent = "Goodbye! Thanks for visiting the page!"
        mainEl.appendChild(textEl);
        setTimeout(function () {
            window.close();
        }, 3000);
    }
}
function createUserName() {
    console.log(mainEl);
    while (mainEl.firstChild) {
        mainEl.firstChild.remove();
    }

    let newForm = document.createElement('form');
    newForm.classList.add("form-container");
    let inputContainer = document.createElement("div");
    let userNameLabel = document.createElement('label');
    userNameLabel.textContent = "Create Username";
    userNameLabel.style.display = "flex";
    let username = document.createElement("input");
    let userNameBtn = document.createElement('button');
    userNameBtn.id = "userNameBtn";
    userNameBtn.textContent = 'Enter';
    username.type = 'text';
    inputContainer.appendChild(userNameLabel);
    inputContainer.appendChild(username);
    newForm.appendChild(inputContainer);
    newForm.appendChild(userNameBtn);
    mainEl.appendChild(newForm);
    newForm.addEventListener('submit', validateUserName);
    function validateUserName(e) {
        e.preventDefault();
        if (!username.value) {
            alert("Please enter an username before starting the game!");
            return;
        }
        startGame(username.value);
    }
}
function startGame(username) {
    currentUsername = username; 
    while (mainEl.firstChild) {
        mainEl.firstChild.remove();
    }
    let fragment = document.createDocumentFragment();
    let textEl = document.createElement('h1');
    gameOptions.forEach(option => {
        let btn = document.createElement("button");
        btn.classList.add("game-choice-btn");
        let img = document.createElement("img");

        img.src = `../images/${option}.jpg`;
        img.alt = option;
        img.style.objectFit = "fill";
        img.style.overflow = "hidden";
        btn.appendChild(img);
        btn.addEventListener('click', playGame);
        fragment.appendChild(btn);
    });

    mainEl.appendChild(fragment);
}
function playGame(e) {
    e.preventDefault();
    let userChoice = e.target.alt;
    let result = '';
    while (mainEl.firstChild) {
        mainEl.firstChild.remove();
    }
    let imageContainer = document.createElement('div');
    imageContainer.classList.add("image-container");

    let userContainer = document.createElement('div');
    userContainer.classList.add("choice-container");
    let userLabel = document.createElement('h3');
    userLabel.textContent = "Your Choice";
    let userImg = document.createElement('img');
    userImg.src = e.target.src;
    userImg.alt = userChoice;
    userImg.classList.add("user-choice-img");
    userContainer.appendChild(userLabel);
    userContainer.appendChild(userImg);

     let computerChoice = gameOptions[Math.floor(Math.random() * 3)];
    let compContainer = document.createElement('div');
    compContainer.classList.add("choice-container");
    let compLabel = document.createElement('h3');
    compLabel.textContent = "Computer's Choice";
    let compChoiceImg = document.createElement('img');
    compChoiceImg.src = `../images/${computerChoice}.jpg`;
    compChoiceImg.alt = computerChoice;
    compChoiceImg.classList.add("computer-choice-img");
    compContainer.appendChild(compLabel);
    compContainer.appendChild(compChoiceImg);

    imageContainer.appendChild(userContainer);
    imageContainer.appendChild(compContainer);

    mainEl.appendChild(imageContainer);

    if (userChoice === computerChoice) {
        result="It's a tie";
    } else if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")
    ) {
        result = "You win!";
    } else {
        result = "You lost!";


    }
    let resultContainer = document.createElement('div');
    resultContainer.classList.add("result-container");
    let resultText = document.createElement('h2');
    resultText.textContent = result;

    let playAgainLink = document.createElement('a');
    playAgainLink.href = "#";
    playAgainLink.textContent = "Play Again?";
    playAgainLink.style.display = "block";
    playAgainLink.style.marginTop = "1rem";
    playAgainLink.style.color = "blue";
    playAgainLink.style.textDecoration = "underline";
    playAgainLink.addEventListener('click', () =>  resetGame()); 

    resultContainer.appendChild(resultText);
    resultContainer.appendChild(playAgainLink);
    
    // Append resultContainer to imageContainer (middle of images)
    imageContainer.appendChild(resultContainer);
}
function resetGame() {
    while (mainEl.firstChild) {
        mainEl.firstChild.remove();
    }
    startGame(currentUsername);
}

