
import { main } from './js/application'
//import { handleSubmit } from './js/formHandler'
//import { postData } from './js/postData'
//import { postUpdates } from './js/app'

// Import scss files to main
//import './js/app'
//import './js/postData'
import './styles/another.scss'
import './styles/blogs.scss'
import './styles/footer.scss'
import './styles/navbar.scss'
import './styles/requests.scss'
import './styles/styles.scss'
import './styles/cardsnew.scss'
import img from './media/avatar3.png'

export{
    main,
}

document.getElementById('logo').src = img

// Add event listener for add trip button
document.getElementById("btn").addEventListener("addTrip", fun);
function addTrip() {
document.getElementById("para").innerHTML = "Hello World" + "<br>" + "Welcome to the  javaTpoint.com"};