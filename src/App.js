import { useEffect, useState } from 'react'
import bg from './assets/fon-pogoda-4.jpg'
import Descriptions from './components/Descriptions'
import { getFormattedWeatherData } from './weatherService'

function App() {
  const [weather, setWeather] = useState(null)
  const [units, setUnits] = useState('metric')
  const [city, setCity] = useState('saransk')

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units)
      setWeather(data)
    }
    fetchWeatherData()
  }, [units, city])

  // const handleClickUnit = (e) => {
  //   setUnits(units ? units === 'imperial' : 'metric')
  // }

  const handleClickUnit = (e) => {
    const button = e.currentTarget
    const currentUnit = button.innerText.slice(1)

    const isCelsius = currentUnit === 'C'
    button.innerText = isCelsius ? '°F' : '°C'
    setUnits(isCelsius ? 'metric' : 'imperial')
  }

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value)
      e.currentTarget.blur()
    }
  }

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                type="text"
                name="city"
                placeholder="enter city..."
                onKeyDown={enterKeyPressed}
              />
              <button onClick={(e) => handleClickUnit(e)}>°F</button>
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === 'metric' ? 'C' : 'F'
                }`}</h1>
              </div>
            </div>
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
