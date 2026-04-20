import { MapingoActivityList, MapingoChecklist, MapingoInfoGrid, MapingoMetricGrid, MapingoPageSection } from './MapingoPageBlocks';

function DomainPageTemplate({
  eyebrow,
  title,
  description,
  metrics,
  infoTitle,
  infoDescription,
  infoCards,
  checklistTitle,
  checklistItems,
  activityTitle,
  activityItems,
}) {
  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection eyebrow={eyebrow} title={title} description={description}>
        <MapingoMetricGrid items={metrics} />
      </MapingoPageSection>

      <MapingoPageSection title={infoTitle} description={infoDescription}>
        <MapingoInfoGrid items={infoCards} />
      </MapingoPageSection>

      <div className="mapingo-feature-grid">
        <MapingoChecklist title={checklistTitle} items={checklistItems} />
        <MapingoActivityList title={activityTitle} items={activityItems} />
      </div>
    </div>
  );
}

export default DomainPageTemplate;
