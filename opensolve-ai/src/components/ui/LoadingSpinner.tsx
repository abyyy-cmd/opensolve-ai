"use client";

import { useState, useEffect } from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  messages?: string[];
  intervalMs?: number;
  subtext?: string;
}

export default function LoadingSpinner({
  size = "md",
  label,
  messages,
  intervalMs = 2500,
  subtext,
}: LoadingSpinnerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (!messages || messages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % messages.length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [messages, intervalMs]);

  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-9 w-9",
    lg: "h-12 w-12",
  };

  const displayMessage =
    messages && messages.length > 0 ? messages[currentIdx] : label;

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      {/* Animated Spinner with pulse glow */}
      <div className="relative flex items-center justify-center">
        <div className="absolute -inset-2 rounded-full bg-indigo-500/10 blur-md animate-pulse" />
        <div
          className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-indigo-100 border-t-indigo-600`}
        />
      </div>

      {/* Dynamic Status Text */}
      {displayMessage && (
        <div className="min-h-[3rem] w-full max-w-sm px-2">
          <p
            key={currentIdx}
            className="animate-in fade-in slide-in-from-bottom-1 duration-300 text-base font-semibold text-gray-900"
          >
            {displayMessage}
          </p>
          {subtext && (
            <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
              {subtext}
            </p>
          )}

          {/* Stepper Dots */}
          {messages && messages.length > 1 && (
            <div className="mt-4 flex items-center justify-center gap-1.5">
              {messages.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === currentIdx
                      ? "w-6 bg-indigo-600"
                      : "w-1.5 bg-gray-200"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
