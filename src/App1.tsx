import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./App1.css";
// import { UnControlled as CodeMirror } from "react-codemirror2";
import { transform } from "@babel/standalone";
import { code } from "./code";

require('codemirror/mode/xml/xml');
require('codemirror/mode/jsx/jsx');
require('codemirror/lib/codemirror')
require('codemirror/mode/javascript/javascript');

const Button = () => {
  return <button>click</button>;
};

function App() {
  let [value, setValue] = useState(code);
  var editor: any;

  useEffect(() => {
    editor = (window as any).CodeMirror.fromTextArea(document.getElementById("code"), {
      lineNumbers: true,
      mode: "jsx",
      theme: 'material',
    })

    editor.on('change', function(instance: any) {
      console.log(editor.getValue())
    })
  })

  const handleClick = () => {
    var target = document.getElementById("code") as HTMLTextAreaElement;
    run(editor.getValue());
  }

  function run(value: string) {
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
  }

  return (
    <div className="App">
      <div className="editor">
        <textarea id="code" defaultValue={code}></textarea>
      </div>
      <button className="run" onClick={handleClick}>run</button>
      <div className="runner" id="container"></div>
    </div>
  );
}

export default App;