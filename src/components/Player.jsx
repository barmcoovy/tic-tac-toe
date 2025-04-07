import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onNameChange,
}) {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleClicking() {
    setIsEditing(!isEditing);
  }

  function handleEditing(event) {
    setName(event.target.value);
  }

  let playerName = <span className="player-name"> {name} </span>;
  if (isEditing) {
    playerName = <input type="text" value={name} onChange={handleEditing} />;
  }

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {playerName}
        <span className="player-symbol"> {symbol} </span>
      </span>
      <button onClick={handleClicking}>
        {isEditing ? "Zapisz" : "Edytuj"}
      </button>
    </li>
  );
}
