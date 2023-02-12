import Table from "react-bootstrap/Table";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./CustomTable.css";

function CustomTable({ list, delUser, addUser }) {
    console.log(list);
    return (
        <Tabs
            defaultActiveKey="mathematics"
            id="justify-tab-example"
            className="mb-3 table__custom"
            justify
        >
            <Tab eventKey="mathematics" title="Mathematics">
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
                                            <button
                                                onClick={() => delUser(item.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
                <button onClick={() => addUser()}>Add Student</button>
            </Tab>
            <Tab eventKey="history" title="History">
                <Table striped bordered hover className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Grades</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>4</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>3</td>
                        </tr>
                    </tbody>
                </Table>
            </Tab>
            <Tab eventKey="physics" title="Physics">
                <Table striped bordered hover className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Grades</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>4</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>3</td>
                        </tr>
                    </tbody>
                </Table>
            </Tab>
            <Tab eventKey="geography" title="Geography">
                <Table striped bordered hover className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Grades</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>4</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>3</td>
                        </tr>
                    </tbody>
                </Table>
            </Tab>
        </Tabs>
    );
}

export default CustomTable;
