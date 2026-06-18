import { useEffect, useState } from 'react';
import { FALLBACK_DATE, FALLBACK_DATA } from '../data/fallbackData';

export function usePredictions() {
  const [store, setStore] = useState({});
  const [activeDate, setActiveDate] = useState(null);
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const manifestRes = await fetch(`${import.meta.env.BASE_URL}predictions/manifest.json`);
        if (!manifestRes.ok) throw new Error('no manifest');
        const dates = await manifestRes.json();
        if (!Array.isArray(dates) || dates.length === 0) throw new Error('empty manifest');

        const sorted = [...dates].sort().reverse();
        const next = {};
        for (const d of sorted) {
          try {
            const r = await fetch(`${import.meta.env.BASE_URL}predictions/${d}.json`);
            if (!r.ok) continue;
            try {
              next[d] = await r.json();
            } catch (_parseErr) {
              // file exists but isn't valid JSON — keep the date visible
              // with an explicit error marker rather than hiding it
              next[d] = { __malformed: true };
            }
          } catch (_err) {
            // network failure for this date — skip it entirely
          }
        }
        if (cancelled) return;
        const available = Object.keys(next).sort().reverse();
        if (available.length === 0) throw new Error('manifest had no readable files');
        setStore(next);
        setActiveDate(available[0]);
      } catch (_err) {
        if (cancelled) return;
        setNotice('Live predictions feed not connected yet — showing sample data from June 18, 2026.');
        setStore({ [FALLBACK_DATE]: FALLBACK_DATA });
        setActiveDate(FALLBACK_DATE);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    dates: Object.keys(store).sort().reverse(),
    matches: store[activeDate] || [],
    activeDate,
    setActiveDate,
    notice,
    loading,
    store,
  };
}
