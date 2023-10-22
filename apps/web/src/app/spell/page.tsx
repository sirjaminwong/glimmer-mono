"use client";
import QuizContent from "src/modules/quiz/quiz-content";

const words: {
  word: string;
  explain: string;
}[] = [
  {
    word: "caterpillar",
    explain: "n 毛毛虫",
  },
  {
    word: "glove",
    explain: "n 手套",
  },
  // {
  //   word: "socks",
  //   explain: "n 袜子",
  // },
  // {
  //   word: "scarf",
  //   explain: "n 围巾",
  // },
  // {
  //   word: "sweater",
  //   explain: "n 毛衣",
  // },
  // {
  //   word: "stereotype",
  //   explain: "n 刻板印象",
  // },
];

function SpellPage(): JSX.Element {




  return (
    <QuizContent questions={words} type="spell" />

  );
}

export default SpellPage;
