import React from 'react';

const guessedWordsContext = React.createContext();
 
// custom hook
// gets the context, checks if it exists and throws and error if it doesn't (tried to use it outside of a provider)
/**
 * @function useGuessedWords
 * @returns {array} guessedWordsContext value, which is a state of [value, setter].
 */
function useGuessedWords() {

    const context = React.useContext(guessedWordsContext);

    if(!context) {
        throw new Error('useGuessedWords must be used with a GuessedWordsProvider')
    }

    return context;
}

// Provider. Functional component
/**
 * @function GuessedWordsProvider
 * @param {object} props - props to pass through from declared component
 * @returns {JSX.Element} Provider component
 */
function GuessedWordsProvider(props) {
    // create an internal state with default value of false
    const [guessedWords, setGuessedWords] = React.useState([]);

    // memoisation - don't recalculate if don't need to, 
    // if a function has the same inputs, don't bother recalculating the outputs, just return the existing outputs 
    // from previous iteration of the function
    const value = React.useMemo(() => [guessedWords, setGuessedWords], [guessedWords]);

    return <guessedWordsContext.Provider value={value} {...props} />
}

export default { GuessedWordsProvider, useGuessedWords };