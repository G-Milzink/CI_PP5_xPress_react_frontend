import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/CollagesPage.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Collage from "./Collage";

import NoResults from '../../assets/NoResults.png';
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/Utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function CollagesPage({ message, filter = "" }) {

    const [collages, setCollages] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const [query, setQuery] = useState("");

    const currentUser = useCurrentUser();

    /*
        Fetch all collages and filter by search query
    */
    useEffect(() => {
        const fetchCollages = async () => {
            try {
                let endpoint = "/collages/"; // API endpoint for fetching all collages

                if (filter) {
                    // Add filter for search query if it exists
                    endpoint += `?search=${query}`;
                }

                const { data } = await axiosReq.get(endpoint);
                setCollages(data);
                setHasLoaded(true);
            } catch (err) {
                // console.log(err)
            }
        }
        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchCollages();
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [filter, query, pathname, currentUser]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <PopularProfiles mobile />
                <i className={`fa-solid fa-magnifying-glass ${styles.SearchIcon}`}></i>
                <Form className={styles.SearchBar}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <Form.Label htmlFor="searchInput" className="d-none">Search cOllages by keyword</Form.Label>
                    <Form.Control
                        id="searchInput"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        type="text"
                        className="mr-sm-2"
                        placeholder="Search cOllages by keyword"
                    />
                </Form>

                {hasLoaded ? (
                    <>
                        {collages.results.length ? (
                            <InfiniteScroll
                                children={
                                    collages.results.map((collage) => (
                                        <Collage key={collage.id} {...collage} setCollages={setCollages} CollagesPage="true" />
                                    ))
                                }
                                dataLength={collages.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!collages.next}
                                next={() => fetchMoreData(collages, setCollages)}
                            />
                        ) : (
                            <Container className={appStyles.Content}>
                                <Asset src={NoResults} message={message} />
                            </Container>
                        )}
                    </>
                ) : (
                    <Container className={appStyles.Content}>
                        <Asset spinner />
                    </Container>
                )}
            </Col>
            <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularProfiles />
            </Col>
        </Row>
    );
}

export default CollagesPage;