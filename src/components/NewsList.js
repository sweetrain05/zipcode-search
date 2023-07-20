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

    // useEffect(() => {
    //     if (isActive == true) {
    //         //searchNews(city, state);
    //     }
    // }, [city]);

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
            const { data } = await axios.get(
                `https://newsapi.org/v2/everything?language=en&q=${keyword}&from=${date}&sortBy=publishedAt&apiKey=fbe7add389b5448ab567a25fe77713ec`
            );
            setNews(data.articles.slice(0, 6));
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
                        {news?.map((article, i) => (
                            <li key={i}>
                                <NewsCard article={article} />
                            </li>
                        ))}
                    </ul>
                </div>
            </article>
        </>
    );
}
