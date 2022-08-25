import Head from "next/head";
import styles from "../styles/Exhibitions.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

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
        setExhibitions(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const statusColors = {
    soon: styles.soon,
    ended: styles.ended,
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formatDate = (timestamp: number): string => {
    const date: Date = new Date(timestamp);
    const year: number = date.getFullYear();
    const month: string = months[date.getMonth()];
    const day: number = date.getDate();
    if (!timestamp) return "Permanent exhibition";
    return `${month} ${day}, ${year}`;
  };

  useEffect(() => {
    if (exhibitions) {
      const results = filterEntries();
      if (results) setFiltered(results);
      else setFiltered(null);
    }
  }, [filter]);


  const filterEntries = () => {
    const now = Date.now();
    const res = exhibitions.filter((exhibit: any) => {
      const start = exhibit.start;
      const end = exhibit.end;
      console.log(now, start, end);
      if (filter === "All") return;
      if (filter === "Now" && (start > now || (end < now && end))) return;
      if (filter === "Permanent" && end) return;
      if (filter === "Future" && (start < now || !end)) return;
      if (filter === "Past" && (!end || end > now)) return;
      else return exhibit;
    });
    return res;
  };

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
        {!exhibitions && "There are no exhibitions"}
        {exhibitions &&
          !(filter !== "All") &&
          exhibitions.map((exhibit: any, key: number) => {
            return (
              <div key={key} className={styles.exhibition}>
                <div>{exhibit.name}</div>
                <div>start: {formatDate(exhibit.start)}</div>
                <div>end: {formatDate(exhibit.end)}</div>
                <h2 className={exhibit.status === "soon!" ? styles.soon : styles.ended}>{exhibit.status}</h2>
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
                <div>start: {formatDate(exhibit.start)}</div>
                <div>end: {formatDate(exhibit.end)}</div>
                <h2 className={exhibit.status === "soon!" ? styles.soon : styles.ended}>{exhibit.status}</h2>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Exhibitions;
