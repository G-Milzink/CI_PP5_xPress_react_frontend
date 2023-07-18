import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from '../assets/logo.png';
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    //React-bootstrap Navbar code snippet.
    return (

        <Navbar className={styles.NavBar} expand="md" fixed='top'>
            <Container>
                <NavLink to='/'>
                    <Navbar.Brand><img src={logo} alt='logo' height={40} /></Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        <NavLink
                            exact
                            to="/"
                            className={styles.NavLink}
                            activeClassName={styles.Active}>
                            <i class="fa-sharp fa-solid fa-house"></i>
                            Home
                        </NavLink>
                        <NavLink
                            to="/login"
                            className={styles.NavLink}
                            activeClassName={styles.Active}>
                            <i class="fa-solid fa-right-to-bracket"></i>
                            LogIn
                        </NavLink>
                        <NavLink
                            to="/signup"
                            className={styles.NavLink}
                            activeClassName={styles.Active}>
                            <i class="fa-solid fa-user-plus"></i>
                            SignUp
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default NavBar

