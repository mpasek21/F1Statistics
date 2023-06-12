import React, {useState} from "react";
import {useNavigate} from "react-router";
import "./create.css";
export default function Create() {
    const [form, setForm] = useState({
        circuidId: "", name: "", location: "", country: "",
    });
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value};
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newTrack = {...form};

        await fetch("http://localhost:5050/api/users/create", {
            method: "POST", headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify(newTrack),
        })
            .catch(error => {
                window.alert(error);
            });
        setForm({circuidId: "", name: "", location: "", country: ""});
        navigate("/list");
    }

    return (<div className="create-container">
        <h3>Create New Record</h3>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={form.name}
                    onChange={(e) => updateForm({name: e.target.value})}
                />
            </div>
            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                    type="text"
                    className="form-control"
                    id="location"
                    value={form.location}
                    onChange={(e) => updateForm({location: e.target.value})}
                />
            </div>
            <div className="form-group">
                <label htmlFor="name">Country</label>
                <input
                    type="text"
                    className="form-control"
                    id="country"
                    value={form.country}
                    onChange={(e) => updateForm({country: e.target.value})}
                />
            </div>
            <div className="form-group">
                <input
                    type="submit"
                    value="Add track"
                    className="add-button"
                />
            </div>
        </form>
    </div>);
}