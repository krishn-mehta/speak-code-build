import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'active' | 'completed' | 'error';
}

interface ProgressWithStepsProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export const ProgressWithSteps = ({ steps, currentStep, className }: ProgressWithStepsProps) => {
  const progress = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className={cn("space-y-4", className)}>
      <Progress value={progress} className="h-2" />
      
      <div className="space-y-3">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isError = step.status === 'error';
          
          return (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg transition-colors",
                isActive && "bg-primary/5 border border-primary/20",
                isCompleted && "bg-muted/50",
                isError && "bg-destructive/5 border border-destructive/20"
              )}
            >
              <div className="flex-shrink-0">
                {isError ? (
                  <Circle className="w-5 h-5 text-destructive" />
                ) : isCompleted ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : isActive ? (
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              
              <div className="flex-1">
                <h4 className={cn(
                  "font-medium text-sm",
                  isActive && "text-primary",
                  isCompleted && "text-muted-foreground",
                  isError && "text-destructive"
                )}>
                  {step.title}
                </h4>
                {step.description && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};