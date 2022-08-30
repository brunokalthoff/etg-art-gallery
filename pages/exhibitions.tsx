import Head from "next/head";
import styles from "../styles/Exhibitions.module.css";
import { useState, useEffect } from "react";
import {
  filterEntries,
  formatDate,
  addStatus,
  parseDate,
} from "../components/helpers";
import { GraphQLClient, gql } from "graphql-request";

const hygraph = new GraphQLClient(
  "https://api-eu-central-1.hygraph.com/v2/cl7fqxy9p71pu01ujcdjzdgqr/master"
);

const QUERY = gql`
  {
    exhibitionsIEDB {
      title
      end
      start
      etGsOwnExhibition
      descriptionShort
      thumbnail {
        id
      }
    }
  }
`;

export async function getServerSideProps() {
  const { exhibitionsIEDB } = await hygraph.request(QUERY);
  const exhis = await parseDate(exhibitionsIEDB);
  const exhibitions = addStatus(exhis);
  return {
    props: { exhibitions },
  };
}

function Exhibitions({ exhibitions }: any) {
  const [filter, setFilter] = useState<null | string>(null);
  const [filtered, setFiltered] = useState<any>(exhibitions);

  useEffect(() => {
    const results = filterEntries(exhibitions, filter);
    if (results) setFiltered(results);
  }, [filter, exhibitions]);

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
          onClick={() => setFilter(null)}
          className={!filter ? styles.active : ""}
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
        {filtered.map((exhibit: any, key: number) => {
          return (
            <div key={key} className={styles.exhibition}>
              <div>{exhibit.title}</div>
              <div>
                <div>start: {formatDate(exhibit.start)}</div>
                <div>end: {formatDate(exhibit.end)}</div>
              </div>
              <h2 className={exhibit.color}>{exhibit.status}</h2>
            </div>
          );
        })}
        {[1, 2, 3].map((x) => (
          <div key={x} className={styles.placeholder} />
        ))}
      </div>
    </div>
  );
}

export default Exhibitions;
