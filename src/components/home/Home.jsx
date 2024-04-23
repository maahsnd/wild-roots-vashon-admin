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
      <p>To add photos to the weekly menu, click the add menu photos button.</p>
      <Link className={styles.linkBtn} to="/menu-photos">
        Add Menu Photos
      </Link>
      <p>
        To edit the farm stand and farmer's market pages, click edit general
        info
      </p>
      <Link className={styles.linkBtn} to="/info">
        Edit Stand/ Market Info
      </Link>
      <p>To add the farm stand and farmer's market, click add general photos</p>
      <Link className={styles.linkBtn} to="/general-photos">
        Add Stand/ Market Photos
      </Link>
      <p>To view site visit data from Google Analytics, click analytics data</p>
      <Link className={styles.linkBtn} to="/analytics">
        Analytics data
      </Link>
    </div>
  );
}
