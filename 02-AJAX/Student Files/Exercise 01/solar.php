<?php
$WeatherSource = "https://api.forecast.io/forecast/a465f4ec052a8289160841831b12d044/" . $_GET["lat"] . "," . $_GET["lng"];
header("Content-Type: application/json");
header("Cache-Control: no-cache");
readfile($WeatherSource);
?>