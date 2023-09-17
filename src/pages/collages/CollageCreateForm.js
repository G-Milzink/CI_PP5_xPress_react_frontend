import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import UploadImage from "../../assets/UploadImage.png";

import styles from "../../styles/CollageCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Alert, Image } from "react-bootstrap";
import AudioComponent from "../../components/AudioComponent";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function CollageCreateForm() {
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [collageData, setCollageData] = useState({
        title: "",
        collage_description: "",
        images: Array(20).fill(""),
        publish: false,
    })
    const {
        title,
        collage_description,
        images,
        publish,
    } = collageData;


    /*
        Handles changing input fields
    */
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // If the input is a checkbox, handle the checked property
        const newValue = type === "checkbox" ? checked : value;
        setCollageData({
            ...postData,
            [name]: newValue,
        });
    };


    const textFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label htmlFor="collageTitle">Title:</Form.Label>
                <Form.Control
                    id="collageTitle"
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                />
                {errors.title?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}
            </Form.Group>

            <Form.Group>
                <Form.Label htmlFor="collageDescription" >Text:</Form.Label>
                <Form.Control
                    id="collageDescription"
                    as="textarea"
                    name="text"
                    rows={6}
                    value={collage_description}
                    onChange={handleChange}
                />
                {errors.text?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}
                <div className="text-left">
                    {<hr />}
                    <div>Don't forget to publish your post:</div>
                    <Form.Check
                        type="checkbox"
                        label="Publish Post"
                        id="Publish_Post"
                        name="publish"
                        checked={publish}
                        onChange={handleChange}
                    />
                    {errors.publish?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}
                </div>
            </Form.Group>



            <Button
                className={`${btnStyles.Button} ${btnStyles.Orange}`}
                onClick={() => history.goBack()}
            >
                cancel
            </Button>
            <Button className={`${btnStyles.Button} ${btnStyles.Orange}`} type="submit">
                create
            </Button>
        </div>
    );
}