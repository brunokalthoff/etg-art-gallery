import styles from "../styles/Exhibitions.module.css";

export const filterEntries = (exhibitions: any, filter: string) => {
  const now = Date.now();
  const results = exhibitions.filter((exhibit: any) => {
    const start = exhibit.start;
    const end = exhibit.end;
    if (filter === "All") return;
    if (filter === "Now" && (start > now || (end < now && end))) return;
    if (filter === "Permanent" && end) return;
    if (filter === "Future" && (start < now || !end)) return;
    if (filter === "Past" && (!end || end > now)) return;
    else return exhibit;
  });
  return results;
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (timestamp: number): string => {
  const date: Date = new Date(timestamp);
  const year: number = date.getFullYear();
  const month: string = months[date.getMonth()];
  const day: number = date.getDate();
  if (!timestamp) return "∞";
  return `${month} ${day}, ${year}`;
};

export const addStatus = (exhibitions: []) => {
  const now = Date.now();
  const result = exhibitions.map((exhibit: any) => {
    const start = exhibit.start;
    const end = exhibit.end;
    console.log("start: ", start, "end: ", end);
    if (!end || !start)
      return {
        ...exhibit,
        status: "Permanent exhibition",
        color: styles.permanent,
      };
    if (start < now && end > now)
      return { ...exhibit, status: "Now!", color: styles.now };
    if (start > now && end > now)
      return { ...exhibit, status: "Soon", color: styles.future };
    if (start < now && end < now)
      return { ...exhibit, status: "Ended", color: styles.past };
    else return { ...exhibit, status: "", color: "" };
  });
  return result;
};
