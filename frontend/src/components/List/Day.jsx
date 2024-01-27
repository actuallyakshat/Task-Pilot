export const Day = () => {
  let currentDate = new Date();

  let dayOfMonth = currentDate.getDate();
  let month = currentDate.getMonth();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentMonth = months[month];
  let daySuffix = getDaySuffix(dayOfMonth);

  function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return "th";
    }

    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  return (
    <div>
      <h3 className="text-2xl font-Poppins font-[700] md:text-[2.5rem]">
        {dayOfMonth}
        <sup>{daySuffix} </sup>
        {currentMonth}
      </h3>
    </div>
  );
};
