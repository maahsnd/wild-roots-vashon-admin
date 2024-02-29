import styles from './menu.module.css';
import { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import { set, ref, onValue, off } from 'firebase/database';
import PhotoUploader from '../photo-uploader/PhotoUploader';

function Menu() {
  const [sections, setSections] = useState(null);
  const [items, setItems] = useState(null);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const menuRef = ref(db, 'menu');

    const fetchData = () => {
      onValue(menuRef, (snapshot) => {
        const menuData = snapshot.val();
        setSections(menuData.sections);
        setItems(menuData.items);
      });
    };

    fetchData();
    return () => {
      off(menuRef, 'value');
    };
  }, []);

  const handleChange = (e, index, type) => {
    const updatedSections = [...sections];
    const updatedItems = [...items];

    if (type === 'section') {
      if (e.target.name === 'sectionTitle') {
        const prevSectionTitle = updatedSections[index].sectionTitle;
        // Update itemSections for items, so that section retains its items
        updatedItems.forEach((item) => {
          if (item.itemSection === prevSectionTitle) {
            item.itemSection = e.target.value;
          }
        });
        setItems(updatedItems);
      }
      updatedSections[index][e.target.name] = e.target.value;
      setSections(updatedSections);
    } else if (type === 'item') {
      updatedItems[index][e.target.name] = e.target.value;
      setItems(updatedItems);
    }
  };

  const writeToDB = (e) => {
    e.preventDefault();
    set(ref(db, 'menu'), {
      sections: sections,
      items: items
    });
    setMsg('Updated!');
    setTimeout(() => setMsg(null), 2000);
  };

  const resetMenu = () => {
    set(ref(db, 'menu'), {
      sections: [{ sectionTitle: '', sectionDetail: '' }],
      items: [{ itemTitle: '', itemDescription: '', itemSection: '' }]
    });
  };

  const addMenuItem = (itemSectionTitle) => {
    setItems([
      ...items,
      { itemTitle: '', itemDescription: '', itemSection: itemSectionTitle }
    ]);
  };

  const addMenuSection = () => {
    setSections([...sections, { sectionTitle: '', sectionDetail: '' }]);
  };

  const removeSection = (index) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };

  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  return (
    <div className={styles.menuContainer}>
      <h3>Menu Editor</h3>
      <p className={styles.msg}>{msg}</p>
      <div className={styles.buttonContainer}>
        <button onClick={writeToDB}>Submit Menu</button>
        <button onClick={resetMenu}>Clear Menu</button>
      </div>

      {sections &&
        sections.map((section, sectionIndex) => (
          <div className={styles.sectionContainer} key={sectionIndex}>
            <button
              className={styles.removeSectionBtn}
              onClick={() => removeSection(sectionIndex)}
            >
              Remove This Section
            </button>
            <div className={styles.sectionInputContainer}>
              <label htmlFor="">Section Title: </label>
              <textarea
                className={styles.sectionTextArea}
                value={section.sectionTitle}
                onChange={(e) => handleChange(e, sectionIndex, 'section')}
                name="sectionTitle"
                cols="30"
                rows="10"
              ></textarea>
            </div>

            <div className={styles.sectionInputContainer}>
              <label htmlFor="">Section Detail:</label>
              <textarea
                className={styles.sectionTextArea}
                value={section.sectionDetail}
                onChange={(e) => handleChange(e, sectionIndex, 'section')}
                name="sectionDetail"
                cols="30"
                rows="10"
              ></textarea>
            </div>

            <label htmlFor="">Section Items:</label>
            <div className={styles.itemGallery}>
              {items &&
                items.map((item, itemIndex) => {
                  if (item.itemSection === section.sectionTitle) {
                    return (
                      <div className={styles.itemContainer} key={itemIndex}>
                        <label htmlFor="">Item Title</label>
                        <textarea
                          value={item.itemTitle}
                          onChange={(e) => handleChange(e, itemIndex, 'item')}
                          name="itemTitle"
                          cols="30"
                          rows="10"
                        ></textarea>
                        <label htmlFor="">Item Description</label>
                        <textarea
                          value={item.itemDescription}
                          onChange={(e) => handleChange(e, itemIndex, 'item')}
                          name="itemDescription"
                          cols="30"
                          rows="10"
                        ></textarea>
                        <button
                          className={styles.removeItemBtn}
                          onClick={() => removeItem(itemIndex)}
                        >
                          Remove This Item
                        </button>
                      </div>
                    );
                  }
                })}
              <button
                className={styles.addItemBtn}
                onClick={() => addMenuItem(section.sectionTitle)}
              >
                Add item to section
              </button>
            </div>
          </div>
        ))}
      <button className={styles.addSectionBtn} onClick={addMenuSection}>
        Add section
      </button>
      <PhotoUploader folderName="menuPhotos" />
    </div>
  );
}

export default Menu;
