import { BrowserRouter, Routes, Route } from "react-router-dom";
import Jumbotron from "./components/Jumbotron";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import Detail from "./components/Detail";
import TambahData from "./components/Tambah";
import About from "./components/About";
import Update from "./components/Update";
import Hasil from "./components/Hasil";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/jasa-sewa/:nama_jasa_sewa"
                        element={<Detail />}
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                <Navbar />
                                <Jumbotron />
                                <Form />
                                <About />
                            </>
                        }
                    />
                    <Route path="/tambah-data" element={<TambahData />} />
                    <Route path="/update-data" element={<Update />} />
                    <Route path="/hasil-kuesioner" element={<Hasil />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
