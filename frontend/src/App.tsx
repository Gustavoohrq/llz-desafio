import { Route, Routes } from "react-router-dom";
import Pessoa from "./pages/Pessoa";
import Boleto from "./pages/Boleto";
import Header from "./components/Header";

const App = () => (

  <div className="min-h-screen bg-gray-800 text-white roboto-medium">
    <Header />
    <Routes>
      <Route path="/" element={<Pessoa />} />
      <Route path="/boleto" element={<Boleto />} />
    </Routes>
  </div>

);

export default App
