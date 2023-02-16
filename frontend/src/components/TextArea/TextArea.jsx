import React from "react";
import Form from "react-bootstrap/Form";
import "./TextArea.css";

const TextArea = ({ text, setText }) => {
    return (
        <div>
            <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
            >
                <Form.Label className="input__label">
                    Uploaded information in text
                </Form.Label>
                <Form.Control
                    as="textarea"
                    rows={10}
                    value={text}
                    onChange= { (e) =>  setText(e.target.value)}
                />
            </Form.Group>
        </div>
    );
};

export default TextArea;
