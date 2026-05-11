"use client";

import { FC } from "react";
import { Check } from "lucide-react";

interface CircularProgressProps {
  value: number;
}

export const CircularProgress: FC<CircularProgressProps> = ({ value }) => {
  const radius = 22;

  const stroke = 3;

  const normalizedRadius = radius - stroke * 0.5;

  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset = circumference - (value / 100) * circumference;

  const isCompleted = value >= 100;

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-14 w-14 items-center justify-center">
        {!isCompleted && (
          <svg height={radius * 2} width={radius * 2} className="-rotate-90">
            {/* Background Track */}
            <circle
              stroke="#e5e7eb"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />

            {/* Progress */}
            <circle
              stroke="#14b8a6"
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${circumference} ${circumference}`}
              style={{
                strokeDashoffset,
              }}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              className="transition-all duration-700"
            />
          </svg>
        )}

        {/* Center */}
        <div className="absolute flex items-center justify-center">
          {isCompleted ? (
            <div
              className="
                flex h-10 w-10 items-center
                justify-center rounded-full
                bg-emerald-500
              "
            >
              <Check
                className="
                  h-5 w-5
                  text-white
                  stroke-[3.5]
                "
              />
            </div>
          ) : (
            <span className="text-[11px] font-semibold text-zinc-700">
              {value}%
            </span>
          )}
        </div>
      </div>

      {/* Label */}
      <span
        className={`
           text-[10px] font-medium
          ${isCompleted ? "text-emerald-600" : "text-zinc-500"}
        `}
      >
        {isCompleted ? "Completed" : "Processing"}
      </span>
    </div>
  );
};
