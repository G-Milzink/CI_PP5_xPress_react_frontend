import React, { useRef, useState } from "react";

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
import { Alert, Image } from "react-bootstrap";
import AudioComponent from "../../components/AudioComponent";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function PostCreateForm() {

    const history = useHistory();
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

    const imageInput = useRef(null)
    const audioInput = useRef(null)

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("title", title)
        formData.append("include_text", include_text)
        formData.append("text", text)
        formData.append("excerpt", excerpt)
        formData.append("include_image", include_image)
        formData.append("image", imageInput.current.files[0])
        formData.append("image_description", image_description)
        formData.append("include_audio", include_audio)
        formData.append("audio", audioInput.current.files[0])
        formData.append("audio_description", audio_description)
        formData.append("publish", publish)

        try {
            const { data } = await axiosReq.post('/posts/', formData)
            history.push(`/posts/${data.id}`)
        } catch (err) {
            console.log(err)
            if (err.response?.status !== 401) {
                setErrors(err.response?.data)
            }
        }
    }

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
                        defaultChecked="true"
                        label="Include Text/Excerpt"
                        name="include_text"
                        value={include_text}
                        onChange={handleChange}
                    />
                    {errors.include_text?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}
                    <Form.Check
                        type="checkbox"
                        defaultChecked="true"
                        label="Include Image"
                        name="include_image"
                        value={include_image}
                        onChange={handleChange}
                    />
                    {errors.include_image?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}
                    <Form.Check
                        type="checkbox"
                        defaultChecked="true"
                        label="Include Audio"
                        name="include_audio"
                        value={include_audio}
                        onChange={handleChange}
                    />
                    {errors.include_audio?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}
                    <Form.Check
                        type="checkbox"
                        defaultChecked="true"
                        label="Publish Post"
                        name="publish"
                        value={publish}
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
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={() => history.goBack()}
            >
                Cancel
            </Button>
            <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
                Save
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

export default PostCreateForm;