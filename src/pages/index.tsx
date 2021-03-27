import Head from 'next/head';
import { SubscriberButton } from '../components/SubscriberButton';

import styles from './home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👋 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>Get access to all the publications<br />
          <span>form $9.90 month</span></p>
          <SubscriberButton />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}