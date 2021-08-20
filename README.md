# Travel Planner App Project 5 

## Overview
Project requires creation of an asynchronous web app.
Connect to the Openweather API Geoname and PIXABAY APIs to collect weather details for a user entered location (City) the UI will diplay detials, MIN, MAX and Curent Temperature and also picture of the location and a countdown for how many days befofre departure.


## Instructions
Run project using the commands:

run nmp start - to Start a local server.
run npm build prod - to build production instance with dist folder
run npm build dev - to build dev environment

If required modify the 'Server Setup' section in server.js file to change the port on which server will listen. Defined port needs to be an unused port on the local machine. If port already in use, the application will error. A new port number may be required. Use netstat to identify which ports are already in use.

The application requires text entries in one field. User enters a location into a text box. the user alos selects a start and end date.

After text and dates have been selected, press 'submit' button to show results.

Expected results: Min Temp, Max Temp, Current Temp, image and Days to go.

example:


City: London
Min Temp: 14.9
Max Temp: 22.4
Current Temp: 19.4
Days until departure: 7

## Extras

## Resources
For data manipulation the following resource was used.
https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
