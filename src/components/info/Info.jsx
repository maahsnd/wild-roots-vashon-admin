import { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import { set, ref, onValue, off } from 'firebase/database';
import styles from './info.module.css';

function Info() {
  const [content, setContent] = useState(null);
  const [msg, setMsg] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [pageName, setPageName] = useState('');

  useEffect(() => {
    const infoRef = ref(db, 'general-info');

    const fetchData = () => {
      onValue(infoRef, (snapshot) => {
        const data = snapshot.val();
        setContent(data);
      });
    };

    fetchData();
    return () => {
      off(infoRef, 'value');
    };
  }, []);

  const handleChange = (e, index) => {
    const updatedContent = [...selectedPage];
    updatedContent[index].description = e.target.value;
    setSelectedPage(updatedContent);
  };

  const addItem = () => {
    const updatedContent = [...selectedPage];
    updatedContent.push({ description: '', title: 'Item' });
    setSelectedPage(updatedContent);
  };

  const removeItem = (index) => {
    const updatedContent = selectedPage.filter((_, i) => i !== index);
    setSelectedPage(updatedContent);
  };

  const writeToDB = () => {
    const update = { ...content };
    update[pageName] = selectedPage;
    set(ref(db, 'general-info'), {
      farmStand: update.farmStand,
      farmersMarket: update.farmersMarket
    });
    setMsg('Updated!');
    setTimeout(() => setMsg(null), 2000);
  };

  const handlePageSelect = (page) => {
    setSelectedPage(content[page]);
    setPageName(page);
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageSelectButtons}>
        <h3>Select page to edit: </h3>
        <button
          onClick={() => handlePageSelect('farmStand')}
          className={styles.pageBtn}
        >
          Farm Stand
        </button>
        <button
          onClick={() => handlePageSelect('farmersMarket')}
          className={styles.pageBtn}
        >
          Farmer's Market
        </button>
      </div>
      <p className={styles.msg}>{msg}</p>
      {selectedPage && (
        <>
          {selectedPage.map((section, index) => (
            <div className={styles.contentSection} key={`${pageName}${index}`}>
              <h3 className={styles.contentSectionTitle}>{section.title}</h3>
              <div className={styles.descriptionWrap}>
                <textarea
                  name={index}
                  className={`${
                    section.title === 'Item' ? styles.foodItem : ''
                  } `}
                  id={index}
                  cols="30"
                  rows="10"
                  value={section.description}
                  onChange={(e) => handleChange(e, index)}
                ></textarea>
                {section.title === 'Item' && (
                  <button
                    className={styles.removeItem}
                    onClick={() => removeItem(index)}
                  >
                    Remove Item
                  </button>
                )}
              </div>
            </div>
          ))}
          <button className={styles.addItem} onClick={addItem}>
            Add Item
          </button>
          <button className={styles.submitButton} onClick={writeToDB}>
            Submit changes
          </button>
        </>
      )}
    </div>
  );
}

export default Info;
