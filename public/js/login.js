//  Login Page JS
const loginEmail = document.querySelector('#loginEmail');
const loginPassword = document.querySelector('#loginPassword');
const loginButton = document.getElementById('loginButton');
const message = document.querySelector('#message');
loginButton.addEventListener('click' , (e) => {
    e.preventDefault();
    const requestBody = {
        email : loginEmail.value,
        password : loginPassword.value
    }
    fetch('/checkLogin', {     // Using the fetch function to send a 'POST' request to the server from the client here which is this js file
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'  // Setting the content type that is being sent to be JSON 
        },
        body: JSON.stringify(requestBody)   // Here we are sending the 'requestbody JSON STRING' which consists of all the inputs that the user has given in the form and we are sending it via a 'POST' request using the 'fetch(...)' function
        }).then((response) => {
            response.json().then((data) => {    // Then we are recieving the error or success message using 'then and catch' functionality as the 'fetch(...)' function returns a promise
                if(data.error){     
                    message.textContent = data.error;
                }else{
                    console.log(data.message);
                    myfunction(data.id);    // passing 'data.id' here to go to the transaction router or the transaction page router in the 'user.js' file inside the 'routers' folder passing in the id insside the url itself so to make it like the postman formatted url '/transaction/-theID-' 
                }
            })
        }).catch((e) => {
            console.log(e);
        })

})

// The function below is used for directing to the '/transaction' router which is rendering the 'transaction' page basically
function myfunction(id){
    location.replace('/transaction/'+id);
}