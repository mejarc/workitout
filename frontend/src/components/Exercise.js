import React from "react";
import { BiTrashAlt, BiEditAlt } from "react-icons/bi";

function Exercise({ exercise, onEdit, onDelete }) {
  return (
    <tr>
      <td>{exercise.name}</td>
      <td>{exercise.reps}</td>
      <td>{exercise.weight}</td>
      <td>{exercise.unit}</td>
      <td>{exercise.date.toLocaleString("en-US").slice(0, 10)}</td>

      <td>
        <BiEditAlt title="Edit" onClick={() => onEdit(exercise)} />
      </td>
      <td>
        <BiTrashAlt title="Delete" onClick={() => onDelete(exercise._id)} />
      </td>
    </tr>
  );
}

export default Exercise;
