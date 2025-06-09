function WeatherCard(props) {
  // will replace this with an API call in the future
  let weatherData = "75°F";

  return (
    <div className="weatherCard">
      <p className="weatherCard__temperature">{weatherData}</p>
    </div>
  );
}

export default WeatherCard;
