export const emailValidation = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(value);
};


export const urlValidation = (value: string) => {
  const urlRegex = /^(https?:\/\/)([^\s:@\/]+(:[^\s:@\/]+)?@)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(:\d+)?(\/[^\s]*)?$/;

  return urlRegex.test(value);
};
