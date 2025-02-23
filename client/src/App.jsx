import { Routes, Route } from "react-router-dom";
import Header from './Header.jsx'
import Hero from './Hero.jsx'
import { useState, useEffect } from 'react';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import Register from './Registration.jsx';
import B2BForm from './B2BForm.jsx';
import Login from './Login.jsx';
import Registration from './Registration.jsx';

function App() {
/*
      <Header/>
      <Hero/>
      <Main/>
      <Footer/>
*/
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<><Hero /><Main /></>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/b2b" element={<B2BForm />} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;