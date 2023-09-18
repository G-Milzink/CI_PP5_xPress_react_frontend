import React, { useState, useEffect } from 'react';
import styles from '../../styles/Post.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Button, Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Avatar from '../../components/Avatar';
import AudioComponent from '../../components/AudioComponent';
import { axiosRes } from '../../api/axiosDefaults';
import { DropDown } from '../../components/DropDown';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import audioStyles from '../../styles/AudioComponent.module.css';
import btnStyles from "../../styles/Button.module.css";

const Post = (props) => {
    const {
        id, owner, profile_id, profile_image,
        comments_count, likes_count, like_id,
        title,
        collage_description,
        image1, image2, image3, image4,
        image5, image6, image7, image8,
        image9, image10, image11, image12,
        image13, image14, image15, image16,
        image17, image18, image19, image20,
        updated_on,
        collagePage,
        // postsPage,
        profilePage,
        setCollages,
        created_on,
    } = props
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();
    const [isPublished, setIsPublished] = useState(!!props.publish);

    /*
        Set isPublished to value stored in the post
    */
    useEffect(() => {
        setIsPublished(!!props.publish);
    }, [props.publish]);

    /*
        Handles liking a collage
    */
    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post('/likes/', { collage: id });
            setCollages((prefCollages) => ({
                ...prefCollages,
                results: prefCollages.results.map((post) => {
                    return post.id === id
                        ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
                        : post;
                })
            }));
        } catch (err) {
            // console.log(err)
        }
    };

    /*
        Handles unliking a post
    */
    const handleUnLike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}`);
            setCollages((prefCollages) => ({
                ...prefCollages,
                results: prefCollages.results.map((post) => {
                    return post.id === id
                        ? { ...post, likes_count: post.likes_count - 1, like_id: null }
                        : post;
                })
            }));
        } catch (err) {
            // console.log(err)
        }
    };

    /*
        Handles editing a collage
    */
    const handleEdit = async () => {
        history.push(`/collages/${id}/edit`)
    }

    /*
        Handles deleting a post
    */
    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/collages/${id}`);
            history.goBack();
        } catch (err) {
            // console.log(err)
        }
    }

    /*
        Handles publishing a post
    */
    const handlePublish = async () => {
        try {
            await axiosRes.patch(`/collages/${id}`,
                {
                    publish: true,
                }
            );
            setIsPublished(true);
        } catch (err) {
            // console.log(err);
        }
    };

    // Check if isPublished is false AND user is currently on postsPage
    // => return null (nothing will be rendered)
    if (collagePage && !isPublished) {
        return null;
    }

    // Check if isPublished is false AND user is currently on profilePage AND is not the owner
    // => return null (nothing will be rendered)
    if (profilePage && !isPublished && !is_owner) {
        return null;
    }

    return (
        < Card className={styles.Post} >
            <Card.Body>
                {(!isPublished && is_owner && profilePage) && (
                    <div>
                        <span>
                            <p className={styles.UnPublished}>Unpublished!</p>
                        </span>
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Publish}`}
                            onClick={handlePublish}
                        >
                            publish
                        </Button>
                    </div>
                )}
                {(!isPublished && is_owner && postPage) && (
                    <div>
                        <span>
                            <p className={styles.UnPublished}>Unpublished!</p>
                        </span>
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Publish}`}
                            onClick={handlePublish}
                        >
                            publish
                        </Button>
                    </div>
                )}
                <Media className='align-items-center justify-content-between'>
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={60} />
                        {owner}
                    </Link>
                    <div className='d-flex align-items-center'>
                        <span className={styles.ExtraMargin}>
                            created: {created_on}
                            <p className={styles.SmallerFont}>
                                updated: {updated_on}
                            </p>
                        </span>
                        {is_owner && collagePage && <DropDown handleEdit={handleEdit} handleDelete={handleDelete} />}
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/collages/${id}`}>
                {title && <Card.Title className={styles.Title} >{title}</Card.Title>}
            </Link>
            <hr />
            <Card.Body>
                <Link to={`/posts/${id}`}>
                    <Card.Img
                        src={image1}
                        alt={
                            image_description ?
                                image_description :
                                "User uploaded image"
                        }
                    />

                </Link>
                {collage_description && <Card.Text className='text-center'>{collage_description}</Card.Text>}
            </Card.Body>

            {
                include_audio &&
                <Card.Body>
                    <AudioComponent className={audioStyles.Player} src={audio} />
                    {audio_description && <Card.Text className='text-center'>{audio_description}</Card.Text>}
                </Card.Body>
            }
            <Card.Body>
                {include_text && excerpt && !postPage &&
                    <Link to={`/posts/${id}`}>
                        <Card.Text>{excerpt}</Card.Text>
                    </Link>}
                {include_text && text && postPage && <Card.Text>{text}</Card.Text>}
                <div className={styles.PostBar}>
                    {is_owner ? (
                        <OverlayTrigger placement='top' overlay={<Tooltip>You can not like your own xPression!</Tooltip>}>
                            <i className="fa-regular fa-thumbs-up"></i>
                        </OverlayTrigger>
                    ) : like_id ? (
                        <span onClick={handleUnLike}>
                            <i className={`fa-solid fa-thumbs-up ${styles.ThumbSolid}`}></i>
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
                        <i className='fa-regular fa-comments'></i>
                        <span className={styles.Invisible}>comments</span>
                    </Link>
                    {comments_count}
                </div>
            </Card.Body>
        </Card >
    )
}

export default Post