import '../styles/globals.css'
import { useState, useEffect } from 'react';

import SiteConfigContext from '../contexts/siteConfigContext';
import sanityClient from '../sanityClient';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  const [siteConfig, setSiteConfig] = useState({});

  useEffect(() => {
    getSiteConfig();
  }, []);

  async function getSiteConfig() {
    const siteConfig = await sanityClient.fetch(`
      *[_type == "siteConfig"][0]{
        title,
        lang,
        navigation[] -> {
          'title': pageReference -> { title }.title,
          'slug': slug.current
        }
      }`);
    setSiteConfig(siteConfig);
  }

  return (
    <SiteConfigContext.Provider value={siteConfig}>
      <Navbar />
      <Component {...pageProps} />
    </SiteConfigContext.Provider>
  );
    
}

export default MyApp
