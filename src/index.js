// Importing all the required stuff
const path = require('path');
const hbs = require('hbs');
const express = require('express');
const userRouter = require('./routers/user');

require('./db/mongoose'); // This is very important if this is not present your mongoose models wont be created and you would encounter an error everytime you will want to create one model

// Initializing
const app = express();
const port = process.env.PORT || 3000;

//Defining Paths for the express Configuration
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const paritalPath = path.join(__dirname,'../templates/partials');

//Setting up handlebars and views location
app.set('view engine','hbs');
app.set('views',viewsPath);

//Register handlebars templates and condition
// hbs.registerHelper('ifcond' , function (name,options){
//     if(name === "Sidharth Kumar"){
//         return options.fn(this);    // Since we are using the 'this' keyword we cannot use any ES6 functions functionality
//     }else{
//         return options.inverse(this);
//     }
// })
hbs.registerPartials(paritalPath);


//Setting up static and directory to save
app.use(express.static(publicDirectoryPath));


app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
    console.log("Server is running at port " + port);
})