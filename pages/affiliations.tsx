import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Affiliations.module.css";
import lemon from "../public/img/lemon.svg"

function StudyFreeProgram() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Study Free Program - ETG Art Gallery</title>
        <meta name="description" content="Online Art Gallery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Affiliations</h1>
      <p>There will be more here soon.</p>
      <div className={styles.image}>
        <Image layout="responsive" src={lemon} alt="" />
      </div>
    </div>
  );
}

export default StudyFreeProgram;
