"use client";
import { useMemo } from "react";

function StatisticsBar(): JSX.Element {
  const items = useMemo(() => {
    return [
      {
        name: "时间",
        value: 10,
      },
      {
        name: "WPM",
        value: 10,
      },
      {
        name: "输入数",
        value: 10,
      },
      {
        name: "正确数",
        value: 10,
      },
      {
        name: "正确率",
        value: 10,
      },
    ];
  }, []);
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
