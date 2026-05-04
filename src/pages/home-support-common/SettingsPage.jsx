import { useState } from 'react';
import { useMapingoStore } from '../../store/user/useMapingoStore';
import '../../styles/user/SettingsPage.css';

// ── 설정 옵션 데이터 ─────────────────────────────────────

const LANGUAGE_OPTIONS = [
  { value: 'en',  label: '영어',          emoji: '🇺🇸', ready: true  },
  { value: 'jp',  label: '일본어(준비중)', emoji: '🇯🇵', ready: false },
  { value: 'cn',  label: '중국어(준비중)', emoji: '🇨🇳', ready: false },
];

const THEME_OPTIONS = [
  { value: 'light',  label: '라이트모드', emoji: '🌞' },
  { value: 'dark',   label: '다크모드',   emoji: '🌙' },
  { value: 'system', label: '시스템 설정', emoji: '⚙️' },
];

const NOTIFICATION_OPTIONS = [
  { value: 'all', label: '모든 알림 받기', emoji: '🔔' },
  { value: 'off', label: '알림 받지 않기', emoji: '🔕' },
];

// ── 준비중 안내 팝업 ─────────────────────────────────────

function ComingSoonModal({ onClose }) {
  return (
    <>
      <div className="mapingo-modal-overlay" onClick={onClose} role="presentation" />
      <div className="mapingo-modal mapingo-modal--sm" role="dialog" aria-modal="true" aria-label="준비중 안내">
        <div className="mapingo-modal-header">
          <h2 className="mapingo-modal-title">안내</h2>
          <button type="button" className="mapingo-modal-close" onClick={onClose} aria-label="닫기">✕</button>
        </div>
        <div className="mapingo-modal-body">
          <p className="mapingo-modal-message">해당 언어는 준비중 입니다.</p>
        </div>
        <div className="mapingo-modal-footer">
          <button type="button" className="mapingo-modal-confirm-btn" onClick={onClose}>확인</button>
        </div>
      </div>
    </>
  );
}

// ── 선택 팝업 컴포넌트 ───────────────────────────────────

function SettingsModal({ title, options, currentValue, onSelect, onClose }) {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleOptionClick = (opt) => {
    // 준비중 언어 클릭 시 → 준비중 팝업, 선택값 변경 없음
    if (opt.ready === false) {
      setShowComingSoon(true);
      return;
    }
    onSelect(opt.value);
    onClose();
  };

  return (
    <>
      <div className="mapingo-modal-overlay" onClick={onClose} role="presentation" />
      <div className="mapingo-modal" role="dialog" aria-modal="true" aria-label={title}>
        <div className="mapingo-modal-header">
          <h2 className="mapingo-modal-title">{title}</h2>
          <button type="button" className="mapingo-modal-close" onClick={onClose} aria-label="닫기">✕</button>
        </div>
        <ul className="mapingo-modal-list">
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                className={[
                  'mapingo-modal-option',
                  currentValue === opt.value ? 'is-selected' : '',
                  opt.ready === false      ? 'is-disabled'  : '',
                ].filter(Boolean).join(' ')}
                onClick={() => handleOptionClick(opt)}
              >
                <span className="mapingo-modal-option-emoji">{opt.emoji}</span>
                <span className="mapingo-modal-option-label">{opt.label}</span>
                {currentValue === opt.value && (
                  <span className="mapingo-modal-option-check">✓</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 준비중 안내 팝업 (중첩) */}
      {showComingSoon && <ComingSoonModal onClose={() => setShowComingSoon(false)} />}
    </>
  );
}

// ── 설정 카드 컴포넌트 ───────────────────────────────────

function SettingCard({ label, emoji, value, onClick }) {
  return (
    <div className="mapingo-setting-group">
      <p className="mapingo-setting-group-label">{label}</p>
      <button type="button" className="mapingo-setting-card" onClick={onClick}>
        <span className="mapingo-setting-emoji">{emoji}</span>
        <strong className="mapingo-setting-value">{value}</strong>
      </button>
    </div>
  );
}

// ── 알림 상태 안내 배너 ──────────────────────────────────

function NotificationBanner({ notification }) {
  const isOn = notification === 'all';
  return (
    <div className={`mapingo-noti-banner${isOn ? ' is-on' : ' is-off'}`}>
      <span className="mapingo-noti-banner-icon">{isOn ? '🔔' : '🔕'}</span>
      <span className="mapingo-noti-banner-text">
        {isOn
          ? '이메일 알림이 활성화되어 있어요. 학습 리마인더를 받을 수 있어요.'
          : '이메일 알림이 비활성화되어 있어요. 알림을 받으려면 설정을 변경해 주세요.'}
      </span>
    </div>
  );
}

// ── 메인 SettingsPage ────────────────────────────────────

function SettingsPage() {
  const language     = useMapingoStore((s) => s.language)     ?? 'en';
  const theme        = useMapingoStore((s) => s.theme)        ?? 'light';
  const notification = useMapingoStore((s) => s.notification) ?? 'off';
  const setLanguage     = useMapingoStore((s) => s.setLanguage)     ?? (() => {});
  const setTheme        = useMapingoStore((s) => s.setTheme)        ?? (() => {});
  const setNotification = useMapingoStore((s) => s.setNotification) ?? (() => {});

  const [openModal, setOpenModal] = useState(null);

  // 다크모드 적용 — body에 클래스 추가
  const handleThemeSelect = (value) => {
  setTheme(value);
  const isDark = value === 'dark';
  const appEl = document.querySelector('.mapingo-app');
  if (appEl) appEl.classList.toggle('mapingo-dark', isDark);
};

  const currentLanguage     = LANGUAGE_OPTIONS.find((o) => o.value === language)     ?? LANGUAGE_OPTIONS[0];
  const currentTheme        = THEME_OPTIONS.find((o) => o.value === theme)            ?? THEME_OPTIONS[0];
  const currentNotification = NOTIFICATION_OPTIONS.find((o) => o.value === notification) ?? NOTIFICATION_OPTIONS[1];

  return (
    <div className="mapingo-dashboard">
      <section className="mapingo-domain-entry">
        <h1>환경설정</h1>
        <p className="mapingo-domain-entry-copy">mapingo를 편리하게 사용하기 위한 기능들이 있어요!</p>

        <div className="mapingo-settings-grid">
          <SettingCard
            label="학습언어"
            emoji={currentLanguage.emoji}
            value={currentLanguage.label}
            onClick={() => setOpenModal('language')}
          />
          <SettingCard
            label="시스템 색상"
            emoji={currentTheme.emoji}
            value={currentTheme.label}
            onClick={() => setOpenModal('theme')}
          />
          <SettingCard
            label="알림설정"
            emoji={currentNotification.emoji}
            value={currentNotification.label}
            onClick={() => setOpenModal('notification')}
          />
        </div>

        {/* 알림 상태 배너 */}
        <NotificationBanner notification={notification} />
      </section>

      {/* ── 팝업 ── */}
      {openModal === 'language' && (
        <SettingsModal
          title="학습언어 선택"
          options={LANGUAGE_OPTIONS}
          currentValue={language}
          onSelect={setLanguage}
          onClose={() => setOpenModal(null)}
        />
      )}
      {openModal === 'theme' && (
        <SettingsModal
          title="시스템 색상 선택"
          options={THEME_OPTIONS}
          currentValue={theme}
          onSelect={handleThemeSelect}
          onClose={() => setOpenModal(null)}
        />
      )}
      {openModal === 'notification' && (
        <SettingsModal
          title="알림 설정"
          options={NOTIFICATION_OPTIONS}
          currentValue={notification}
          onSelect={setNotification}
          onClose={() => setOpenModal(null)}
        />
      )}
    </div>
  );
}

export default SettingsPage;