import Head from 'next/head'
import styles from '../styles/Home.module.css'

import ContentRender from '../components/BlockRender';
import sanityClient from '../sanityClient'

export default function Home({title, content}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {content && content.map(ContentRender)}
      </main>
    </>
  )
}

export async function getStaticProps(context) {
  const siteConfig = await sanityClient.fetch('*[_type == "siteConfig"][0]{indexPageReference ->}')

  return {
    props: {
      ...siteConfig.indexPageReference
    }
  };
}
