export function createCharacterLimit(maxLength: number, initialValue = '') {
    let textContent = $state(initialValue);
    let characterCount = $derived(textContent.length);

    return {
        get textContent() {
            return textContent;
        },
        set textContent(newText: string) {
            if (newText.length <= maxLength) {
                textContent = newText;
            }
        },
        characterCount,
        maxLength
    };
}

export function useCharacterLimit(maxLength: number, initialValue = '') {
    return createCharacterLimit(maxLength, initialValue);
}
