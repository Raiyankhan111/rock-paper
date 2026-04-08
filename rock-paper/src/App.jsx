import { useState } from "react";

export default function App() {
  const emojis = {
    Rock: "🪨",
    Paper: "📄",
    Scissor: "✂️",
  };

  const [userMove, setUserMove] = useState("");
  const [computerMove, setComputerMove] = useState("");
  const [winnerMessage, setWinnerMessage] = useState("Choose a move to start the game!");
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState(0);

  function generateComputerMove() {
    let random = Math.random();

    if (random < 0.33) {
      return "Rock";
    } else if (random < 0.67) {
      return "Paper";
    } else {
      return "Scissor";
    }
  }

  function decideWinner(player, computer) {
    if (player === computer) {
      return "It's a Draw!";
    }

    if (
      (player === "Rock" && computer === "Scissor") ||
      (player === "Paper" && computer === "Rock") ||
      (player === "Scissor" && computer === "Paper")
    ) 
    {
      return "You Win!";
    }

    return "Computer Wins!";
  }

  function handleClick(move) {
    const compMove = generateComputerMove();
    const result = decideWinner(move, compMove);

    setUserMove(move);
    setComputerMove(compMove);
    setWinnerMessage(result);
    setRoundsPlayed(roundsPlayed + 1);

    setHistory([
      ...history,
      {
        round: roundsPlayed + 1,
        user: move,
        computer: compMove,
        result: result,
      },
    ]);

    if (result === "You Win!") {
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  }

  function resetGame() {
    setUserMove("");
    setComputerMove("");
    setWinnerMessage("Choose a move to start the game!");
    setRoundsPlayed(0);
    setHistory([]);
    setStreak(0);
  }

  return (
    <div >
      <h1>Rock Paper Scissor</h1>

      <h2>
        Computer {computerMove ? emojis[computerMove] : "❔"} :{" "}
        {userMove ? emojis[userMove] : "❔"} You
      </h2>

      <h3>{winnerMessage}</h3>

      <p>Rounds Played: {roundsPlayed}</p>
      <p>Winning Streak: {streak}</p>

      <button onClick={() => handleClick("Rock")}>🪨 Rock</button>
      <button onClick={() => handleClick("Paper")}>
        📄 Paper
      </button>
      <button onClick={() => handleClick("Scissor")}>✂️ Scissor</button>

      <div>
        <button onClick={resetGame}>Reset Game</button>
      </div>

      <div>
        <h2>Move History</h2>
        {history.length === 0 ? (
          <p>No rounds played yet.</p>
        ) : (
          <ul>
            {history.map((item) => (
              <li>
                Round {item.round}: You {emojis[item.user]} vs Computer{" "}
                {emojis[item.computer]} — {item.result}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}