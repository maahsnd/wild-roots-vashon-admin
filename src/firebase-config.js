import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyBfRyVZfk9LHN2oMF6X5cWpFUJbujNvSMs',
  authDomain: 'wild-roots-vashon.firebaseapp.com',
  databaseURL: 'https://wild-roots-vashon-default-rtdb.firebaseio.com',
  projectId: 'wild-roots-vashon',
  storageBucket: 'wild-roots-vashon.appspot.com',
  messagingSenderId: '636226872750',
  appId: '1:636226872750:web:ee649489fe8627d552543f',
  measurementId: 'G-G41Q0RDXXJ'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
