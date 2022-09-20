import { useEffect, useState } from 'react';
import { TaskStepSchema } from '../services/data';

export interface UseStepperHookProps {
  steps: TaskStepSchema[];
  onFinishCb: () => void;
}

/**
 * Hook to use stepper
 */
const useStepper = ({ steps, onFinishCb }: UseStepperHookProps) => {
  const [activeStep, setActiveStep] = useState(steps[0].key || null);
  const [isLastStep, setIsLastStep] = useState(false);

  useEffect(() => {
    const enabledSteps = steps.filter(step => !step.disabled);
    const currentIdx = enabledSteps.findIndex(step => step.key === activeStep);

    console.log('useEffect()', {
      currentIdx,
      isLast: currentIdx + 1 === enabledSteps.length,
    });

    if (currentIdx + 1 === enabledSteps.length) {
      setIsLastStep(true);
    }
  }, [activeStep]);

  const moveStep = () => {
    const enabledSteps = steps.filter(step => !step.disabled);
    const currentIdx = enabledSteps.findIndex(step => step.key === activeStep);
    const nextStep = steps[currentIdx + 1];

    if (isLastStep) {
      onFinishCb();

      return;
    }

    if (!nextStep.disabled && currentIdx + 1 < steps.length) {
      setActiveStep(nextStep.key);
    } else {
      onFinishCb();
    }
  };

  return {
    activeStep,
    isLastStep,
    setActiveStep,
    moveStep,
  };
};

export default useStepper;
