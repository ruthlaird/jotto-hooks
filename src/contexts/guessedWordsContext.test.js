import React from 'react';
import { shallow, mount } from 'enzyme';

import guessedWordsContext from './guessedWordsContext';

// a functional component that calls useGuessedWords for our tests
const FunctionalComponent = () => {
    guessedWordsContext.useGuessedWords();
    return <div />
}

test('useGuessedWords throws error when not wrapped in SuccessProvider', () => {
    expect(() => {
        shallow(<FunctionalComponent />);
    }).toThrow('useGuessedWords must be used with a GuessedWordsProvider');
});

test('useGuessedWords does not throw error when wrapped in SuccessProvider', () => {
    expect(() => {
        mount(<guessedWordsContext.GuessedWordsProvider><FunctionalComponent /></guessedWordsContext.GuessedWordsProvider>);
    }).not.toThrow();
});