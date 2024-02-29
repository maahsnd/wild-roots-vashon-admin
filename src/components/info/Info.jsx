import { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import { set, ref, onValue, off } from 'firebase/database';
import styles from './info.module.css';

function Info() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const infoRef = ref(db, 'general-info');

    const fetchData = () => {
      onValue(infoRef, (snapshot) => {
        const data = snapshot.val();
        setContent(data.content);
      });
    };

    fetchData();
    return () => {
      off(infoRef, 'value');
    };
  }, []);

  const handleChange = (e, index) => {
    const updatedContent = [...content];
    updatedContent[index].sectionContent = e.target.value;
    setContent(updatedContent);
  };

  const writeToDB = () => {
    set(ref(db, 'general-info'), {
      content: content
    });
  };

  return (
    <div className={styles.container}>
      <button className={styles.submitButton} onClick={writeToDB}>
        Submit changes
      </button>
      {content &&
        content.map((section, index) => (
          <div className={styles.contentSection} key={section.sectionTitle}>
            <h3 className={styles.contentSectionTitle}>
              {section.sectionTitle}
            </h3>
            <textarea
              name={section.sectionTitle}
              id={section.sectionTitle}
              cols="30"
              rows="10"
              value={section.sectionContent}
              onChange={(e) => handleChange(e, index)}
            ></textarea>
          </div>
        ))}
    </div>
  );
}

export default Info;
