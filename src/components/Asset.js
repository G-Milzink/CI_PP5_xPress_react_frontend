import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import styles from "../styles/Asset.module.css";

const Asset = ({ spinner, src, message }) => {
    const [showSecondSpinner, setShowSecondSpinner] = useState(false);
    const [showThirdSpinner, setShowThirdSpinner] = useState(false);

    /*
        Multipurpose component,mainly used to display a spinner.
    */

    useEffect(() => {
        if (spinner) {
            setShowSecondSpinner(false);
            setShowThirdSpinner(false);

            const secondSpinnerTimeout = setTimeout(() => {
                setShowSecondSpinner(true);
            }, 75);

            const thirdSpinnerTimeout = setTimeout(() => {
                setShowThirdSpinner(true);
            }, 150);

            return () => {
                clearTimeout(secondSpinnerTimeout);
                clearTimeout(thirdSpinnerTimeout);
            };
        }
    }, [spinner]);

    return (
        <div className={`${styles.Asset} p-4`}>
            <div>
                {spinner && <Spinner className={styles.SpinnerMargin} animation="grow" variant="dark" />}
                {showSecondSpinner && <Spinner className={styles.SpinnerMargin} animation="grow" variant="dark" />}
                {showThirdSpinner && <Spinner className={styles.SpinnerMargin} animation="grow" variant="dark" />}
            </div>
            {src && <img src={src} alt={message} />}
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
};

export default Asset;
