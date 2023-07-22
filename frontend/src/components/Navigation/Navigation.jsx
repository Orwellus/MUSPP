import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navigation.css";

const Navigation = ({
    loginHandler,
    logoutHandler,
    authorization,
    counter,
}) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(localStorage.getItem("auth"));
    useEffect(() => {
        setAuth(authorization);
        console.log(authorization, "use");
    }, [authorization]);
    console.log(auth, "poza");
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">School Application</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" className="navigation__link-1">
                            Home
                        </Nav.Link>
                        {auth && (
                            <>
                                <Nav.Link
                                    href="/grades"
                                    className="navigation__link-2"
                                >
                                    Grades
                                </Nav.Link>
                                <Nav.Link
                                    href="/panel"
                                    className="navigation__link-3"
                                >
                                    Grades Panel
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                    <Nav>
                        {auth ? (
                            <>
                                <Nav.Link
                                    href="/informations"
                                    className="navigation__link-4"
                                >
                                    User Information
                                </Nav.Link>
                                <Nav.Link
                                    href="/"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        logoutHandler();
                                        setAuth(false);
                                        navigate("/");
                                    }}
                                >
                                    Logout
                                </Nav.Link>
                            </>
                        ) : (
                            <Nav.Link
                                href="/"
                                onClick={(e) => {
                                    e.preventDefault();
                                    loginHandler();
                                    setAuth(true);
                                    navigate("/");
                                }}
                            >
                                Login
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
