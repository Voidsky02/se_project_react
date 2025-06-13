function WeatherCard({ temperature }) {
  // pretend way to sort day/night and weather conditions
  const day = {
    clear: "url",
    cloudy: "url",
    rainy: "url",
  };

  const night = {
    clear: "url",
    cloudy: "url",
    rainy: "url",
  };

  // const currentTimeAndWeather = {weatherData.blah}

  return (
    // set src to currentTimeAdnWeather
    <div className="weatherCard">
      <p className="weatherCard__temperature">{`${temperature}°F`}</p>
    </div>
  );
}

export default WeatherCard;
