import { useContext, useState } from "react";
import { BoardContext } from "./App";
import produce from "immer";

let moves = 0;
function TicTacToe() {
  let { board, setBoard } = useContext(BoardContext);
  let [player, setPlayer] = useState(0);
  
  let checkWinner = (board) => {
    const lines = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [[a, b], [c, d], [e, f]] = lines[i];
      if (
        board[a][b] === board[c][d] &&
        board[a][b] === board[e][f] &&
        board[a][b] != -1
      ) {
        return player;
      }
    }
    return null;
  };
  return (
    <div
      style={{
        background: "#0c0e61",
        display: "flex",
        width: "100vw",
        height: "120vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h2
          style={{
            color: "cyan",
            borderBottom: "3px dotted cyan",
          }}
        >
          {" "}
          Tic-Tac-Toe
        </h2>
      </div>
      <div>
        <h5
          style={{
            color: "cyan",
          }}
        >
          Current Player: {player == 0 ? "First" : "Second"}
        </h5>
      </div>
      {board.map(function (row, rowIndex) {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {row.map(function (item, colIndex) {
              return (
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    border: "2px solid cyan",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={function () {
                    const updated = produce(board, (draftState) => {
                      if (draftState[rowIndex][colIndex] == -1) {
                        draftState[rowIndex][colIndex] = player;
                      }
                    });
                    let answer = checkWinner(board);
                    moves++;
                    if (answer != null || moves == 9) {
                      if(moves == 9 && answer == null) {
                        window.alert(
                          "Unfortunately the game is Tied. Try once more ! :)"
                        );
                      }else{
                        window.alert(
                          "Winner is " + (answer == 1 ? "Second" : "First")
                        );
                      }
                      window.location.reload();
                    }
                    setBoard(updated);
                    setPlayer(player == 0 ? 1 : 0);
                  }}
                >
                  <p
                    style={{
                      color: "cyan",
                    }}
                  >
                    {item == -1 ? " " : item == 1 ? "X" : "0"}
                  </p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default TicTacToe;
