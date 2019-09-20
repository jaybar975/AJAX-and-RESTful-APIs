/*  Project 01_11_02

    Author: Justin Aybar  
    Date: 9/17/2019

    Filename: script.js
*/

"use strict";

// global variables
var httpRequest = false;
var entry = "^IXIC";
function getRequestObject() {
    try {
        httpRequest = new XMLHttpRequest();
    }
    catch (requestError) {
        return false;
    }
    return httpRequest;    
}
if (window.addEventListener) {
    window.addEventListener("load", getRequestObject,false);
}
else if (window.attachEvent) {
    window.attachEvent("onload", getRequestObject);
}

function stopSubmission(evt) {
    alert("stopSubmission()");
    if (evt.preventDefault) {
        evt.preventDefault();
    }
    else {
        evt.returnValue = false;
    }
}

function getQuote() {
    alert("getQuote()");
    if (document.getElementsByTagName("input")[0].value) {
        entry = document.getElementsByTagName("input")[0].value;
    }
    if (!httpRequest) {
        httpRequest = getRequestObject();
    }
    httpRequest.abort();
    httpRequest.open("get", "StockCheck.php?t=" + entry, true);
    httpRequest.send(null);
    httpRequest.onreadystatechange = displayData;
}

function displayData() {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        var stockresults = httpRequest.responseText;
        var stockItems = stockresults.split(/,|\"/);
        console.log(stockItems);
    }
}




// Bottom Code
var form = document.getElementsByTagName("form")[0];
if (form.addEventListener) {
    form.addEventListener("submit", stopSubmission,false);
    window.addEventListener("load", getRequestObject, false);
}
else if (form.attachEvent) {
    form.attachEvent("onsubmit", stopSubmission);
    window.attachEvent("onload",getRequestObject);
}