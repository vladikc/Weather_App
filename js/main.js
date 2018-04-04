//Select Elements and create you variables

var ROOT_URL = 'http://api.openweathermap.org/data/2.5/weather?zip='
var API_KEY = '29489deb2e20252383fa46b347cca67f'
var title = document.querySelector('.cityTitle')
var zip = document.querySelector('.zip')
var weather = document.querySelector('.weather')
var icon = document.querySelector('.icon')
var temp = document.querySelector('.temp')
var humid = document.querySelector('.humid')
var btn = document.querySelector('button')
var deg = document.querySelector('.deg')
var body = document.querySelector('body')
var faren
var fc = "f"

var icons = {
  "Clouds": [`img/cloudy.png`, 'https://pics.freeartbackgrounds.com/fullhd/Blue_Cloudy_Sky_Background-1074.jpg'],
  "Rain": `img/rain.png`,
  "Snow": `img/snow.png`,
  "Clear": `img/sun.png`,
  "Thunderstorm": `img/thunderstorm.png`
}

//Function Definitions
function iconSelector(weather){
  return icons[weather][0]
}
function kelToFar(kelvin){
  return Math.round(kelvin * 9/5 -459.67)
}
function FtoC(temper){
  return Math.floor((temper - 32) * (5/9))
}
function CtoF(temper){

}
function getWeather(zipCode){
  $.ajax({
    url: `${ROOT_URL}${zipCode},us&appid=${API_KEY}`,
    dataType: 'json',
    success: function(data){
      title.textContent = "City: "
      console.log(data)
      title.textContent += data.name
      weather.textContent = data.weather[0].main
      temp.textContent = kelToFar(data.main.temp)
      faren = kelToFar(data.main.temp)
      humid.textContent = data.main.humidity
      icon.src= iconSelector(data.weather[0].main)

      document.querySelector("body").style.background = `#f3f3f3 url("${icons[data.weather[0].main][1]}") 0% 0% no-repeat fixed`
    },
    error: function(e){
      console.log('Error')
    }
  })
}




//Call functions and Event Listeners
getWeather('33166')
zip.addEventListener("keypress", function(event){
  if(event.key == 'Enter'){
    getWeather(zip.value)
  }
})

btn.addEventListener("click", function(event){
  if(fc == "f"){
    //run function f to c
    temp.textContent = FtoC(temp.textContent)
    btn.textContent = "Convert to F"
    deg.innerHTML = " &deg; C"
    fc = "c"
  } else {
    //run function c to f
    temp.textContent = faren
    btn.textContent = "Convert to C"
    deg.innerHTML = " &deg; F"
    fc = "f"
  }
})
