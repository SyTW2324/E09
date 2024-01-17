// Import necessary dependencies and components
import 'bootstrap/dist/css/bootstrap.min.css';
import FooterBar from "../components/footer";
import NavScroll from "../components/header";
import HousingImage from '../imgs/LogoSergio.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from "../slices/api";
import MatrixOfCards from '../components/matrix_of_houses';

import './CSS/home.css';

// Functional component for the Home page
function Home() {
  // State to store the list of places
  const [places, setPlaces] = useState([]);

  // Function to fetch places data from the server
  const fetchPlaces = async () => {
    try {
      const response = await axios.get(`${url}/places`);
      console.log(response.data);
      setPlaces(response.data);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  // useEffect hook to fetch places data once the component mounts
  useEffect(() => {
    fetchPlaces();
  }, []); // Empty dependency array ensures that the effect runs only once, similar to componentDidMount

  // Return the JSX for the Home component
  return (
    <div className="Home">
      <header className="Home-header">
        {/* Include the navigation component */}
        <NavScroll />
      </header>
      <main>
        {/* Two-column layout with a header */}
        <div className="row mx-auto align-items-center" style={{ height: '100vh' }}>
          <div className="col-lg-6 text-end order-first">
            <div>
              {/* Heading and subheading for the main content */}
              <h1 className="cheap-housing abyssinica-sil">CHEAP HOUSING</h1>
              <h2 className="cheap-housing abeezee-font">
                This innovative company redefines hospitality by diverse and
                unique accommodations, connecting travelers with authentic experiences.
              </h2>
            </div>
          </div>
          <div className="col-lg-6 text-center order-last">
            {/* Display the housing image */}
            <img
              src={HousingImage}
              alt="LogoSergio"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
        {/* Background styling for the card matrix */}
        <div className="tree-background">
          <div className="insidebox" style={{ backgroundColor: 'rgba(255, 240, 243, 0.5)' }}>
            {/* Render the MatrixOfCards component with the fetched places data */}
            <>
              <MatrixOfCards dataArray={places} />
            </>
          </div>
        </div>
      </main>
      {/* Footer section with the FooterBar component */}
      <footer className='Home-footer'>
        <FooterBar />
      </footer>
    </div>
  );
}

// Export the Home component as the default export
export default Home;
