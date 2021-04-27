import React, { useState } from "react";
import TicTacToe from "./TicTacToe";
import { createBoard } from "./util/boardUtil";

let BoardContext = React.createContext();
function App() {
  let use = createBoard();
  let [board, setBoard] = useState(use);

  return (
    <BoardContext.Provider value={{ board, setBoard }}>
      <TicTacToe />
    </BoardContext.Provider>
  );
}

export { App, BoardContext };
