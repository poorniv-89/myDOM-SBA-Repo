const userResponseYes = document.getElementById('user-response-yes');
const userResponseNo = document.getElementById('user-response-no');
const mainEl = document.querySelector('div');
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
        mainEl.forEach(el => el.style.visibility = 'hidden');
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
    while(!username){
            alert("Please enter your username before starting the game!");
            return;
        }
        console.log("Starting the game for user:"+ username);
}

