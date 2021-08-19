/* The code is executed using npm run build - This starts server and sets up all required routes*/
// Create endpoint object to hold data from POST requests
endPoint = {};

// CREATE VARIABLE FOR HIDING API KEY
const dotenv = require("dotenv");
dotenv.config();

// START EXPRESS
const express = require("express");

// START APP
const app = express();

// DEPENDENCIES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// OTHER DEPENDENCIES
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// CORS FOR CROSS ORIGIN ALLOWANCE
const cors = require("cors");
const { ResolvePlugin } = require("webpack");
app.use(cors());

// SETUP DEPLOYMENT FOLDER
app.use(express.static("dist"));
console.log(__dirname);

// ASSIGN PORT
app.listen(8086, function () {
  console.log("Example app listening on production port 8086!");
});

//-------------- ROUTES ------------------//

//------- GET route sends locationData object to endpoint
app.get("/all", (req,res) => {
  res.send(endPoint); //send response to endpoint (object)
  console.log("sending all to endpoint ");
  console.log("endPoint");
}); 

//--------POST ROUTE-------------------------
app.post('/postTrip', postData);

async function postData (request, response) {

    let data = request.body;
    console.log('POST location updates to server ', data);

    endPoint["city"] = data.city;
    endPoint["long"] = data.longitude;
    endPoint["lat"] = data.latitude;
    endPoint["minTemp"] = data.low;
    endPoint["maxTemp"] = data.high;
    endPoint["temp"] = data.temperature;
    endPoint["pix"] = data.image;

response.send(endPoint);


};
//-------END POST ROUTE---------------------
