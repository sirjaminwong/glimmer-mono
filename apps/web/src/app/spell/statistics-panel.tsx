"use client";
import { useMemo } from "react";

interface StatisticsBarProps {
  time: number;
  total: number;
  wrong: number;
  finished: number;
  wrongWords: string[];
}

function StatisticsPanel(props: StatisticsBarProps): JSX.Element {
  const items = useMemo(() => {
    return [
      {
        name: "正确率",
        value:
          props.finished === 0
            ? 0
            : (props.finished - props.wrong) / props.finished,
      },
      {
        name: "时间",
        value: props.time,
      },
      {
        name: "WPM",
        value: (props.finished / (props.time / 60)).toFixed(2),
      },
 
    ];
  }, [props.finished, props.time, props.wrong]);
  return (
    <div className="flex">
      <div className="flex gap-4 flex-col text-gray-500 justify-between">
        {items.map((item) => {
          return (
            <div
              className="flex flex-col justify-center items-center w-32 h-32 rounded-full border-8 border-slate-500"
              key={item.name}
            >
              <div className="text-base">{item.name}</div>
              <div className="text-lg">{item.value}</div>
            </div>
          );
        })}
      </div>
      <div>
        {props.wrongWords.map((word) => (
          <div key={word}>{word}</div>
        ))}
      </div>
    </div>
  );
}

export default StatisticsPanel;
