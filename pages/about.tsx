import Head from "next/head";
import styles from "../styles/About.module.css";

function About() {
  return (
    <div className={styles.container}>
      <Head>
        <title>About - ETG Art Gallery</title>
        <meta name="description" content="Online Art Gallery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>ABOUT</h1>
    </div>
  );
}

export default About;
