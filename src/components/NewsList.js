import { React, useEffect, useState, useCallback } from "react";

// component with news listed
function NewsList(props) {
  return (
    <>
      {props.news !== null
        ? props.news.map((article, i) => {
            // get article published date
            let publishedDay = props.news[i].datePublished.split("T")[0];
            let publishedYear = publishedDay.split("-")[0];
            let publishedDate = publishedDay.split("-")[2];
            let publishedMonth = publishedDay.split("-")[1];
            switch (Number(publishedMonth)) {
              case 1:
                publishedMonth = "Jan";
                break;
              case 2:
                publishedMonth = "Feb";
                break;
              case 3:
                publishedMonth = "Mar";
                break;
              case 4:
                publishedMonth = "Apr";
                break;
              case 5:
                publishedMonth = "May";
                break;
              case 6:
                publishedMonth = "Jun";
                break;
              case 7:
                publishedMonth = "Jul";
                break;
              case 8:
                publishedMonth = "Aug";
                break;
              case 9:
                publishedMonth = "Sept";
                break;
              case 10:
                publishedMonth = "Oct";
                break;
              case 11:
                publishedMonth = "Nov";
                break;
              case 12:
                publishedMonth = "Dec";
                break;
            }

            // remove any html tag from original snippet text
            let snippetText = props.news[i].snippet.replace(
              /<\/?[^>]+(>|$)/g,
              ""
            );

            // shorten snippet text and end with ...
            snippetText = text_truncate(snippetText, 230, "...");
            function text_truncate(str, length, ending) {
              if (str.length > length) {
                return str.substring(0, length - ending.length) + ending;
              } else {
                return str;
              }
            }

            return (
              <li key={i} className="singleNews">
                <div className="articleImage">
                  <a href={props.news[i].url} target="_blank">
                    <img src={props.news[i].image.url} alt="news image" />
                  </a>
                </div>
                <div className="articleSummary">
                  <a href={props.news[i].url} target="_blank">
                    <h5>{props.news[i].title}</h5>
                  </a>
                  <p>
                    {publishedMonth} {publishedDate}, {publishedYear}
                  </p>

                  {/* <p>{snippetText}</p> */}
                </div>
              </li>
            );
          })
        : null}
    </>
  );
}

export default NewsList;
