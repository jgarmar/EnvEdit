import React from "react";
import { Button } from "@/components/ui/button";
import { VariableEnvSelectorProps } from "@/types/variableform";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function VariableEnvSelector({
  envValue,
  variablePool,
}: VariableEnvSelectorProps) {
  const allEnvs = Object.keys(variablePool)
    .map((envName) => {
      return variablePool[envName];
    })
    .flat();
  const currentEnv = variablePool[envValue].join();
  const currentEnvButton = (
    <Button
      key={currentEnv}
      variant="outline"
      className="duration-300 transition-[opacity] bg-accent opacity-75 hover:opacity-100 disabled"
      onClick={(event) => {
        event.preventDefault();
      }}
    >
      {currentEnv}
    </Button>
  );
  const restEnv = allEnvs.filter((envName) => envName !== currentEnv);
  return (
    <AccordionItem value={envValue} key={envValue}>
      <AccordionTrigger className="flex justify-end gap-2">
        <span className="mr-auto">{envValue}</span>
        {currentEnvButton}
      </AccordionTrigger>
      <AccordionContent className="flex gap-2">
        {currentEnvButton}
        {restEnv.map((envName) => (
          <Button
            key={envName}
            variant="outline"
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            {envName}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}
