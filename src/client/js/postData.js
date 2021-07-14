//POST DATA to route
export const postData = async ( baseUrl = '', data = {})=>{
   
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
      try {
        const newData = await response.json();
        console.log('6 - newData', newData)
        return newData;
      }catch(error) {
      console.log("Not another error", error);
      }
  };

  console.log("Done with postData")

