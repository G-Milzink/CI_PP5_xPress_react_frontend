import React from 'react';
import styles from '../../styles/Post.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Avatar from '../../components/Avatar';

const Post = (props) => {

    const {
        id, owner, profile_id, profile_image,
        comments_count, likes_count, like_id,
        title,
        include_text, text, excerpt,
        include_image, image, image_description,
        include_audio, audio, audio_description,
        publish, updated_on,
        postPage,
    } = props

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner

    return (
        <Card className={styles.Post}>
            <Card.Body>
                <Media className='align-items-center justify-content-between'>
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={60} />
                        {owner}
                    </Link>
                    <div className='d-flex align-items-center'>
                        <span>{updated_on}</span>
                        {is_owner && postPage && '...'}
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/posts/${id}`}>
                <Card.Img src={image} alt={image_description} />
            </Link>
            <Card.Body>
                {title && <Card.Title className='text-center' >{title}</Card.Title>}
                {excerpt && <Card.Text>{excerpt}</Card.Text>}
                <div className={styles.PostBar}>
                    {is_owner ? (
                        <OverlayTrigger placement='top' overlay={<Tooltip>You can not like your own xPression!</Tooltip>}>
                            <i className="fa-regular fa-thumbs-up"></i>
                        </OverlayTrigger>
                    ) : like_id ? (
                        <span onClick={() => { }}>
                            <i className={`fa-solid fa-thumbs-up ${styles.Thumb}`}></i>
                        </span>
                    ) : currentUser ? (
                        <span onClick={() => { }}>
                            <i className={`fa-regular fa-thumbs-up ${styles.Thumb}`}></i>
                        </span>
                    ) : (
                        <OverlayTrigger placement='top' overlay={<Tooltip>Log in to like an xPression!</Tooltip>}>
                            <i className="fa-regular fa-thumbs-up"></i>
                        </OverlayTrigger>
                    )}
                    {likes_count}
                    <Link to={`/posts/${id}`}>
                        <i className='fa-regular fa-comments' />
                    </Link>
                    {comments_count}
                </div>
            </Card.Body>
        </Card>
    )
}

export default Post