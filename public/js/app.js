console.log("Hello world");

const form = document.getElementById('signupBtn');
const creationMessage = document.getElementById('creationMessage');
const inputs = {
    userName : document.querySelector('#userName'),
    userEmail : document.querySelector('#userEmail'),
    userBalance : document.querySelector('#userBalance'),
    userPassword : document.querySelector('#userPassword')
}
form.addEventListener('click' , (e) => {
    e.preventDefault();
    const requestBody = {
        name : inputs.userName.value,
        email : inputs.userEmail.value,
        password : inputs.userPassword.value,
        balance : inputs.userBalance.value
    }

    fetch('/adduser', {     // Using the fetch function to send a 'POST' request to the server from the client here which is this js file
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'  // Setting the content type that is being sent to be JSON 
    },
    body: JSON.stringify(requestBody)   // Here we are sending the 'requestbody JSON STRING' which consists of all the inputs that the user has given in the form and we are sending it via a 'POST' request using the 'fetch(...)' function
    }).then((response) => {
        response.json().then((data) => {    // Then we are recieving the error or success message using 'then and catch' functionality as the 'fetch(...)' function returns a promise
            if(data.error){     
                creationMessage.style.visibility = 'visible';
                creationMessage.textContent = "Email address is not valid";
            }else{
                form.style.visibility = 'hidden';
                creationMessage.style.visibility = 'visible';
                creationMessage.textContent = data.message;
            }
        })
    }).catch((e) => {
        console.log(e);
    })
}) 




