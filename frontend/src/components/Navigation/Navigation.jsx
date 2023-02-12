import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navigation.css";

function Navigation() {
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
                        <Nav.Link href="/grades" className="navigation__link-2">
                            Grades
                        </Nav.Link>
                        <Nav.Link href="/panel" className="navigation__link-3">
                            Grades Panel
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/informations">
                            More information
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
