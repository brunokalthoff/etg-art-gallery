import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import banana from "../public/img/banana.svg";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ETG Art Gallery</title>
        <meta name="description" content="Online Art Gallery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Welcome to the ETG Online Art Gallery!</h1>
      <p>
        There will be more here soon. Check out our exhibitions on the
        exhibitions page.
      </p>
      <div className={styles.image}>
        <Image layout="responsive" src={banana} alt="" />
      </div>
    </div>
  );
};

export default Home;
