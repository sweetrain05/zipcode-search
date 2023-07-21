import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";

// component with news listed
export default function NewsList({ isActive, city, page }) {
    // state
    const [keyword, setKeyword] = useState(city);
    const [date, setDate] = useState("");
    const [news, setNews] = useState([]);

    useEffect(() => {
        if (isActive && city) {
            setKeyword(city.toLowerCase());
            getDateFromWeekAgo();
        }
    }, [isActive, city]);

    const getDateFromWeekAgo = () => {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate);
    };

    useEffect(() => {
        if (isActive && keyword && date) {
            loadNews();
        }
    }, [isActive, keyword, date]);

    const loadNews = async () => {
        try {
            const response = await axios.get(
                `https://api.newscatcherapi.com/v2/search?lang=en&from=${date}&q=` +
                    encodeURIComponent(keyword),
                {
                    headers: {
                        "x-api-key":
                            "hv_SxwynSJGvIp1so6U5J35Qox2AmPWL2qNLMQugBEg",
                    },
                }
            );
            setNews(response.data.articles.slice(0, 10));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <article
                className="news"
                style={{ display: page ? "none" : "flex" }}
            >
                <div className="box title">
                    <h3>{city} News</h3>
                </div>
                <div className="box newslist">
                    <ul>
                        {news?.map((n, i) => (
                            <li key={i}>
                                <NewsCard article={n} />
                            </li>
                        ))}
                    </ul>
                </div>
            </article>
        </>
    );
}
