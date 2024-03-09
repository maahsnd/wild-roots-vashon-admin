import { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import { set, ref, onValue, off } from 'firebase/database';
import styles from './info.module.css';

function Info() {
  const [content, setContent] = useState(null);
  const [msg, setMsg] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [pageName, setPageName] = useState('')

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

  const writeToDB = () => {
    const update = {...content};
    update[pageName] = selectedPage
    set(ref(db, 'general-info'), {
      about: update.about,
      farm: update.farm,
      home: update.home,
      menuBlurb: update.menuBlurb

    });
    setMsg('Updated!');
    setTimeout(() => setMsg(null), 2000);
  };

  const handlePageSelect = (page) => {
    setSelectedPage(content[page]);
    setPageName(page)
  }

  return (
    <div className={styles.container}>
      <div className={styles.pageSelectButtons}>
        <h3>Select page to edit: </h3>
      <button onClick={()=> handlePageSelect('about')} className={styles.pageBtn}>About</button>
      <button onClick={()=> handlePageSelect('farm')} className={styles.pageBtn}>Farm</button>
      <button onClick={()=> handlePageSelect('home')} className={styles.pageBtn}>Home</button>
      <button onClick={()=> handlePageSelect('menuBlurb')} className={styles.pageBtn}>Menu</button>

      </div>
      <p className={styles.msg}>{msg}</p>
      {selectedPage && <> 
      {selectedPage.map((section, index) => (
          <div className={styles.contentSection} key={section.title}>
            <h3 className={styles.contentSectionTitle}>
              {section.title}
            </h3>
            <textarea
              name={section.title}
              id={section.title}
              cols="30"
              rows="10"
              value={section.description}
              onChange={(e) => handleChange(e, index)}
            ></textarea>
          </div>
        ))}
         <button className={styles.submitButton} onClick={writeToDB}>
        Submit changes
      </button></>
   }
  
    </div>
  );
}

export default Info;
