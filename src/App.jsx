import './App.css';
import { db } from './firebase-config';
import { set, ref } from 'firebase/database';

function App() {
  const writeToDB = () => {
    set(ref(db, 'test'), {
      menu: 'butternut'
    });
  };

  return (
    <>
      <input type="text" />
      <button onClick={writeToDB}>submit</button>
    </>
  );
}

export default App;
