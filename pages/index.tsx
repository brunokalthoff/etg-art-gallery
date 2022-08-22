import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ETG Art Gallery</title>
        <meta name="description" content="Online Art Gallery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    </div>
  )
}

export default Home
