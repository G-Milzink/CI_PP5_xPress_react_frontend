import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.png';
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import { removeTokenTimestamp } from '../utils/Utils';
import NavDropdown from 'react-bootstrap/NavDropdown';



const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const {expanded, setExpanded, ref} = useClickOutsideToggle();

    const handleLogout = async () => {
        /*
            handles user logout.
        */
        try {
            await axios.post('dj-rest-auth/logout/');
            setCurrentUser(null);
            removeTokenTimestamp();
        } catch (err) {
            // console.log(err)
        }
    }

    const newItemsDropdown = (
        <NavDropdown title="Create" id="new-dropdown" drop="left">
            <NavDropdown.Item>
                <NavLink
                    to="/posts/create"
                    className={styles.NavLink}
                    activeClassName={styles.Active}
                >
                    <i className="fa-solid fa-square-plus"></i>
                    New xPression
                </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item>
                <NavLink
                    to="/collages/create"
                    className={styles.NavLink}
                    activeClassName={styles.Active}
                >
                    <i className="fa-solid fa-square-plus"></i>
                    New cOllage
                </NavLink>
            </NavDropdown.Item>
        </NavDropdown>
    );

    const loggedInIcons = <>
        <NavLink
            to="/feed"
            className={styles.NavLink}
            activeClassName={styles.Active}>
            <i className="fa-solid fa-bars-staggered"></i>
            Feed
        </NavLink>
        <NavLink
            to="/collages"
            className={styles.NavLink}
            activeClassName={styles.Active}>
            <i class="fa-solid fa-table-cells"></i>
            Collages
        </NavLink>
        <NavLink
            to="/liked"
            className={styles.NavLink}
            activeClassName={styles.Active}>
            <i className="fa-solid fa-heart"></i>
            Liked
        </NavLink>
        <NavLink
            to="/"
            className={styles.NavLink}
            onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            LogOut
        </NavLink>
        <NavLink
            to={`/profiles/${currentUser?.profile_id}`}
            className={styles.NavLink}
            onClick={() => { }}>
            <Avatar
                src={currentUser?.profile_avatar}
                text='Profile'
                height={48}
            />
        </NavLink>
    </>;
    const loggedOutIcons = (
        <>
            <NavLink
                to="/login"
                className={styles.NavLink}
                activeClassName={styles.Active}>
                <i className="fa-solid fa-right-to-bracket"></i>
                Log In
            </NavLink>
            <NavLink
                to="/signup"
                className={styles.NavLink}
                activeClassName={styles.Active}>
                <i className="fa-solid fa-user-plus"></i>
                Sign Up
            </NavLink>
        </>
    );

    //React-bootstrap Navbar code snippet.
    return (

        <Navbar className={styles.NavBar} expand="md" fixed='top' expanded={expanded}>
            <Container>
                <NavLink to='/'>
                    <Navbar.Brand><img src={logo} alt='logo' height={70} /></Navbar.Brand>
                </NavLink>
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    onClick={() => setExpanded(!expanded)}
                    ref={ref}
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        <NavLink
                            exact
                            to="/"
                            className={styles.NavLink}
                            activeClassName={styles.Active}>
                            <i className="fa-sharp fa-solid fa-house"></i>
                            Home
                        </NavLink>
                        {currentUser ? loggedInIcons : loggedOutIcons}
                        {currentUser && newItemsDropdown}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default NavBar

