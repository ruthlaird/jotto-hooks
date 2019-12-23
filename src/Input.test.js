import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../test/testUtils';
import Input from './Input';

/**
 * Setup function for Input component.
 * @returns {ShallowWrapper}
 */
const setup = () => {
    return shallow(<Input />);
}

it('renders Input without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-input');
    expect(component.length).toBe(1);
  });