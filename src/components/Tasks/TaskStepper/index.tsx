import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { TaskStepSchema } from '../../../services/data';
import { colors, fonts, layout } from '../../../theme';
import Badge from '../../../ui-kit/Badge';

export interface TaskStepperProps extends ViewProps {
  steps: TaskStepSchema[];
  currentKey: string;
  setStep?: any;
}

const TaskStepper: FC<TaskStepperProps> = ({ steps = [], currentKey, setStep, children, style, ...otherProps }) => {
  const currentStep = steps?.find(step => step.key === currentKey);
  const progress = (steps?.indexOf(currentStep) + 1) / steps?.length;
  const [stepsHistory, setSteps] = useState<TaskStepSchema[]>(steps);

  const getPreviousSteps = () => {
    return stepsHistory?.filter((step, idx) => idx < steps.indexOf(currentStep));
  };

  const getNextSteps = () => {
    return stepsHistory?.filter((step, idx) => idx > steps.indexOf(currentStep));
  };

  useEffect(() => {
    getPreviousSteps();
    getNextSteps();
  }, [steps]);

  useEffect(() => {
    const newSteps = stepsHistory.map(item => {
      if (item.key === currentKey) {
        return {
          ...item,
          visited: true,
        };
      } else {
        return item;
      }
    });
    setSteps(newSteps);
  }, [currentStep]);

  return (
    <View style={[styles.container, style]} {...otherProps}>
      <View style={styles.contentContainer}>
        <View style={styles.current}>
          {getPreviousSteps()?.length > 0 ? (
            <View style={styles.otherSteps}>
              {getPreviousSteps()?.map(prevStep => (
                <Badge
                  onPress={() => prevStep.visited && setStep(prevStep.key)}
                  key={`${prevStep.key}_${prevStep.order}`}
                  variant="success"
                  style={{
                    marginRight: 8,
                  }}
                >
                  {prevStep.order}
                </Badge>
              ))}
            </View>
          ) : null}

          <Badge>{currentStep?.order}</Badge>
          <Text style={styles.currentStepText}>{currentStep?.label}</Text>
        </View>

        {getNextSteps()?.length > 0 ? (
          <View style={styles.otherSteps}>
            {getNextSteps()?.map((nextStep, idx) => (
              <Badge
                key={`${nextStep.key}_${nextStep.order}`}
                onPress={() => {
                  nextStep.visited && setStep(nextStep.key);
                }}
                variant="secondary"
                style={{
                  marginLeft: 8,
                }}
              >
                {nextStep.order}
              </Badge>
            ))}
          </View>
        ) : null}
      </View>

      <ProgressBar progress={progress} color={colors.blue.primary} style={{ height: 3 }} />
    </View>
  );
};

export default TaskStepper;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  contentContainer: {
    ...layout.rowSpaceBetween,
    padding: 15,
  },
  current: {
    ...layout.rowAlignItemsCenter,
  },
  currentStepText: {
    ...fonts.smallSemibold,
    color: colors.white,
    marginLeft: 10,
    maxWidth: '80%',
  },
  otherSteps: {
    ...layout.rowAlignCenter,
  },
});
