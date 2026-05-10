import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { FC } from "react";

interface ProgressWithLabelProps {
  label: string;
  progressLevel: number;
}
export const ProgressWithLabel: FC<ProgressWithLabelProps> = ({
  label,
  progressLevel,
}) => {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="progress-upload">
        <span className="capitalize">{label}</span>
        <span className="ml-auto">{progressLevel}%</span>
      </FieldLabel>
      <Progress value={progressLevel} id="progress-upload" />
    </Field>
  );
};
