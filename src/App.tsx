import { useState } from "react";
import "./App.css";
import BezierCurveEditor from "./components/BezierCurve/BezierCurveEditor";
import BezierCssViewer from "./components/BezierCssViewer/BezierCssViewer";
type Point = { x: number; y: number };
function App() {
  const [points, setPoints] = useState<Point[]>([
    { x: 100, y: 500 }, //fixed start point
    { x: 300, y: 500 },
    { x: 300, y: 100 },
    { x: 500, y: 100 }, // fixed end point
  ]);
  return (
    <>
      <div>
        <h1>Bézier Curve Generator</h1>

        <BezierCurveEditor points={points} setPoints={setPoints} />
        <BezierCssViewer points={points} />
      </div>
    </>
  );
}

export default App;
