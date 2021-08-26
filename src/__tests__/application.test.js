import { newInputGEO } from '../client/js/application';
global.fetch = require("node-fetch");

let GEO_baseUrl = "http://api.geonames.org/searchJSON?q=";
const userName = "&username=bamptini";
const city = "London";

describe("API Tests", () => {
    test('newInputGEO() should be able to get geo data.', async () => {
    
    const testResult = await newInputGEO(GEO_baseUrl, city, userName)
    
        expect(testResult).toBeDefined();
    });
})
    
    /*.then(function (result){;
        const longitude = result.lng;
        const latitude = result.lat;
        const weatherString = "lat=" + latitude + "&lon=" + longitude + "&key=";*/
    /*newInputWeather(WEATHER_baseUrl, weatherString, WEATHER_API_KEY).then(function (weather) {

    newInputPIX(PIX_baseUrl, city).then(function (pixResult) {
        const PIXUrl = pixResult.previewURL    
          });
        })
    }).toBeDefined()
    //const geo = newInputGEO(); 
    //expect(newInputGEO).toBeDefined();
});*/


/// Test Template 

/*test('newInputGEO() should be able to get value from Form field.', () => {
    document.body.innerHTML =
    '<div>' +
    '<input id="text" type="text" name="input" value="Text called" placeholder="Text">'
    '</div>';
    const formInput = getValueFromForm();
    expect(formInput).toEqual("Text called")
});*/