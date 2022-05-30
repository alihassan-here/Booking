import "./login.css";
import { useState, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials(prev => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch({
            type: "LOGIN_START",
        });
        try {
            const res = await axios.post("/api/auth/login", credentials);
            console.log(res.data);
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: res.data,
            });
            navigate("/");

        } catch (error) {
            dispatch({
                type: "LOGIN_FAILURE",
                payload: error.response.data,
            })
        }

    }

    return (
        <div className="login">
            <div className="lContainer">
                <input
                    onChange={handleChange}
                    type="text" placeholder="username" id="username" className="lInput" />
                <input
                    onChange={handleChange}
                    type="password" placeholder="password" id="password" className="lInput" />
                <button disabled={loading} onClick={handleLogin} className="lButton">Login</button>
                {
                    error && <span>{error.message}</span>
                }
            </div>

        </div>
    )
}

export default Login