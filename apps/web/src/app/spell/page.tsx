"use client";
import { useCallback, useMemo, useState } from "react";
import WordChecker from "../../components/word-checker";
import StatisticsBar from "./statistics-bar";

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
  {
    word: "socks",
    explain: "n 袜子",
  },
  {
    word: "scarf",
    explain: "n 围巾",
  },
  {
    word: "sweater",
    explain: "n 毛衣",
  },
  {
    word: "stereotype",
    explain: "n 刻板印象",
  },
];

function SpellPage(): JSX.Element {
  const [wordIndex, setWordIndex] = useState(0);

  const handleSpellSuccess = useCallback(() => {
    setWordIndex((i) => {
      return i + 1;
    });
  }, []);

  const word = useMemo(() => {
    return words[wordIndex] as
      | {
          word: string;
          explain: string;
          //TODO: why need this?
        }
      | undefined;
  }, [wordIndex]);

  const percentage = `${((wordIndex / words.length) * 100).toFixed(2)}%`;

  return (
    <div className="flex flex-col items-center">
      {word ? (
        <WordChecker
          explain={word.explain}
          key={word.word}
          onSuccess={handleSpellSuccess}
          word={word.word}
        />
      ) : null}
      <div className="flex items-center">
        <div className="w-96 my-10 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{
              width: percentage,
            }}
          />
        </div>
        <span className="text-white ml-2">{percentage}</span>
      </div>

      <StatisticsBar />
      {wordIndex === words.length ? <div>Good Job</div> : null}
    </div>
  );
}

export default SpellPage;
