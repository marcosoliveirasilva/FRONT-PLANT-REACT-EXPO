import axios from 'axios'

export default async function getCurrentWeather(locationCoords: { latitude: any; longitude: any }){

    const lat = locationCoords.latitude
    
    const log = locationCoords.longitude

    var results: any[] = []
    await axios.get('http://api.openweathermap.org/data/2.5/weather?lat=-14.83509&lon=-40.893666&appid=d9ea01b75ea86d8f7fbd1a79ba00780d')
        .then(response => {

            console.log(response)

            /*const data = response.data     
            const locationName = (data.sys.country + ', ' + ' ' + data.name)
            const temperatureMin = data.main.temp_min
            const temperatureMax = data.main.temp_max
            const wind = data.wind.speed
            const humidity = data.main.humidity
            const currentTemperature = data.main.temp
            
            results = [currentTemperature, temperatureMin, temperatureMax, locationName, wind, humidity]*/
            // [currentTemperature, temperatureMin, temperatureMax, locationName, wind, humidity]
            
        })
        .catch(error => {
            console.log(error)
        });

    //console.log(results)

    //return results
  }