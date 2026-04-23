import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapingoPageSection } from '../../components/MapingoPageBlocks';
import { adminService } from '../../api/adminService';

const statusOrder = ['초안', '검토 중', '운영 중'];

const emptyForm = {
  title: '',
  type: '장소',
  difficulty: '입문',
  status: '초안',
  description: '',
  tags: '',
};

function AdminContentPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState(() => adminService.fetchAdminContent());
  const [mode, setMode] = useState('idle');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const editingItem = useMemo(() => items.find((item) => item.id === editingId) ?? null, [editingId, items]);
  const isCreating = mode === 'create';
  const isEditing = mode === 'edit' && editingItem;
  const isFormActive = isCreating || isEditing;

  const handleCycleStatus = (contentId) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== contentId) return item;

        const currentIndex = statusOrder.indexOf(item.status);
        const nextIndex = (currentIndex + 1) % statusOrder.length;
        return { ...item, status: statusOrder[nextIndex], updatedAt: '2026-04-23' };
      }),
    );
  };

  const handleCreate = () => {
    setMode('create');
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleEdit = (item) => {
    setMode('edit');
    setEditingId(item.id);
    setForm({
      title: item.title,
      type: item.type,
      difficulty: item.difficulty,
      status: item.status,
      description: item.description ?? '',
      tags: item.tags ?? '',
    });
  };

  const handleChange = (field) => (event) => {
    setForm((currentForm) => ({ ...currentForm, [field]: event.target.value }));
  };

  const handleCancel = () => {
    setMode('idle');
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isCreating) {
      const nextId = Math.max(0, ...items.map((item) => item.id)) + 1;
      setItems((currentItems) => [
        {
          id: nextId,
          ...form,
          updatedAt: '2026-04-23',
        },
        ...currentItems,
      ]);
      handleCancel();
      return;
    }

    if (!editingItem) return;

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              ...form,
              updatedAt: '2026-04-23',
            }
          : item,
      ),
    );
    handleCancel();
  };

  return (
    <div className="mapingo-dashboard">
      <MapingoPageSection
        eyebrow="Admin"
        title="콘텐츠 관리"
        description="장소, 학습 미션, 시나리오 콘텐츠를 추가하고 기본 정보와 운영 상태를 관리할 수 있어요."
      >
        <div className="mapingo-page-actions">
          <button type="button" className="mapingo-ghost-button" onClick={() => navigate('/admin')}>
            관리자 메인으로
          </button>
        </div>
      </MapingoPageSection>

      <section className="mapingo-page-section">
        <div className="mapingo-admin-grid admin-content-layout">
          <div className="mapingo-form-card">
            <div className="mapingo-card-header-row">
              <div>
                <h3>{isCreating ? '새 콘텐츠 추가' : isEditing ? '콘텐츠 편집' : '콘텐츠 추가 · 편집'}</h3>
                <p className="mapingo-muted-copy">
                  새 콘텐츠를 만들거나 기존 콘텐츠의 제목, 유형, 난이도, 설명, 태그를 수정해요.
                </p>
              </div>
              <button type="button" className="mapingo-submit-button admin-content-add-button" onClick={handleCreate}>
                새 콘텐츠
              </button>
            </div>

            {isFormActive ? (
              <>
                <div className="mapingo-admin-editing-banner">
                  <strong>{isCreating ? '새 콘텐츠를 작성 중이에요.' : editingItem.title}</strong>
                  <p>
                    {isCreating
                      ? '필수 정보를 입력하고 저장하면 콘텐츠 목록 맨 위에 추가됩니다.'
                      : '선택한 콘텐츠 정보를 수정 중이에요. 저장하면 목록에 바로 반영됩니다.'}
                  </p>
                </div>

                <form className="mapingo-admin-form" onSubmit={handleSubmit}>
                  <label className="mapingo-field">
                    <span className="mapingo-field-label">콘텐츠 제목</span>
                    <input
                      className="mapingo-input"
                      value={form.title}
                      onChange={handleChange('title')}
                      placeholder="예: 공항 입국 심사 대화"
                      required
                    />
                  </label>

                  <div className="admin-content-form-grid">
                    <label className="mapingo-field">
                      <span className="mapingo-field-label">콘텐츠 유형</span>
                      <select className="mapingo-input" value={form.type} onChange={handleChange('type')}>
                        <option value="장소">장소</option>
                        <option value="학습 미션">학습 미션</option>
                        <option value="시나리오">시나리오</option>
                      </select>
                    </label>
                    <label className="mapingo-field">
                      <span className="mapingo-field-label">난이도</span>
                      <select className="mapingo-input" value={form.difficulty} onChange={handleChange('difficulty')}>
                        <option value="입문">입문</option>
                        <option value="보통">보통</option>
                        <option value="어려움">어려움</option>
                      </select>
                    </label>
                    <label className="mapingo-field">
                      <span className="mapingo-field-label">운영 상태</span>
                      <select className="mapingo-input" value={form.status} onChange={handleChange('status')}>
                        {statusOrder.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="mapingo-field">
                    <span className="mapingo-field-label">콘텐츠 설명</span>
                    <textarea
                      className="mapingo-input mapingo-admin-textarea"
                      value={form.description}
                      onChange={handleChange('description')}
                      placeholder="사용자가 어떤 학습을 하는 콘텐츠인지 적어주세요."
                      required
                    />
                  </label>

                  <label className="mapingo-field">
                    <span className="mapingo-field-label">연결 태그</span>
                    <input
                      className="mapingo-input"
                      value={form.tags}
                      onChange={handleChange('tags')}
                      placeholder="예: 주문, 길찾기, 체크인"
                    />
                  </label>

                  <div className="mapingo-admin-action-row">
                    <button type="submit" className="mapingo-submit-button">
                      {isCreating ? '콘텐츠 추가' : '수정 저장'}
                    </button>
                    <button type="button" className="mapingo-ghost-button" onClick={handleCancel}>
                      취소
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="admin-content-empty-editor">
                <strong>새 콘텐츠를 추가하거나 편집할 콘텐츠를 선택해 주세요.</strong>
                <p>상단의 새 콘텐츠 버튼을 누르거나, 오른쪽 목록에서 편집 버튼을 누르면 입력 폼이 열립니다.</p>
              </div>
            )}
          </div>

          <div className="mapingo-list-card">
            <div className="mapingo-card-header-row">
              <div>
                <h3>콘텐츠 목록</h3>
                <p className="mapingo-muted-copy">장소 · 미션 · 시나리오</p>
              </div>
              <span className="mapingo-inline-badge">{items.length}개</span>
            </div>

            <div className="mapingo-selectable-list">
              {items.map((item) => (
                <article
                  key={item.id}
                  className={`mapingo-post-card admin-content-card ${editingId === item.id ? 'is-selected' : ''}`}
                >
                  <div className="mapingo-admin-item-head">
                    <div>
                      <strong>{item.title}</strong>
                      <p>{`${item.type} 콘텐츠 · 난이도 ${item.difficulty} · 최근 수정 ${item.updatedAt}`}</p>
                    </div>
                    <div className="mapingo-inline-badges">
                      <span className="mapingo-inline-badge">{item.type}</span>
                      <span className="mapingo-inline-badge">{item.status}</span>
                    </div>
                  </div>

                  <p className="admin-content-description">{item.description}</p>
                  <div className="admin-content-tags">
                    {(item.tags ?? '')
                      .split(',')
                      .map((tag) => tag.trim())
                      .filter(Boolean)
                      .map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                  </div>

                  <div className="mapingo-admin-action-row">
                    <button type="button" className="mapingo-submit-button" onClick={() => handleCycleStatus(item.id)}>
                      상태 변경
                    </button>
                    <button type="button" className="mapingo-ghost-button" onClick={() => handleEdit(item)}>
                      편집
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminContentPage;
