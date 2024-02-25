import React, { useState, useEffect } from 'react';
import styles from './photo_uploader.module.css';
import { storage, db } from '../../firebase-config';
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  listAll
} from 'firebase/storage';
import { ref, set, onValue, off } from 'firebase/database';

function PhotoUploader() {
  const [photos, setPhotos] = useState([]);
  const [captions, setCaptions] = useState({});
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const folderName = 'menuPhotos';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const folderRef = storageRef(storage, folderName);
      const files = await listAll(folderRef);
      const downloadURLs = await Promise.all(
        files.items.map(async (fileRef) => {
          const url = await getDownloadURL(fileRef);
          const id = fileRef.name.split('.')[0]; // Extract the filename without extension as ID

          // Listen for changes to the caption in the Realtime Database
          const captionRef = ref(db, `photo-captions/${id}`);
          onValue(captionRef, (snapshot) => {
            const caption = snapshot.val() || ''; // Set caption to an empty string if it doesn't exist
            setCaptions((prevCaptions) => ({ ...prevCaptions, [id]: caption }));
          });

          return { url, id };
        })
      );
      setPhotos(downloadURLs);
    } catch (error) {
      console.error('Fetch data error:', error);
    }
  };

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

  const handleCaptionChange = async (imageId, e) => {
    const caption = e.target.value;

    try {
      // Update captions in the Realtime Database
      await set(ref(db, `photo-captions/${imageId}`), caption);
      // Update captions state
      setCaptions((prevCaptions) => ({ ...prevCaptions, [imageId]: caption }));
    } catch (error) {
      console.error('Update caption error:', error);
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
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>

      <div>
        {photos.map((photo) => (
          <div key={photo.id} className={styles['image-container']}>
            <img src={photo.url} alt={`Uploaded ${photo.id}`} />
            <input
              type="text"
              value={captions[photo.id] || ''}
              onChange={(e) => handleCaptionChange(photo.id, e)}
              className={styles['caption-input']}
              placeholder="Add a caption"
            />
          </div>
        ))}
      </div>

      {imageUrl && (
        <div className={styles['image-container']}>
          <img
            src={imageUrl}
            alt="Selected"
            className={styles['selected-image']}
          />
        </div>
      )}
    </div>
  );
}

export default PhotoUploader;
