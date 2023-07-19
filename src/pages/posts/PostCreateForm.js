import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import UploadImage from "../../assets/UploadImage.png";
import UploadAudio from "../../assets/UploadAudio.png";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";
import AudioComponent from "../../components/AudioComponent";



function PostCreateForm() {

    const [errors, setErrors] = useState({});

    const [postData, setPostData] = useState({
        title: "",
        include_text: true,
        text: "",
        excerpt: "",
        include_image: true,
        image: "",
        image_description: "",
        include_audio: true,
        audio: "",
        audio_description: "",
        publish: "",
    });
    const { title,
        include_text, text, excerpt,
        include_image, image, image_description,
        include_audio, audio, audio_description,
        publish,
    } = postData;

    const handleChange = (e) => {
        setPostData({
            ...postData,
            [e.target.name]: e.target.value
        });
    };

    const handleChangeImage = (e) => {
        if (e.target.files.length) {
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                image: URL.createObjectURL(e.target.files[0]),
            });
        }
    };

    const handleChangeAudio = (e) => {
        if (e.target.files.length) {
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                audio: URL.createObjectURL(e.target.files[0]),
            });
        }
    };

    const textFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label>Title:</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Text:</Form.Label>
                <Form.Control
                    as="textarea"
                    name="text"
                    rows={6}
                    value={text}
                    onChange={handleChange}
                />
                <Form.Label>Excerpt:</Form.Label>
                <Form.Control
                    as="textarea"
                    name="excerpt"
                    rows={3}
                    value={excerpt}
                    onChange={handleChange}
                />
                <div className="text-left">
                <Form.Check
                    type="checkbox"
                    defaultChecked="true"
                    label="Include Text/Excerpt"
                    name="include_text"
                    value={include_text}
                    onChange={handleChange}
                />
                <Form.Check
                    type="checkbox"
                    defaultChecked="true"
                    label="Include Image"
                    name="include_image"
                    value={include_image}
                    onChange={handleChange}
                />
                <Form.Check
                    type="checkbox"
                    defaultChecked="true"
                    label="Include Audio"
                    name="include_audio"
                    value={include_audio}
                    onChange={handleChange}
                />
                <Form.Check
                    type="checkbox"
                    defaultChecked="true"
                    label="Publish Post"
                    name="publish"
                    value={publish}
                    onChange={handleChange}
                />
                </div>
            </Form.Group>



            <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={() => { }}
            >
                cancel
            </Button>
            <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
                create
            </Button>
        </div>
    );

    return (
        <Form>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        {/* Form Group dealing with images */}
                        <Form.Group className="text-center">
                            {image ? (
                                <>
                                    <figure>
                                        <Image className={appStyles.Image} src={image} rounded />
                                    </figure>
                                    <div>
                                        <Form.Label
                                            className={`${btnStyles.Button} ${btnStyles.Orange} btn`}
                                            htmlFor="image-upload"
                                        >
                                            Change the image
                                        </Form.Label>
                                    </div>
                                </>
                            ) : (
                                <Form.Label
                                    className="d-flex justify-content-center"
                                    htmlFor="image-upload"
                                >
                                    <Asset
                                        src={UploadImage}
                                        message="Click or tap to upload an image"
                                    />
                                </Form.Label>
                            )}
                            <Form.File
                                id="image-upload"
                                accept="image/*"
                                onChange={handleChangeImage}
                                hidden
                            />
                            <Form.Label>Image Description:</Form.Label>
                            <Form.Control
                                type="text"
                                name="image_description"
                                value={image_description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        {/* Form Group dealing with audio */}
                        <Form.Group className="text-center">
                            {audio ? (
                                <>
                                    <figure>
                                        <AudioComponent src={audio} />
                                    </figure>
                                    <div>
                                        <Form.Label
                                            className={`${btnStyles.Button} ${btnStyles.Orange} btn`}
                                            htmlFor="audio-upload"
                                        >
                                            Change the audio
                                        </Form.Label>
                                    </div>
                                </>
                            ) : (
                                <Form.Label
                                    className="d-flex justify-content-center"
                                    htmlFor="audio-upload"
                                >
                                    <Asset
                                        src={UploadAudio}
                                        message="Click or tap to upload an audio file"
                                    />
                                </Form.Label>
                            )}
                            <Form.File
                                id="audio-upload"
                                accept="audio/*"
                                onChange={handleChangeAudio}
                                hidden
                            />
                            <Form.Label>Audio Description:</Form.Label>
                            <Form.Control
                                type="text"
                                name="audio_description "
                                value={audio_description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
            </Row>
        </Form >
    );
}

export default PostCreateForm;