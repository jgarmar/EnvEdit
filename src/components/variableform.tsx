import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VariableFormProps } from "@/types/variableform";
import { Accordion } from "@/components/ui/accordion";
import { VariableEnvSelector } from "./VariableEnvSelector";

export default function VariableForm({
  variable,
  variable_name,
  children,
}: VariableFormProps) {
  const variablePool = Object.keys(variable)
    .map((envName) => {
      return { environment_scope: envName, value: variable[envName] };
    })
    .reduce(
      (
        group: Record<
          VariableFormProps["variable"]["value"],
          VariableFormProps["variable"]["environment_scope"][]
        >,
        envVar,
      ) => {
        const { value } = envVar;
        group[value] = group[value] ?? [];
        group[value].push(envVar.environment_scope);
        return group;
      },
      {},
    );
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="transition-[padding] sm:p-8 px-6 rounded-md overflow-y-auto max-h-[90%] max-w-7xl md:w-[90%] w-[95%]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edit {variable_name}</DialogTitle>
          <DialogDescription className="opacity-40">
            Found {Object.keys(variable).length} environments.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4">
          <Accordion type="multiple" className="w-full">
            {Object.keys(variablePool).map((envValue) => (
              <VariableEnvSelector
                envValue={envValue}
                variablePool={variablePool}
                key={envValue}
              />
            ))}
          </Accordion>
          <DialogFooter>
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
