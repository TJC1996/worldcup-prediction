import { usePredictions } from './hooks/usePredictions';
import DateTabs from './components/DateTabs';
import MatchCard from './components/MatchCard';
import Notice from './components/Notice';

function trackRecord(store) {
  let correct = 0;
  let total = 0;
  Object.values(store).forEach((dayMatches) => {
    if (!Array.isArray(dayMatches)) return;
    dayMatches.forEach((m) => {
      if (typeof m.graded_correct === 'boolean') {
        total += 1;
        if (m.graded_correct) correct += 1;
      }
    });
  });
  return { correct, total };
}

export default function App() {
  const { dates, matches, activeDate, setActiveDate, notice, loading, store } = usePredictions();
  const { correct, total } = trackRecord(store || {});

  return (
    <>
      <header>
        <p className="eyebrow">Match Day Predictions</p>
        <h1>World Cup 2026, called daily</h1>
        <p className="lede">
          Each card shows the sportsbook-implied line and where our model
          moved it, with the specific facts behind that move and what's
          still unconfirmed.
        </p>
        <div className="legend">
          <span><span className="dot high" />High confidence</span>
          <span><span className="dot medium" />Medium confidence</span>
          <span><span className="dot low" />Low confidence</span>
          {total > 0 && <span className="track-record">Track record: {correct}/{total} settled matches called correctly</span>}
        </div>
      </header>

      <Notice>{notice}</Notice>

      <DateTabs dates={dates} activeDate={activeDate} onSelect={setActiveDate} />

      <main>
        {loading && <div className="card"><p>Loading today's lines…</p></div>}
        {!loading && matches && matches.__malformed && (
          <div className="card">
            <p>
              This day's predictions file couldn't be read — it isn't valid
              JSON. Check the source file in <code>predictions/</code> for
              this date.
            </p>
          </div>
        )}
        {!loading && Array.isArray(matches) && matches.length === 0 && (
          <div className="card"><p>No matches logged for this date yet.</p></div>
        )}
        {!loading && Array.isArray(matches) && matches.map((match) => (
          <MatchCard key={match.match} match={match} />
        ))}
      </main>

      <footer>
        Predictions are probabilistic estimates, not certainties, generated
        from public odds, rankings, and reported team news. Verify
        high-stakes facts independently before relying on them.
      </footer>
    </>
  );
}
