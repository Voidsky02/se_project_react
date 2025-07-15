import React from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { temperatureCheck } from "../../utils/weatherApi";
import TemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, clothingItems, handleCardClick, weatherOptions }) {
  // pass handleCardClick() to onChange property of ItemCard element / will be recieved from App
  const tempUnitContext = React.useContext(TemperatureUnitContext);

  const currentWeatherType = temperatureCheck(
    Number(weatherData.temperature[tempUnitContext.currentTemperatureUnit]),
    tempUnitContext.currentTemperatureUnit
  );
  const filteredClothingItems = clothingItems.filter((item) => {
    return item.weather === currentWeatherType;
  });

  return (
    <main className="main">
      <WeatherCard
        temperature={weatherData.temperature}
        weather={weatherData.weather}
        weatherOptions={weatherOptions}
      />
      <h2 className="main__title">{`Today is ${
        weatherData.temperature[tempUnitContext.currentTemperatureUnit]
      }°${tempUnitContext.currentTemperatureUnit} / You may want to wear:`}</h2>
      <div className="cards__container">
        {filteredClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              handleCardClick={handleCardClick}
            />
          );
        })}
      </div>
    </main>
  );
}

export default Main;
