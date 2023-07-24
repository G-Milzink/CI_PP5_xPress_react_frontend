import React from 'react';
import NoResults from '../assets/NoResults.png';
import styles from '../styles/NotFound.module.css';
import Asset from './Asset';

const NotFound = () => {
  return (
    <div className={styles.NotFound}>
        <Asset
            src={NoResults}
            message="Sorry, this page does not exist!"
        ></Asset>
    </div>
  )
}

export default NotFound