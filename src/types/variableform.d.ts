import { ReactNode } from "react";
import { VariableCardProps } from "@/types/variablecard";

export type VariableFormProps = VariableCardProps & { children?: ReactNode };

export type VariableEnvSelectorProps = {
  envValue: string;
  variablePool: Record<string, string[]>;
};
