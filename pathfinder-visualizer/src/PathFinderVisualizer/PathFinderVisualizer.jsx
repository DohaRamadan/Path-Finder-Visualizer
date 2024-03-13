import React from "react";
import "./PathFinderVisualizer.css"
import Node from "./Node/Node.jsx"


const START_ROW = 5;
const START_COL = 10;
const END_ROW = 5;
const END_COL = 45;

const intializeGrid = () => {
    const grid = [];
    for (let row = 0; row < 15; row++) {
        let currRow = [];
        for (let col = 0; col < 50; col++) {
            const currNode = {
                row: row,
                col: col,
                isStart: row === START_ROW && col === START_COL,
                isFinish: row === END_ROW && col === END_COL,
            };
            currRow.push(currNode);
        }
        grid.push(currRow);
    }
    return grid;
}

class PathFinderVisualizer extends React.Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            mouseIsPressed: false,
        };
    }

    componentDidMount() {
        const grid = intializeGrid();
        this.setState({ grid });
    }


    render() {
        const { grid } = this.state;
        console.log(grid);

        return (
            <>
                <button>
                    Visualize Dijkstra's Algorith
                </button>
                <div className="grid">
                    {
                        grid.map((row, rowIdx) => {
                            return <div>
                                {
                                    row.map((node, nodeIdx) =>
                                        <Node key={nodeIdx}
                                            isStart={node.isStart}
                                            isFinish={node.isFinish}
                                        ></Node>)
                                }
                            </div>
                        })
                    }
                </div>
            </>
        );
    }
}

export default PathFinderVisualizer;