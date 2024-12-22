import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import Login from "./components/Login"; // Import the Login component
import AddYours from "./components/AddYours";

function App() {
	return (
		<div className='flex'>
			<Sidebar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/favorites' element={<FavoritesPage />} />
				<Route path='/login' element={<Login />} /> {/* Add Login route */}
				<Route path='/add-yours' element={<AddYours />} />
			</Routes>
		</div>
	);
}

export default App;

