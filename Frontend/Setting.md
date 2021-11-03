# Setting

```bash
# 라이브러리 설치
$ npm install
# 실행
$ npm start
```



- vscode extension 설치
  - Prettier - Code formatter (enable workspace 설정)
  - ESLint

- settings.json 설정 : js 코드 자동 정렬

```json
    "[javascript]": {
        //default formatter
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true
    },
    "terminal.integrated.defaultProfile.windows": "Git Bash",
    "editor.formatOnSave": true,
```



- snippets
  - `ctrl + shift + F11` -> configure user snippets ->  javascriptreact.json
  - jsx파일에서 fc + enter로 함수형 컴포넌트 기본틀 만들기

```json
"": {
  "prefix": "fc",
  "body": [
    "import React from 'react';",
    "",
    "function ${TM_FILENAME_BASE}() {",
    "  return (",
    "    <div>",
    "      <p>${TM_FILENAME_BASE}</p>",
    "    </div>",
    "  );",
    "}",
    "",
    "export default ${TM_FILENAME_BASE};",
    ""
  ],
  "description": ""
}
```



활용 라이브러리

- create-react-app, react-router, [styled-components](https://styled-components.com/), [material-ui](https://mui.com/), axios
- material-ui-dropzone

시각화

- chart.js

