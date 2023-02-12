import React from "react";
import "./TitleSection.css";

const TitleSection = ({ title, subtitle }) => {
    return (
        <div className="titleSection__wrapper">
            {title && <p className="titleSection__title">{title}</p>}
            {subtitle && <p className="titleSection__subtitle">{subtitle}</p>}
        </div>
    );
};

export default TitleSection;
