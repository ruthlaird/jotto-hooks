import stringsModule from './strings';
const { getStringByLanguage } = stringsModule;

const testStrings = {
    en: { submit: 'submit' },
    emoji: { submit: '🚀' },
    mermish: {},
}

it('returns the correct submit string for english', () => {
    const string = getStringByLanguage('en', 'submit', testStrings);
    expect(string).toBe('submit');
});

it('returns the correct submit string for emoji', () => {
    const string = getStringByLanguage('emoji', 'submit', testStrings);
    expect(string).toBe('🚀');
});

it('returns english submit string when language does not exist', () => {
    const string = getStringByLanguage('notALanguage', 'submit', testStrings);
    expect(string).toBe('submit');
});

it('returns english submit string when submit key does not exist for language', () => {
    const string = getStringByLanguage('mermish', 'submit', testStrings);
    expect(string).toBe('submit');
});