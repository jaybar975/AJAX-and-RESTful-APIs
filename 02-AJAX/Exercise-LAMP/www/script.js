/*  Exercise 01_11_01
    Whole Spectrum Energy Solutions
    Author: Justin Aybar
    Date:  9/10/2019   
    Filename: script.js
*/

"use strict";

// global variables
var selectedCity = "Tucson, AZ";
var weatherReport;
var httpRequest = false;

function getRequestObject() {
   // alert("getRequestObject()");
   try {
      httpRequest = new XMLHttpRequest();
  } catch (requestError) {
      document.querySelector("p.error").innerHTML = "Forecast not supported by your browser.";
      document.querySelector("p.error").style.display = "block";
      return false;
  }
  return httpRequest;

}

function getWeather(evt) {
   var latitude;
   var longitude;
   if (evt.type !== "load") {
      if (evt.target) {
         selectedCity = evt.target.innerHTML;
      } else if (evt.srcElement) {
         selectedCity = evt.srcElement.innerHTML;
      }
   }
   if (selectedCity === "Tucson, AZ") {
      latitude = 37.7577;
      longitude = -122.4376;
   } else if (selectedCity === "Chicago, IL") {
      latitude = 41.8337329;
      longitude = -87.7321555;
   } else if (selectedCity === "Montreal, QC") {
      latitude = 45.5601062;
      longitude = -73.7120832;
   }

   if (!httpRequest) {
      httpRequest = getRequestObject();
   }
   
   httpRequest.abort();
   httpRequest.open("get", "solar.php?" + "lat=" + latitude + "&lng=" + longitude, true);
   
   /* TODO: */
   console.time();

   httpRequest.send(null);

   /* TODO: */
   console.timeEnd()
   
   httpRequest.onreadystatechange = fillWeather;

}

function fillWeather(){

   if (httpRequest.readyState === 4 && httpRequest.status === 200) {
      weatherReport = JSON.parse(httpRequest.responseText);
      var days = ["Sunday","Monday","Tuesday", "Wednesday","Thursday","Friday","Saturday"];
      
      
      console.log(weatherReport);
      var {currentTemperature} = weatherReport.currently.apparentTemperature;
      console.log(`current data: 
         ${currentTemperature}
      `);

      var [...historicalData] = weatherReport.daily.data;
      console.log(historicalData);


      var dateValue = new Date(weatherReport.daily.data[0].time);
      
      var dayOfWeek = dateValue.getDay();
      var rows = document.querySelectorAll("section.week table tbody tr");
      document.querySelector("section.week table caption").innerHTML = selectedCity;
      // Add for loop
         // inside the loop after firstCell,
         // add if(dayOfWeek){...}
         // 4.5

      document.querySelector("section.week table caption").style.display = "block";
      document.querySelector("section.week table").style.display = "inline-block";

   }


}

var locations = document.querySelectorAll("section ul li");

for (var i = 0; i < locations.length; i++) {
   if (locations[i].addEventListener) {
      locations[i].addEventListener("click", getWeather, false);
   } else if (locations[i].attachEvent) {
      locations[i].attachEvent("onclick", getWeather);
   }
}
if (window.addEventListener) {
   window.addEventListener("load", getWeather, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", getWeather);
}