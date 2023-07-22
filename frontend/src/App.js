import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import StudentsGrades from "./pages/StudentsGrades/StudentsGrades";
import TeacherPanel from "./pages/TeacherPanel/TeacherPanel";
import NoPage from "./pages/NoPage/NoPage";
import Navigation from "./components/Navigation/Navigation";
import Informations from "./pages/Informations/Informations";
import "./App.css";

export default function App() {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const [auth, setAuth] = useState(localStorage.getItem("auth"));
    const [counter, setCounter] = useState(0);

    console.log(user);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse.access_token);
            localStorage.setItem("userCredential", codeResponse.access_token);
            localStorage.setItem("auth", true);
            setAuth(true);
        },
        onError: (error) => console.log("Login Failed:", error),
    });

    useEffect(() => {
        if (localStorage.getItem("userCredential")) {
            axios
                .get(
                    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${localStorage.getItem(
                        "userCredential"
                    )}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "userCredential"
                            )}`,
                            Accept: "application/json",
                        },
                    }
                )
                .then((res) => {
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
        setUser(null);
        setAuth(false);
        setCounter(counter + 1);
        localStorage.setItem("auth", false);
        localStorage.removeItem("userCredential");
    };
    return (
        <BrowserRouter>
            <Navigation
                loginHandler={login}
                logoutHandler={logOut}
                authorization={auth}
                counter={counter}
            />
            <div className="wrapper">
                <Routes>
                    <Route path="/grades" element={<StudentsGrades />} />
                    <Route path="/panel" element={<TeacherPanel />} />
                    <Route
                        path="/informations"
                        element={<Informations profile={profile} />}
                    />
                    <Route path="/" element={<HomePage />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
