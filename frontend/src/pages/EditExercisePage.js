import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TableHead from "../components/TableHead";

export const EditExercisePage = ({ exercise, setExercise }) => {
  const [name, setName] = useState(exercise.name);
  const [reps, setReps] = useState(exercise.reps);
  const [weight, setWeight] = useState(exercise.weight);
  const [unit, setUnit] = useState(exercise.unit);
  const [date, setDate] = useState(exercise.date);
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

  const editExercise = async () => {
    const response = await fetch(`/exercises/${exercise._id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        reps: reps,
        weight: weight,
        unit: unit,
        date: date,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      alert("Successfully edited exercise!");
    } else {
      const errMessage = await response.json();
      alert(
        `Failed to update exercise. Status ${response.status}. ${errMessage.Error}`
      );
    }
    history.push("/");
  };

  return (
    <>
      <article>
        <h2>Edit your workout diary</h2>
        <p>
          Revise anything that you've recorded before.{" "}
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    required
                  />
                </td>
                <td>
                  <label htmlFor="reps">Repetitions</label>
                  <input
                    type="number"
                    pattern="[0-9]{1}"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    id="reps"
                  />
                </td>
                <td>
                  <label htmlFor="weight">Weight</label>
                  <input
                    type="number"
                    pattern="[0-9]{1}"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    id="weight"
                    required
                  />
                </td>
                <td>
                  <label htmlFor="unit">Units</label>
                  <select
                    onChange={(e) => setUnit(e.target.value)}
                    id="unit"
                    value={unit}
                    required
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
                    min="2022-11-21"
                    pattern="\d{4}-\d{2}-\d{2}"
                    type="date"
                    required
                    value={date}
                    onChange={(e) => validateMinDate(e.target.value)}
                    id="date"
                  />
                </td>
                <td colSpan="2">
                  <label htmlFor="submit">
                    <button onClick={editExercise} id="submit">
                      Save your edits
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
export default EditExercisePage;
