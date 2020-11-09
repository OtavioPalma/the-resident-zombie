import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { Input } from './Input';

configure({ adapter: new Adapter() });

describe('Input with Props', () => {
  const initialValue = {
    name: 'name',
    error: 'name',
    type: 'text',
    placeholder: 'Enter your name',
    inputValue: 'user name',
    handleChange: jest.fn(),
  };

  const wrapper = shallow(<Input {...initialValue} />);

  it('should have proper props for Input', () => {
    expect(wrapper.find('div').props()).toHaveProperty('className', 'input');
  });

  it('should have received attributes from props', () => {
    expect(wrapper.find('input').props()).toEqual({
      className: 'input_error',
      name: 'name',
      onChange: expect.any(Function),
      placeholder: 'Enter your name',
      type: 'text',
      value: 'user name',
    });
  });

  it('should have rendered error', () => {
    expect(wrapper.find('label').length).toEqual(1);
  });
});
