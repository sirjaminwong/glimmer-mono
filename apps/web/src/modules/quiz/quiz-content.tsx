"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Progress from "src/components/progress-tracker";
import StatisticsBar from "src/app/spell/statistics-bar";
import StatisticsPanel from "src/app/spell/statistics-panel";
import WordQuiz from "../../components/word-spell";

interface QuizContentProps {
  type: "spell" | "course";
  questions: {
    word: string;
    explain: string;
  }[];
}

function QuizContent({ questions }: QuizContentProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [time, setTime] = useState(0);

  const [wrongWords, setWrongWords] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
    if (questionIndex === questions.length) {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [questionIndex, questions]);

  const handleSpellSuccess = useCallback(() => {
    setQuestionIndex((i) => {
      return i + 1;
    });
  }, []);

  const handleWrongSpell = useCallback((word: string) => {
    setWrongWords((items) => {
      if (items.includes(word)) {
        return items;
      }
      return [...items, word];
    });
  }, []);

  const word = useMemo(() => {
    return questions[questionIndex] as
      | {
          word: string;
          explain: string;
          //TODO: why need this?
        }
      | undefined;
  }, [questions, questionIndex]);

  const percentage = (questionIndex / questions.length) * 100;

  if (questionIndex === questions.length) {
    return <StatisticsPanel finished={questionIndex} time={0} total={time} wrong={wrongWords.length} wrongWords={wrongWords}/>
  }

  return (
    <div className="flex flex-col items-center">
      {word ? (
        <WordQuiz
          explain={word.explain}
          key={word.word}
          onError={handleWrongSpell}
          onSuccess={handleSpellSuccess}
          word={word.word}
        />
      ) : null}
      <Progress percent={percentage} />
      <StatisticsBar
        finished={questionIndex}
        time={time}
        total={questions.length}
        wrong={wrongWords.length}
      />
      {questionIndex === questions.length ? (
        <div className="text-green-500 text-3xl">🎉</div>
      ) : null}
    </div>
  );
}

export default QuizContent;
