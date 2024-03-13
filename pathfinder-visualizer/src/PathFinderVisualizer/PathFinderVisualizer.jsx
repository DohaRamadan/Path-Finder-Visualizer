import React from "react";
import "./PathFinderVisualizer.css"
import Node from "./Node/Node.jsx"


const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const intializeGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        let currRow = [];
        for (let col = 0; col < 50; col++) {
            const currNode =  {
                col,
                row,
                isStart: row === START_NODE_ROW && col === START_NODE_COL,
                isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
                distance: Infinity,
                isVisited: false,
                isWall: false,
                previousNode: null,
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