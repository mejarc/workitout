import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ExerciseList from "../components/ExerciseList";

function HomePage({ setExercise }) {
  // Use the history for updating
  const history = useHistory();

  // Use state to bring in the data
  const [exercises, setExercises] = useState([]);

  // RETRIEVE the list of exercises
  const loadExercises = async () => {
    const response = await fetch("/exercises");
    const exercises = await response.json();
    setExercises(exercises);
  };

  // UPDATE a exercise
  const onEditExercise = async (exercise) => {
    setExercise(exercise);
    history.push("/edit-exercise");
  };

  // DELETE a exercise
  const onDeleteExercise = async (_id) => {
    const response = await fetch(`/exercises/${_id}`, { method: "DELETE" });
    if (response.status === 204) {
      const getResponse = await fetch("/exercises");
      const exercises = await getResponse.json();
      setExercises(exercises);
    } else {
      console.error(
        `Failed to delete exercise with _id = ${_id}, status code = ${response.status}`
      );
    }
  };

  // LOAD the exercises
  useEffect(() => {
    loadExercises();
  }, []);

  // DISPLAY the exercises
  return (
    <>
      <article>
        <h2>Your workout record</h2>
        <p>Add, revise, or delete entries in your Workout Diary.</p>
        <ExerciseList
          exercises={exercises}
          onEdit={onEditExercise}
          onDelete={onDeleteExercise}
        />
      </article>
    </>
  );
}

export default HomePage;
