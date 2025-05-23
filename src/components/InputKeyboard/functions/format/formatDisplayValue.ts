export const formatDisplayValue = (value: string) => {
  if (value === "") {
    return "";
  }
  const dotIndex = value.indexOf(".");
  if (dotIndex > -1) {
    const beforeDot = value.slice(0, dotIndex);
    const afterDot = value.slice(dotIndex + 1);

    return beforeDot.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + afterDot;
  } else {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};
