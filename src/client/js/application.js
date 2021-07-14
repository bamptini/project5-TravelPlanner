/* Global Variables */

const baseUrl = 'http://api.geonames.org/searchJSON?q=';
const city = '';
const userName = '&username=bamptini';

//document.getElementById('getButton').addEventListener('click', performAction);


function performAction(e){
  console.log('1 - Perform Action function')

    // Get input data from form data to include in the POST
    const city = document.getElementById('city').value;
    console.log('Place is '+ city)  

    // Call API to get geonames details for specific place - based on user input into element.
    newInput(baseUrl,city,userName)
        
    .then(function(data){
      console.log('4')
    
    // Add all data into POST request    
        postData('/all', {

                city:data.city,
                longitude:data.lng,
                latitude:data.lat,
                country:data.countryName});
                console.log('6')
            
    }) .then( () =>{
      console.log('7')
        postUpdates()
     }) 
    };

//GET data from WEB API using ASYNC
    const newInput = async (baseURL, city, userName)=>{
      console.log('2')  
      console.log('New Input', {baseURL, city, userName})
      const response = await fetch(baseURL+city+userName) // await until all data is received from API call, then try
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

  //CODE TO UPDATE UI
  const postUpdates = async()=>{  
        const entries = await fetch('/all');
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