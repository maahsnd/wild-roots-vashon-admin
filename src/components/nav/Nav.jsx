import { Link } from 'react-router-dom';
import styles from './nav.module.css';

export default function Nav() {
  return (
    <div className={styles.navBar}>
      <h1 className={styles.title}>Wild Roots Kitchen Vashon: Admin Page</h1>
      <Link to="/" className={styles.link}>
        Home
      </Link>
    </div>
  );
}
