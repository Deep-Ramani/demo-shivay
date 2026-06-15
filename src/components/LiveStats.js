import React from 'react';
import './LiveStats.css';

const stats = [
  { id: 1, num: '1,500+',    lbl: 'Active Dealers' },
  { id: 2, num: '1,92,852',  lbl: 'Products Sold' },
  { id: 3, num: '10 Lakh+',  lbl: 'Farmers Served' },
  { id: 4, num: '60%',       lbl: 'Max Savings' },
];

function LiveStats() {
  return (
    <section className="live-stats-section">
      <div className="stats-strip">
        {stats.map((s, i) => (
          <React.Fragment key={s.id}>
            <div className="stat-item">
              <span className="stat-num">{s.num}</span>
              <span className="stat-lbl">{s.lbl}</span>
            </div>
            {i < stats.length - 1 && <div className="stat-sep" />}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default LiveStats;
