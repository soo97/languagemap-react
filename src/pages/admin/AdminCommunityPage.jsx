import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapingoPageSection } from '../../components/MapingoPageBlocks';
import { adminService } from '../../api/adminService';

const visibilityLabelMap = {
  VISIBLE: '노출 중',
  HIDDEN: '숨김',
  REVIEW: '검토 중',
};

const statusToneMap = {
  운영중: 'is-success',
  검토중: 'is-review',
  준비중: 'is-paused',
};

function sortConfigs(items) {
  return [...items].sort((left, right) => (left.order ?? 0) - (right.order ?? 0));
}

function AdminCommunityPage() {
  const navigate = useNavigate();
  const [pages] = useState(() => adminService.fetchAdminCommunityPages());
  const [savedConfigs, setSavedConfigs] = useState(() => adminService.fetchAdminCommunityConfigs());
  const [configs, setConfigs] = useState(() => adminService.fetchAdminCommunityConfigs());
  const [selectedPageId, setSelectedPageId] = useState(() => pages[0]?.id ?? '');
  const [saveMessage, setSaveMessage] = useState('');

  const selectedPage = useMemo(
    () => pages.find((page) => page.id === selectedPageId) ?? pages[0] ?? null,
    [pages, selectedPageId],
  );

  const selectedConfigs = useMemo(
    () => sortConfigs(configs.filter((config) => config.pageId === selectedPageId)),
    [configs, selectedPageId],
  );

  const savedSelectedConfigs = useMemo(
    () => sortConfigs(savedConfigs.filter((config) => config.pageId === selectedPageId)),
    [savedConfigs, selectedPageId],
  );

  const isSelectedPageDirty = useMemo(
    () => JSON.stringify(selectedConfigs) !== JSON.stringify(savedSelectedConfigs),
    [savedSelectedConfigs, selectedConfigs],
  );

  const pageStats = useMemo(
    () => [
      {
        label: '관리 페이지',
        value: pages.length,
        hint: '관리자에서 조정 가능한 커뮤니티 화면 수',
      },
      {
        label: '노출 중 섹션',
        value: configs.filter((config) => config.visibility === 'VISIBLE').length,
        hint: '현재 사용자 화면에 보이는 섹션 수',
      },
      {
        label: '검토 중 섹션',
        value: configs.filter((config) => config.visibility === 'REVIEW').length,
        hint: '문구나 노출 상태 확인이 필요한 섹션 수',
      },
    ],
    [configs, pages.length],
  );

  const previewSummary = useMemo(() => {
    const visibleConfigs = selectedConfigs.filter((config) => config.visibility === 'VISIBLE');
    const reviewConfigs = selectedConfigs.filter((config) => config.visibility === 'REVIEW');

    return {
      visibleCount: visibleConfigs.length,
      reviewCount: reviewConfigs.length,
      totalItems: visibleConfigs.reduce((sum, config) => sum + Number(config.itemCount || 0), 0),
    };
  }, [selectedConfigs]);

  const handlePageSelect = (pageId) => {
    setSelectedPageId(pageId);
    setSaveMessage('');
  };

  const handleConfigChange = (configId, field) => (event) => {
    const nextValue = field === 'itemCount' ? Number(event.target.value) : event.target.value;

    setConfigs((currentConfigs) =>
      currentConfigs.map((config) =>
        config.id === configId
          ? {
              ...config,
              [field]: nextValue,
              updatedAt: '2026-04-24',
            }
          : config,
      ),
    );
    setSaveMessage('');
  };

  const moveConfig = (configId, direction) => {
    const pageConfigs = sortConfigs(configs.filter((config) => config.pageId === selectedPageId));
    const currentIndex = pageConfigs.findIndex((config) => config.id === configId);
    const nextIndex = currentIndex + direction;

    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= pageConfigs.length) {
      return;
    }

    const reordered = [...pageConfigs];
    [reordered[currentIndex], reordered[nextIndex]] = [reordered[nextIndex], reordered[currentIndex]];

    const normalized = reordered.map((config, index) => ({
      ...config,
      order: index + 1,
      updatedAt: '2026-04-24',
    }));

    setConfigs((currentConfigs) =>
      currentConfigs.map((config) => normalized.find((item) => item.id === config.id) ?? config),
    );
    setSaveMessage('');
  };

  const handleResetSelectedPage = () => {
    const resetSource = savedConfigs.filter((config) => config.pageId === selectedPageId);

    setConfigs((currentConfigs) => [
      ...currentConfigs.filter((config) => config.pageId !== selectedPageId),
      ...resetSource,
    ]);
    setSaveMessage('현재 페이지 설정을 마지막 저장 상태로 되돌렸습니다.');
  };

  const handleSaveSelectedPage = () => {
    setSavedConfigs(configs);
    setSaveMessage('현재 페이지 설정을 저장했습니다.');
  };

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection
        eyebrow="Admin"
        title="커뮤니티 관리"
        description="커뮤니티 메인, 친구 관리, 순위 비교, 즐겨찾기 화면을 선택하고 섹션별 문구, 노출 상태, 표시 순서를 관리할 수 있습니다."
      >
        <div className="mapingo-page-actions">
          <button type="button" className="mapingo-ghost-button" onClick={() => navigate('/admin')}>
            관리자 메인으로
          </button>
        </div>
      </MapingoPageSection>

      <section className="mapingo-page-section">
        <div className="mapingo-dashboard-stats admin-overview-grid">
          {pageStats.map((stat) => (
            <article key={stat.label} className="mapingo-stat-card admin-overview-card">
              <p className="mapingo-stat-label">{stat.label}</p>
              <strong className="mapingo-stat-value">{stat.value}</strong>
              <p className="mapingo-stat-hint">{stat.hint}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mapingo-page-section">
        <div className="mapingo-admin-grid admin-content-layout admin-community-layout">
          <div className="mapingo-list-card">
            <div className="mapingo-card-header-row admin-builder-head">
              <div>
                <h3>커뮤니티 페이지</h3>
                <p className="mapingo-muted-copy">
                  관리할 페이지를 선택하면 오른쪽에서 섹션 편집과 미리보기를 바로 확인할 수 있습니다.
                </p>
              </div>
              <span className="mapingo-inline-badge">{pages.length}개</span>
            </div>

            <div className="admin-content-tab-row admin-community-page-tabs">
              {pages.map((page) => (
                <button
                  key={`tab-${page.id}`}
                  type="button"
                  className={`admin-content-tab ${selectedPageId === page.id ? 'is-active' : ''}`}
                  onClick={() => handlePageSelect(page.id)}
                >
                  {page.title}
                </button>
              ))}
            </div>

            <div className="mapingo-selectable-list admin-community-page-list">
              {pages.map((page) => (
                <button
                  key={page.id}
                  type="button"
                  className={`mapingo-post-card admin-content-card admin-community-page-card ${
                    selectedPageId === page.id ? 'is-selected' : ''
                  }`}
                  onClick={() => handlePageSelect(page.id)}
                >
                  <div className="mapingo-admin-item-head">
                    <div>
                      <strong>{page.title}</strong>
                      <p>{page.route}</p>
                    </div>
                    <span className={`admin-member-status ${statusToneMap[page.status] ?? 'is-review'}`}>
                      {page.status}
                    </span>
                  </div>
                  <p className="admin-content-description">{page.summary}</p>
                  <div className="admin-content-tags">
                    <span>{page.primaryData}</span>
                    <span>{`섹션 ${page.itemCount}개`}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mapingo-form-card">
            {selectedPage ? (
              <>
                <div className="mapingo-card-header-row admin-result-head">
                  <div>
                    <h3>{selectedPage.title}</h3>
                    <p className="mapingo-muted-copy">
                      현재 관리 중인 경로는 <strong>{selectedPage.route}</strong> 입니다.
                    </p>
                  </div>
                  <div className="mapingo-inline-badges">
                    <span className="mapingo-inline-badge">{selectedPage.owner}</span>
                    <span className="mapingo-inline-badge">{selectedPage.status}</span>
                    {isSelectedPageDirty ? <span className="mapingo-inline-badge">미저장 변경</span> : null}
                  </div>
                </div>

                <div className="mapingo-admin-meta-grid admin-community-meta-grid">
                  <p>
                    <strong>주요 데이터</strong>
                    {selectedPage.primaryData}
                  </p>
                  <p>
                    <strong>섹션 수</strong>
                    {selectedConfigs.length}개
                  </p>
                  <p>
                    <strong>최근 수정</strong>
                    {selectedPage.updatedAt}
                  </p>
                </div>

                <div className="admin-community-toolbar">
                  <div className="admin-community-toolbar-copy">
                    <strong>페이지 편집</strong>
                    <p>섹션 문구를 수정하고 위아래 순서를 바꾼 뒤 저장해 주세요.</p>
                  </div>
                  <div className="admin-community-toolbar-actions">
                    <button
                      type="button"
                      className="mapingo-ghost-button"
                      onClick={handleResetSelectedPage}
                      disabled={!isSelectedPageDirty}
                    >
                      초기화
                    </button>
                    <button type="button" className="mapingo-submit-button" onClick={handleSaveSelectedPage}>
                      저장
                    </button>
                  </div>
                </div>

                {saveMessage ? <p className="admin-community-save-note">{saveMessage}</p> : null}

                <div className="admin-community-preview">
                  <div className="mapingo-card-header-row admin-community-preview-head">
                    <div>
                      <h3>페이지 미리보기</h3>
                      <p className="mapingo-muted-copy">지금 설정 기준으로 실제 화면 구성을 간단히 미리 확인합니다.</p>
                    </div>
                    <div className="mapingo-inline-badges">
                      <span className="mapingo-inline-badge">{`노출 ${previewSummary.visibleCount}개`}</span>
                      <span className="mapingo-inline-badge">{`검토 ${previewSummary.reviewCount}개`}</span>
                      <span className="mapingo-inline-badge">{`항목 ${previewSummary.totalItems}개`}</span>
                    </div>
                  </div>

                  <div className="admin-community-preview-list">
                    {selectedConfigs.map((config) => (
                      <article key={`preview-${config.id}`} className="admin-community-preview-card">
                        <div className="admin-community-preview-meta">
                          <strong>{config.title}</strong>
                          <span>{visibilityLabelMap[config.visibility] ?? config.visibility}</span>
                        </div>
                        <p>{config.description}</p>
                        <div className="admin-content-tags">
                          <span>{config.section}</span>
                          <span>{`표시 ${config.itemCount}개`}</span>
                          <span>{`순서 ${config.order}`}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="admin-entity-stack admin-community-config-stack">
                  {selectedConfigs.map((config, index) => (
                    <article key={config.id} className="admin-entity-section">
                      <div className="admin-entity-head admin-community-section-head">
                        <div>
                          <strong>{config.section}</strong>
                          <p className="admin-community-order-label">{`섹션 순서 ${config.order}`}</p>
                        </div>
                        <div className="admin-community-section-actions">
                          <button
                            type="button"
                            className="mapingo-ghost-button"
                            onClick={() => moveConfig(config.id, -1)}
                            disabled={index === 0}
                          >
                            위로
                          </button>
                          <button
                            type="button"
                            className="mapingo-ghost-button"
                            onClick={() => moveConfig(config.id, 1)}
                            disabled={index === selectedConfigs.length - 1}
                          >
                            아래로
                          </button>
                          <span>{visibilityLabelMap[config.visibility] ?? config.visibility}</span>
                        </div>
                      </div>

                      <div className="mapingo-admin-form admin-community-config-form">
                        <label className="mapingo-field">
                          <span className="mapingo-field-label">섹션 제목</span>
                          <input className="mapingo-input" value={config.title} onChange={handleConfigChange(config.id, 'title')} />
                        </label>

                        <label className="mapingo-field">
                          <span className="mapingo-field-label">설명</span>
                          <textarea
                            className="mapingo-input mapingo-admin-textarea"
                            value={config.description}
                            onChange={handleConfigChange(config.id, 'description')}
                          />
                        </label>

                        <div className="admin-content-form-grid admin-community-config-grid">
                          <label className="mapingo-field">
                            <span className="mapingo-field-label">노출 상태</span>
                            <select
                              className="mapingo-input"
                              value={config.visibility}
                              onChange={handleConfigChange(config.id, 'visibility')}
                            >
                              <option value="VISIBLE">노출 중</option>
                              <option value="REVIEW">검토 중</option>
                              <option value="HIDDEN">숨김</option>
                            </select>
                          </label>

                          <label className="mapingo-field">
                            <span className="mapingo-field-label">표시 개수</span>
                            <input
                              className="mapingo-input"
                              type="number"
                              min="0"
                              value={config.itemCount}
                              onChange={handleConfigChange(config.id, 'itemCount')}
                            />
                          </label>

                          <label className="mapingo-field">
                            <span className="mapingo-field-label">최근 수정</span>
                            <input className="mapingo-input" value={config.updatedAt} readOnly />
                          </label>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <div className="admin-content-empty-editor">
                <strong>관리할 커뮤니티 페이지를 선택해 주세요.</strong>
                <p>왼쪽 목록에서 페이지를 고르면 해당 화면의 섹션 구성을 바로 조정할 수 있습니다.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminCommunityPage;
