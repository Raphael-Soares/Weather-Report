import { useEffect, useState } from "react";
import { GoLocation } from "react-icons/go";
import { FaTemperatureLow } from "react-icons/fa";
import { BiCurrentLocation } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

import axios from "axios";

const API_KEY = "547dc05df3f5c6a8bbd209e895b43ad9";

import "./App.scss";

function App() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("São Paulo");

    async function getLocation() {
        navigator.geolocation.getCurrentPosition(
            (location) => {
                getDataLocation(location.coords.latitude, location.coords.longitude);
            },
            (error) => {
                getData();
                console.log(error);
            }
        );
    }

    async function getDataLocation(lat, lon) {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`
            );
            setData(response.data);
            setSearch("");
        } catch (error) {
            console.log(error);
        }
    }

    async function getData() {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${
                    search.length === 0 ? " " : search
                }&appid=${API_KEY}&units=metric&lang=pt_br`
            );
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="App">
            <div className="controls">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cidade"
                />
                <button onClick={() => getData(search)}>
                    <AiOutlineSearch />
                </button>
                <button onClick={() => getLocation()} className="current-location">
                    <BiCurrentLocation />
                </button>
            </div>

            {data.length !== 0 && (
                <div className="weather-card">
                    <div className="weather-card__header">
                        <div className="weather-card__header__location">
                            <GoLocation />
                            {data.name}
                        </div>
                        <div className="weather-card__header__date">
                            {new Date().toLocaleDateString()}
                        </div>
                    </div>
                    <div className="weather-card__body">
                        <div className="weather-card__body__temp">
                            <FaTemperatureLow />
                            {data.main.temp}&deg;C
                        </div>
                        <div className="weather-card__body__description">
                            {data.weather[0].description[0].toUpperCase() +
                                data.weather[0].description.substring(1)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
