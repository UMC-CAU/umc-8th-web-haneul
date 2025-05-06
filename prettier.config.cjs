/** @type {import("prettier").Config} */
module.exports = {
  // 객체 리터럴 중괄호 내부에 공백 추가 여부
  // true: { foo: bar }, false: {foo: bar}
  bracketSpacing: true,

  // 화살표 함수가 매개변수 하나일 때 괄호 사용 여부
  // "always": (x) => x, "avoid": x => x
  arrowParens: 'always',

  // 줄 바꿈 기준 길이 (코드 줄이 이 길이를 넘으면 자동 개행)
  printWidth: 100,

  // 탭 대신 공백 사용
  useTabs: false,

  // 들여쓰기 너비
  tabWidth: 2,

  // 세미콜론 사용 여부
  semi: true, // true: 문장 끝에 세미콜론 붙임; false: 생략

  // 문자열에 작은따옴표 사용
  singleQuote: true, // true: '문자열', false: "문자열"

  // 객체 속성에 따옴표를 항상 붙일지 여부
  quoteProps: 'as-needed', // "consistent" 또는 "preserve" 등도 가능

  // JSX에서 따옴표를 사용할 때 작은따옴표 사용 여부
  jsxSingleQuote: false,

  // JSX에서 닫는 태그의 >를 다음 줄로 내릴지 여부
  jsxBracketSameLine: false,

  // 여러 줄 객체나 배열에서 마지막 요소 뒤에 쉼표 추가
  trailingComma: 'es5', // "none" | "es5" | "all"

  // HTML 태그의 속성 줄바꿈 스타일 설정
  proseWrap: 'preserve',

  // 코드 맨 위에 형식 지정 주석 필요 여부
  requirePragma: false,

  // Tailwind CSS 클래스를 자동으로 정렬해주는 플러그인
  plugins: ['prettier-plugin-tailwindcss'],

  // // Tailwind CSS 클래스 정렬 기준 지정 (선택 사항)
  // tailwindConfig: "./tailwind.config.js",
};
