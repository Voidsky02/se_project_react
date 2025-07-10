import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { temperatureCheck } from "../../utils/weatherApi";
import TemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, clothingItems, handleCardClick, weatherOptions }) {
  // pass handleCardClick() to onChange property of ItemCard element / will be recieved from App
  const currentWeatherType = temperatureCheck(weatherData.temperature);
  const filteredClothingItems = clothingItems.filter((item) => {
    return item.weather === currentWeatherType;
  });

  const tempUnitContext = React.useContext(TemperatureUnitContext);

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
              id={item._id}
              itemName={item.name}
              itemImage={item.imageUrl}
              itemWeather={item.weather}
              handleCardClick={handleCardClick}
            />
          );
        })}
      </div>
    </main>
  );
}

export default Main;
