import React, { useEffect } from "react";
import "./App1.css";
import { code } from "./code";
import { Button, Switch, Popover, Input } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";

require("codemirror/mode/xml/xml");
require("codemirror/mode/jsx/jsx");
require("codemirror/lib/codemirror");
require("codemirror/mode/javascript/javascript");

const paths = [
  {
    path: ".wife",
    inject: true,
    name: "Wife",
  },
  {
    path: ".school.city",
    inject: true,
    name: "My",
  },
  {
    path: ".school",
    extract: true,
    name: "School",
  },
];

let outPath = [] as { key: string; value: any }[];

function getType(
  obj = {} as { [index: string]: any },
  depth = 0,
  path = ""
): any {
  const currentItem = paths.find((it) => {
    return it.path === path;
  });

  if (currentItem?.inject && currentItem.name) {
    // 注入外部类型
    return currentItem.name;
  }

  if (typeof obj === "string" || typeof obj === "number") {
    return typeof obj;
  }

  const keys = Object.keys(obj);

  if (Array.isArray(obj)) {
    return `${getType(obj[0], depth + 1, `${path}.0`)}[]`;
  }

  const property = [] as { key: string; value: string }[];

  keys.forEach((key) => {
    let value = getType(obj[key], depth + 1, `${path}.${key}`) + ";";
    property.push({ key, value });
  });

  const beforeSpaces = new Array((depth + 1) * 4).fill(undefined).join(" ");
  const afterSpaces = new Array(depth * 4).fill(undefined).join(" ");

  const typeStr = `{\n${property
    .map((it) => `${beforeSpaces}${it.key}: ${it.value}`)
    .join("\n")}\n${afterSpaces}}`;

  if (currentItem?.extract && currentItem.name) {
    // 提取子路径作为独立类型
    outPath.push({
      key: currentItem.name,
      value: typeStr,
    });
    return currentItem.name;
  }

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
    const outer = outPath
      .map((it) => `interface ${it.key} ${it.value}\n`)
      .join("\n");
    output.setValue(
      `// reference\n${outer} \n// your type \ninterface Struct ${res}`
    );
    outPath = [];
  };

  return (
    <div className="App">
      <div className="main">
        <div className="editor mirror code-mirror">
          <textarea id="code">{code}</textarea>
        </div>
        <Button type="primary" className="run" onClick={handleClick}>
          生成类型
        </Button>
        <div className="editor mirror output-code">
          <textarea id="output"></textarea>
        </div>
      </div>
      <div className="runner" id="container">
        <div className="header">
          <div className="title">
            <Popover
              content={
                <div>
                  <div>inject: 注入外部类型</div>
                  <div>extract: 提取子路径作为独立类型</div>
                </div>
              }
              trigger="hover"
            >
              <span>自定义 PATH</span>
              <QuestionCircleFilled style={{ marginLeft: 10 }} />
            </Popover>
            <Button>添加</Button>
          </div>
        </div>

        {paths.map((it) => (
          <div className="path">
            <div className="path-name">
              <Input value={it.path} />
            </div>
            <div>
              <span>inject</span>
              <Switch defaultChecked={it.inject} />
            </div>
            <div>
              <span>extract</span>
              <Switch defaultChecked={it.extract} />
            </div>
            <Input value={it.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
