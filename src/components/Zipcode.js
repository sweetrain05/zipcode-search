import axios from "axios";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import NewsList from "./NewsList.js";
import Weather from "./Weather.js";
import PageControlBtns from "./PageControlBtns.js";
import useSetBgColor from "../hook/useSetBgColor.js";

function Zipcode() {
    // States set by users
    const [newZipcode, setNewZipcode] = useState("");

    // States based on fetched location data
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [errMsg, setErrMsg] = useState("none");
    const [timezone, setTimezone] = useState("");

    // fetch location data based on zipcode input
    function getLocation(zipcode) {
        const location = {
            method: "GET",
            url:
                "https://redline-redline-zipcode.p.rapidapi.com/rest/info.json/" +
                zipcode +
                "/degrees",
            headers: {
                "X-RapidAPI-Key":
                    "6731250122msh22a4fc489d981d6p181ae7jsn42326f89d137",
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
        setPage(true);
    };

    // Custom hook to set background color based on timezone
    const bgColor = useSetBgColor(isActive, timezone);

    // page toggle UI: weather <-> newslist
    const [page, setPage] = useState(true);
    function nextPage() {
        setPage((current) => !current);
    }

    return (
        <div className="container" style={{ backgroundImage: bgColor }}>
            {/* zipcode input and search area */}
            <div
                className="inputContainer"
                style={{ top: isActive ? "13%" : "50%" }}
            >
                <h3 className="topTitle">
                    {isActive
                        ? `Hey! You are in ${city}, ${state}!`
                        : "Welcome!"}
                </h3>

                {isActive && (
                    <div className="xmark" style={{ padding: "10px" }}>
                        <FiX
                            size="20px"
                            onClick={() => {
                                handleClick();
                            }}
                        />
                    </div>
                )}

                <div
                    className="searchBox"
                    style={{ display: isActive ? "none" : "flex" }}
                >
                    <input
                        type="text"
                        id="zipcode"
                        placeholder="Your zip code"
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
                <Weather
                    isActive={isActive}
                    lng={lng}
                    lat={lat}
                    city={city}
                    page={page}
                />

                <NewsList city={city} isActive={isActive} page={page} />

                <div className="pageBtn">
                    <PageControlBtns page={page} nextPage={nextPage} />
                </div>
            </div>
        </div>
    );
}

export default Zipcode;
