const getDate = () => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(today);
};

export default getDate;
