import React from 'react';
import NoResults from '../assets/NoResults.png';
import styles from '../styles/PageNotFound.module.css';
import btnStyles from '../styles/Button.module.css'
import Asset from './Asset';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const PageNotFound = () => {
  return (
    <div className={`${styles.PageNotFound} text-center`}>
        <Asset
            src={NoResults}
            message="Sorry, this page does not exist!"
        />
      <Link to="/">
        <button className={`${btnStyles.Button} ${btnStyles.Orange} ${styles.HomeButton} `}>Home</button>
      </Link>
    </div>
  )
}

export default PageNotFound