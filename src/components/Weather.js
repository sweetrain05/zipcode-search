import { useEffect, useState } from "react";
import axios from "axios";
import {
    BsFillCloudFogFill,
    BsFillCloudFill,
    BsFillCloudSnowFill,
    BsFillCloudRainFill,
    BsFillSunFill,
    BsFillCloudSunFill,
    BsFillCloudRainHeavyFill,
    BsFillCloudLightningFill,
} from "react-icons/bs";

export default function Weather({ isActive, city, lng, lat, page }) {
    useEffect(() => {
        if (isActive) {
            getWeather(lng, lat);
        }
    }, [city, isActive, lng, lat]);

    // states
    const [temp, setTemp] = useState("");
    const [app_temp, setApp_temp] = useState("");
    const [description, setDescription] = useState("");
    const [windSpeed, setWindSpeed] = useState("");
    const [humidity, setHumidity] = useState("");
    const [clouds, setClouds] = useState("");
    const [precip, setPrecip] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function getWeather(lng, lat) {
        setIsLoading(true);
        const weather = {
            method: "GET",
            url: "https://weatherbit-v1-mashape.p.rapidapi.com/current",
            params: { lon: lng, lat: lat },
            headers: {
                "X-RapidAPI-Key":
                    "6731250122msh22a4fc489d981d6p181ae7jsn42326f89d137",
                "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
            },
        };

        axios
            .request(weather)
            .then(function (response) {
                setTemp(response.data.data[0].temp);
                setApp_temp(response.data.data[0].app_temp);
                setWindSpeed(
                    Math.round(response.data.data[0].wind_spd * 100) / 100
                );
                setHumidity(response.data.data[0].rh);
                setClouds(response.data.data[0].clouds);
                setPrecip(Math.round(response.data.data[0].precip * 100) / 100);
                setCode(response.data.data[0].weather.code);
                setDescription(response.data.data[0].weather.description);
            })
            .catch(function (error) {
                console.error(error);
            })
            .finally(setIsLoading(false));
    }

    // show weather icon based on weather code from API
    const [code, setCode] = useState("");
    const [icon, setIcon] = useState("");

    const weatherIcons = {
        sun: BsFillSunFill,
        cloudRain: BsFillCloudRainFill,
        cloudBolt: BsFillCloudLightningFill,
        cloudShowerHeavy: BsFillCloudRainHeavyFill,
        snowFlake: BsFillCloudSnowFill,
        smog: BsFillCloudFogFill,
        cloudSun: BsFillCloudSunFill,
        cloud: BsFillCloudFill,
    };

    useEffect(() => {
        switch (code) {
            case 200:
            case 201:
            case 202:
            case 230:
            case 231:
            case 232:
            case 233:
                // thunder
                setIcon(<BsFillCloudLightningFill />);
                break;
            case 300:
            case 301:
            case 302:
            case 521:
            case 611:
            case 612:
            case 900:
                // drizzle
                setIcon(<BsFillCloudRainFill />);
                break;
            case 500:
            case 501:
            case 502:
            case 511:
            case 520:
            case 522:
                // heavy rain
                setIcon(<BsFillCloudRainHeavyFill />);
                break;
            case 600:
            case 601:
            case 602:
            case 610:
            case 621:
            case 622:
            case 623:
                // snow
                setIcon(<BsFillCloudSnowFill />);
                break;
            case 700:
            case 711:
            case 721:
            case 731:
            case 741:
            case 751:
                // fog
                setIcon(<BsFillCloudFogFill />);
                break;
            case 800:
                // clear sky
                setIcon(<BsFillSunFill />);
                break;
            case 801:
            case 802:
                // sunny cloud
                setIcon(<BsFillCloudSunFill />);
                break;
            case 803:
            case 804:
                // cloud
                setIcon(<BsFillCloudFill />);
                break;
            default:
                break;
        }
    }, [code]);

    return (
        <>
            <article
                className="weather"
                style={{ display: page ? "flex" : "none" }}
            >
                {isLoading && <p className="paragraph">Loading...</p>}
                {!isLoading && (
                    <>
                        <div className="box title">
                            <h3>Today in {city}</h3>
                        </div>
                        <ul className="box tempIcon">
                            <li>
                                {temp}
                                <span style={{ fontSize: "2rem" }}>°C</span>
                            </li>
                            <li>
                                <div className="beat">{icon}</div>
                            </li>
                        </ul>

                        <div className="box extraInfo">
                            <ul className="extraLeft">
                                <li>
                                    Feels Like <p>{app_temp}°C</p>
                                </li>
                                <li>
                                    Wind Speed <p>{windSpeed}m/s</p>
                                </li>
                                <li>
                                    Humidity <p>{humidity}%</p>
                                </li>
                            </ul>
                            <ul className="extraRight">
                                <li>
                                    It's <p>{description}</p>
                                </li>
                                <li>
                                    Cloud Coverage <p>{clouds}%</p>
                                </li>
                                <li>
                                    Rain <p>{precip}mm/hr</p>
                                </li>
                            </ul>
                        </div>
                    </>
                )}
            </article>
        </>
    );
}
