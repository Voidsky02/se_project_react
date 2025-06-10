function WeatherCard(props) {
  // will replace this with an API call in the future
  let weatherData = props.tempature;

  return (
    <div className="weatherCard">
      {/* use weatherData when the API is set up */}
      <p className="weatherCard__temperature">75°F</p>
    </div>
  );
}

export default WeatherCard;
