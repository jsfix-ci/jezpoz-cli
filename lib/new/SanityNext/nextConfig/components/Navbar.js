import { useContext } from 'react';
import SiteConfigContext from '../contexts/siteConfigContext';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const { navigation } = useContext(SiteConfigContext);

  return (
    <nav className={styles.navbar}>
      <a href="/" className={styles.navbarItem}>
        Home
      </a>
      {navigation && navigation.map(({slug, title}, index) => 
        <a key={index} href={slug} className={styles.navbarItem}>{title}</a>
      )}
    </nav>
  );
}