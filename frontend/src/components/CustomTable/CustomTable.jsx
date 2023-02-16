import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CustomTableItem from "./CustomTableItem/CustomTableItem";
import "./CustomTable.css";

const subjects = ["Mathematics", "History", "Geography", "Physics"];

function CustomTable({ list, delUser, addUser }) {
    return (
        <Tabs
            defaultActiveKey={subjects[0]}
            id="justify-tab-example"
            className="mb-3 table__custom"
            justify
        >
            {subjects &&
                subjects.map((item, id) => {
                    return (
                        <Tab eventKey={item} title={item} key={id}>
                            <CustomTableItem
                                list={list}
                                delUser={delUser}
                                addUser={addUser}
                            />
                        </Tab>
                    );
                })}
        </Tabs>
    );
}

export default CustomTable;
