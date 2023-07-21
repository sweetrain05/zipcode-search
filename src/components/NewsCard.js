import moment from "moment";
import noImageJPG from "../image/noImage.jpg";
export default function NewsCard({ article }) {
    return (
        <>
            <a href={article?.link} target="_blank">
                <div className="singleNews">
                    <div className="articleImage">
                        <img
                            src={article?.media ? article?.media : noImageJPG}
                            alt="news image"
                        />
                    </div>
                    <div className="articleSummary">
                        <h3>
                            {article?.title?.length > 80
                                ? article?.title.substring(0, 70) + "..."
                                : article?.title}
                        </h3>
                        <div className="articleInfo">
                            <h4>
                                {article?.rights?.length > 13
                                    ? article?.rights.substring(0, 13) + "..."
                                    : article?.rights}
                            </h4>
                            <h5>
                                Published on{" "}
                                {moment(article?.published_date).format(
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
