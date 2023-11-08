// Check if the provided data is in past or not
export const isPast = (date?: Date): boolean => {
  return !!date && date.getTime() < Date.now();
};

export const newDateInXMinutes = (minutes: number): Date => {
  return new Date(Date.now() + minutes * 60 * 1000);
};
