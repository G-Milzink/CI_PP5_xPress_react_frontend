import React from 'react';
import NoResults from '../assets/NoResults.png';
import styles from '../styles/PageNotFound.module.css';
import Asset from './Asset';

const PageNotFound = () => {
  return (
    <div className={styles.PageNotFound}>
        <Asset
            src={NoResults}
            message="Sorry, this page does not exist!"
        ></Asset>
    </div>
  )
}

export default PageNotFound