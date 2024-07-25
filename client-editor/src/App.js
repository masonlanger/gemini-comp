import TextEditor from './TextEditor'
import TitleBar from './TitleBar'
import FocusBar from './FocusBar'
import React from 'react';

document.title = "Notebook";

function App() {
  return (
  <div>
    <TitleBar />
    <FocusBar />
    <TextEditor />
  </div>
)}

export default App;
