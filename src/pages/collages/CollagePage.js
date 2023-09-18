import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Collage from "./Collage"
import PopularProfiles from "../profiles/PopularProfiles";

function CollagePage() {
    const { id } = useParams();
    const [collage, setCollage] = useState({ results: [] });

    /*
        Fetch all data for a collage
    */
    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: collage }] = await Promise.all([
                    axiosReq.get(`/collages/${id}`),
                ]);
                setCollage({ results: [collage] })
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
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularProfiles />
            </Col>
        </Row>
    );
}

export default CollagePage;