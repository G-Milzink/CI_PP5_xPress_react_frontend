import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Alert, Image } from "react-bootstrap";
import AudioComponent from "../../components/AudioComponent";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom/cjs/react-router-dom";

function PostEditForm() {
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq(`/posts/${id}/`)
                const { title,
                    include_text, text, excerpt,
                    include_image, image, image_description,
                    include_audio, audio, audio_description,
                    publish, is_owner,
                } = data;
                is_owner ? setPostData({
                    title,
                    include_text, text, excerpt,
                    include_image, image, image_description,
                    include_audio, audio, audio_description,
                    publish,
                }) : history.push('/')
            } catch (err) {
                console.log(err)
            }
        }
        handleMount();
    }, [id, history])

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
        publish: true,
    });
    const { title,
        include_text, text, excerpt,
        include_image, image, image_description,
        include_audio, audio, audio_description,
        publish,
    } = postData;

    const imageInput = useRef(null)
    const audioInput = useRef(null)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // If the input is a checkbox, handle the checked property
        const newValue = type === "checkbox" ? checked : value;
        setPostData({
            ...postData,
            [name]: newValue,
        });
    };

    const handleChangeImage = (e) => {
        if (e.target.files.length) {
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                image: URL.createObjectURL(e.target.files[0]),
            });
        } else {
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                image: "",
            });
        }
    };

    const handleChangeAudio = (e) => {
        if (e.target.files.length) {
            URL.revokeObjectURL(audio);
            setPostData({
                ...postData,
                audio: URL.createObjectURL(e.target.files[0]),
            });
        } else {
            URL.revokeObjectURL(audio);
            setPostData({
                ...postData,
                audio: null,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("include_text", include_text);
        formData.append("text", text);
        formData.append("excerpt", excerpt);
        formData.append("include_image", include_image);

        if (imageInput?.current?.files[0]) {
            formData.append("image", imageInput.current.files[0]);
            formData.append("image_description", image_description);
        }

        formData.append("include_audio", include_audio);

        if (audioInput?.current?.files[0]) {
            formData.append("audio", audioInput.current.files[0]);
            formData.append("audio_description", audio_description);
        }

        formData.append("publish", publish);

        try {
            await axiosReq.put(`/posts/${id}/`, formData);
            history.push(`/posts/${id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
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
                {errors.title?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}
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
                {errors.text?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}
                <Form.Label>Excerpt:</Form.Label>
                <Form.Control
                    as="textarea"
                    name="excerpt"
                    rows={3}
                    value={excerpt}
                    onChange={handleChange}
                />
                {errors.excerpt?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}
                <div className="text-left">
                    <Form.Check
                        type="checkbox"
                        label="Include Text/Excerpt"
                        name="include_text"
                        checked={include_text}
                        onChange={handleChange}
                    />
                    {errors.include_text?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}
                    <Form.Check
                        type="checkbox"
                        label="Include Image"
                        name="include_image"
                        checked={include_image}
                        onChange={handleChange}
                    />
                    {errors.include_image?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}
                    <Form.Check
                        type="checkbox"
                        label="Include Audio"
                        name="include_audio"
                        checked={include_audio}
                        onChange={handleChange}
                    />
                    {errors.include_audio?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}
                    <Form.Check
                        type="checkbox"
                        label="Publish Post"
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
                save
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
                        {/* Form Group dealing with images */}
                        <Form.Group className="text-center">
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

                            <Form.File
                                id="image-upload"
                                accept="image/*"
                                onChange={handleChangeImage}
                                ref={imageInput}
                                hidden
                            />
                            <Form.Label>Image Description:</Form.Label>
                            <Form.Control
                                type="text"
                                name="image_description"
                                value={image_description}
                                onChange={handleChange}
                            />
                            {errors.image_description?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}
                        </Form.Group>
                        {errors.image?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        {/* Form Group dealing with audio */}
                        <Form.Group className="text-center">
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
                            <Form.File
                                id="audio-upload"
                                accept="audio/*"
                                onChange={handleChangeAudio}
                                ref={audioInput}
                                hidden
                            />
                            <Form.Label>Audio Description:</Form.Label>
                            <Form.Control
                                type="text"
                                name="audio_description"
                                value={audio_description}
                                onChange={handleChange}
                            />
                            {errors.audio_description?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}
                        </Form.Group>
                        {errors.audio?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

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

export default PostEditForm;