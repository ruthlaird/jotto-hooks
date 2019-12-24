import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from '../test/testUtils';
import Input from './Input';

/**
 * Setup function for Input component.
 * @returns {ShallowWrapper}
 */
const setup = (secretWord = 'party') => {
  return shallow(<Input secretWord={secretWord} />);
};

it('renders Input without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-input');
  expect(component.length).toBe(1);
});

it('does not throw warning with expected props', () => {
  checkProps(Input, { secretWord: 'party' });
});

describe('state controlled input field', () => {
    it('updates state with value of input box upon change', () => {
        const mockSetCurrentGuess = jest.fn();
        React.useState = jest.fn(() => ['', mockSetCurrentGuess]);

        const wrapper = setup();
        const inputBox = findByTestAttr(wrapper, 'input-box');

        const mockEvent = { target: { value: 'train' } };
        inputBox.simulate('change', mockEvent);

        expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
    });

});
