

import './App.css'
import HeaderFileComponent from "./components/HeaderFileComponent.jsx";
import NavbarComponent from "./components/NavbarComponent.jsx";
import HeroComponent from "./components/HeroComponent.jsx";
import Runtracks from "./components/Runtracks.jsx";
import './home.css' ;


function App() {


  return (
      <>
        <HeaderFileComponent />
          <NavbarComponent/>
          <HeroComponent/>
          <Runtracks/>

      </>
  );

}

export default App

