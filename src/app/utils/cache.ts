// Check if the provided data is in past or not
export const isPast = (date?: Date): boolean => {
  return !!date && date.getTime() < Date.now();
};

export const newDateInXMinutes = (iat: number, minutes: number): Date => {
  return new Date(iat + minutes * 60 * 1000);
};
