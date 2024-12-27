import React from "react";

import Navbar from "./components/Navbar";
import Create from "./components/Create";
import Read from "./components/Read";
import Update from "./components/Update";
import {BrowserRouter,Routes,Route} from "react-router-dom";
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route  path="/" element={<Create />} />
      <Route  path="/all" element={<Read />} />
      <Route  path="/:id" element={<Update />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
