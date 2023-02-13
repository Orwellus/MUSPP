import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import CustomTable from "../../components/CustomTable/CustomTable";

const StudentsGrades = () => {
    const [list, setList] = useState();
    async function getUser() {
        try {
            const response = await axios
                .get("http://localhost:3005/assessment")
                .then((response) => {
                    setList(response.data.data);
                });
        } catch (error) {
            console.error(error);
        }
    }
    async function delUser(id) {
        try {
            const response = await axios
                .delete("http://localhost:3005/assessment/" + id, id)
                .then((response) => {
                    getUser();
                });
        } catch (error) {
            console.error(error);
        }
    }
    async function addUser() {
        const body = { name: "lol", assessment: "4.5", date: "2022-04-24" };
        try {
            const response = await axios
                .post("http://localhost:3005/assessment", body, {
                    headers: {
                        // 'application/json' is the modern content-type for JSON, but some
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    getUser();
                });
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getUser();
    }, []);
    return (
        <div>
            <CustomTable list={list} delUser={delUser} addUser={addUser} />
        </div>
    );
};

export default StudentsGrades;
