import { React } from "react";

function TableHead({ variant }) {
  return (
    <>
      <caption>Workout Diary</caption>
      <thead>
        <tr>
          <th>Exercise</th>
          <th>Repetitions</th>
          <th>Weight</th>
          <th>Units</th>
          <th>Date</th>
          {variant !== "manage" && (
            <>
              <th>Edit</th>
              <th>Delete</th>
            </>
          )}
        </tr>
      </thead>
    </>
  );
}
export default TableHead;
