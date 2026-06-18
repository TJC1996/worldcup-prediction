function pct(value) {
  return parseFloat(String(value).replace('%', '')) || 0;
}

function Segments({ probability }) {
  return (
    <>
      <div className="seg a" style={{ width: `${pct(probability.teamA_win)}%` }} />
      <div className="seg draw" style={{ width: `${pct(probability.draw)}%` }} />
      <div className="seg b" style={{ width: `${pct(probability.teamB_win)}%` }} />
    </>
  );
}

export default function ProbabilityBars({ teamA, teamB, baseline, adjusted }) {
  return (
    <div className="lines">
      <div className="line-row">
        <div className="line-label">
          <span>Opening line</span>
        </div>
        <div className="bar opening">
          <Segments probability={baseline} />
        </div>
      </div>
      <div className="line-row">
        <div className="line-label">
          <span>Our line</span>
        </div>
        <div className="bar">
          <Segments probability={adjusted} />
        </div>
        <div className="bar-readout">
          <span>{teamA} {adjusted.teamA_win}</span>
          <span>Draw {adjusted.draw}</span>
          <span>{teamB} {adjusted.teamB_win}</span>
        </div>
      </div>
    </div>
  );
}
