$( document ).ready(function() {

    var giphyArr = [];
    var tempFeel = "";
    
    $("#find-api").on("click", function(event) {
        event.preventDefault();
        
        $("#city-text").empty();
        $("#temp-text").empty();
        $("#conditions-text").empty();

        var cityName = $("#api-input").val().trim();
        var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&apikey=de591127d32baca4391257e11c9b824b";

        $.ajax({
            url: weatherURL,
            method: "GET"
        }).then(function(weather){
            
            var city = weather.name;
            var temp = Math.round((JSON.parse(weather.main.temp) - 273.15) * 9/5 + 32);
            var conditions = weather.weather[0].main;
            var description = weather.weather[0].description;

            $("#city-text").text(city);
            $("#temp-text").text(temp + "°F");
            $("#conditions-text").text(conditions + ": " + description);

            if (temp <= -22) {
                tempFeel = "below freezing";
            } else if (temp > -22 && temp <= 32) {
                tempFeel = "freezing";
            } else if (temp > 32 && temp <= 50) {
                tempFeel = "cold";
            } else if (temp > 50 && temp <= 66) {
                tempFeel = "chilly";
            } else if (temp > 67 && temp <= 77) {
                tempFeel = "fine";
            } else if (temp > 77 && temp < 85) {
                tempFeel = "warm";
            } else if (temp > 85 && temp < 95) {
                tempFeel = "hot";
            } else {
                tempFeel = "sweltering";
            }

            $("#temp-text").attr("data-temp-feel", tempFeel);
            $("#temp-text").prop("data-temp", temp);
            $("#conditions-text").attr("data-conditions", conditions);

        });

        var temp = $("#temp-text").prop("data-temp");
        // var tempFeel = $("#temp-text").attr("data-temp-feel").val();
        // var conditions = $("#conditions-text").attr("data-conditions").val();

        console.log(temp);

        var giphySearch = "weather" 
        // + "+" + temp + "+" + tempFeel + "+" + conditions;
        var giphyURL = "https://api.giphy.com/v1/gifs/search?api_key=Pb21bBHJ80WGt0fw3vzTiUcAjVzR2JqB&q=" + giphySearch + "&limit=20&offset=0&rating=PG-13&lang=en";

        $.ajax({
            url: giphyURL,
            method: "GET"
        }).then(function(giphy){

            $("#gif-box").empty();

            var randomNumber = Math.round(Math.random() * 20);

            for (i = 0; i < 20; i++) {
                var gif = giphy.data[i].images.downsized.url;
                giphyArr.push(gif);
            }

            var giphyDisplay = $("<img>");
            giphyDisplay.attr("src", giphyArr[randomNumber]);
            giphyDisplay.addClass("giphy-img");
            giphyDisplay.attr("id", "giphy-img");

            $("#gif-box").append(giphyDisplay);
        });       
       
    });


    $("#random-btn").on("click", function(event) {
        event.preventDefault();

        var randomNumber = Math.round(Math.random() * 20);
    
        $("#giphy-img").attr("src", giphyArr[randomNumber]);
    
    
    });

});