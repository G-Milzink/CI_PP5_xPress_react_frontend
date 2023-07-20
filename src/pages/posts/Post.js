import React from 'react';
import styles from '../../styles/Post.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Avatar from '../../components/Avatar';
import AudioComponent from '../../components/AudioComponent';
import { axiosRes } from '../../api/axiosDefaults';

const Post = (props) => {

    const {
        id, owner, profile_id, profile_image,
        comments_count, likes_count, like_id,
        title,
        include_text, excerpt,
        include_image, image, image_description,
        include_audio, audio, audio_description,
        publish, updated_on,
        postPage,
        setPosts,
    } = props

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner

    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post('/likes/', { post: id });
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
                        : post;
                })
            }));
        } catch (err) {
            console.log(err)
        }
    };

    const handleUnLike = async () => {
        try {
            const { data } = await axiosRes.delete(`/likes/${like_id}`);
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, likes_count: post.likes_count - 1, like_id: null }
                        : post;
                })
            }));
        } catch (err) {
            console.log(err)
        }
    };



    // Check if publish is false, return null (nothing will be rendered)
    // if (!publish) {
    //     return null;
    // }

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
            {title && <Card.Title className='text-center' >{title}</Card.Title>}
            {include_image &&
                <Card.Body>
                    <Link to={`/posts/${id}`}>
                        <Card.Img src={image} alt={image_description} />
                    </Link>
                    {image_description && <Card.Text className='text-center'>{image_description}</Card.Text>}
                </Card.Body>
            }

            {include_audio &&
                <Card.Body>
                    <AudioComponent src={audio} />
                    {audio_description && <Card.Text className='text-center'>{audio_description}</Card.Text>}
                </Card.Body>
            }
            <Card.Body>
                {include_text && excerpt && <Card.Text>{excerpt}</Card.Text>}
                <div className={styles.PostBar}>
                    {is_owner ? (
                        <OverlayTrigger placement='top' overlay={<Tooltip>You can not like your own xPression!</Tooltip>}>
                            <i className="fa-regular fa-thumbs-up"></i>
                        </OverlayTrigger>
                    ) : like_id ? (
                            <span onClick={handleUnLike}>
                            <i className={`fa-solid fa-thumbs-up ${styles.Thumb}`}></i>
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleLike}>
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