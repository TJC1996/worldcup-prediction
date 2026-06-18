export default function DateTabs({ dates, activeDate, onSelect }) {
  if (dates.length === 0) return null;

  return (
    <nav className="dates" aria-label="Select match day">
      {dates.map((date) => (
        <button
          key={date}
          className="tab"
          aria-selected={date === activeDate}
          onClick={() => onSelect(date)}
        >
          {date}
        </button>
      ))}
    </nav>
  );
}
