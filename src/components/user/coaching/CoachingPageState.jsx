function CoachingPageState({
    badge,
    title,
    description,
    primaryButtonText,
    secondaryButtonText,
    onPrimaryClick,
    onSecondaryClick,
}) {
    return (
        <div className="coaching-page">
            <div className="coaching-access-denied">
                {badge && <div className="coaching-access-badge">{badge}</div>}

                <h2>{title}</h2>

                {description && <p>{description}</p>}

                {(primaryButtonText || secondaryButtonText) && (
                    <div className="coaching-access-buttons">
                        {secondaryButtonText && (
                            <button
                                type="button"
                                className="secondary-button"
                                onClick={onSecondaryClick}
                            >
                                {secondaryButtonText}
                            </button>
                        )}

                        {primaryButtonText && (
                            <button
                                type="button"
                                className="primary-button"
                                onClick={onPrimaryClick}
                            >
                                {primaryButtonText}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CoachingPageState;