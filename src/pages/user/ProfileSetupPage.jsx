import { useState } from 'react';
import PingPopLogo from '../../components/user/PingPopLogo';
import { useAuth } from '../../hooks/user/useAuth';

function ProfileSetupPage() {
    const { setupProfile, isSubmitting, errorMessage, setErrorMessage } = useAuth();
    const [form, setForm] = useState({
        birthDate: '',
        address: '',
        phoneNumber: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!form.birthDate || !form.address || !form.phoneNumber) {
            setErrorMessage('모든 항목을 입력해주세요.');
            return;
        }
        await setupProfile(form);
    };

    return (
        <section className="mapingo-signup-shell">
            <article className="mapingo-signup-card">
                <div className="mapingo-login-card-head">
                    <div className="mapingo-login-logo-shell">
                        <PingPopLogo className="mapingo-login-logo" />
                    </div>
                    <div>
                        <h2>프로필 입력</h2>
                        <p>학습 시작을 위해 추가 정보를 입력해주세요.</p>
                    </div>
                </div>

                <div className="mapingo-field">
                    <label className="mapingo-field-label" htmlFor="profile-birth">
                        생년월일
                    </label>
                    <input
                        id="profile-birth"
                        className="mapingo-input"
                        type="date"
                        name="birthDate"
                        value={form.birthDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="mapingo-field">
                    <label className="mapingo-field-label" htmlFor="profile-address">
                        주소
                    </label>
                    <input
                        id="profile-address"
                        className="mapingo-input"
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="서울시 강남구"
                    />
                </div>

                <div className="mapingo-field">
                    <label className="mapingo-field-label" htmlFor="profile-phone">
                        전화번호
                    </label>
                    <input
                        id="profile-phone"
                        className="mapingo-input"
                        type="tel"
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        placeholder="010-1234-5678"
                    />
                </div>

                {errorMessage ? <p className="mapingo-form-error">{errorMessage}</p> : null}

                <button
                    type="button"
                    className="mapingo-login-primary"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? '저장 중...' : '프로필 저장하기'}
                </button>
            </article>
        </section>
    );
}

export default ProfileSetupPage;