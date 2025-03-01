import { useState, useEffect } from "react";
import Cookies from 'js-cookie'

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = Cookies.get("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        Cookies.remove("token")
        Cookies.remove("email")
        Cookies.remove("company")
        setIsLoggedIn(false);
    };

    return (
        <header id="header" className="fixed-top" style={{ background: "#37517e" }}>
            <div className="container d-flex align-items-center">
                <h1 className="logo me-auto">
                    <a href="/" style={{ textDecoration: "none" }}>SABAU</a>
                </h1>

                <nav id="navbar" className="navbar">
                    <ul>
                        <li><a className="nav-link scrollto active" href="/">Naslovna</a></li>
                        <li><a className="nav-link scrollto" href="/services">Izlagači</a></li>
                        <li><a className="nav-link scrollto" href="/portfolio">Galerija</a></li>
                        <li><a className="nav-link scrollto" href="/team">Team</a></li>
                        <li className="dropdown">
                            <a href="/b2b" style={{ textDecoration: "none" }}>
                                <span>B2B</span> <i className="bi bi-chevron-down"></i>
                            </a>
                            <ul>
                                <li><a href="/companies" style={{ textDecoration: "none" }}>Baza kompanija</a></li>
                                <li><a href="/b2b" style={{ textDecoration: "none" }}>Zakažite sastanak</a></li>
                                <li><a href="/agenda" style={{ textDecoration: "none" }}>Agenda</a></li>
                                <li><a href="#" style={{ textDecoration: "none" }}>Drop Down 4</a></li>
                            </ul>
                        </li>
                        <li><a className="nav-link scrollto" href="/contact">Kontakt</a></li>
                        {isLoggedIn && <li><a className="nav-link scrollto" href="/profile">Moj Profil</a></li>}
                        {isLoggedIn && <button className="logout-btn" onClick={handleLogout}>Odjavite se</button>}
                    </ul>
                    <i className="bi bi-list mobile-nav-toggle"></i>
                </nav>
            </div>
        </header>
    );
}

export default Header;