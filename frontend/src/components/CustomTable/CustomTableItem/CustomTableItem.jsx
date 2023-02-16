import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Tab from "react-bootstrap/Tab";
import "../CustomTable.css";

const CustomTableItem = ({ list, delUser, addUser }) => {
    const [name, setName] = useState("");
    const [grade, setGrade] = useState("");
    const [date, setDate] = useState("");
    return (
        <Table striped bordered hover className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Grade</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {list &&
                    list.map((item, id) => {
                        return (
                            <tr>
                                <td>{id + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.assessment}</td>
                                <td>{item.date}</td>
                                <td>
                                    <button onClick={() => delUser(item.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                <tr>
                    <td>{list && list.length + 1}</td>
                    <td>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </td>
                    <td>
                        <button
                            onClick={() => {
                                addUser(grade, name, date);
                                setName("");
                                setGrade("");
                                setDate("");
                            }}
                        >
                            Add student
                        </button>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
};
export default CustomTableItem;
