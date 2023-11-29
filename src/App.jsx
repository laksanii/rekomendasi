import { BrowserRouter, Routes, Route } from "react-router-dom";
import Jumbotron from "./components/Jumbotron";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import Detail from "./components/Detail";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="jasa-sewa/:nama_jasa_sewa"
                        element={<Detail />}
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                <Navbar />
                                <Jumbotron />
                                <Form />
                            </>
                        }
                    />
                    {/* <Jumbotron />
                    <Form /> */}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
