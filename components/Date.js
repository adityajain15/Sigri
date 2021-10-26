import { parseISO, format } from "date-fns";

const Date = ({ dateString, className }) => {
  const date = parseISO(dateString);
  return (
    <time className={className} dateTime={dateString}>
      {format(date, "LLLL d, yyyy")}
    </time>
  );
};

export default Date;
