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
      <h3>Analytics data</h3>
      <iframe
        width="600"
        height="450"
        src="https://lookerstudio.google.com/embed/reporting/63635a39-52ca-495d-adfc-bed20e070669/page/s7oxD"
        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      ></iframe>
    </div>
  );
}
