import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, clothingItems, handleCardClick }) {
  // pass handleCardClick() to onChange property of ItemCard element / will be recieved from App
  return (
    <main className="main">
      <WeatherCard temperature={weatherData.temperature} />
      <h2 className="main__title">{`Today is ${weatherData.temperature}° F / You may want to wear:`}</h2>
      <div className="cards__container">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              itemName={item.name}
              itemImage={item.link}
              handleCardClick={handleCardClick}
            />
          );
        })}
      </div>
    </main>
  );
}

export default Main;
