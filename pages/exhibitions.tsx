import Head from "next/head";
import styles from "../styles/Exhibitions.module.css";
import { useState, useEffect } from "react";

function Exhibitions() {
  const [filter, setFilter] = useState("All");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const results = filterEntries();
    if (results) setFiltered(results);
    else setFiltered([]);
    
  }, [filter]);

  const filterEntries = () => {
    const now = Date.now();
    if (filter === "All" || "Permanent") return exhibitions;
    if (filter === "Actual") {
      const results = exhibitions.filter(exhibit => {
        const starting = Date.parse(exhibit.start.toString());
        const ending = Date.parse(exhibit.end.toString());
        return starting < now && ending > now;
      });
      return results;
    }
    if (filter === "Upcoming") {
        const results = exhibitions.filter(exhibit => {
            const starting = Date.parse(exhibit.start.toString());
            return starting > now;
        })
        return results;
    }
    if (filter === "Past") {
        const results = exhibitions.filter(exhibit => {
            const ending = Date.parse(exhibit.end.toString());
            return ending < now;
        })
        return results;
    }
  };

  const exhibitions = [
    {
      name: "ETG#2",
      start: new Date(2022, 8, 10),
      end: new Date(2022, 9, 10),
      status: "soon",
      statusColor: styles.soon,
    },
    {
      name: "ETG#1",
      start: new Date(2021, 1, 1),
      end: new Date(2021, 1, 28),
      status: "ended",
      statusColor: styles.ended,
    },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Exhibitions - ETG Art Gallery</title>
        <meta name="description" content="Online Art Gallery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.filter}>
        <div
          onClick={() => setFilter("All")}
          className={filter === "All" ? styles.active : ""}
        >
          All
        </div>
        <div
          onClick={() => setFilter("Actual")}
          className={filter === "Actual" ? styles.active : ""}
        >
          Actual
        </div>
        <div
          onClick={() => setFilter("Permanent")}
          className={filter === "Permanent" ? styles.active : ""}
        >
          Permanent
        </div>

        <div
          onClick={() => setFilter("Upcoming")}
          className={filter === "Upcoming" ? styles.active : ""}
        >
          Upcoming
        </div>

        <div
          onClick={() => setFilter("Past")}
          className={filter === "Past" ? styles.active : ""}
        >
          Past
        </div>
      </div>

      {filtered.map((exhibit, key) => {
        return (
          <div key={key} className={styles.exhibition}>
            <div>{exhibit.name}</div>
            <div>start: {exhibit.start.toDateString()}</div>
            <div>end: {exhibit.end.toDateString()}</div>
            <div className={exhibit.statusColor}> {exhibit.status} </div>
          </div>
        );
      })}
    </div>
  );
}

export default Exhibitions;
