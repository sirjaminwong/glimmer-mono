"use client";
import { useMemo } from "react";

interface StatisticsBarProps {
  time: number;
  total: number;
  wrong: number;
  finished: number;
}

function StatisticsBar(props: StatisticsBarProps): JSX.Element {
  const items = useMemo(() => {
    return [
      {
        name: "时间",
        value: props.time,
      },
      {
        name: "WPM",
        value: (props.finished/(props.time/60)).toFixed(2),
      },
      {
        name: "输入数",
        value: props.finished,
      },
      {
        name: "正确数",
        value: props.finished - props.wrong,
      },
      {
        name: "正确率",
        value: props.finished ===0 ? 0: (props.finished - props.wrong) / props.finished,
      },
    ];
  }, [props.finished, props.time, props.wrong]);
  return (
    <div className="flex text-gray-500 justify-between">
      {items.map((item) => {
        return (
          <div className="flex flex-col items-center w-40 p-2" key={item.name}>
            <div className="text-lg">{item.value}</div>
            <div className="w-full h-0.5 bg-slate-100" />
            <div className="text-base">{item.name}</div>
          </div>
        );
      })}
    </div>
  );
}

export default StatisticsBar;
