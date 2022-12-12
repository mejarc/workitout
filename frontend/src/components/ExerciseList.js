import React from "react";
import { Link } from "react-router-dom";
import Exercise from "./Exercise";
import TableHead from "./TableHead";

function ExerciseList({ exercises, onDelete, onEdit }) {
  return (
    <>
      <table id="exercises">
        <TableHead />
        <tbody>
          {exercises.map((exercise, i) => (
            <Exercise
              exercise={exercise}
              key={i}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
      <Link to="/create-exercise">Add exercise</Link>
    </>
  );
}

export default ExerciseList;
