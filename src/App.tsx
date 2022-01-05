import React, { CSSProperties, useEffect, useState } from "react";
import "./App.css";
import { code } from "./code";
import { Button, Switch, Popover, Input, Row, Col, Table } from "antd";
import { MinusOutlined, QuestionCircleFilled } from "@ant-design/icons";

require("codemirror/mode/xml/xml");
require("codemirror/mode/jsx/jsx");
require("codemirror/lib/codemirror");
require("codemirror/mode/javascript/javascript");

let outPath = [] as { key: string; value: any }[];

function getType(
  obj = {} as { [index: string]: any },
  depth = 0,
  path = "",
  definedPath = [] as {
    path: string;
    name: string;
    inject: boolean;
    extract: boolean;
  }[]
): any {
  const currentItem = definedPath.find((it) => {
    return it.path === path;
  });

  if (currentItem?.inject && currentItem.name)
    return currentItem.name;

  if (['string', 'number', 'boolean'].find(it => typeof obj === it))
    return typeof obj;

  if (obj === null) return 'null';

  const keys = Object.keys(obj);

  if (Array.isArray(obj)) {
    return `${getType(obj[0], depth + 1, `${path}.0`, definedPath)}[]`;
  }

  const property = [] as { key: string; value: string }[];

  keys.forEach((key) => {
    let value = getType(obj[key], depth + 1, `${path}.${key}`, definedPath) + ";";
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
  const [paths, setPaths] = useState([
    {
      path: ".wife",
      inject: true,
      extract: false,
      name: "Wife",
    },
    {
      path: ".school.city",
      inject: true,
      extract: false,
      name: "My",
    },
    {
      path: ".school",
      extract: true,
      inject: false,
      name: "School",
    },
  ]);

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
    const res = getType(JSON.parse(editor.getValue()), 0, '', paths);
    const outer = outPath
      .map((it) => `interface ${it.key} ${it.value}\n`)
      .join("\n");
    output.setValue(
      `// reference\n${outer} \n// your type \ninterface Model ${res}`
    );
    outPath = [];
  };

  const addHandle = () => {
    setPaths((prev) => [
      ...prev,
      {
        path: ".",
        extract: false,
        inject: false,
        name: "",
      },
    ]);
  };

  const removeHandle = (index: number) => {
    setPaths((prev) => prev.filter((_, i) => index !== i));
  };

  const columns = [
    {
      title: "路径",
      dataIndex: "path",
      key: "path",
      span: 7,
    },
    {
      title: "注入",
      dataIndex: "inject",
      key: "inject",
      span: 4,
    },
    {
      title: "抽离",
      dataIndex: "extract",
      key: "extract",
      span: 4,
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      span: 7,
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      span: 2,
      style: { paddingLeft: 20 } as CSSProperties
    },
  ];

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
            <Button onClick={addHandle}>添加</Button>
          </div>
        </div>

        <Row className="row-header">
          {columns.map((it) => (
            <Col span={it.span} style={it.style}>{it.title}</Col>
          ))}
        </Row>

        {paths.map((it, index) => (
          <Row className="path">
            <Col className="path-name" span={7}>
              <Input value={it.path} />
            </Col>
            <Col className="column" span={4}>
              <Switch defaultChecked={it.inject} />
            </Col>
            <Col className="column" span={4}>
              <Switch defaultChecked={it.extract} />
            </Col>
            <Col className="column" span={7}>
              <Input value={it.name} />
            </Col>
            <Col className="column col-action" span={2}>
              <MinusOutlined onClick={() => removeHandle(index)} style={{ marginLeft: 20, cursor: 'pointer' }} />
            </Col>
          </Row>
        ))}
      </div>
    </div>
  );
}

export default App;
