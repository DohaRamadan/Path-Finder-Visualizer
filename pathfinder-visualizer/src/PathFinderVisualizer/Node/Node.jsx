import React from "react";
import "./Node.css";

class Node extends React.Component {
  render() {
    const { col, row, isFinish, isStart, isWall, onClick } = this.props;
    const extraClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : "";

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onClick={() => onClick(row, col)}
      ></div>
    );
  }
}

export default Node;
