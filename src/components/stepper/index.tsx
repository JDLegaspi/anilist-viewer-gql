import {
  useSteps,
  Stepper as ChakraStepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  Box,
} from "@chakra-ui/react";

export type Step = { title: string; description?: string };

export const Stepper = ({
  activeStep,
  steps,
}: {
  activeStep: number;
  steps: Step[];
}) => {
  return (
    <ChakraStepper index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </ChakraStepper>
  );
};
