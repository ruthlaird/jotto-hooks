import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../test/testUtils';
import GuessedWords from './GuessedWords';

import guessedWordsContext from './contexts/guessedWordsContext';

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component
 * @function setup
 * @param {array} guessedWords - guessedWords value specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (guessedWords=[]) => {
    const mockUseGuessedWord = jest.fn().mockReturnValue([guessedWords, jest.fn()]);
    guessedWordsContext.useGuessedWords = mockUseGuessedWord;
    return shallow(<GuessedWords />);
};

describe('if there are no words guessed', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup([]);
    });

    it('renders without error', () => {
        const component = findByTestAttr(wrapper, 'component-guessed-words');
        expect(component.length).toBe(1);
    });

    it('renders instructions to guess a word', () => {
        const instructions = findByTestAttr(wrapper, 'guess-instructions');
        expect(instructions.text().length).not.toBe(0);
    });
});


describe('if there are words guessed', () => {
    let wrapper;
    const guessedWords = [
        { guessedWord: 'train', letterMatchCount: 3 },
        { guessedWord: 'agile', letterMatchCount: 1 },
        { guessedWord: 'party', letterMatchCount: 5 },
    ];

    beforeEach(() => {
        wrapper = setup(guessedWords);
    });

    it('renders without error', () => {
        const component = findByTestAttr(wrapper, 'component-guessed-words');
        expect(component.length).toBe(1);
    });

    it('renders `guessed word` section', () => {
        const guessedWordsNode = findByTestAttr(wrapper, 'guessed-words');
        expect(guessedWordsNode.length).toBe(1);
    });

    it('renders correct number of guessed words', () => {
        const guessedWordsNode = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsNode.length).toBe(guessedWords.length);
    });
});

describe('languagePicker', () => {
    it('correctly renders guess instructions in English by default', () => {
        const wrapper = setup([]);
        const guessInstructions = findByTestAttr(wrapper, 'guess-instructions');
        expect(guessInstructions.text()).toBe('Try to guess the secret word!');
    });

    it('correctly renders guess instructions in emoji', () => {
        const mockUseContext = jest.fn().mockReturnValue('emoji');
        React.useContext = mockUseContext;
        const wrapper = setup([]);
        const guessInstructions = findByTestAttr(wrapper, 'guess-instructions');
        expect(guessInstructions.text()).toBe('🤔🤫🔤');
    });
});