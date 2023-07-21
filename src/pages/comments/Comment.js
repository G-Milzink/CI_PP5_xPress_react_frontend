import React from 'react';
import styles from '../../styles/Comment.module.css'
import { Media } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { MoreDropDown } from '../../components/MoreDropDown';

const Comment = (props) => {

    const {
        profile_id,
        profile_image,
        owner,
        updated_on,
        text,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    return (
        <div>
            <hr className={styles.CustomRuler} />
            <Media>
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} />
                </Link>
                <Media.Body>
                    <span className={styles.Owner}>{owner}</span>
                    <span className={styles.Date}>{updated_on}</span>
                    <p>{text}</p>
                </Media.Body>
                {is_owner && 
                    <MoreDropDown
                        handleEdit={() => { }}
                        handleDelete={() => { }}
                    />
                }
            </Media>
        </div>
    )
}

export default Comment