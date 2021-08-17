// CREATE VARIABLES FOR HIDING API KEYS
// GEO API REFERENCES
let GEO_baseUrl = "http://api.geonames.org/searchJSON?q=";
const GeoAPIUser = process.env.GEO_API_USERNAME;
//Example - http://api.geonames.org/searchJSON?q=London&username=GeoAPIUser

// WEATHER API REFERENCES
const WEATHER_baseUrl = "http://api.weatherbit.io/v2.0/forecast/daily?";
const WEATHER_API_KEY = process.env.WEATHERBIT_API_KEY;
//Example - http://api.weatherbit.io/v2.0/forecast/daily?lat=35.555&lon=-45.333&key=xxxxxxxxxx

// PIXABAY API REFERENCES
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
const PIX_baseUrl = "https://pixabay.com/api/?key=" + PIXABAY_API_KEY + "&q="; 
//Example - https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo
//Example - https://pixabay.com/api/?key={####}&q=Portsmouth&image_type=photo&category=places

console.log("PIX URL = " + PIX_baseUrl);

//Global Variables 
const userName = "&username=" + process.env.GEO_API_USERNAME;

// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
console.log("New date is " + newDate);

export async function performAction(e) {
  console.log("1 - Perform Action function");

  // Get input data from form data to include in the POST
  const city = document.getElementById("city").value;
  console.log("Place is " + city);

  const startDate = document.getElementById("date").value;
  console.log("Date is " + date);

  let body;
  if (city != "") {
      body = {
      city: city,
    };

    //Call newInputGEO function passing in the API call, using the URL, city entered by user and username 
    newInputGEO(GEO_baseUrl, city, userName)
  
    //result is retunred from newInputGEO then...
      .then(function (result) {
        console.log("4");
        //console.log(result);

    //Create new variable from results for using in Weather App
          const longitude = result.lng
          const latitude = result.lat
          console.log(longitude)
          console.log(latitude) 
          const weatherString="lat="+latitude+"&lon="+longitude+"&key="
          console.log(weatherString)

          newInputWeather(WEATHER_baseUrl, weatherString, WEATHER_API_KEY).then(function (weather) {
              console.log("7");
              console.log(weather)
              postData("/weather", {
                city: city,
                //city: result.city,
                longitude: result.lng,
                latitude: result.lat,
                population: Math.round(result.population/1000000).toFixed(2)+'m',
                country: result.countryName,
                temperature: weather.temp,
                low: weather.low_temp,
                high: weather.high_temp,
                sunrise: weather.sunrise_ts,

                  },
              );         
                  console.log("9");
           }); 

           newInputPIX(PIX_baseUrl, city).then(function (pixResult) {
            console.log("PIX 2");
            console.log(pixResult)
            postData("/pix", {
              
              PIXUrl: pixResult.pageURL,

                },
            );       
                console.log("10");
         });
      })
  }
 /*then( ()=> {
  console.log("Now posting updates")
  postUpdates();
}); */ 
}
//GET data from GEONAMES WEB API using ASYNC function. Results will be for the City entered by user
const newInputGEO = async (GEO_baseUrl, city, userName) => {
  console.log("2");
  //console.log("New Input", { GEO_baseUrl, city, userName });
  const response = await fetch(GEO_baseUrl + city + userName); // await until all data is received from API call, then try
  try {
    // If fetch works, convert 'response' into json and store in 'data'
    const data = await response.json(); // Return data as JSON
    console.log("3");
    let result = data.geonames[0];
    //console.log(result);
    return result;
   // return data;
  } catch (error) {
    //If fetch goes wrong then error.
    console.log("error", error);
    // appropriately handle the error
  }
};

//GET data from WEATHER API using ASYNC function. Results will be for the City entered by user
const newInputWeather = async (WEATHER_baseUrl, weatherString, WEATHER_API_KEY) => {
  console.log("5")
  const wResponse = await fetch(WEATHER_baseUrl + weatherString + WEATHER_API_KEY); // await until all data is received from API call, then try
  try {
    // If fetch works, convert 'response' into json and store in 'weather'
    const weather = await wResponse.json(); // Return data as JSON
    const wResult = weather.data[0];
    //console.log(wResult);
    console.log("6")
    return wResult;
   // return data;
  } catch (error) {
    //If fetch goes wrong then error.
    console.log("error", error);
    // appropriately handle the error
  }
};

//GET data from PIXABAY API using ASYNC function. Results will be for the City entered by user
const newInputPIX = async (PIX_baseUrl, city) => {
  console.log("PIX 1 ");
  console.log(city);

  //console.log("New Input", { GEO_baseUrl, city, userName });
  const response = await fetch(PIX_baseUrl + city);
  console.log(response) // await until all data is received from API call, then try
  try {
    // If fetch works, convert 'response' into json and store in 'data'
    const data = await response.json(); // Return data as JSON
    console.log("newInputPIX");
    let pixResult = data.hits[0];
    console.log(pixResult);
    return pixResult;
   // return data;
  } catch (error) {
    //If fetch goes wrong then error.
    console.log("error", error);
    // appropriately handle the error
  }
};

//POST DATA function -- ADDED export key word as a prefix to const postData
export const postData = async (Url = "", data = {}) => {
  console.log("8 postDataCalled");
  console.log(Url)
  console.log(data)
  const response = await fetch(Url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),    
  });
  console.log("postData ended going into try block");
  try {
    const newData = await response.json();
    console.log("New data = " + newData)
    return newData;
  } catch (error) {
    console.log("These is an error in postData function:", error);
  }
  console.log("Returning newData to ")
};

//CODE TO UPDATE UI
const postUpdates = async () => {
  const entries = await fetch("/all");
  console.log("8");
  try {
    const projectData = await entries.json();
    document.getElementById(
      "counrty"
    ).innerHTML = `Country: ${projectData.country}`;
    document.getElementById(
      "long"
    ).innerHTML = `Longitude: ${projectData.longitude}`;
    document.getElementById(
      "lat"
    ).innerHTML = `Latitude: ${projectData.latitude}`;
  } catch (err) {
    console.log("Error posting data " + err);
  }
}
