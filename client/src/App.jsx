import { Routes, Route } from "react-router-dom"
import Header from './Header.jsx'
import Hero from './Hero.jsx'
import Main from './Main.jsx'
import Footer from './Footer.jsx'
import Register from './Registration.jsx'
import B2BForm from './B2BForm.jsx'
import Login from './Login.jsx'
import ProtectedRoute from "./ProtectedRoute.jsx"
import Clients from "./Clients.jsx"
import AboutUs from "./AboutUs.jsx"
import Services from "./Services.jsx"
import Portfolio from "./Portfolio.jsx"
import Team from "./Team.jsx"
import Contact from "./Contact.jsx"
import B2BAlt from "./B2BAlt.jsx"
import CardContainer from "./Card.jsx"
import Profile from "./Profile.jsx"
import Agenda from "./Agenda.jsx"
import Firebase from "./Firebase.jsx"

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
        <Route path="/" element={<><Hero /><Clients /><AboutUs/> </>} />
        <Route path="/services" element={<><Services/></>}/>
        <Route path="/portfolio" element={<><Portfolio/></>}/>
        <Route path="/team" element={<><Team/></>}/>
        <Route path="/contact" element={<><Contact/></>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/companies" element={<CardContainer/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/agenda" element={<Agenda/>}/>
        <Route path="/firebase" element={<Firebase/>}/>
        <Route element={<ProtectedRoute />}>
          <Route path="/b2b" element={<B2BAlt />} />
        </Route>
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;