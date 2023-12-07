// import 'bootstrap/dist/css/bootstrap.min.css';
// import FooterBar from "./components/footer";
// import NavScroll from "./components/header";
// import HousingImage from './imgs/casas_blancas.png';
// import Background from './imgs/background.jpg';

// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <NavScroll />
//       </header>
//       <main>
//         <div className="row mx-auto align-items-center" style={{ height: '100vh' }}>
//           <div className="col-lg-6 text-end order-first">
//             <div>
//               {/* TODO: Reduce image width and text */}
//               <h1 className="cheap-housing abyssinica-sil">CHEAP HOUSING</h1>
//               <h2 className="cheap-housing abeezee-font">
//                 This innovative company redefines hospitality by diverse and
//                 unique accommodations, connecting travelers with authentic experiences.
//               </h2>
//             </div>
//           </div>
//           <div className="col-lg-6 text-center order-last">
//             <img
//               src={HousingImage}
//               alt="casas_blancas"
//               style={{ width: '100%', height: 'auto' }}
//             />
//           </div>
//         </div>
//         {/* <h1>Hello World</h1> */}
//         <div className="tree-background">
//           <h1>ANYAAAAAAAAAAAAAAAAAA</h1>
//         {/* <img
//               src={Background}
//               alt="background"
//               style={{ width: '100%', height: 'auto' }}
//             /> */}
//         </div>
//       </main>
//       <footer className='App-footer'>
//         <FooterBar />
//       </footer>
//     </div>
//   );
// }

// export default App;

// Filename - App.js
import {
	// BrowserRouter as Router,
	Routes,
	Route,
	BrowserRouter,
} from "react-router-dom";
import Home from "./pages";
import Register from "./pages/register";
import Login from "./pages/login";
import User from "./pages/user";

function App() {
	return (
		<BrowserRouter>
			{/* <Navbar /> */}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/user" element={<User />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
