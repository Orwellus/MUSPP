import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import StudentsGrades from "./pages/StudentsGrades/StudentsGrades";
import TeacherPanel from "./pages/TeacherPanel/TeacherPanel";
import NoPage from "./pages/NoPage/NoPage";
import Navigation from "./components/Navigation/Navigation";
import Informations from "./pages/Informations/Informations";
import "./App.css";

export default function App() {
    return (
        <>
            <Navigation />
            <div className="wrapper">
                <BrowserRouter>
                    <Routes>
                        <Route path="/grades" element={<StudentsGrades />} />
                        <Route path="/panel" element={<TeacherPanel />} />
                        <Route
                            path="/informations"
                            element={<Informations />}
                        />
                        <Route path="/" element={<HomePage />} />
                        <Route path="*" element={<NoPage />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
