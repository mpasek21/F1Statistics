import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./recordList.css";

const Record = (props) => (
    <tr>
        <td>{props.record.circuitId}</td>
        <td>{props.record.name}</td>
        <td>{props.record.location}</td>
        <td>{props.record.country}</td>
        <td>
            <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
            <button className="btn btn-link"
                    onClick={() => {
                        if (window.confirm("Are you sure you want to delete this track?")){
                        props.deleteRecord(props.record._id);
                        }
                    }}
            >
                Delete
            </button>
        </td>
    </tr>
);

export default function RecordList() {
    const [records, setRecords] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5050/api/users/list`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records);
        }

        getRecords();


    }, [records.length]);

    // This method will delete a record
    async function deleteRecord(id) {
        await fetch(`http://localhost:5050/api/users/${id}`, {
            method: "DELETE"
        });

        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }

    // This method will map out the records on the table
    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    // This following section will display the table with the records of individuals.
    return (
        <div classname="records-container">
            <h3 style={{marginLeft: 15, marginTop: 5}}>Record List</h3>
            <table className="table table-striped" style={{marginTop: 15, marginLeft: 15}}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Country</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
        </div>
    );
}