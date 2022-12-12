import "dotenv/config";
import express from "express";
import * as exercises from "./model.mjs";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

// CREATE controller ******************************************
app.post("/exercises", (req, res) => {
  exercises
    .createExercise(
      req.body.name,
      req.body.reps,
      req.body.weight,
      req.body.unit,
      req.body.date
    )
    .then((exercise) => {
      res.status(201).json(exercise);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        error: "Could not add this exercise",
      });
    });
});

// RETRIEVE controller ****************************************************
// GET exercises by ID
app.get("/exercises/:_id", (req, res) => {
  const exerciseId = req.params._id;
  exercises
    .findExerciseById(exerciseId)
    .then((exercise) => {
      if (exercise !== null) {
        res.status(200).json(exercise);
      } else {
        res.status(404).json({ Error: "Exercise not found" });
      }
    })
    .catch((error) => {
      res.status(400).json({ Error: "Request to retrieve exercise failed" });
    });
});

app.get("/exercises", (req, res) => {
  let filter = {};

  exercises
    .findExercises(filter, "", 0)
    .then((exercises) => {
      if (exercises !== null) {
        res.status(200).json(exercises);
      } else {
        res.status(400).json({ Error: "Request to retrieve exercises failed" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send({ Error: "Request to retrieve exercises failed" });
    });
});

// DELETE Controller ******************************
app.delete("/exercises/:_id", (req, res) => {
  exercises
    .deleteById(req.params._id)
    .then((deletedCount) => {
      if (deletedCount === 1) {
        res.status(204).send();
      } else {
        res.status(404).json({ Error: "This exercise not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send({ error: "Request to delete this exercise failed" });
    });
});

// UPDATE controller ************************************
app.put("/exercises/:_id", (req, res) => {
  exercises
    .replaceExercise(
      req.params._id,
      req.body.name,
      req.body.reps,
      req.body.weight,
      req.body.unit,
      req.body.date
    )

    .then((numUpdated) => {
      if (numUpdated === 1) {
        res.status(200).json({
          _id: req.params._id,
          name: req.body.name,
          reps: req.body.reps,
          weight: req.body.weight,
          unit: req.body.unit,
          date: req.body.date,
        });
      } else {
        res
          .status(400)
          .json({ Error: "Request to update this exercise failed" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ Error: "Request to update this exercise failed" });
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
