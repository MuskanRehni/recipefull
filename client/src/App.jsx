import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import Login from "./components/Login"; // Import the Login component
import AddYours from "./components/AddYours";
import ProtectedRoute from "./service/protectedRoute";

function App() {
    return (
        <div className="flex">
            <Sidebar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/login" element={<Login />} />{" "}
                {/* Add Login route */}
                <Route
                    path="/add-yours"
                    element={
                        <ProtectedRoute>
                            <AddYours />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/edit/:id"
                    element={
                        <ProtectedRoute>
                            <AddYours />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;