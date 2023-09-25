import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import envVariables from "../../../importenv";
import { news } from "../../model/news.model";

function UsersNews() {
  const [newsItems, setNewsItems] = useState<news[]>([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = () => {
    fetchNewsFromBackend().then((newsItems) => {
      if (newsItems.length > 0) {
        setNewsItems(newsItems);
      } else {
        setNewsItems([]);
      }
    });
  };

  function fetchNewsFromBackend(): Promise<news[]> {
    const backendURL = envVariables.backendURL;

    return fetch(`${backendURL}/get-news`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.newsItems)) {
          return data.newsItems as news[];
        } else {
          return [];
        }
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  }

  return (
    <div style={{ marginLeft: "10%", marginRight: "10%" }}>
      <div className="Headers">News</div>
      <Accordion className="mt-5">
        {newsItems.length > 0 ? (
          newsItems.map((newsItem, index) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header>
                <div>
                  <div>{newsItem.title}</div>
                  <div style={{ fontSize: "14px", color: "#777" }}>
                    News Date: {newsItem.date}
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body>{newsItem.description}</Accordion.Body>
            </Accordion.Item>
          ))
        ) : (
          <div>No news found.</div>
        )}
      </Accordion>
    </div>
  );
}

export default UsersNews;
