import React from 'react';
import styles from '../../styles/Comment.module.css'
import { Media } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { MoreDropDown } from '../../components/MoreDropDown';
import { axiosRes } from '../../api/axiosDefaults';

const Comment = (props) => {

    const {
        id,
        profile_id,
        profile_image,
        owner,
        updated_on,
        text,
        setPost,
        setComments,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/comments/${id}`)
            setPost(prevPost => ({
                results: [{
                    ...prevPost.results[0],
                    comments_count: prevPost.results[0].comments_count - 1
                }]
            }))
            setComments(prevComments => ({
                ...prevComments,
                results: prevComments.results.filter(comment => comment.id !== id)
            }))
        } catch (err) { }
    }

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
                        handleDelete={handleDelete}
                    />
                }
            </Media>
        </div>
    )
}

export default Comment