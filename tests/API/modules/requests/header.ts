export const setHeader = (bearerToken?: string) => {
  return {
    ...(bearerToken && { Authorization: `Bearer ${bearerToken}` }),
  };
};
