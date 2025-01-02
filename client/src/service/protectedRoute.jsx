import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../lib/constants";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    // Always Fetch The User First
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const authToken = localStorage.getItem("authToken");

                if (!authToken) {
                    setUser(null);
                    return;
                }
                console.log("Called");

                const verification = await axios.post(
                    `${API_URL}/api/users/verifyToken`,
                    {
                        
                        token: authToken,
                    },{
                        withCredentials:true,
                        headers:{"Content-Type":"application/json"}
                    }
                );

                console.log(verification);

                if (verification.status == 200) {
                    console.log("Valid");
                    setUser(authToken);
                } else {
                    setUser(null);
                }
            } catch (error) {
                setUser(null);
                navigate("/login");
            }
        };

        verifyToken();
        setLoading(false);
    }, []);

    // Set User is Logged in for current tab
    useEffect(() => {
        if (!loading) {
            console.log("Loading Fixi");
            console.log(user);
            if (!user) {
                navigate("/login");
            }
        }
    }, [user, navigate]);

    if (user) {
        return children;
    }
};

export default ProtectedRoute;