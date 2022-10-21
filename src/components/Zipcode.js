import axios from "axios";
import { React, useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCircle,
  faCloudBolt,
  faSun,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSmog,
  faCloudSun,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";
import NewsList from "./NewsList.js";

function Zipcode() {
  let [newZipcode, setNewZipcode] = useState("");

  // Variables based on fetched location data
  let [city, setCity] = useState("");
  let [state, setState] = useState("");
  let [lat, setLat] = useState("");
  let [lng, setLng] = useState("");
  let [errMsg, setErrMsg] = useState("none");

  // fetch location data based on zipcode input
  function getLocation(zipcode) {
    const location = {
      method: "GET",
      url:
        "https://redline-redline-zipcode.p.rapidapi.com/rest/info.json/" +
        zipcode +
        "/degrees",
      headers: {
        "X-RapidAPI-Key": "6731250122msh22a4fc489d981d6p181ae7jsn42326f89d137",
        "X-RapidAPI-Host": "redline-redline-zipcode.p.rapidapi.com",
      },
    };

    axios
      .request(location)
      .then(function (response) {
        setCity(response.data.city);
        setState(response.data.state);
        setLat(response.data.lat);
        setLng(response.data.lng);
        setTimezone(response.data.timezone.timezone_identifier);
        handleClick();
      })
      .catch(function (error) {
        console.error(error);

        // in case of invalid zipcode, show error message
        setIsActive(false);
        setErrMsg("block");
        setTimeout(() => {
          setErrMsg("none");
        }, 1500);
      });
  }

  // Toggle switch : turns active when customer clicks 'search' button and if zipcode is valid
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive((current) => !current);
  };

  // fetch weather data only when zipcode fetch is a success and city is changed
  useEffect(() => {
    if (isActive == true) {
      getWeather(lng, lat);
    }
  }, [city]);

  // Variables based on fetched weather data
  let [temp, setTemp] = useState("");
  let [app_temp, setApp_temp] = useState("");
  let [description, setDescription] = useState("");
  let [windSpeed, setWindSpeed] = useState("");
  let [humidity, setHumidity] = useState("");
  let [clouds, setClouds] = useState("");
  let [precip, setPrecip] = useState("");

  function getWeather(lng, lat) {
    const weather = {
      method: "GET",
      url: "https://weatherbit-v1-mashape.p.rapidapi.com/current",
      params: { lon: lng, lat: lat },
      headers: {
        "X-RapidAPI-Key": "6731250122msh22a4fc489d981d6p181ae7jsn42326f89d137",
        "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
      },
    };

    axios
      .request(weather)
      .then(function (response) {
        setTemp(response.data.data[0].temp);
        setApp_temp(response.data.data[0].app_temp);
        setWindSpeed(Math.round(response.data.data[0].wind_spd * 100) / 100);
        setHumidity(response.data.data[0].rh);
        setClouds(response.data.data[0].clouds);
        setPrecip(Math.round(response.data.data[0].precip * 100) / 100);
        setCode(response.data.data[0].weather.code);
        setDescription(response.data.data[0].weather.description);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  // show weather icon based on weather code from API
  let [code, setCode] = useState("");
  let [icon, setIcon] = useState("");

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
        setIcon(faCloudBolt);
        break;
      case 300:
      case 301:
      case 302:
      case 521:
      case 611:
      case 612:
      case 900:
        // drizzle
        setIcon(faCloudRain);
        break;
      case 500:
      case 501:
      case 502:
      case 511:
      case 520:
      case 522:
        // heavy rain
        setIcon(faCloudShowersHeavy);
        break;
      case 600:
      case 601:
      case 602:
      case 610:
      case 621:
      case 622:
      case 623:
        // snow
        setIcon(faSnowflake);
        break;
      case 700:
      case 711:
      case 721:
      case 731:
      case 741:
      case 751:
        // fog
        setIcon(faSmog);
        break;
      case 800:
        // clear sky
        setIcon(faSun);
        break;
      case 801:
      case 802:
        // sunny cloud
        setIcon(faCloudSun);
        break;
      case 803:
      case 804:
        // cloud
        setIcon(faCloud);
        break;
    }
  }, [code]);

  function Weather() {
    return (
      <>
        <ul className="box tempIcon">
          <li>
            {temp}
            <span style={{ fontSize: "2rem" }}>°C</span>
          </li>
          <li>
            <FontAwesomeIcon
              icon={code !== null ? icon : null}
              beat
              style={{ animationDuration: "3s" }}
            />
          </li>
        </ul>

        <div className="box extraInfo">
          <ul className="extraLeft">
            <li>
              feels like <p>{app_temp}°C</p>
            </li>
            <li>
              wind speed <p>{windSpeed}m/s</p>
            </li>
            <li>
              humidity <p>{humidity}%</p>
            </li>
          </ul>
          <ul className="extraRight">
            <li>
              It's <p>{description}</p>
            </li>
            <li>
              cloud coverage <p>{clouds}%</p>
            </li>
            <li>
              rain <p>{precip}mm/hr</p>
            </li>
          </ul>
        </div>
      </>
    );
  }

  // get current Time and Date for the city
  let [timezone, setTimezone] = useState("");
  let [countryCode, cityCode] = timezone.split("/");

  useEffect(() => {
    if (isActive == true) {
      getTimeAndDate(countryCode, cityCode);
    }
  }, [timezone]);

  function getTimeAndDate(countryCode, cityCode) {
    const timeAndDate = {
      method: "GET",
      url:
        "https://world-time2.p.rapidapi.com/timezone/" +
        countryCode +
        "/" +
        cityCode,
      headers: {
        "X-RapidAPI-Key": "6731250122msh22a4fc489d981d6p181ae7jsn42326f89d137",
        "X-RapidAPI-Host": "world-time2.p.rapidapi.com",
      },
    };

    axios
      .request(timeAndDate)
      .then(function (response) {
        setTime(response.data.datetime);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  // Change background color based on current time

  let [time, setTime] = useState("");
  let [hour, setHour] = useState("");

  useEffect(() => {
    if (isActive == true) {
      setHour(time.split("T")[1].split(":")[0]);
    }
  }, [time]);

  let [bgColor, setBgColor] = useState("");

  useEffect(() => {
    switch (hour !== null) {
      case hour > 0 && hour <= 4:
        setBgColor("linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)"); //pink purple
        break;
      case hour > 4 && hour <= 9:
        setBgColor("linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)"); // green purple
        break;
      case hour > 9 && hour <= 15:
        setBgColor("linear-gradient(to top, #89f7fe 0%, #66a6ff 100%)"); //blue
        break;
      case hour > 15 && hour <= 19:
        setBgColor("linear-gradient(to top, #F55555 10%, #FCCF31 100%)"); //yellow orange
        break;
      case hour > 19:
        setBgColor("linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)"); //pink purple
        break;
    }
  }, [hour]);

  // search news for the given city name
  useEffect(() => {
    if (isActive == true) {
      searchNews(city, state);
    }
  }, [city]);

  function searchNews(city, state) {
    const news = {
      method: "GET",
      url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI",
      params: {
        q: city + state,
        pageNumber: "1",
        pageSize: "3",
        autoCorrect: "true",
        safeSearch: "true",
        withThumbnails: "true",
        fromPublishedDate: "null",
        toPublishedDate: "null",
      },
      headers: {
        "X-RapidAPI-Key": "6731250122msh22a4fc489d981d6p181ae7jsn42326f89d137",
        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
      },
    };

    axios
      .request(news)
      .then(function (response) {
        console.log(response.data);
        setNews(response.data.value);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  // push fetched news data into variable 'news'
  // this variable will be used in component 'NewsList.js'
  let [news, setNews] = useState([]);

  // page toggle UI: weather <-> newslist
  let [page, setPage] = useState(true);
  function nextPage() {
    setPage((current) => !current);
  }

  return (
    <div className="container" style={{ backgroundImage: bgColor }}>
      {/* zipcode input and search area */}
      <div className="inputContainer" style={{ top: isActive ? "20%" : "50%" }}>
        <h3 className="topTitle">
          {isActive
            ? "Hey! you are in " + city + ", " + state + "!"
            : "Welcome!"}
        </h3>
        <h3>
          {isActive ? (
            <FontAwesomeIcon
              icon={faXmark}
              className="xmark"
              onClick={() => {
                handleClick();
              }}
            />
          ) : null}
        </h3>

        <div
          className="searchBox"
          style={{ display: isActive ? "none" : "flex" }}
        >
          <input
            type="text"
            id="zipcode"
            placeholder="What is your zipcode?"
            value={newZipcode}
            onChange={(event) => {
              event.preventDefault();
              setNewZipcode(event.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getLocation(newZipcode);
                setNewZipcode("");
              }
            }}
          ></input>
          <button
            id="searchBtn"
            onClick={() => {
              getLocation(newZipcode);
              setNewZipcode("");
            }}
          >
            Search
          </button>
        </div>
        <p className="errorMsg" style={{ display: errMsg }}>
          Please enter a valid zipcode.
        </p>
      </div>

      {/* Result data container */}
      <div
        className="resultContainer"
        style={{ display: isActive ? "flex" : "none" }}
      >
        <article
          className="weather"
          style={{ display: page ? "flex" : "none" }}
        >
          <div className="box title">
            <h3>Today in {city}</h3>
          </div>
          <Weather lng={lng} lat={lat} />
        </article>

        <article className="news" style={{ display: page ? "none" : "flex" }}>
          <div className="box title">
            <h3>{city} News</h3>
          </div>
          <div className="box newslist">
            <ul>
              <NewsList news={news} />
            </ul>
          </div>
        </article>

        <div className="pageControl">
          <FontAwesomeIcon
            className="circle"
            icon={faCircle}
            style={{ color: page ? "rgb(78, 78, 78)" : "rgb(131, 131, 131)" }}
            onClick={() => {
              nextPage();
            }}
          />
          <FontAwesomeIcon
            className="circle"
            icon={faCircle}
            style={{ color: page ? "rgb(131, 131, 131)" : "rgb(78, 78, 78)" }}
            onClick={() => {
              nextPage();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Zipcode;
