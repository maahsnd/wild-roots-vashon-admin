import { Link } from 'react-router-dom';
import styles from './home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <p>Welcome!</p>
      <p>To make edits to the weekly menu, click the edit menu button.</p>
      <Link className={styles.linkBtn} to="/menu">
        Edit Menu
      </Link>
      <p>To edit other areas of the site, click edit general info</p>
      <Link className={styles.linkBtn} to="/info">
        Edit General Info
      </Link>
    </div>
  );
}
