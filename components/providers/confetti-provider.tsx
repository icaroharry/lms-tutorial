"use client";

import ReactConfetti from "react-confetti";

import { useConfettiStore } from "@/hooks/use-confetti-store";
import React from "react";

export const ConfettiProvider = () => {
  const confetti = useConfettiStore();

  if (!confetti.isOpen) return null;

  return (
    <ReactConfetti
      className="z-50 pointer-events-none"
      numberOfPieces={500}
      recycle={false}
      onConfettiComplete={() => confetti.onClose()}
    />
  );
};
