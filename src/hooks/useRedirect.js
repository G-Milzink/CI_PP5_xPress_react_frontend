import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

export const useRedirect = (userAuthStatus) => {
    const history = useHistory();


    /* 
        Handles user redirect to homepage when aprropriate:
        - refresh token expired
        - user logged out tries to visit a url that requires login
        - logged in user tries to visit /signup or /login 
    */
    useEffect(() => {
        const handleMount = async () => {
            try {
                await axios.post('dj-rest-auth/token/refresh/')
                if(userAuthStatus === 'loggedIn') {
                    history.push('/');
                }
            } catch (err) {
               if (userAuthStatus === 'loggedOut') {
                    history.push('/')
               }
            }
        }
        handleMount();
    }, [userAuthStatus, history])
}