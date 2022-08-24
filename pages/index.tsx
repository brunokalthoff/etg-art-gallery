import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ETG Art Gallery</title>
        <meta name="description" content="Online Art Gallery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3>Up and coming</h3>
      <div className={styles.news}>
        <h3>ETG#2</h3>
    
        <h4>Know more &#8250; &#8250;</h4>
      </div>
      <h3>Exhibitions</h3>
      
      <div className={styles.exhibitions}>
      <h4>View all &#8250; &#8250;</h4>
      </div>
    </div>
  );
};

export default Home;
