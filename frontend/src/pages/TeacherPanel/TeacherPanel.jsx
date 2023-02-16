import React, { useEffect, useState } from "react";
import axios from "axios";
import TextArea from "../../components/TextArea/TextArea";
import { FileUploader } from "react-drag-drop-files";
import "./TeacherPanel.css";

const fileTypes = ["JPEG", "PNG", "GIF", "CSV", "JPG"];

const TeacherPanel = () => {
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const handleChange = (files) => {
        if (files.length === 1) {
            setFile(files[files.length - 1]);
        } else {
            setFile("");
        }
    };

    async function sendImg() {
        let formData = new FormData();
        formData.append("file", file);
        console.log(formData);
        try {
            const response = await axios
                .post("http://localhost:3005/api/image", formData, {
                    headers: {
                        // 'application/json' is the modern content-type for JSON, but some
                        "Content-Type": "multipart/form-data",
                    },
                })
                
                .then((response) => {console.log(response);setText(JSON.stringify(response.data))});
        } catch (error) {
            console.error(error);
        }
    }
    async function sendCsv() {
        let formData = new FormData();
        formData.append("file", file);
        console.log(formData);
        try {
            const response = await axios
                .post("http://localhost:3005/api/csv", formData, {
                    headers: {
                        // 'application/json' is the modern content-type for JSON, but some
                        "Content-Type": "multipart/form-data",
                    },
                })
                
                .then((response) => {setText(JSON.stringify(response.data))});
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        console.log(file);
    }, [file]);

    return (
        <div className="panel__wrapper">
            <TextArea text={text} setText={setText} />
            <div className="panel__file">
                <FileUploader
                    multiple={true}
                    handleChange={handleChange}
                    name="file"
                    types={fileTypes}
                />
                <p className="panel__subtitle">
                    {file ? `File name: ${file.name}` : "no files uploaded yet"}
                </p>
                <button onClick={() =>  file.name.includes('.csv')  ? sendCsv(file): sendImg(file)}>Send</button>
            </div>
        </div>
    );
};

export default TeacherPanel;
