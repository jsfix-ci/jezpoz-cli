import Head from 'next/head'
import styles from '../styles/Home.module.css'

import sanityClient from '../sanityClient';
import BlockRender from '../components/BlockRender';

export default function Page({title, content}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {content && content.map(BlockRender)}
      </main>
    </>
  )
}


export async function getStaticProps(context) {
  const page = await sanityClient.fetch('*[_type == "route" && slug.current == $slug][0]{pageReference -> }.pageReference', {
    slug: context.params.page,
  })
  return {
    props: {
      ...page
    }
  }
}

export async function getStaticPaths() {
  const slugs = await sanityClient.fetch('*[_type == "route"].slug')
  return {
    paths: slugs.map(slug => ({
      params: {
        page: slug.current,
      }
    })),
    fallback: false,
  }
}