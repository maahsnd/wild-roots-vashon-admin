import React, { useState, useEffect } from 'react';
import styles from './photo_uploader.module.css';
import { storage, db } from '../../firebase-config';
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject // Import deleteObject from Firebase storage
} from 'firebase/storage';
import { ref, set, onValue, off, remove } from 'firebase/database';

function PhotoUploader({ folderName }) {
  const [photos, setPhotos] = useState([]);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const folderRef = storageRef(storage, folderName);
        const files = await listAll(folderRef);
        const downloadURLs = await Promise.all(
          files.items.map(async (fileRef) => {
            const url = await getDownloadURL(fileRef);
            const id = fileRef.name.split('.')[0]; // Extract the filename without extension as ID

            return { url, id };
          })
        );
        setPhotos(downloadURLs);
      } catch (error) {
        console.error('Fetch data error:', error);
      }
    };

    fetchData();
  }, [folderName]);

  const handleUpload = async () => {
    if (image) {
      const imageName = `${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
      const uploadRef = storageRef(storage, `${folderName}/${imageName}`);
      const uploadTask = uploadBytesResumable(uploadRef, image);

      try {
        const snapshot = await uploadTask;
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Generate a unique ID for the image
        const imageId = imageName.split('.')[0]; // Extract the filename without extension as ID
        const newPhotos = [...photos, { url: downloadURL, id: imageId }];
        setPhotos(newPhotos);

        setImage(null);
        setImageUrl(null);
      } catch (error) {
        console.error('Upload error:', error);
      }
    } else {
      console.error('No image selected');
    }
  };

  const handleRemove = async (id) => {
    try {
      // Remove photo from storage
      const photoRef = storageRef(storage, `${folderName}/${id}`);
      await deleteObject(photoRef);

      // Update photos state
      setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== id));
    } catch (error) {
      console.error('Remove error:', error);
    }
  };

  const handleChange = (e) => {
    const selectedImage = e.target.files[0];
    console.log('Selected image:', selectedImage);
    if (selectedImage) {
      setImage(selectedImage);
      const imageUrl = URL.createObjectURL(selectedImage);
      setImageUrl(imageUrl);
    } else {
      console.error('No image selected');
    }
  };

  return (
    <div className={styles.container}>
      <h3>Photo Uploader</h3>
      <div className={styles.uploader}>
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload</button>
        {imageUrl && (
          <div className={styles.imageContainer}>
            <h3>Selected image</h3>
            <img
              src={imageUrl}
              alt="Selected"
              className={styles.selectedImage}
            />
          </div>
        )}
      </div>

      <h3>Photos</h3>
      <div className={styles.photoGallery}>
        {photos.map((photo) => (
          <div key={photo.id} className={styles.imageContainer}>
            <button
              className={styles.removeButton}
              onClick={() => handleRemove(photo.id)}
            >
              Remove Photo
            </button>
            <img src={photo.url} alt={`Uploaded ${photo.id}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoUploader;
