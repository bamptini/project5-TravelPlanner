/* Global Variables */

const baseUrl =  'http://api.openweathermap.org/data/2.5/weather?q=';
const units = '&units=metric'; // convert f degree to C degree, append to end of key
const apiKey = '&appid=1e32a5f263864d02667d1379ca8e179a';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
console.log('New date is '+ newDate);

// variable to represent the City entered into UI
const newCity = document.getElementById('city').value;
console.log('New city is '+ newCity)  

document.getElementById('generate').addEventListener('click', performAction);

//
function performAction(e){
  console.log('1')

    // Get the value input into element to include in the POST
    const feeling = document.getElementById('feelings').value; 
    
    // Call API to get weather data for city - based on user input into element.
    newInput(baseUrl,newCity,apiKey,units)
        
    .then(function(data){
      console.log('4')
    // Add all data into POST request    
        postData('/all', {

                temp:data.main.temp, 
                dttm:newDate,
                location:newCity,
                feeling:feeling});
                console.log('6')
            
    }) .then( () =>{
      console.log('7')
        postUpdates()
     }) 
    };

//GET data from WEB API using ASYNC
    const newInput = async (baseURL, city, apiKey, units)=>{
      console.log('2')  
      console.log('New Input', {baseURL, city, apiKey, units})
      const response = await fetch(baseURL+city+apiKey+units) // await until all data is received from API call, then try
      try { // If fetch goes well    
        const data = await response.json(); // Return data as JSON
        console.log('3')
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

  /* Function to GET Project Data 
const getData = async (url='') =>{
    console.log('Some URL ' +url);
    const request = await fetch(url);
    try {
        const getData = await request.json()
    }
    catch(error){
        console.log('Error', error);
    }
};*/

  //CODE TO UPDATE UI

  const postUpdates = async()=>{
    
        const entries = await fetch('/all');//baseUrl+city+apiKey+'/getData');
        console.log('8')
        try{
            const projectData = await entries.json();
            document.getElementById('date').innerHTML = `Date: ${projectData.dttm}`;
            document.getElementById('temp').innerHTML = `The temperature is currently: ${projectData.temp}c in ${projectData.city}`;
            document.getElementById('content').innerHTML = `I am feeling: ${projectData.feeling}`;
        }
        catch(err){
            console.log('Error posting data ' + err);

        }}