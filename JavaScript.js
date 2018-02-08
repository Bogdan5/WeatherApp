function myFunction() {
    $.ajax({
        type: 'GET',
        url: 'https://ipinfo.io/geo',
        dataType: 'json',
        success: function (response) {
            //geolocation
            $("#location").text(response.city + ', ' + response.region + ' ,' + response.country);
            var stringURL = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/dae43fe20b31bfbda237cb39ee6d43dd/' + response.loc;
            $.ajax({
                type: 'GET',
                url: stringURL,
                dataType: 'json',
                success: function (response2) {
                    //retrieving weather information based on coordinates
                    var tempNow = response2.currently.temperature;
                    $("#temperature").text(tempNow.toFixed(1));
                    iconSet(response2.currently.icon);
                    $("#summarytext").text(response2.currently.summary);
                    $("#windspeed").text(response2.currently.windSpeed);
                    var hum=response2.currently.humidity*100;
                    $("#humiditytext").text(hum.toFixed(1)+' %');
                    setWindDirection(response2.currently.windBearing);
                }
            });
        }
    });
}

//changes temperature from Fahrenheit to Celsius and vice-versa
function changeTempSys() {
    var currSys = $("#currSys").text();
    var currTemp = parseFloat($("#temperature").text());
    if (currSys == '\u2103') {
        var toFahrenheit = currTemp * 1.8 + 32;
        $("#temperature").text('' + toFahrenheit.toFixed(1));
        $("#currSys").text('\u2109');
        $("#optionalSys").text('\u2103');
    } else if (currSys =='\u2109') {
        var toCelsius = ((currTemp - 32) * 5) / 9;
        $("#temperature").text('' + toCelsius.toFixed(1));
        $("#currSys").text('\u2103');
        $("#optionalSys").text('\u2109');
    }
    $("#optionalSys").css('color', '#ffb3b3');
}

//based on the API value of the icon, it sets the icon and the background image accordingly
function iconSet(icon) {
    switch (icon) {
        case 'clear-day':
            $("#icon").attr('src', 'http://res.cloudinary.com/dctvlfl7e/image/upload/v1497569661/Clear-day_kdykac.png');
            $("body").css('background-image', "url('http://res.cloudinary.com/dctvlfl7e/image/upload/v1497569760/Clear_day2_zzxxtj.jpg')");
            break;
        case 'clear-night':
            $("#icon").attr('src', 'http://res.cloudinary.com/dctvlfl7e/image/upload/v1497569679/Clear-night_hnokdb.png');
            $("body").css('background-image', "url('http://res.cloudinary.com/dctvlfl7e/image/upload/v1497569762/Clear_night_ixxlu5.jpg')");
            break;
        case 'cloudy':
            $("#icon").attr('src', 'http://res.cloudinary.com/dctvlfl7e/image/upload/v1497569679/Cloudy_azex7p.png');
            $("body").css('background-image', "url('http://res.cloudinary.com/dctvlfl7e/image/upload/v1497569763/Cloudy2_ljf466.jpg')");
            break;
        case 'fog':
            $("#icon").attr('src', 'http://res.cloudinary.com/dctvlfl7e/image/upload/v1497569679/Fog_mt9ml1.png');
            $("body").css('background-image', "url('http://res.cloudinary.com/dctvlfl7e/image/upload/v1497569762/Fog_xd5nzb.jpg')");
            break;
        case 'partly-cloudy-day':
            $("#icon").attr('src', 'http://res.cloudinary.com/dctvlfl7e/image/upload/v1497569679/Partly_cloudy_day_nwcmvv.png');
            $("body").css('background-image', "url('http://res.cloudinary.com/dctvlfl7e/image/upload/v1497569760/Partially_cloudy2_w2tyzh.jpg')");
            break;
        case 'partly-cloudy-night':
            $("#icon").attr('src', 'http://res.cloudinary.com/dctvlfl7e/image/upload/v1497569679/Partly_cloudy_night_vaapfr.png');
            $("body").css('background-image', "url('http://res.cloudinary.com/dctvlfl7e/image/upload/v1497569762/Cloudy_night2_ar2zwb.jpg')");
            break;
        case 'rain':
            $("#icon").attr('src', 'http://res.cloudinary.com/dctvlfl7e/image/upload/v1497569679/Rain_yhd1uz.png');
            $("body").css('background-image', "url('http://res.cloudinary.com/dctvlfl7e/image/upload/v1497569760/Rain2_yirpnx.jpg')");
            break;
        case 'sleet':
            $("#icon").attr('src', 'http://res.cloudinary.com/dctvlfl7e/image/upload/v1497569680/Sleet_isxuqb.png');
            $("body").css('background-image', "url('http://res.cloudinary.com/dctvlfl7e/image/upload/v1497569762/Amazing_Winter_Night_-_Frozen_Tree_in_Winter_Hd_Wallpaper_p2zg5q.jpg')");
            break;
        case 'snow':
            $("#icon").attr('src', 'http://res.cloudinary.com/dctvlfl7e/image/upload/v1497569680/Snow_havqpz.png');
            $("body").css('background-image', "url('http://res.cloudinary.com/dctvlfl7e/image/upload/v1497569756/Snow2_g3rdez.jpg')");
            break;
        case 'windy':
            $("#icon").attr('src', 'http://res.cloudinary.com/dctvlfl7e/image/upload/v1497569680/Windy_sl1s2u.png');
            $("body").css('background-image', "url('http://res.cloudinary.com/dctvlfl7e/image/upload/v1497569759/Wind_g3uhvi.jpg')");
            break;
        default:
            $("#icon").remove();
            $("body").css('background-image', "url('http://res.cloudinary.com/dctvlfl7e/image/upload/v1497569760/Clear_day2_zzxxtj.jpg')");
    }
}


//it translates the bearing from degrees to cardinal points
function setWindDirection(direction) {
    if (direction > 22 && direction < 68) {
        $("#winddirection").text('NW');
    } else if (direction > 67 && direction < 113) {
        $("#winddirection").text('W');
    } else if (direction > 112 && direction < 158) {
        $("#winddirection").text('SW');
    } else if (direction > 157 && direction < 203) {
        $("#winddirection").text('S');
    } else if (direction > 202 && direction < 248) {
        $("#winddirection").text('SE');
    } else if (direction > 247 && direction < 293) {
        $("#winddirection").text('E');
    } else if (direction > 292 && direction < 338) {
        $("#winddirection").text('NE');
    } else {
        $("#winddirection").text('N');
    }
}

function changeSpeedSys(){
  var currSpeed;
  var currSpeedSys=$("#currSpeedSys").text();
  if (currSpeedSys=='mi/h'){
    $('#currSpeedSys').text('km/h');
    $('#optionalSpeedSys').text('mi/h');
    currSpeed=parseFloat($('#windspeed').text())*0.621;
    $("#windspeed").text(currSpeed.toFixed(2));
  } else if (currSpeedSys='km/h'){
    $('#currSpeedSys').text('mi/h');
    $('#optionalSpeedSys').text('km/h');
    currSpeed=parseFloat($('#windspeed').text())*1.609;
    $("#windspeed").text(currSpeed.toFixed(2));
  }
}
