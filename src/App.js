import React, { useState, useEffect, useRef } from "react";
function App() {
  const STARTING_TIME = 15;
  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [istimeRunning, setisTimeRunning] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const textBoxRef = useRef(null);

  function handlechange(e) {
    const { value } = e.target;
    setText(value);
  }
  function calculatewordcount(text) {
    const wordsarr = text.trim().split(" ");
    return wordsarr.filter((word) => word !== "").length;
  }
  function gamestart() {
    setisTimeRunning(true);
    setTimeRemaining(STARTING_TIME);
    setText("");
    textBoxRef.current.disabled = false;
    textBoxRef.current.focus();
  }
  function endgame() {
    setisTimeRunning(false);
    setWordCount(calculatewordcount(text));
  }

  useEffect(() => {
    if (istimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      endgame();
    }
  }, [timeRemaining, istimeRunning]);
  return (
    <div>
      <h1>
        <b>HOW FAST DO YOU TYPE?</b>
      </h1>
      <textarea
        ref={textBoxRef}
        value={text}
        onChange={handlechange}
        disabled={!istimeRunning}
      ></textarea>
      <h3>Time Remaining:{timeRemaining}</h3>
      <button onClick={gamestart} disabled={istimeRunning}>
        START
      </button>
      <h1>Word Count:{wordCount}</h1>
    </div>
  );
}
export default App;
