import React, { useEffect, useState } from "react";
import { Stage, Layer, Line, Circle } from "react-konva";
// import styles from "./BezierCurveEditor.module.css";

type Props = {
  points: Point[];
  setPoints: React.Dispatch<React.SetStateAction<Point[]>>;
};

const BezierCurveEditor: React.FC<Props> = ({ points, setPoints }: Props) => {
  const handleDragMove = (index: number, e: any) => {
    const newPoints = [...points];
    newPoints[index] = { x: e.target.x(), y: e.target.y() };
    setPoints(newPoints);
  };

  const bezierPoints = [
    points[0].x,
    points[0].y,
    points[1].x,
    points[1].y,
    points[2].x,
    points[2].y,
    points[3].x,
    points[3].y,
  ];

  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      //change points according to window size
      setPoints([
        { x: (window.innerWidth / 4) * 3, y: 100 },
        { x: window.innerWidth / 2.5, y: 100 },
        {
          x: (window.innerWidth / 4) * 2,
          y: (window.innerHeight / 4) * 2,
        },
        { x: window.innerWidth / 8, y: window.innerHeight / 2 },
      ]);
    };

    handleResize(); // Run the resize logic initially

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //make useeffect to

  return (
    <Stage
      width={(windowSize.width / 4) * 3.5}
      height={(windowSize.height / 2) * 1.2}
    >
      <Layer>
        <Line points={bezierPoints} stroke="black" strokeWidth={2} bezier />
        {/* Draw dotted lines for handles */}
        <Line
          points={[points[0].x, points[0].y, points[1].x, points[1].y]}
          stroke="gray"
          strokeWidth={1}
          dash={[5, 5]}
        />
        <Line
          points={[points[2].x, points[2].y, points[3].x, points[3].y]}
          stroke="gray"
          strokeWidth={1}
          dash={[5, 5]}
        />
        {/* Draw control points */}
        {points.map(
          (point, index) =>
            index !== 0 &&
            index !== 3 && ( // Only make control points draggable
              <Circle
                key={index}
                x={point.x}
                y={point.y}
                radius={10}
                fill="red"
                draggable
                onDragMove={(e) => handleDragMove(index, e)}
                onMouseEnter={(e) => {
                  const container = e.target.getStage()?.container();
                  if (container) {
                    container.style.cursor = "grab";
                  }
                }}
                onMouseDown={(e) => {
                  const container = e.target.getStage()?.container();
                  if (container) {
                    container.style.cursor = "grabbing";
                  }
                }}
                onMouseLeave={(e) => {
                  const container = e.target.getStage()?.container();
                  if (container) {
                    container.style.cursor = "default";
                  }
                }}
              />
            )
        )}
        {/* Draw fixed end points */}
        <Circle x={points[0].x} y={points[0].y} radius={10} fill="blue" />
        <Circle x={points[3].x} y={points[3].y} radius={10} fill="blue" />
      </Layer>
    </Stage>
  );
};

export default BezierCurveEditor;
