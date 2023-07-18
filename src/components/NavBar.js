import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import logo from '../assets/logo.png'

const NavBar = () => {
    //React-bootstrap Navbar code snippet.
    return (
        <Container>
            <Navbar expand="md" fixed='top'>
                <Navbar.Brand href="#home"><img src={logo} alt='logo' height={45} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    )
}

export default NavBar

