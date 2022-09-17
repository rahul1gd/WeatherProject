const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    });

app.post("/", function(req, res){
  const query = req.body.CityName;
  const apiKey = "7a8ac7a11d35210da31dbb4db016c351";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units + "";
  https.get(url, function(response){
    response.on("data", function(data){
        var weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const image = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<h1>The tempareture in " + query + " is " + temp + " degree celsius.</h1>");
        res.write("<h2>The weather currently is " + description + "</h2>");
        res.write("<img src=" + image + ">");
        res.send()

  });
});
});

app.listen("3000", function(){
  console.log("Server start at port 3000");
})
