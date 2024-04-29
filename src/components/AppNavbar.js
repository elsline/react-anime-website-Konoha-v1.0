import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import webLogo from "../imgs/logo (1).png";
import { Link } from "react-router-dom";

function AppNavbar() {
  return (
    <header>
      <Navbar expand="lg" className=" app-navbar fs-5">
        <Container>
          <a href={"/"} className="me-5 navbar-brand lo">
            <img className="webLogo" alt="" src={webLogo}></img>
          </a>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto gap-lg-3">
              <Link to={"/"} className="nav-link">
                <span className="logo">H</span>ome
              </Link>
              <Link to={"/tv"} className="nav-link">
                <span className="logo">T</span>v
              </Link>
              <Link to={"/recent"} className="nav-link">
                <span className="logo">R</span>ecent
              </Link>
              <Link to={"/about"} className="nav-link">
                <span className="logo ">A</span>bout
              </Link>
            </Nav>
            <div className="d-flex align-items-center  mt-2 justify-content-between  ">
              <Link to={"/search"} className="searchIcon">
                <i className="fas fa-search"></i>
              </Link>
              <Link to={"/user"} className="searchIcon">
                <i className="fa-regular fa-circle-user  ms-3 fs-2 curs-p nav-user"></i>
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default AppNavbar;
