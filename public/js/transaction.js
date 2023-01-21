console.log("This is where the transaction will occur");

const button = document.getElementById('transfer'); // We can't use 'document.querySelector(..)' for button as they are mainly used when we are submitting a whole form or for the 'html elements' directly
const select = document.getElementById('selectedValue');


select.addEventListener('change', (e) => {  // 'change' is used for listening or snooping if at anytime the user selects a value from the 'select' element
    document.querySelector('#benName').value = select.value;
})


button.addEventListener('click', (e) => {   // Listening to button 'click' if it occurs
    const selectedValue = document.getElementById('selectedValue').value;
    if(selectedValue !== "Select an Existing Beneficiary Name"){
        document.querySelector('#benName').value = selectedValue;
    }
    const searchName =  {
        senderName : document.querySelector('#senderName').value,
        beneficiaryName : document.querySelector('#benName').value,
        amount : document.querySelector('#amount').value
    }
    
    fetch('/transaction', {     // Using the fetch function to send a 'POST' request to the server from the client here which is this js file
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'  // Setting the content type that is being sent to be JSON 
        },
        body: JSON.stringify(searchName)   // Here we are sending the 'requestbody JSON STRING' which consists of all the inputs that the user has given in the form and we are sending it via a 'POST' request using the 'fetch(...)' function
        }).then((response) => {
            response.json().then((data) => {    // Then we are recieving the error or success message using 'then and catch' functionality as the 'fetch(...)' function returns a promise
                const found = document.querySelector('#foundSender');
                const found2 = document.querySelector('#foundBen');
                const success = document.getElementById('success');
                if(data.error1){    
                    found.textContent = data.error1;
                }else if(data.error2){
                    found2.textContent = data.error2;
                }else if(data.error3){
                    success.style.visibility = 'visible';
                    success.textContent = data.error3;
                    button.remove();
                }else{
                    success.style.visibility = "visible";
                    if(data.finalError){
                        success.textContent = data.finalError;
                    }else{
                        success.textContent = data.finalMessage;
                        button.remove();
                    }
                }
            })
        }).catch((e) => {
            console.log(e);
        })
})

