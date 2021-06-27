/* The code is executed using npm run build - This starts server and sets up all required routes*/
// Create endpoint object to hold data from POST requests
endPoint = {};

// CREATE VARIABLE FOR HIDING API KEY
const dotenv = require('dotenv');
dotenv.config();

// API REFERENCES
const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1?key=';
const apiKey = process.env.API_KEY;
const language = '&lang=en&url='

//console.log(`Your API key is ${process.env.API_KEY}`);

// START EXPRESS
const express = require('express')

// START APP
const app = express();

// DEPENDENCIES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// OTHER DEPENDENCIES
const path = require('path')
const bodyParser = require('body-parser');

// CORS FOR CROSS ORIGIN ALLOWANCE
const cors = require('cors');
app.use(cors());

// SETUP DEPLOYMENT FOLDER 
app.use(express.static('dist'))
console.log(__dirname);

// ASSIGN PORT
app.listen(8082, function () {
    console.log('Example app listening on production port 8082!')
});


//-------------- ROUTES ------------------//

//------- GET route Returns journalData object
app.get('/all', getData); //Get feeling data when index URI is used

function getData (request, response){
    response.send(journalData); //send response to endpoint (object)
    console.log(journalData);
};

//--------POST ROUTE-------------------------
app.post('/all', postData); //URL needs to be defined #IMPORTANT URL CHANGE

function postData (request, response) {

    let data = request.body;

console.log('POST Update to server ', data);

journalData["dttm"] = data.dttm;
journalData["temp"] = data.temp;
journalData["feeling"] = data.feeling;
journalData["city"] = data.location;

response.send(journalData);
};

//-------END POST ROUTE---------------------