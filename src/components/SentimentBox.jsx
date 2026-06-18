export default function SentimentBox({ sentiment }) {
  if (!sentiment) return null;

  return (
    <div className="sentiment">
      <strong>Community sentiment</strong>
      {sentiment.data_accessible
        ? `${sentiment.sample_size} posts classified — ${sentiment.teamA_favor_pct ?? '—'} / ${sentiment.teamB_favor_pct ?? '—'}. ${sentiment.bias_note || ''}`
        : `Unavailable — ${sentiment.bias_note || 'no accessible sample this run.'}`}
    </div>
  );
}
