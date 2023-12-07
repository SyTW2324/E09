import 'bootstrap/dist/css/bootstrap.min.css';
import FooterBar from "../components/footer";
import NavScroll from "../components/header";
import HousingImage from '../imgs/casas_blancas.png';
// import Background from './imgs/background.jpg';

import './CSS/home.css';

function Home() {
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
              alt="casas_blancas"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
        {/* <h1>Hello World</h1> */}
        <div className="tree-background">
          <h1>ANYAAAAAAAAAAAAAAAAAA</h1>
        {/* <img
              src={Background}
              alt="background"
              style={{ width: '100%', height: 'auto' }}
            /> */}
        </div>
      </main>
      <footer className='Home-footer'>
        <FooterBar />
      </footer>
    </div>
  );
}

export default Home;