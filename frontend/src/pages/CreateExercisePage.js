import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TableHead from "../components/TableHead";

export const AddExercisePage = () => {
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState(0);
  const [unit, setUnit] = useState("lbs");
  const [date, setDate] = useState("");
  const history = useHistory();

  const validateMinDate = (dateInput) => {
    const formattedDate = dateInput.toLocaleString("en-US").slice(0, 10);
    if (formattedDate >= "2022-11-21") {
      setDate(formattedDate);
    } else {
      alert("You must set a date after Nov. 21, 2022");
      return;
    }
  };
  const addExercise = async () => {
    const newExercise = { name, reps, weight, unit, date };
    const response = await fetch("/exercises", {
      method: "post",
      body: JSON.stringify(newExercise),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      alert("Successfully added the exercise!");
    } else {
      alert(`Failed to add exercise, status code = ${response.status}`);
    }
    history.push("/");
  };

  return (
    <>
      <article>
        <h2>Add to your workout diary</h2>
        <p>
          Keep a record of your hard work here.{" "}
          <em>Note that all fields must be completed.</em>
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <table id="exercises">
            <TableHead variant="manage" />
            <tbody>
              <tr>
                <td>
                  <label htmlFor="name">Exercise name</label>
                  <input
                    type="text"
                    placeholder="Example: squat"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                  />
                </td>
                <td>
                  <label htmlFor="reps">Repetitions</label>
                  <input
                    pattern="[0-9]{1}"
                    placeholder="0"
                    type="number"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    id="reps"
                  />
                </td>
                <td>
                  <label htmlFor="weight">Weight</label>
                  <input
                    type="number"
                    value={weight}
                    pattern="[0-9]{1}"
                    placeholder="0"
                    onChange={(e) => setWeight(e.target.value)}
                    id="weight"
                  />
                </td>
                <td>
                  <label htmlFor="unit">Units</label>
                  <select
                    onChange={(e) => setUnit(e.target.value)}
                    id="unit"
                    value={unit}
                  >
                    <option value="kg">kg</option>
                    <option value="lb">lb</option>
                    <option value="stone">stone</option>
                    <option value="km">km</option>
                    <option value="miles">miles</option>
                  </select>
                </td>
                <td>
                  <label htmlFor="date">Date of exercise</label>
                  <input
                    type="date"
                    required
                    max={new Date().toLocaleString().slice(0, 10)}
                    min="2022-11-21"
                    pattern="\d{4}-\d{2}-\d{2}"
                    value={date}
                    onChange={(e) => validateMinDate(e.target.value)}
                    id="date"
                  />
                </td>
                <td>
                  <label htmlFor="submit">
                    <button type="submit" onClick={addExercise} id="submit">
                      Add
                    </button>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </article>
    </>
  );
};

export default AddExercisePage;
