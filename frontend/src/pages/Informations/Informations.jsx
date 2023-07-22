import React, { useEffect, useState } from "react";
import TitleSection from "../../components/TitleSection/TitleSection";
import "./Informations.css";

const Informations = ({ profile }) => {
    const [info, setInfo] = useState([]);
    useEffect(() => {
        setInfo(profile);
    }, [profile]);
    return (
        <div>
            <TitleSection
                title="Below your personal information."
                subtitle="That informations are from you google account"
            />
            {info && (
                <>
                    <img src={info.picture} alt="user image" />
                    <h3 className="auth-text-color">User Logged in</h3>
                    <p className="auth-text-color">Name: {info.name}</p>
                    <p className="auth-text-color">
                        Email Address: {info.email}
                    </p>
                </>
            )}
        </div>
    );
};

export default Informations;
