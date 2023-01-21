console.log("Page is executed");

const userEmail = document.querySelector('#userEmail');
const userPassword = document.querySelector('#userPassword');
const userButton = document.getElementById('userButton');
const creationMessage = document.getElementById('creationMessage');
userButton.addEventListener('click', (e) => {
    const requestBody = {
        email : userEmail.value,
        password : userPassword.value
    }
    fetch('/delete', {     // Using the fetch function to send a 'POST' request to the server from the client here which is this js file
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'  // Setting the content type that is being sent to be JSON 
        },
        body: JSON.stringify(requestBody)   // Here we are sending the 'requestbody JSON STRING' which consists of all the inputs that the user has given in the form and we are sending it via a 'POST' request using the 'fetch(...)' function
        }).then((response) => {
            response.json().then((data) => {    // Then we are recieving the error or success message using 'then and catch' functionality as the 'fetch(...)' function returns a promise
                if(data.error){
                    creationMessage.style.visibility = 'visible';
                    creationMessage.textContent = data.error;
                }else{
                    userButton.style.visibility = 'hidden';
                    creationMessage.style.visibility = 'visible';
                    creationMessage.textContent = data.message;
                }
            })
        }).catch((e) => {
            console.log(e);
        })
})