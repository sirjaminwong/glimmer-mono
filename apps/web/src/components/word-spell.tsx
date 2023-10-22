"use client";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useKeyPress } from "react-use";
import classNames from "classnames";
import { Icon } from "@iconify/react";
import { resultOf } from "src/utils/result-of";
import speechSynthesisSingleton from "src/utils/speck";

const underscore = "_";

interface WordQuizProps {
  word: string;
  explain: string;
  onSuccess: () => void;
  onError?: (word: string) => void;
}

function WordQuiz({
  word,
  explain,
  onSuccess,
  onError,
}: WordQuizProps): JSX.Element {
  const [error, setError] = useState<{ index: number; char: string } | null>();

  const [isCtrlPress] = useKeyPress("Control");

  const [done, setDone] = useState<boolean>(false);

  const [cursorIndex, setCursorIndex] = useState(0);

  const chars = useMemo(() => {
    return word.split("");
  }, [word]);

  useEffect(() => {
    speechSynthesisSingleton.speak(word);
    return () => {
      speechSynthesisSingleton.cancel();
    };
  }, [word]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key.length > 1 || cursorIndex >= word.length) {
        return;
      }
      if (e.key === word[cursorIndex]) {
        setCursorIndex((i) => i + 1);
        if (cursorIndex + 1 === word.length) {
          setDone(true);
        }
      } else {
        setError({ char: e.key, index: cursorIndex });
        onError?.(word);
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [word, cursorIndex, onError]);

  useEffect(() => {
    if (!error) {
      return;
    }
    const timer = setTimeout(() => {
      setError(null);
      setCursorIndex(0);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  const getCharColor = useCallback(
    (charIndex: number) => {
      if (isCtrlPress) {
        return "text-gray-500";
      }
      if (error?.index === charIndex) {
        return "text-red-500";
      }
      if (charIndex < cursorIndex) {
        return "text-green-500";
      }
      return "text-gray-500";
    },
    [cursorIndex, error?.index, isCtrlPress]
  );

  useEffect(() => {
    if (done) {
      const timer = setTimeout(() => {
        onSuccess();
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [done, onSuccess]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <div
          className={`text-6xl text-slate-300 font-mono ${classNames({
            shake: Boolean(error),
          })}`}
        >
          {chars.map((char, i) => {
            return (
              // eslint-disable-next-line react/no-array-index-key -- we don't have a unique id for each char in the word so we use the char + index
              <span className={`pr-1 ${getCharColor(i)}`} key={char + i}>
                {resultOf(() => {
                  if (isCtrlPress) {
                    return char;
                  }
                  if (error?.index === i) {
                    return error.char;
                  }
                  return i >= cursorIndex ? underscore : char;
                })}
              </span>
            );
          })}
        </div>
      </div>
      <div className="text-slate-500 mt-6 flex items-center">
        {explain}
        <Icon
          className="ml-3 text-slate-500 cursor-pointer"
          icon="akar-icons:sound-on"
          onClick={() => speechSynthesisSingleton.speak(word)}
          type="button"
        />
      </div>
    </div>
  );
}
export default memo(WordQuiz);
