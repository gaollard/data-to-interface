(this["webpackJsonponline-code"]=this["webpackJsonponline-code"]||[]).push([[0],{110:function(e,n,t){},182:function(e,n,t){"use strict";t.r(n);var c=t(0),a=t(14),r=t.n(a),i=(t(110),t(102)),o=t(188),s=t(186),l=t(189),d=t(190),j=t(5);t(67),t(112),t(44),t(68);var u=[{path:".wife",inject:!0,name:"Wife"},{path:".school.city",inject:!0,name:"My"},{path:".school",extract:!0,name:"School"}],h=[];function m(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",c=u.find((function(e){return e.path===t}));if((null===c||void 0===c?void 0:c.inject)&&c.name)return c.name;if("string"===typeof e||"number"===typeof e)return typeof e;var a=Object.keys(e);if(Array.isArray(e))return"".concat(m(e[0],n+1,"".concat(t,".0")),"[]");var r=[];a.forEach((function(c){var a=m(e[c],n+1,"".concat(t,".").concat(c))+";";r.push({key:c,value:a})}));var i=new Array(4*(n+1)).fill(void 0).join(" "),o=new Array(4*n).fill(void 0).join(" "),s="{\n".concat(r.map((function(e){return"".concat(i).concat(e.key,": ").concat(e.value)})).join("\n"),"\n").concat(o,"}");return(null===c||void 0===c?void 0:c.extract)&&c.name?(h.push({key:c.name,value:s}),c.name):s}var v=function(){var e,n;return Object(c.useEffect)((function(){e=window.CodeMirror.fromTextArea(document.getElementById("code"),{lineNumbers:!0,mode:"jsx",theme:"material"}),n=window.CodeMirror.fromTextArea(document.getElementById("output"),{lineNumbers:!0,mode:"jsx",theme:"material"}),e.on("change",(function(t){console.log(e.getValue()),console.log(n.getValue())}))})),Object(j.jsxs)("div",{className:"App",children:[Object(j.jsxs)("div",{className:"main",children:[Object(j.jsx)("div",{className:"editor mirror code-mirror",children:Object(j.jsx)("textarea",{id:"code",children:'{\n  "name": "frank",\n  "skill": [\n    "Java",\n    "Javascript"\n  ],\n  "mother": {\n    "name": "tony",\n    "school": {\n      "name": "ZZU"\n    }\n  },\n  "wife": {\n    "name": "tony"\n  },\n  "school": {\n    "city": "\u90d1\u5dde"\n  }\n}'})}),Object(j.jsx)(i.a,{type:"primary",className:"run",onClick:function(){var t=m(JSON.parse(e.getValue())),c=h.map((function(e){return"interface ".concat(e.key," ").concat(e.value,"\n")})).join("\n");n.setValue("// reference\n".concat(c," \n// your type \ninterface Struct ").concat(t)),h=[]},children:"\u751f\u6210\u7c7b\u578b"}),Object(j.jsx)("div",{className:"editor mirror output-code",children:Object(j.jsx)("textarea",{id:"output"})})]}),Object(j.jsxs)("div",{className:"runner",id:"container",children:[Object(j.jsx)("div",{className:"header",children:Object(j.jsxs)("div",{className:"title",children:[Object(j.jsxs)(o.a,{content:Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{children:"inject: \u6ce8\u5165\u5916\u90e8\u7c7b\u578b"}),Object(j.jsx)("div",{children:"extract: \u63d0\u53d6\u5b50\u8def\u5f84\u4f5c\u4e3a\u72ec\u7acb\u7c7b\u578b"})]}),trigger:"hover",children:[Object(j.jsx)("span",{children:"\u81ea\u5b9a\u4e49 PATH"}),Object(j.jsx)(d.a,{style:{marginLeft:10}})]}),Object(j.jsx)(i.a,{children:"\u6dfb\u52a0"})]})}),u.map((function(e){return Object(j.jsxs)("div",{className:"path",children:[Object(j.jsx)("div",{className:"path-name",children:Object(j.jsx)(s.a,{value:e.path})}),Object(j.jsxs)("div",{children:[Object(j.jsx)("span",{children:"inject"}),Object(j.jsx)(l.a,{defaultChecked:e.inject})]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("span",{children:"extract"}),Object(j.jsx)(l.a,{defaultChecked:e.extract})]}),Object(j.jsx)(s.a,{value:e.name})]})}))]})]})},f=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,191)).then((function(n){var t=n.getCLS,c=n.getFID,a=n.getFCP,r=n.getLCP,i=n.getTTFB;t(e),c(e),a(e),r(e),i(e)}))};r.a.render(Object(j.jsx)(v,{}),document.getElementById("root")),f()}},[[182,1,2]]]);
//# sourceMappingURL=main.fa45ccb2.chunk.js.map