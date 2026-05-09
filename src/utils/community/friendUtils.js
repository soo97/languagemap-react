export function formatDate(dateString) {
    if (!dateString) return '-';

    const [date] = String(dateString).split(' ');
    return date.replaceAll('-', '.');
}

export function maskEmail(email) {
    const normalizedEmail = String(email ?? '').trim();

    if (!normalizedEmail || normalizedEmail === '-') return '-';
    if (!normalizedEmail.includes('@')) return normalizedEmail;

    const [localPart, domain] = normalizedEmail.split('@');
    const localCharacters = Array.from(localPart);

    if (!domain) return normalizedEmail;
    if (localCharacters.length <= 1) return `*@${domain}`;
    if (localCharacters.length === 2) return `${localCharacters[0]}*@${domain}`;

    return `${localCharacters[0]}${'*'.repeat(localCharacters.length - 2)}${localCharacters.at(-1)}@${domain}`;
}

export function getStatusLabel(status) {
    if (status === 'ACCEPTED') return '친구';
    if (status === 'PENDING') return '대기 중';
    if (status === 'REJECTED') return '거절됨';
    if (status === 'BLOCKED') return '차단됨';
    if (status === 'RESOLVED') return '처리 완료';
    if (status === 'PENDING_REPORT') return '접수됨';
    return '접수됨';
}

export function getStatusTone(status) {
    if (status === 'ACCEPTED' || status === 'RESOLVED') return 'success';
    if (status === 'PENDING' || status === 'PENDING_REPORT') return 'info';
    if (status === 'BLOCKED' || status === 'REJECTED') return 'danger';
    return 'muted';
}

export function getLevelTone(levelNumber) {
    if (levelNumber >= 40) return 'violet';
    if (levelNumber >= 30) return 'sky';
    if (levelNumber >= 20) return 'mint';
    return 'lime';
}
