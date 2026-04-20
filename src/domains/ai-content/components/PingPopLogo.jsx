import { getBadgeTheme } from './badgeTheme';

function PingPopLogo({ className = '', level = 10 }) {
  const badge = getBadgeTheme(level);

  return (
    <svg viewBox="0 0 120 120" className={className} aria-label="PingPop logo">
      <path
        d="M60 18C82.6 18 99 34.1 99 54.7C99 78.4 79.8 94.3 63.7 108.3C61.7 110 58.5 110 56.5 108.3C40.3 94.3 21 78.4 21 54.7C21 34.1 37.4 18 60 18Z"
        fill="#FFC81A"
      />
      <circle cx="60" cy="55.5" r="22.5" fill="#FFF8E7" />
      <path
        d="M51.4 34.5C53.8 31.8 56.9 30.2 60 30.2C63.1 30.2 66.2 31.8 68.6 34.5"
        fill="none"
        stroke={badge.ribbonColor}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="60" cy="31.4" r="5.4" fill="#FFF8E7" stroke={badge.ribbonColor} strokeWidth="3.2" />
      <circle cx="51.8" cy="52.7" r="3.3" fill="#16636A" />
      <circle cx="68.2" cy="52.7" r="3.3" fill="#16636A" />
      <path
        d="M53.2 63.2C55.4 66.1 58.2 67.5 60 67.5C61.8 67.5 64.6 66.1 66.8 63.2"
        stroke="#16636A"
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="60" cy="75.5" r="8.8" fill="#FFF8E7" stroke="#24C2B7" strokeWidth="3.4" />
      <path d="M60 69.8L55.4 78.8L64.7 75.8Z" fill="#F54B43" />
      <path d="M60 69.8L64.7 75.8L58.1 80.7Z" fill="#16636A" />
      <circle cx="60" cy="75.5" r="1.8" fill="#16636A" />
    </svg>
  );
}

export default PingPopLogo;
