export const formattingDate = (dateInput, format = "dd-mm-yyyy") => {
  if (!dateInput) return "";

  const date = new Date(dateInput);

  if (isNaN(date)) return ""; // invalid date

  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0");
  let yyyy = date.getFullYear();

  const monthNames = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const monthShort = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
  ];

  const replacements = {
    "dd": dd,
    "mm": mm,
    "yyyy": yyyy,
    "mmm": monthShort[date.getMonth()],
    "mmmm": monthNames[date.getMonth()],
  };

  // Replace format variables
  return format.replace(/dd|mm|yyyy|mmm|mmmm/g, match => replacements[match]);
};
