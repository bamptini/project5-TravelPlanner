import './styles/all-styles.scss'
import logo from './media/blue-globe.jpg'
import "./js/application"
import { performAction } from './js/application'
//import { handleSubmit } from './js/formHandler'
import { postData } from './js/postData'


document.getElementById('logo2').src = logo
//Images defined to use inside cards but not currenlty being used.
//document.getElementById('card1logo').src = img
//document.getElementById('card2logo').src = img

/* Add event listener for submit button
document.getElementById("getButton").addEventListener('click', performAction);

console.log('Just added event listener to submit button')
*/
//import { performAction } from './js/application'

export{
   performAction, postData
}