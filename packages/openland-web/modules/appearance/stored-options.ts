const makeAppearanceOption = (key: string, defaultValue: boolean) => {
    const isEnabled = () => {
        let stored = localStorage.getItem(key);
        let isDefault = stored === null;
        if (isDefault) {
            localStorage.setItem(key, defaultValue ? 'true' : 'false');
        }
        return isDefault ? defaultValue : stored === 'true';
    };
    const setValue = (value: boolean) => localStorage.setItem(key, value ? 'true' : 'false');
    return {
        isEnabled,
        setValue,
    };
};

export const highlightSecretOption = makeAppearanceOption('highlight_secret_chat', false);
export const showFeaturedIconOption = makeAppearanceOption('highlight_featured_chat', true);
export const largeEmojiOption = makeAppearanceOption('settings_large_emoji', true);
