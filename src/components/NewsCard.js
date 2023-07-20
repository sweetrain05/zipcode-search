import moment from "moment";
import noImageJPG from "../image/noImage.jpg";
export default function NewsCard({ article }) {
    return (
        <>
            <a href={article?.url} target="_blank">
                <div className="singleNews">
                    <div className="articleImage">
                        <img
                            src={
                                article?.urlToImage
                                    ? article.urlToImage
                                    : noImageJPG
                            }
                            alt="news image"
                        />
                    </div>
                    <div className="articleSummary">
                        <h3>
                            {article?.title.length > 80
                                ? article?.title.substring(0, 70) + "..."
                                : article?.title}
                        </h3>
                        <div className="articleInfo">
                            <h4>{article?.source.name}</h4>
                            <h5>
                                Published on{" "}
                                {moment(article?.publishedAt).format(
                                    "MMMM Do, YYYY, h:mm a"
                                )}
                            </h5>
                        </div>
                    </div>
                </div>
            </a>
        </>
    );
}
