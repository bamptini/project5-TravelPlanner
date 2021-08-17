import "./styles/all-styles.scss";
import logo from "./media/blue-globe.jpg";
import "./js/application";
import { performAction } from "./js/application";

//import {postData} from "./js/postData";
//import { postData } from "./js/postData";
//import { postData } from "./js/application";
//import { handleSubmit } from './js/formHandler'

document.getElementById("logo2").src = logo;
//Images defined to use inside cards but not currenlty being used.
//document.getElementById('card1logo').src = img
//document.getElementById('card2logo').src = img

// Add event listener for submit button
document.getElementById("getButton").addEventListener("click", performAction);
console.log(
  "Event listener addded"
);

//export { performAction, postData }; // |Took this out and also line5 & 6 above 
