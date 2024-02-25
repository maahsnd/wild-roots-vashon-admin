import { Link } from 'react-router-dom';
import styles from './nav.module.css';
import { useAuth } from '../AuthContext';

export default function Nav() {
  const { signOut } = useAuth();
  return (
    <div className={styles.navBar}>
      <h1 className={styles.title}>Wild Roots Kitchen Vashon: Admin Page</h1>
      <Link to="/" className={styles.link}>
        Home
      </Link>
      <button className={styles.signOut} onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
}
