import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    // Always Fetch The User First
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");

        if (authToken) {
            // Verify Tokens
            setUser(authToken);
            console.log("1");
            console.log(authToken);
        } else {
            console.log("Null Token");
            setUser(null);
        }
        setLoading(false);
    }, []);

    // Set User is Logged in for current tab
    useEffect(() => {
        if (!loading) {
            if (user) {
                console.log("User");
            } else {
                navigate("/login");
            }
        }
    }, [user, loading, navigate]);

    if (user) {
        return children;
    }
};

export default ProtectedRoute;