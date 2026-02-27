export function getMonthName(createdAtTime: string): string | null {
  if (!createdAtTime) return null;
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

  return months[+createdAtTime.split("-")[1] - 1];
}

export function getYear(createdAtTime: string) {
  if (!createdAtTime) return null;

  return createdAtTime.split("-")[0];
}

export function formatEgyptianTime(dateInput: string | Date) {
  if (!dateInput) return "";
  const date = new Date(dateInput);

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Africa/Cairo",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}
export function handleMessageTime(createdAt: string | Date) {
  if (!createdAt) return {};

  const date = new Date(createdAt);

  const dayName = date.toString().split(" ")[0];

  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  const fullDate = `${day}/${month}/${year}`;

  return {
    dayName,
    fullDate,
  };
}
