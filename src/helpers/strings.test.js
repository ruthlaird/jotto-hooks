import stringsModule from './strings';
const { getStringByLanguage } = stringsModule;

const testStrings = {
    en: { submit: 'submit' },
    emoji: { submit: '🚀' },
    mermish: {},
}

describe('language string testing', () => {
    const mockWarn = jest.fn();
    let originalWarn;

    beforeEach(() => {
        originalWarn = console.warn;
        console.warn = mockWarn;
    });

    afterEach(() => {
        console.warn = originalWarn;
    });

    it('returns the correct submit string for english', () => {
        const string = getStringByLanguage('en', 'submit', testStrings);
        expect(string).toBe('submit');
        expect(mockWarn).not.toHaveBeenCalled();
    });
    
    it('returns the correct submit string for emoji', () => {
        const string = getStringByLanguage('emoji', 'submit', testStrings);
        expect(string).toBe('🚀');
        expect(mockWarn).not.toHaveBeenCalled();
    });
    
    it('returns english submit string when language does not exist', () => {
        const string = getStringByLanguage('notALanguage', 'submit', testStrings);
        expect(string).toBe('submit');
        expect(mockWarn).toHaveBeenCalledWith('Could not get string [submit] for [notALanguage]');
    });
    
    it('returns english submit string when submit key does not exist for language', () => {
        const string = getStringByLanguage('mermish', 'submit', testStrings);
        expect(string).toBe('submit');
        expect(mockWarn).toHaveBeenCalledWith('Could not get string [submit] for [mermish]');
    });
});