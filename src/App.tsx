import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { transform } from "@babel/standalone";
import { code } from "./code";

require('codemirror/mode/xml/xml');
require('codemirror/mode/jsx/jsx');

const Button = () => {
  return <button>click</button>;
};

function App() {
  let [value, setValue] = useState(code);

  const handleClick = () => {
    let res = transform(value, {
      presets: ["es2015", "react"],
      plugins: ["proposal-class-properties"],
    });

    const args = ["React", "ReactDOM", "Button"];
    const argv = [React, ReactDOM, Button];

    args.push(res.code as string);

    try {
      new Function(...args)(...argv);
    } catch (e) {}
  };

  return (
    <div className="App">
      <CodeMirror
        className="editor"
        value={value}
        options={{
          mode: "jsx",
          theme: "material",
          lineNumbers: true,
          autoCursor: true,
          tabSize: 2,
          styleActiveLine: true
        }}
        onChange={(editor, data, value) => {
          console.log(data, value)
          setValue(value);
        }}
      />
      <button className="run" onClick={handleClick}>run</button>
      <div className="runner" id="container"></div>
    </div>
  );
}

export default App;
