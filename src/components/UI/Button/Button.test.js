import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { Button } from './Button';

configure({ adapter: new Adapter() });

describe('Button with no Props', () => {
  const wrapper = shallow(<Button />);

  it('should have rendered 1 button', () => {
    expect(wrapper.find('button').length).toEqual(1);
  });

  it('should have proper props for button', () => {
    expect(wrapper.find('button').props()).toHaveProperty(
      'className',
      'button',
    );
  });
});

describe('Button with Props', () => {
  const initialProps = {
    handleClick: jest.fn(),
    status: true,
    content: 'Save',
  };

  const wrapper = shallow(<Button {...initialProps} />);

  it('should have rendered Button as disabled', () => {
    expect(wrapper.find('button').props()).toHaveProperty('disabled', true);
  });

  it('should have rendered Button content as received from props', () => {
    expect(wrapper.find('button').props()).toHaveProperty('children', 'Save');
  });
});

describe('Button with other Props', () => {
  const initialProps = {
    handleClick: jest.fn(),
    status: false,
    content: 'Click me!',
  };

  const wrapper = shallow(<Button {...initialProps} />);

  it('should have rendered Button as enabled', () => {
    expect(wrapper.find('button').props()).toHaveProperty('disabled', false);
  });

  it('should have rendered Button content as received from props', () => {
    expect(wrapper.find('button').props()).toHaveProperty(
      'children',
      'Click me!',
    );
  });
});
