import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import logo from '../assets/logo.png'
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
    //React-bootstrap Navbar code snippet.
    return (
        <Container>
            <Navbar className={styles.NavBar} expand="md" fixed='top'>
                <Navbar.Brand><img src={logo} alt='logo' height={40} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        <Nav.Link href="#home"><i class="fa-sharp fa-solid fa-house"></i> Home</Nav.Link>
                        <Nav.Link href="#link"><i class="fa-solid fa-right-to-bracket"></i> LogIn</Nav.Link>
                        <Nav.Link href="#link"><i class="fa-solid fa-user-plus"></i> SignUp</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    )
}

export default NavBar

