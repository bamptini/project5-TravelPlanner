# Weather-Journal App Project

## Overview
Project requires creation of an asynchronous web app.
Connect to the Openweather API and retrieve the temperature for a specific location baxed on data entered into the UI.

The input data also includes current date, and a text form to 'Feelings' the data is combined to be dynamically displayed in the UI. 

## Instructions
Run project using the command node server.js in the terminal. This file needs to be run to start a local server.

If required modify the 'Server Setup' section in server.js file to change the port on which server will listen. Defined port needs to be an unused port on the local machine. If port already in use, the application will error. A new port number may be required. Use netstat to identify which ports are already in use.

The application requires text entries in two fields. One in the 'Enter city here' text box and the other in the 'Howa re you feeling today' text box.

After text has been entered, press 'Generate' button to show results.

Expected results: Date, Temperature and the Feeling message.

example:

Date: 4.9.2021
The temperature is currently: 18.38c in London
I am feeling: Cold


## Extras
Basic test file is also in the project With some additional code to test API call using a static variable for the City.
