// Import dependencies
import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Import Components, styles, media
import "./App.css";
import Nav from "./components/Nav";

// Import Pages
import CreateExercisePage from "./pages/CreateExercisePage";
import EditExercisePage from "./pages/EditExercisePage";
import HomePage from "./pages/HomePage";

// Define the function that renders the content in routes using State.
function App() {
  const [exercise, setExercise] = useState([]);

  return (
    <>
      <Router>
        <header>
          <h1>Work It Out</h1>
          <p>It's time to work it out. Let us help motivate you.</p>
        </header>
        <Nav />

        <main>
          <Route path="/" exact>
            <HomePage setExercise={setExercise} />
          </Route>

          <Route path="/create-exercise">
            <CreateExercisePage />
          </Route>

          <Route path="/edit-exercise">
            <EditExercisePage exercise={exercise} />
          </Route>
        </main>

        <footer>
          <p>&copy; 2022 Melanie Archer (archemel)</p>
        </footer>
      </Router>
    </>
  );
}

export default App;
