import styles from './analytics.module.css';
export default function Analytics() {
  return (
    <div className={styles.container}>
      {' '}
      <iframe
        width="95%"
        height="95%"
        src="https://lookerstudio.google.com/embed/reporting/63635a39-52ca-495d-adfc-bed20e070669/page/s7oxD"
        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      ></iframe>
    </div>
  );
}
