import React, {useState} from "react";
import {useNavigate} from "react-router";

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

        await fetch("http://localhost:5050/record", {
            method: "POST", headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify(newTrack),
        })
            .catch(error => {
                window.alert(error);

            });

        setForm({circuidId: "", name: "", location: "", country: ""});
        navigate("/");
    }

    // This following section will display the form that takes the input from the user.
    return (<div>
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
            {/*<div className="form-group">*/}
            {/*    <div className="form-check form-check-inline">*/}
            {/*        <input*/}
            {/*            className="form-check-input"*/}
            {/*            type="radio"*/}
            {/*            name="positionOptions"*/}
            {/*            id="positionIntern"*/}
            {/*            value="Intern"*/}
            {/*            checked={form.level === "Intern"}*/}
            {/*            onChange={(e) => updateForm({level: e.target.value})}*/}
            {/*        />*/}
            {/*        <label htmlFor="positionIntern" className="form-check-label">Intern</label>*/}
            {/*    </div>*/}
            {/*    <div className="form-check form-check-inline">*/}
            {/*        <input*/}
            {/*            className="form-check-input"*/}
            {/*            type="radio"*/}
            {/*            name="positionOptions"*/}
            {/*            id="positionJunior"*/}
            {/*            value="Junior"*/}
            {/*            checked={form.level === "Junior"}*/}
            {/*            onChange={(e) => updateForm({level: e.target.value})}*/}
            {/*        />*/}
            {/*        <label htmlFor="positionJunior" className="form-check-label">Junior</label>*/}
            {/*    </div>*/}
            {/*    <div className="form-check form-check-inline">*/}
            {/*        <input*/}
            {/*            className="form-check-input"*/}
            {/*            type="radio"*/}
            {/*            name="positionOptions"*/}
            {/*            id="positionSenior"*/}
            {/*            value="Senior"*/}
            {/*            checked={form.level === "Senior"}*/}
            {/*            onChange={(e) => updateForm({level: e.target.value})}*/}
            {/*        />*/}
            {/*        <label htmlFor="positionSenior" className="form-check-label">Senior</label>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="form-group">
                <input
                    type="submit"
                    value="Add track"
                    className="btn btn-primary"
                />
            </div>
        </form>
    </div>);
}