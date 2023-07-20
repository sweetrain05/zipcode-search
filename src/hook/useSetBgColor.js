import axios from "axios";
import { useEffect, useState } from "react";

export default function useSetBgColor(isActive, timezone) {
    // states
    const [hour, setHour] = useState("");
    const [bgColor, setBgColor] = useState("");

    useEffect(() => {
        const [countryCode, cityCode] = timezone.split("/");
        if (isActive && countryCode && cityCode) {
            axios
                .request({
                    method: "GET",
                    url:
                        "https://world-time2.p.rapidapi.com/timezone/" +
                        countryCode +
                        "/" +
                        cityCode,
                    headers: {
                        "X-RapidAPI-Key":
                            "6731250122msh22a4fc489d981d6p181ae7jsn42326f89d137",
                        "X-RapidAPI-Host": "world-time2.p.rapidapi.com",
                    },
                })
                .then(function (response) {
                    setHour(response.data.datetime.split("T")[1].split(":")[0]);
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
    }, [isActive, timezone]);

    // Set background color value based on current time of timezone
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
                setBgColor(
                    "linear-gradient(to top, #F55555 10%, #FCCF31 100%)"
                ); //yellow orange
                break;
            case hour > 19:
                setBgColor("linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)"); //pink purple
                break;
            default:
                break;
        }
    }, [hour]);

    return bgColor;
}
