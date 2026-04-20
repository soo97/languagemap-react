import { pageSections } from '../data/mapingoPageData';

function MapingoDashboard({ currentPage }) {
  const section = pageSections[currentPage] ?? pageSections.map;

  return (
    <section className="mapingo-dashboard">
      <div className="mapingo-dashboard-head">
        <div>
          <p className="mapingo-eyebrow">{section.title}</p>
          <h2>{section.description}</h2>
        </div>
      </div>

      <div className="mapingo-dashboard-stats">
        {section.stats.map(([label, value]) => (
          <article key={label} className="mapingo-stat-card">
            <p className="mapingo-stat-label">{label}</p>
            <strong className="mapingo-stat-value">{value}</strong>
          </article>
        ))}
      </div>

      <div className="mapingo-dashboard-grid">
        {section.cards.map(([title, desc]) => (
          <article key={title} className="mapingo-detail-card">
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MapingoDashboard;
