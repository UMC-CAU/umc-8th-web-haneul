import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 1. ESLint 기본 추천 규칙 (JavaScript)
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js },
    rules: {
      // JSX 사용할 때 React import 안 해도 되도록 설정
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect", // 자동으로 React 버전 감지
      },
    },
    extends: ["js/recommended"], // ESLint 코어 추천 규칙
    /*
      ✔️ 주요 규칙:
      - no-unused-vars: 사용되지 않은 변수 경고
        예시) const a = 10; // 선언만 하고 사용하지 않으면 경고
      - eqeqeq: == 대신 === 사용 강제
        예시) if (a == b) {} // 허용 ❌, if (a === b) {} // 허용 ⭕
      - no-undef: 정의되지 않은 변수 사용 금지
        예시) console.log(undeclaredVar); // 허용 ❌
    */
  },

  // 2. 브라우저 전역 변수 설정
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
    /*
      window, document, navigator 등 브라우저 전역 변수 자동 인식
      예시) window.alert() // 허용 ⭕
      예시) console.log(process.env) // Node.js 전역은 허용 ❌
    */
  },

  // 3. TypeScript 추천 규칙
  tseslint.configs.recommended,
  /*
    ✔️ 주요 규칙:
    - @typescript-eslint/no-explicit-any: any 타입 사용 금지
      예시) function foo(a: any) {} // 허용 ❌
    - @typescript-eslint/no-unused-vars: 사용되지 않은 타입 파라미터 경고
      예시) type Foo<T> = {} // T가 사용되지 않으면 경고
    - @typescript-eslint/strict-boolean-expressions: 불린 외 타입을 조건문에서 사용 금지
      예시) if (user.name) {} // 허용 ❌ (string은 falsy 체크 안됨)
  */

  // 4. React 추천 규칙
  {
    ...pluginReact.configs.flat.recommended,
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      // JSX 사용할 때 React import 안 해도 되도록 설정
      "react/react-in-jsx-scope": "off",
    },
  },
  /*
    ✔️ 주요 규칙:
    - react/jsx-uses-react: React import 없이 JSX 사용 금지
      예시) function Comp() { return <div /> } // 허용 ❌ (React import 필요)
    - react/jsx-uses-vars: 사용되지 않은 JSX 컴포넌트 경고
      예시) const MyComp = () => <div />; // 선언만 하고 사용 안하면 경고
    - react/react-in-jsx-scope: React 17+ 자동 런타임 설정
      예시) 'react' import 없이 JSX 사용 가능 (신규 프로젝트 기본 설정)
    - react/prop-types: PropTypes 사용 검사
      예시) function Comp({ text }) { ... } // PropTypes 정의 없으면 경고
  */
]);

// 🔄 전체 설정 흐름:
// 1. JS 기본 규칙 → 2. 브라우저 환경 → 3. TS 규칙 추가 → 4. React 규칙 추가
// 💡 규칙 충돌 시 나중에 로드된 설정이 우선함 (React > TS > JS)