export default function SentimentBox({ sentiment, teamA, teamB }) {
  if (!sentiment) return null;

  if (!sentiment.data_accessible) {
    return (
      <div className="sentiment">
        <strong>Fan sentiment</strong>
        Unavailable — {sentiment.bias_note || 'no accessible sample this run.'}
      </div>
    );
  }

  const { sample_size, teamA_favor_pct, teamB_favor_pct, neutral_pct, bias_note } = sentiment;

  return (
    <div className="sentiment">
      <strong>Fan sentiment</strong>
      {sample_size} Reddit posts reviewed: {teamA_favor_pct ?? '—'}% favored {teamA},{' '}
      {teamB_favor_pct ?? '—'}% favored {teamB}, {neutral_pct ?? '—'}% neutral.
      {bias_note ? ` ${bias_note}` : ''}
    </div>
  );
}