export const isInTheSameTime = (targetTime: string, sourceTime: string) => {
  const splittedTargetTime = targetTime.split(':');
  const splittedSourceTime = sourceTime.split(':');
  const targetHour = splittedTargetTime[0];
  const sourceHour = splittedSourceTime[0];

  return targetHour === sourceHour;
};
