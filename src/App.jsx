import {useEffect, useState} from "react";
import "./App.scss";
function App() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

    async function handleSearch(search) {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=547dc05df3f5c6a8bbd209e895b43ad9&units=metric&lang=pt_br`)
            .then((response) => response.json())
            .then((data) => setData(data));
    }

    return (
        <div className="App">
            <div className="controls">
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                <button onClick={() => handleSearch(search)}>Search</button>
            </div>

            {data.length !== 0 && (
                <div className="weather-card">
                    <div className="weather-card__header">
                        <div className="weather-card__header__location">{data.name}</div>
                        <div className="weather-card__header__date">{new Date().toLocaleDateString()}</div>
                    </div>
                    <div className="weather-card__body">
                        <div className="weather-card__body__temp">{data.main.temp}&deg;C</div>
                        <div className="weather-card__body__description">{data.weather[0].description}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
