import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { MantineProvider } from "@mantine/core";
import SignUp from "./pages/SignUp";
function App() {
    return (
        <MantineProvider
            theme={{
                fontFamily: "Inter, sans-serif",
                colorScheme: "dark",
            }}
        >
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                    </Routes>
                </Router>
            </div>
        </MantineProvider>
    );
}

export default App;
