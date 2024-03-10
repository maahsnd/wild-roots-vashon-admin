import { useState } from 'react';
import styles from './general_photos.module.css';
import PhotoUploader from '../photo-uploader/PhotoUploader';

function GeneralPhotos() {
  const [pageName, setPageName] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.pageSelectButtons}>
        <h3>Select page to edit photos: </h3>
        <button
          onClick={() => setPageName('aboutPhotos')}
          className={styles.pageBtn}
        >
          About
        </button>
        <button
          onClick={() => setPageName('farmPhotos')}
          className={styles.pageBtn}
        >
          Farm
        </button>
      </div>
      {pageName && <p>Edit {pageName}</p>}
      {pageName && <PhotoUploader folderName={pageName} />}
    </div>
  );
}

export default GeneralPhotos;
