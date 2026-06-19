import ConfidenceBadge from './ConfidenceBadge';
import ProbabilityBars from './ProbabilityBars';
import SentimentBox from './SentimentBox';

export default function MatchCard({ match }) {
  const [teamA, teamB] = match.match.replace(/\./g, '').split(/ vs\.? /i);
  const unconfirmed = match.unverified_or_unknown || [];
  const sources = match.sources || [];
  const weather = match.weather_check;

  return (
    <div className="card">
      <div className="matchup">
        <div className="teams">
          {teamA}
          <span className="vs">vs</span>
          {teamB}
        </div>
        <ConfidenceBadge confidence={match.confidence} />
      </div>

      <ProbabilityBars
        teamA={teamA}
        teamB={teamB}
        baseline={match.market_baseline}
        adjusted={match.adjusted_probability}
      />

      <p className="verdict">{match.predicted_outcome}</p>

      {match.actual_result && (
        <p className={`result ${match.graded_correct ? 'correct' : 'incorrect'}`}>
          <span className="result-icon">{match.graded_correct ? '✓' : '✗'}</span>
          Final: {match.actual_result}
        </p>
      )}

      <details>
        <summary>Why</summary>
        <ul className="factors">
          {(match.key_factors || []).map((factor, i) => (
            <li key={i}>{factor}</li>
          ))}
        </ul>

        {weather && weather.asymmetric_factor_found && (
          <div className="weather-flag">
            <strong>Weather factor</strong>
            {weather.conditions}
          </div>
        )}

        {unconfirmed.length > 0 && (
          <div className="unconfirmed">
            <strong>Unconfirmed</strong>
            {unconfirmed.join(' ')}
          </div>
        )}
        <SentimentBox sentiment={match.social_sentiment_signal} teamA={teamA} teamB={teamB} />
        <ol className="sources">
          {sources.map((source, i) => (
            <li key={i}>{source}</li>
          ))}
        </ol>
      </details>
    </div>
  );
}