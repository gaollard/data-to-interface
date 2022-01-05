import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./App1.css";
import { transform } from "@babel/standalone";
import { code } from "./code";
// import { Button } from 'antd';

require("codemirror/mode/xml/xml");
require("codemirror/mode/jsx/jsx");
require("codemirror/lib/codemirror");
require("codemirror/mode/javascript/javascript");

const Button = (
  <button></button>
)

function getType(obj = {} as { [index: string]: any }, depth = 0): string {
  if (typeof obj === "string" || typeof obj === "number") {
    return typeof obj;
  }

  const keys = Object.keys(obj);

  if (Array.isArray(obj)) {
    return `${getType(obj[0])}[]`;
  }

  const property = [] as { key: string; value: string }[];

  keys.forEach((key) => {
    property.push({
      key,
      value: getType(obj[key], depth + 1) + ";",
    });
  });

  const beforeSpaces = new Array((depth + 1) * 4).fill(undefined).join(" ");
  const afterSpaces = new Array(depth * 4).fill(undefined).join(" ");

  const typeStr = `{\n${property
    .map((it) => `${beforeSpaces}${it.key}: ${it.value}`)
    .join("\n")}\n${afterSpaces}}`;

  return typeStr;
}

function App() {
  var editor: any;
  var output: any;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    editor = (window as any).CodeMirror.fromTextArea(
      document.getElementById("code"),
      {
        lineNumbers: true,
        mode: "jsx",
        theme: "material",
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    output = (window as any).CodeMirror.fromTextArea(
      document.getElementById("output"),
      {
        lineNumbers: true,
        mode: "jsx",
        theme: "material",
      }
    );

    editor.on("change", function (instance: any) {
      console.log(editor.getValue());
      console.log(output.getValue());
    });
  });

  const handleClick = () => {
    const res = getType(JSON.parse(editor.getValue()));
    console.log(res);
    output.setValue(res);
  };

  function run(value: string) {
    let res = transform(value, {
      presets: ["es2015", "react"],
      plugins: ["proposal-class-properties"],
    });

    const args = ["React", "ReactDOM", "Button"];
    const argv = [React, ReactDOM, Button];
    args.push(res.code as string);

    try {
      // eslint-disable-next-line no-new-func
      new Function(...args)(...argv);
    } catch (e) {}
  }

  return (
    <div className="App">
      <div className="main">
        <div className="editor mirror code-mirror">
          <textarea id="code">{code}</textarea>
        </div>
        <Button className="run" onClick={handleClick}>
          生成
        </Button>
        <div className="editor mirror output-code">
          <textarea id="output"></textarea>
        </div>
      </div>
      <div className="runner" id="container"></div>
    </div>
  );
}

export default App;