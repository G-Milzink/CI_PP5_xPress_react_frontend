import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Collage from "./Collage"

import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/Utils";
import PopularProfiles from "../profiles/PopularProfiles";

function CollagePage() {
    const { id } = useParams();
    const [collage, setCollage] = useState({ results: [] });
    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_avatar;
    const [comments, setComments] = useState({ results: [] });

    /*
        Fetch all data for a collage and it's associated comments
    */
    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: collage }, { data: comments }] = await Promise.all([
                    axiosReq.get(`/collages/${id}`),
                    axiosReq.get(`/comments/?collage=${id}`)
                ]);
                setCollage({ results: [collage] })
                setComments(comments);
            } catch (err) {
                // console.log(err)
            }
        }
        handleMount();
    }, [id])

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <PopularProfiles mobile />
                <Collage {...collage.results[0]} setCollages={setCollage} CollagePage />
                <Container className={appStyles.Content}>
                    {currentUser ? (
                        <CommentCreateForm
                            profile_id={currentUser.profile_id}
                            profileImage={profile_image}
                            collage={id}
                            setCollage={setCollage}
                            setComments={setComments}
                        />
                    ) : comments.results.length ? (
                        "Comments"
                    ) : null}
                    {comments.results.length ? (
                        <InfiniteScroll
                            children={
                                comments.results.map(comment => (
                                    <Comment
                                        key={comment.id}
                                        {...comment}
                                        setCollage={setCollage}
                                        setComments={setComments}
                                    />
                                ))
                            }
                            dataLength={comments.results.length}
                            loader={<Asset spinner />}
                            hasMore={!!comments.next}
                            next={() => fetchMoreData(comments, setComments)}
                        />
                    ) : currentUser ? (
                        <span>"No comments yet...Be the first to comment on this collage!"</span>
                    ) : (
                        <span>"No comments yet...Sign up/Log in to leave a comment."</span>
                    )}
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularProfiles />
            </Col>
        </Row>
    );
}

export default CollagePage;