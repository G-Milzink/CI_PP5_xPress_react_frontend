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
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom/cjs/react-router-dom";

function CollageEditForm() {
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const default_collage_image =
        "https://res.cloudinary.com/dz9lnaiig/image/upload/v1694870425/xPress/default_collage_image.png";
    const [collageData, setCollageData] = useState({
        title: "",
        collage_description: "",
        publish: true,
        images: Array(20).fill(default_collage_image),
    });

    const { title, collage_description, publish, images } = collageData;
    const imageInput = useRef(null);

    /*
      Fetches posts from the API
      Determines if the current logged in user is the owner.
    */
    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq(`/collages/${id}`);
                const { title, collage_description, publish, is_owner } = data;
                const apiImages = [];

                // Loop through 'image1' to 'image20' and push them to the 'apiImages' array
                for (let i = 1; i <= 20; i++) {
                    if (data[`image${i}`]) {
                        apiImages.push(data[`image${i}`]);
                    } else {
                        apiImages.push(default_collage_image); // Push default image for empty slots
                    }
                }

                is_owner
                    ? setCollageData({
                        title,
                        collage_description,
                        publish,
                        images: apiImages, // Initialize 'images' array with image URLs from the API
                    })
                    : history.push("/");
            } catch (err) {
                // console.log(err)
            }
        };
        handleMount();
    }, [id, history]);

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
      Handles changing the images.
    */
    const handleChangeImage = (e) => {
        if (e.target.files.length) {
            const newImages = [...collageData.images];

            for (let i = 0; i < e.target.files.length; i++) {
                const file = e.target.files[i];

                // Find the next open spot in the images array
                const nextOpenIndex = newImages.findIndex(
                    (image) => image === default_collage_image
                );

                if (nextOpenIndex !== -1) {
                    // If there's an open spot, replace it with the new image URL
                    newImages[nextOpenIndex] = URL.createObjectURL(file);
                }
            }

            const updatedCollageData = {
                ...collageData,
                images: newImages,
            };

            setCollageData(updatedCollageData);
        } else {
            // Handle image deletion
            // Remove the image at the specified index by setting it to the default image
            const updatedCollageData = {
                ...collageData,
                images: [default_collage_image, ...collageData.images.slice(1)],
            };
            setCollageData(updatedCollageData);
        }
    };

    /*
      Reset an individual image to its default state
    */
    const resetImageToDefault = (index) => {
        const newImages = [...collageData.images];
        newImages[index] = default_collage_image;
        const updatedCollageData = {
            ...collageData,
            images: newImages,
        };
        setCollageData(updatedCollageData);
    };

    /*
      Handles form submission
    */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("collage_description", collage_description);

        // Append image URLs as files (converted back from data URLs)
        for (let index = 0; index < images.length; index++) {
            const imageUrl = images[index];
            if (imageUrl !== default_collage_image) {
                // Convert data URL back to Blob
                const blob = await (await fetch(imageUrl)).blob();
                formData.append(`image${index + 1}`, blob, `image${index + 1}.jpg`);
            } else {
                // Set image field to null for deleted or empty images
                formData.append(`image${index + 1}`, "");
            }
        }

        formData.append("publish", publish);

        try {
            const { data } = await axiosReq.put(`/collages/${id}`, formData);
            history.push(`/collages/${data.id}`);
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
                <Form.Label htmlFor="collageDescription">Description:</Form.Label>
                <Form.Control
                    id="collageDescription"
                    as="textarea"
                    name="collage_description"
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
                    <div>Don't forget to publish your collage:</div>
                    <Form.Check
                        type="checkbox"
                        label="Publish Collage"
                        id="Publish_Collage"
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
                                        <div className={`${styles.Overlay}`}>
                                            <Image
                                                src={imageUrl}
                                                alt={`Image ${index + 1}`}
                                                rounded
                                                fluid
                                                onClick={() => resetImageToDefault(index)}
                                                className={`${styles.GridImage}`}
                                            />
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>

                        {/* Multi-image select */}
                        <Form.Group>
                            <Form.Label htmlFor="image_upload" className="mb-3">
                                Add More Images:
                            </Form.Label>
                            <Form.File
                                id="image_upload"
                                accept="image/*"
                                multiple
                                onChange={handleChangeImage}
                                ref={imageInput}
                            />
                        </Form.Group>
                    </Container>
                </Col>
                <Col md={5} lg={4} className="p-0 p-md-2">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
            </Row>
        </Form>
    );
}

export default CollageEditForm;
