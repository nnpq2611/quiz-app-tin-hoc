import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Collections from "./components/Collections";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import TestPage from "./components/TestPage";
import Results from "./components/Results";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Collections />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/create-test" element={<Form />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
