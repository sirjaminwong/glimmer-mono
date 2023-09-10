"use client";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useKeyPress } from "react-use";
import classNames from "classnames";
import { resultOf } from "./utils";

const underscore = "_";

interface WordCheckerProps {
  word: string;
  explain: string;
  onSuccess: () => void;
}

function WordChecker({ word, explain, onSuccess }: WordCheckerProps): JSX.Element {
  const [error, setError] = useState<{ index: number; char: string } | null>();

  const [isCtrlPress] = useKeyPress("Control");

  const [done, setDone] = useState<boolean>(false);

  const [cursorIndex, setCursorIndex] = useState(0);

  const chars = useMemo(() => {
    return word.split("");
  }, [word]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key.length > 1 || cursorIndex >= chars.length) {
        return;
      }
      if (e.key === chars[cursorIndex]) {
        setCursorIndex((i) => i + 1);
        if (cursorIndex + 1 === chars.length) {
          setDone(true);
        }
      } else {
        setError({ char: e.key, index: cursorIndex });
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [chars, cursorIndex]);

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
      }
    }
  }, [done, onSuccess]);

  return (
    <div className="flex flex-col items-center">
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
      <div className="text-slate-500 mt-6">{explain}</div>
    </div>
  );
}
export default memo(WordChecker);
