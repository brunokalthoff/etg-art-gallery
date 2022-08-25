import Head from "next/head";
import styles from "../styles/Exhibitions.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { filterEntries, formatDate, addStatus } from "../components/helpers";

function Exhibitions() {
  const [filter, setFilter] = useState("All");
  const [exhibitions, setExhibitions] = useState<any>(null);
  const [filtered, setFiltered] = useState<any>(null);

  useEffect(() => {
    var config = {
      method: "get",
      url: "/api/exhibitions",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        const exhibitions = addStatus(response.data);
        console.log(exhibitions);
        setExhibitions(exhibitions);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (exhibitions) {
      const results = filterEntries(exhibitions, filter);
      if (results) setFiltered(results);
      else setFiltered(null);
    }
  }, [filter]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Exhibitions - ETG Art Gallery</title>
        <meta name="description" content="Online Art Gallery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <h1>Exhibitions</h1> */}
      <div className={styles.filter}>
        <div
          onClick={() => setFilter("All")}
          className={filter === "All" ? styles.active : ""}
        >
          All
        </div>
        <div
          onClick={() => setFilter("Now")}
          className={filter === "Now" ? styles.active : ""}
        >
          Now
        </div>
        <div
          onClick={() => setFilter("Permanent")}
          className={filter === "Permanent" ? styles.active : ""}
        >
          Permanent
        </div>

        <div
          onClick={() => setFilter("Future")}
          className={filter === "Future" ? styles.active : ""}
        >
          Future
        </div>

        <div
          onClick={() => setFilter("Past")}
          className={filter === "Past" ? styles.active : ""}
        >
          Past
        </div>
      </div>
      <div className={styles.exhibitions}>
        {!exhibitions && "Loading exhibitions..."}
        {exhibitions &&
          !(filter !== "All") &&
          exhibitions.map((exhibit: any, key: number) => {
            return (
              <div key={key} className={styles.exhibition}>
                <div>{exhibit.name}</div>
                <div>
                  <div>
                    start:{" "}
                    {!exhibit.start
                      ? "-" + formatDate(exhibit.start)
                      : formatDate(exhibit.start)}
                  </div>
                  <div>end: {formatDate(exhibit.end)}</div>
                </div>
                <h2 className={exhibit.color}>{exhibit.status}</h2>
              </div>
            );
          })}
        {filter !== "All" && !filtered && "Nothing found"}
        {filter !== "All" &&
          filtered &&
          filtered.map((exhibit: any, key: number) => {
            return (
              <div key={key} className={styles.exhibition}>
                <div>{exhibit.name}</div>
                <div>
                  <div>start: {formatDate(exhibit.start)}</div>
                  <div>end: {formatDate(exhibit.end)}</div>
                </div>
                <h2 className={exhibit.color}>{exhibit.status}</h2>
              </div>
            );
          })}
        <div style={!exhibitions || !filtered ? {} : {visibility: 'hidden'}} className={styles.placeholder}></div>
        <div style={!exhibitions || !filtered ? {} : {visibility: 'hidden'}} className={styles.placeholder}></div>
        <div style={!exhibitions || !filtered ? {} : {visibility: 'hidden'}} className={styles.placeholder}></div>
      </div>
    </div>
  );
}

export default Exhibitions;