import React from "react";

interface ProgressProps {
  percent: number;
  info?: string;
}

function Progress({ percent, info }: ProgressProps) {
  return (
    <div className="flex items-center">
      <div className="w-96 my-10 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{
            width: `${percent}%`,
          }}
        />
      </div>
      {info ? <span className="text-white mr-2">{info}</span> : null}
    </div>
  );
}

export default Progress;
