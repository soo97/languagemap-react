const getCharacterImagePath = (level) => {
  if (level >= 60) return '/assets/characters/pingpop-badge-lv60.png';
  if (level >= 50) return '/assets/characters/pingpop-badge-lv50.png';
  if (level >= 40) return '/assets/characters/pingpop-badge-lv40.png';
  if (level >= 30) return '/assets/characters/pingpop-badge-lv30.png';
  if (level >= 20) return '/assets/characters/pingpop-badge-lv20.png';
  return '/assets/characters/pingpop-badge-lv10.png';
};

function PingPopCharacterImage({ className = '', alt = 'PingPop character', level = 10 }) {
  return <img src={getCharacterImagePath(level)} alt={alt} className={className} />;
}

export default PingPopCharacterImage;
