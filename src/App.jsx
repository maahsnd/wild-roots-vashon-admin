import './App.css';
import { useEffect, useState } from 'react';
import Menu from './components/menu/Menu';

function App() {
  //if user auth, show dash with buttons linking to various edit options
  // else show login/ auth option
  return (
    <>
      <Menu />
    </>
  );
}

export default App;
