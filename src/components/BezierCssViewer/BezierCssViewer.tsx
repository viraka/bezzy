import styles from "./BezierCssViewer.module.css";

type Props = {
  points: Point[];
};

const BezierCssViewer = ({ points }: Props) => {
  const p1 = points[1];
  const p2 = points[2];

  const normalizePoint = (point: Point, maxPoint: Point) => {
    return {
      x: point.x / maxPoint.y,
      y: point.y / maxPoint.y,
    };
  };

  const p1Normalized = normalizePoint(p1, p2);
  const p2Normalized = normalizePoint(p2, p2);

  const curveValue = `cubic-bezier(${p1Normalized.x}, ${p1Normalized.y}, ${p2Normalized.x}, ${p2Normalized.y})`;
  // ...

  return (
    <>
      <div className={styles.container}>
        <h1>Bezier CSS Viewer</h1>
        <div className={styles.viewer}>Cubic Bezier Curve: {curveValue}</div>
      </div>
    </>
  );
};

export default BezierCssViewer;
