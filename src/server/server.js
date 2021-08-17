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
  console.log("sending all to endpoint " + endPoint);
}); 

//------- GET route sends locationData object to endpoint
app.get("/location", getLocation); //Get location details for entered Location
function getLocation(request, response) {
  response.send(endPoint); //send response to endpoint (object)
  console.log("sending location to endpoint " + endPoint);
}

//------- GET route sends weathernData object to endpoint
app.get("/weather", getWeather); //Get weather details for entered Location
function getWeather(request, response) {
  response.send(endPoint); //send response to endpoint (object)
  console.log("sending weather to endpoint " + endPoint);
}

//------- GET route sends location picture object to endpoint
app.get("/pix", getPix); //Get weather details for entered Location
function getPix(request, response) {
  response.send(endPoint); //send response to endpoint (object)
  console.log("sending pix to endpoint " + endPoint);
}

/* NEW POST CODE - Maybe re use below
app.post("/postTripData", async (request, response) => {
  let destination = request.body.city;
  console.log("Destination is " + destination);

  let holdData = get(GEO_baseUrl + destination + "&maxRows=1&username=" + GEO_API_USERNAME
  );
  console.log("holdData is set to: " + holdData);
  await holdData.then(async (response) => {
    let lat = holdData[0].lng;
    let long = holdData[0].lat;

    let weather = get(WEATHER_baseUrl + "lat=" + lat + "&lon=" + long);
    console.log(weather);
    let image = get(PIX_baseUrl + destination + "&image_type=photo");
  });
});*/

//--------POST ROUTES-------------------------
app.post('/postTrip', postData);

async function postData (request, response) {

    let data = request.body;

    console.log('POST location updates to server ', data);

endPoint["city"] = data.city
endPoint["long"] = data.lngtemp;
endPoint["lat"] = data.lat;
endPoint["minTemp"] = data.low_temp;
endPoint["maxTemp"] = data.high_temp;
endPoint["maxTemp"] = data.temp;

response.send(endPoint);
};
//-------END POST ROUTE---------------------
