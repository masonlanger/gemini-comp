import TextEditor from './TextEditor'
import TitleBar from './TitleBar'
import FocusBar from './FocusBar'
import React from 'react';

document.title = "Notebook";

let lastActionTaken = new Date().getTime();
function checkLastAction() {
  let now = new Date().getTime();
  if (now - lastActionTaken > 600000) window.location.reload();
  else lastActionTaken = now;
}

window.addEventListener("mousemove", checkLastAction);
window.addEventListener("touchstart", checkLastAction);
window.addEventListener("keydown", checkLastAction);

function App() {
  return (
  <div>
    <TitleBar />
    <FocusBar />
    <TextEditor />
  </div>
)}

export default App;
