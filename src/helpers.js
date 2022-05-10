const copyToClipboard = (text) => {
  navigator.clipboard?.writeText && navigator.clipboard.writeText(text);
};

const filterData = (data, regEx) => {
  return data.replace(regEx, '');
};

export { copyToClipboard, filterData };
