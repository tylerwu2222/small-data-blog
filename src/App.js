import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import { useEffect } from 'react';

import './App.css';

function App() {

  useEffect(() => {
    document.title = 'small data blog | home'
  }, [])


  return (
    <div className="App">
      <NavBar />
      <Footer />
    </div>
  );
}

export default App;
