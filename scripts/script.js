const userResponseYes = document.getElementById('user-response-yes-btn');
const userResponseNo = document.getElementById('user-response-no-btn');
const userDetailsContainer = document.getElementById('user-details-container');
const userDetailsForm = document.getElementById('user-details-form');
userDetailsForm.addEventListener('submit', validateForm);
const mainEl = document.querySelector('div');
const gameOptions = ['rock', 'paper', 'scissors'];
let currentUsername = '';

userResponseYes.classList.add("response-btn");
userResponseNo.classList.add("response-btn");
userResponseYes.addEventListener('click', handleUserResponse);
userResponseNo.addEventListener('click', handleUserResponse);

function handleUserResponse(e) {
    let userResponse = e.target.textContent.toLowerCase();
    if (userResponse == 'yes') {
        userDetailsContainer.style.display = 'block';
    }
    else {
        clearMainEl();
        let textEl = document.createElement('h1');
        textEl.textContent = "Goodbye! Thanks for visiting the page!"
        mainEl.appendChild(textEl);
        setTimeout(function () {
            window.close();
        }, 3000);
    }
}
function validateForm(e) {
    e.preventDefault(); 
    const username = document.querySelector("input[name='username']").value;
    const email = document.querySelector("input[name='emailId']");

    if (!email.value)
         {
        alert("Please fill out the email field");
        email.focus();
        return;
    }

    console.log("Form submitted successfully!");
    startGame(username); 
}
function startGame(username) {
    currentUsername = username; 
    clearMainEl();
    
    let textEl = document.createElement('h1');
    textEl.textContent = "Choose Rock, Paper or Scissors";
    mainEl.appendChild(textEl);
    let fragment = document.createDocumentFragment();
    let imageContainer = document.createElement('div');
    imageContainer.classList.add("image-container");
    gameOptions.forEach(option => {
        let choiceContainer = document.createElement("div");
        choiceContainer.classList.add("choice-container");
        let btn = document.createElement("button");
        btn.classList.add("game-choice-btn");
        let img = document.createElement("img");

        img.src = `../images/${option}.jpg`;
        img.alt = option;
        img.style.objectFit = "contain";
        btn.appendChild(img);
        btn.addEventListener('click', playGame);
        choiceContainer.appendChild(btn); 
        imageContainer.appendChild(choiceContainer);
        fragment.appendChild(imageContainer);
    });

    mainEl.appendChild(fragment);
}
function playGame(e) {
    e.preventDefault();
    let userChoice = e.target.alt;
    let result = '';
    clearMainEl();
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
    playAgainLink.textContent = "Play again?";
    playAgainLink.style.display = "block";
    playAgainLink.style.color = "blue";
    playAgainLink.style.textDecoration = "underline";
    playAgainLink.addEventListener('click', () =>  resetGame()); 

    resultContainer.appendChild(resultText);
    resultContainer.appendChild(playAgainLink);
    
    imageContainer.appendChild(resultContainer);
}
function resetGame() {
    while (mainEl.firstChild) {
        mainEl.firstChild.remove();
    }
    startGame(currentUsername);
}
function clearMainEl() {
    while (mainEl.firstChild) {
        mainEl.firstChild.remove();
    }
}
