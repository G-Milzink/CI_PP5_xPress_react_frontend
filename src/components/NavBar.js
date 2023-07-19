import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from '../assets/logo.png';
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';


const NavBar = () => {

    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const {expanded, setExpanded, ref} = useClickOutsideToggle();

    const handleLogout = async () => {
        try {
            await axios.post('dj-rest-auth/logout/');
            setCurrentUser(null);
        } catch (err) {
            console.log(err)
        }
    }

    const addPostIcon = (
        <NavLink
            to="/posts/create"
            className={styles.NavLink}
            activeClassName={styles.Active}>
            <i className="fa-solid fa-square-plus"></i>
            New xPression
        </NavLink>
    )
    const loggedInIcons = <>
        <NavLink
            to="/feed"
            className={styles.NavLink}
            activeClassName={styles.Active}>
            <i className="fa-solid fa-bars-staggered"></i>
            Feed
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
            Log Out
        </NavLink>
        <NavLink
            to={`/profiles/${currentUser?.profile_id}`}
            className={styles.NavLink}
            onClick={() => { }}>
            <Avatar
                src={currentUser?.profile_avatar}
                text='Profile'
                height={35}
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
                    <Navbar.Brand><img src={logo} alt='logo' height={40} /></Navbar.Brand>
                </NavLink>
                {currentUser && addPostIcon}
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
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default NavBar

