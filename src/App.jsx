import './App.css';
import { useEffect, useState } from 'react';
import { db } from './firebase-config';
import { set, ref, onValue, remove, update } from 'firebase/database';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const dataRead = snapshot.val();
      console.log(dataRead);
      if (dataRead != null) {
        setData(dataRead);
      }
    });
  }, []);

  const writeToDB = (e) => {
    e.preventDefault();
    set(ref(db, 'test'), {
      menu: 'buttet'
    });
  };

  const handleDelete = () => {
    remove(ref(db, 'test'));
  };

  const handleEdit = () => {
    update(ref(db, 'test'), {
      menu: 'butternut foo'
    });
  };

  return (
    <>
      <input type="text" />
      <button onClick={writeToDB}>submit</button>
      <h1>{data && data.test.menu}</h1>
      <button onClick={handleDelete}>delete</button>
      <button onClick={handleEdit}>edit</button>
    </>
  );
}

export default App;
