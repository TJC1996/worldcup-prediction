export default function ConfidenceBadge({ confidence }) {
  const level = (confidence || 'medium').toLowerCase();
  return (
    <span className="confbadge">
      <span className={`dot ${level}`} />
      {level} confidence
    </span>
  );
}
