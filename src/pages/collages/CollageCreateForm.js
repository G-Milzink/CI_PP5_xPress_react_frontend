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
    const imageInput = useRef(null)


    /*
        Handles changing input fields
    */
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // If the input is a checkbox, handle the checked property
        const newValue = type === "checkbox" ? checked : value;
        setCollageData({
            ...collageData,
            [name]: newValue,
        });
    };


    /*
        Handles changing the image.
    */
    const handleChangeImage = (e) => {
        if (e.target.files.length) {
            URL.revokeObjectURL(collageData.images[0]);
            const updatedCollageData = {
                ...collageData,
                images: [URL.createObjectURL(e.target.files[0]), ...collageData.images.slice(1)],
            };
            setCollageData(updatedCollageData);
        } else {
            URL.revokeObjectURL(collageData.images[0]);
            const updatedCollageData = {
                ...collageData,
                images: ["", ...collageData.images.slice(1)],
            };
            setCollageData(updatedCollageData);
        }
    };



    /*
        Handles form submission
    */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("collage_description", collage_description);

        if (imageInput.current.files.length) {
            formData.append("images[0]", imageInput.current.files[0]);
        }

        formData.append("publish", publish);

        try {
            const { data } = await axiosReq.post('/posts/', formData);
            history.push(`/posts/${data.id}`);
        } catch (err) {
            // console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
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


    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        {/* image grid */}
                        <div className="mb-4">
                            <Row>
                                {images.map((imageUrl, index) => (
                                    <Col key={index} xs={6} sm={3} className="mb-3">
                                        <Image src={imageUrl} alt={`Image ${index + 1}`} rounded fluid />
                                    </Col>
                                ))}
                            </Row>
                        </div>



                        {/* Form Group dealing with images */}
                        <Form.Group className="text-center">
                            {images[0] ? (
                                <>
                                    <figure>
                                        <Image className={appStyles.Image} src={images[0]} rounded />
                                    </figure>
                                    <div>
                                        <Form.Label
                                            className={`${btnStyles.Button} ${btnStyles.Orange} btn`}
                                            htmlFor="image_upload"
                                        >
                                            Change the image
                                        </Form.Label>
                                    </div>
                                </>
                            ) : (
                                <Form.Label
                                    className="d-flex justify-content-center"
                                    htmlFor="image_upload"
                                >
                                    <Asset
                                        src={UploadImage}
                                        message="Click or tap to upload an image"
                                    />
                                </Form.Label>
                            )}
                            <Form.File
                                id="image_upload"
                                accept="image/*"
                                onChange={handleChangeImage}
                                ref={imageInput}
                                hidden
                            />
                        </Form.Group>
                        {errors.image?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        


                    </Container>
                </Col>
                <Col md={5} lg={4} className="p-0 p-md-2">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
            </Row>
        </Form >
    );
}

export default CollageCreateForm;