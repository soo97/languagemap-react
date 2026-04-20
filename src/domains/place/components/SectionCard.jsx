function SectionCard({ title, desc, tone = 'light' }) {
  return (
    <article className={`mapingo-section-card ${tone === 'dark' ? 'is-dark' : ''}`}>
      <div className="mapingo-section-card-header">
        <h3>{title}</h3>
        <span className="mapingo-section-card-arrow">→</span>
      </div>
      <p>{desc}</p>
      <div className="mapingo-section-card-line" />
    </article>
  );
}

export default SectionCard;
