export const setTimeoutPromise = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
