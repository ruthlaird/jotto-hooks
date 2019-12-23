/**
 * @method getLetterMatchCount
 * @param {string} guessedWord - Guessed word.
 * @param {string} secretWord - Secret word.
 * @returns {number} - Number of letters matched between guessed word and secret word
 */
export function getLetterMatchCount(guessedWord, secretWord) {
    const guessedLetterSet = new Set(guessedWord.split(''));
    const secretLetterSet = new Set(secretWord.split(''));
    return [...secretLetterSet].filter(letter => guessedLetterSet.has(letter)).length;
};