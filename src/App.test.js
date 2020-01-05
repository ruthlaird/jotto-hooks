import React from 'react';
import { mount } from 'enzyme';

import { findByTestAttr } from '../test/testUtils';
import App from './App';

import hookActions from './actions/hookActions';

const mockGetSecretWord = jest.fn();

/**
 * Setup function for App component.
 * @param {string} secretWord - desired secretWord state value for test
 * @returns {ReactWrapper}
 */
const setup = (secretWord='party') => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  const mockUseReducer = jest.fn()
    .mockReturnValue([
      { secretWord},
      jest.fn()
    ]);

  React.useReducer = mockUseReducer;

  // use mount, because useEffect is not called on 'shallow'
  // https://github.com/airbnb/enzyme/issues/2086
  return mount(<App />);
}

it('renders App without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app');
  expect(component.length).toBe(1);
});

describe('getSecretWord calls', () => {
  it('calls getSecretWord on App mount', () => {
    setup();

    // check to see if secret word was updated
    expect(mockGetSecretWord).toHaveBeenCalled();
  });

  it('does not update secretWord on App update', () => {
    const wrapper = setup();

    // clear the mock as mock will have been called in setup 
    // and want to test that isn't called again when run setProps()
    mockGetSecretWord.mockClear();

    // wrapper.update() doesn't trigger useEffect()
    // https://github.com/airbnb/enzyme/issues/2254
    wrapper.setProps();

    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});

describe('secretWord is not null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup('party');
  });

  it('renders app when secretWord is not null', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.exists()).toBe(true);
  });

  it('does not render spinner when secretWord is not null', () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner');
    expect(spinnerComponent.exists()).toBe(false);
  });
});

describe('secretWord is null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null);
  });

  it('does not render app when secretWord is null', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.exists()).toBe(false);
  });

  it('renders spinner when secretWord is null', () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner');
    expect(spinnerComponent.exists()).toBe(true);
  });
});