import { cn } from "@/lib/utils";
import React from "react";

interface MessageProps {
  message: string;
  isNextMessageSamePerson: boolean;
}

export const Message = ({ message, isNextMessageSamePerson }: MessageProps) => {
  return <div className={cn("flex items-end")}></div>;
};
