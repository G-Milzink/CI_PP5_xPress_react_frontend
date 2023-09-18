import React, { useState, useEffect } from 'react';
import styles from '../../styles/Collage.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Button, Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Avatar from '../../components/Avatar';
import { axiosRes } from '../../api/axiosDefaults';
import { DropDown } from '../../components/DropDown';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import btnStyles from "../../styles/Button.module.css";

const Collage = (props) => {
    const {
        id, owner, profile_id, profile_image,
        comments_count, likes_count, like_id,
        title,
        collage_description,
        updated_on,
        collagePage,
        // collagesPage,
        profilePage,
        setCollages,
        created_on,
    } = props

    const images = [];
    for (let i = 1; i <= 20; i++) {
        images.push(props[`image${i}`]);
    }
    const filteredImages = images.filter(image => image !== null);

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
                results: prefCollages.results.map((collage) => {
                    return collage.id === id
                        ? { ...collage, likes_count: collage.likes_count + 1, like_id: data.id }
                        : collage;
                })
            }));
        } catch (err) {
            // console.log(err)
        }
    };

    /*
        Handles unliking a collage
    */
    const handleUnLike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}`);
            setCollages((prefCollages) => ({
                ...prefCollages,
                results: prefCollages.results.map((collage) => {
                    return collage.id === id
                        ? { ...collage, likes_count: collage.likes_count - 1, like_id: null }
                        : collage;
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
        Handles publishing a collage
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
    // if (collagesPage && !isPublished) {
    //     return null;
    // }

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
                {(!isPublished && is_owner && collagePage) && (
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
            </Card.Body >
            
            <Card.Body className={styles.CollageCardBody}>
                <Link to={`/collages/${id}`}>
                    {title && <Card.Title className={styles.Title} >{title}</Card.Title>}
                </Link>
                <hr />
                <Link to={`/collages/${id}`}>
                    <div className={styles.CollageGrid}>
                        {filteredImages.map((image, index) => (
                            <div key={index} className={styles.CollageItem}>
                                <Card.Img
                                    src={image}
                                    alt={
                                        collage_description ?
                                            collage_description :
                                            "User uploaded image"
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </Link>
                {collage_description && <Card.Text className='text-center'>{collage_description}</Card.Text>}
            </Card.Body>

            <Card.Body>
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

export default Collage