
// CREATE VARIABLE FOR HIDING API KEY - These variables come from server.js, is this correct ????

// GEO API REFERENCES
let GEO_baseUrl = 'http://api.geonames.org/searchJSON?q=';
const GeoAPIUser = process.env.GEO_API_USERNAME;
//Example - http://api.geonames.org/searchJSON?q=London&username=GeoAPIUser

// WEATHER API REFERENCES
const WEATHER_baseUrl = 'http://api.weatherbit.io/v2.0/forecast/daily?';
const WEATHER_API_KEY = process.env.WEATHERBIT_API_KEY;
//Example - http://api.weatherbit.io/v2.0/forecast/daily?lat=35.555&lon=-45.333&key=xxxxxxxxxx

// PIXABAY API REFERENCES
const PIXABAY_API_KEY = process.env.PIXABAT_API_KEY;
const PIX_baseUrl = 'https://pixabay.com/api/?key=' + PIXABAY_API_KEY + '&q='; //+ city + '&image_type=photo&category=places' ;
//const GeoapiKey = process.env.PIXABAY_API_ID;
//Example - https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo
//Example - https://pixabay.com/api/?key={####}&q=Portsmouth&image_type=photo&category=places

console.log('PIX URL = ' + PIX_baseUrl);



/* Global Variables Possibly not needed as they are defined in server.js */
//const baseUrlGEO = 'http://api.geonames.org/searchJSON?q=';
//const city = '';
const userName = '&username='+process.env.GEO_API_USERNAME;

// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.getDate()+'.'+ date.getMonth()+'.'+ date.getFullYear();
console.log('New date is '+ newDate);

/* //Add event listener for submit button
document.getElementById("getButton").addEventListener('click', performAction);
console.log('Just added event listener to submit button - application.js') */

export async function performAction(e){
    console.log('1 - Perform Action function')

    // Get input data from form data to include in the POST
    const city = document.getElementById('city').value;
    console.log('Place is '+ city)  

    const startDate = document.getElementById('date').value;
    console.log('Date is '+ date) 
    console.log('BaseURL is : '+ GEO_baseUrl)
    console.log('Full URL is : '+ GEO_baseUrl+city+userName )
    
    if (city!= "") {

      let body ={
        city: city,
      };

      newInputGEO(GEO_baseUrl,city,userName)
     
        
      .then(function(data){
        console.log('4')
      
        postData('/location', {
  
                  city:data.city,
                  longitude:data.lng,
                  latitude:data.lat,
                  //country:data.countryName
                });
                  console.log('6')
              
      }) .then( () =>{
        console.log('7')
          postUpdates()  // Add all data from into POST request    
    
       });

      console.log(body);
    }
    // Call API to get geonames details for specific place - based on user input into element.
    
    // TODO create threee async fucntion to get data form eahc of the API calls
    await fetch ('/postTripData',
    {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(await getData());

  }
    
    /*(newInputGEO(baseUrl,city,userName)
        
    .then(function(data){
      console.log('4')
    
      postData('/location', {

                city:data.city,
                longitude:data.lng,
                latitude:data.lat,
                //country:data.countryName
              });
                console.log('6')
            
    }) .then( () =>{
      console.log('7')
        postUpdates()  // Add all data from into POST request    
  
     }));*/
    

//GET data from WEB API using ASYNC
    const newInputGEO = async (baseURL, city, userName)=>{
      console.log('2')  
      console.log('New Input', {baseURL, city, userName})
      const response = await fetch(baseURL+city+userName) // await until all data is received from API call, then try
      try { // If fetch goes well    
        const data = await response.json(); // Return data as JSON
        console.log('3' + data)
        return data;
      }  catch(error) { //If fetch goes wrong then error.
        console.log("error", error);
        // appropriately handle the error
      }
    }

//POST DATA function
const postData = async ( baseUrl = '', data = {})=>{
  console.log('5')
      const response = await fetch(baseUrl, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });
    //console.log(response);
      try {
        const newData = await response.json();
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

  //CODE TO UPDATE UI
  const postUpdates = async()=>{  
        const entries = await fetch('/location');
        console.log('8')
        try{
            const projectData = await entries.json();
            document.getElementById('counrty').innerHTML = `Country: ${projectData.country}`;
            document.getElementById('long').innerHTML = `Longitude: ${projectData.longitude}`;
            document.getElementById('lat').innerHTML = `Latitude: ${projectData.latitude}`;
        }
        catch(err){
            console.log('Error posting data ' + err);
        }}

