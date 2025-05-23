export const reverseFormattedValue = (value: string) => {
  let lastChar = "";
  if (value.endsWith(",")) lastChar = ".";
  const dotIndex = value.indexOf(".");
  if (dotIndex > -1) {
    const beforeDot = value.slice(0, dotIndex);
    const afterDot = value.slice(dotIndex + 1);

    return beforeDot.replace(/[^0-9.]/g, "") + "." + afterDot.replace(/[^0-9.]/g, "");
  } else {
    return value.replace(/[^0-9.]/g, "") + lastChar;
  }
};
