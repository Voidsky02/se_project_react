function WeatherCard({ temperature }) {
  return (
    <div className="weatherCard">
      <p className="weatherCard__temperature">{`${temperature}°F`}</p>
    </div>
  );
}

export default WeatherCard;
