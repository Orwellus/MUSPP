import React, { useEffect, useState } from "react";
import TextArea from "../../components/TextArea/TextArea";
import { FileUploader } from "react-drag-drop-files";
import "./TeacherPanel.css";

const fileTypes = ["JPEG", "PNG", "GIF", "CSV"];

const TeacherPanel = () => {
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };

    useEffect(() => {
        console.log(file);
    }, [file]);

    return (
        <div className="panel__wrapper">
            <TextArea />
            <div className="panel__file">
                <FileUploader
                    multiple={true}
                    handleChange={handleChange}
                    name="file"
                    types={fileTypes}
                />
                <p className="panel__subtitle">
                    {file
                        ? `File name: ${file[0].name}`
                        : "no files uploaded yet"}
                </p>
            </div>
        </div>
    );
};

export default TeacherPanel;
