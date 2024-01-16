import 'bootstrap/dist/css/bootstrap.min.css';
import FooterBar from "../components/footer";
import NavScroll from "../components/header";
import HousingImage from '../imgs/LogoSergio.png';
// import Background from './imgs/background.jpg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { setHeaders, url } from "../slices/api";
import MatrixOfCards from '../components/matrix_of_houses';

import './CSS/home.css';

function Home() {
  const [places, setPlaces] = useState([]);

  const fetchPlaces = async () => {
    try {
      const response = await axios.get(`${url}/places`);
      console.log(response.data);
      setPlaces(response.data);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []); // Empty dependency array ensures that the effect runs only once, similar to componentDidMount

  return (
    <div className="Home">
      <header className="Home-header">
        <NavScroll />
      </header>
      <main>
        <div className="row mx-auto align-items-center" style={{ height: '100vh' }}>
          <div className="col-lg-6 text-end order-first">
            <div>
              {/* TODO: Reduce image width and text */}
              <h1 className="cheap-housing abyssinica-sil">CHEAP HOUSING</h1>
              <h2 className="cheap-housing abeezee-font">
                This innovative company redefines hospitality by diverse and
                unique accommodations, connecting travelers with authentic experiences.
              </h2>
            </div>
          </div>
          <div className="col-lg-6 text-center order-last">
            <img
              src={HousingImage}
              alt="LogoSergio"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
        <div className="tree-background">
          <div className="insidebox" style={{ backgroundColor: 'rgba(255, 240, 243, 0.5)' }}> 
            <>
              <MatrixOfCards dataArray={places} />
            </>
          </div>
        </div>
      </main>
      <footer className='Home-footer'>
        <FooterBar />
      </footer>
    </div>
  );
}

export default Home;