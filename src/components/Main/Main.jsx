import WeatherCard from "../WeatherCard/WeatherCard";

function Main({ weatherData }) {
  return (
    <main>
      <WeatherCard temperature={weatherData.temperature} />
      {/* ItemCard ?????? */}
    </main>
  );
}

export default Main;
