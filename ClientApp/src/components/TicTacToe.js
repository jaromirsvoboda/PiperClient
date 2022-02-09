import React, { useReducer } from 'react';
import './TicTacToe.css';

// const CELL_WIDTH = 50;

function reducer(gameState, action) {
    switch (action.type) {
        case 'turn':
            // gameState[action.payload.row][action.payload.column] = action.payload.player;
            // gameState = [...Array(3)].map(_ => [...Array(3)].map(_ => 'x'));
            gameState.board[action.payload.row][action.payload.column] = action.payload.player
            return { ...gameState, board: gameState.board };
        default:
            break;
    }
}

function getBlankGameState(dimension) {
    return { board: [...Array(dimension)].map(_ => [...Array(dimension)].map(_ => '')) };
}

function getPlayerOnTurn(gameBoard) {
    const emptyCellCount = gameBoard.reduce(
        (sumAcrossRows, row) => sumAcrossRows + row.reduce((sumInRow, cell) => cell === '' ? sumInRow + 1 : sumInRow, 0),
        0
    );

    return emptyCellCount % 2 === 0 ? 'x' : 'o';
}

export function TicTacToe(props) {
    const dimension = props.dimension;
    const [gameState, dispatch] = useReducer(reducer, getBlankGameState(dimension));

    return (
        <>
            {/* <img src='/images/cross.svg' width=cellWidth></img> */}
            <div> TicTacToe maybe someday, with dimension {dimension}</div>

            {gameState.board.map((row, rowIndex) =>
                <div className='row'> {
                    row.map((cell, cellIndex) => {
                        const onClickHandler = () => {
                            dispatch({
                                type: 'turn',
                                payload: {
                                    row: rowIndex,
                                    column: cellIndex,
                                    player: getPlayerOnTurn(gameState.board)
                                }
                            });
                        }

                        if (cell === "x") {
                            return <div className='cell' onClick={onClickHandler}>
                                <img src='/images/cross.svg' alt='cross' />
                            </div>;
                        }
                        if (cell === 'o') {
                            return <div className='cell' onClick={onClickHandler}>
                                <img src='/images/circle.svg' alt='circle' />
                            </div>;
                        }
                        return <div className='cell emptyCell' onClick={onClickHandler}>
                            {/* <img src='/images/circle.svg' width={cellWidth}/> */}
                        </div>;
                    })
                }
                </div>
            )}
        </>
    );
}