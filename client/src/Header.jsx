function Header() {
    return(
        <>
          <header id="header" class="fixed-top " style={{background: "#37517e"}}>
            <div class="container d-flex align-items-center">

            <h1 class="logo me-auto"><a href="index.html" style={{textDecoration: "none"}}>SABAU</a></h1>

            <nav id="navbar" class="navbar">
                <ul>
                <li><a class="nav-link scrollto active" href="/">Home</a></li>
                <li><a class="nav-link scrollto" href="/services">Services</a></li>
                <li><a class="nav-link   scrollto" href="/portfolio">Portfolio</a></li>
                <li><a class="nav-link scrollto" href="/team">Team</a></li>
                <li class="dropdown"><a href="/b2b" style={{ textDecoration: "none" }}><span>B2B</span> <i class="bi bi-chevron-down"></i></a>
                    <ul>
                    <li><a href="/companies" style={{textDecoration: "none"}}>Baza kompanija</a></li>
                    <li class="dropdown"><a href="#" style={{textDecoration: "none"}}><span>Deep Drop Down</span> <i class="bi bi-chevron-right"></i></a>
                        <ul>
                        <li><a href="#">Deep Drop Down 1</a></li>
                        <li><a href="#">Deep Drop Down 2</a></li>
                        <li><a href="#">Deep Drop Down 3</a></li>
                        <li><a href="#">Deep Drop Down 4</a></li>
                        <li><a href="#">Deep Drop Down 5</a></li>
                        </ul>
                    </li>
                    <li><a href="/b2b" style={{textDecoration: "none"}}>Zakažite sastanak</a></li>
                    <li><a href="#" style={{textDecoration: "none"}}>Drop Down 3</a></li>
                    <li><a href="#" style={{textDecoration: "none"}}>Drop Down 4</a></li>
                    </ul>
                </li>
                <li><a class="nav-link scrollto" href="/contact">Contact</a></li>
                </ul>
                <i class="bi bi-list mobile-nav-toggle"></i>
            </nav>

            </div>
        </header>
        </>
    )
}

export default Header;