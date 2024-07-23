import TextEditor from './TextEditor'
import TitleBar from './TitleBar'
import React from 'react';

document.title = "Notebook";

function App() {
  return (
  <div>
    <TitleBar />
    <TextEditor />
  </div>
)}

export default App;
