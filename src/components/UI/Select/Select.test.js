import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { Select } from './Select';

configure({ adapter: new Adapter() });

describe('Select with Props', () => {
  const initialValue = {
    name: 'numbers',
    error: 'numbers',
    inputValue: 1,
    options: [
      { value: 1, name: '1' },
      { value: 2, name: '2' },
      { value: 3, name: '3' },
    ],
    handleChange: jest.fn(),
  };

  const wrapper = shallow(<Select {...initialValue} />);

  it('should have proper props for Select', () => {
    expect(wrapper.find('div').props()).toHaveProperty('className', 'select');
  });

  it('should have received attributes from props', () => {
    expect(wrapper.find('select').props()).toHaveProperty(
      'className',
      'select_error',
    );
    expect(wrapper.find('select').props()).toHaveProperty('name', 'numbers');
    expect(wrapper.find('select').props()).toHaveProperty(
      'onChange',
      expect.any(Function),
    );
    expect(wrapper.find('select').props()).toHaveProperty('value', 1);
  });

  it('should have rendered 3 options', () => {
    expect(wrapper.find('option').length).toEqual(3);
  });

  it('should have rendered each option with received value and name', () => {
    expect(wrapper.find('option').at(0).props()).toEqual({
      children: '1',
      value: 1,
    });

    expect(wrapper.find('option').at(1).props()).toEqual({
      children: '2',
      value: 2,
    });

    expect(wrapper.find('option').at(2).props()).toEqual({
      children: '3',
      value: 3,
    });
  });

  it('should have rendered error', () => {
    expect(wrapper.find('label').length).toEqual(1);
  });
});
