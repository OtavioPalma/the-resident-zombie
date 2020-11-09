import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { IconButton } from './IconButton';

configure({ adapter: new Adapter() });

describe('IconButton', () => {
  const initialValue = { content: '+' };

  const wrapper = shallow(<IconButton {...initialValue} />);

  it('should have rendered IconButton with span +', () => {
    expect(wrapper.find('button').props()).toHaveProperty('children', '+');
  });

  it('should have proper props for IconButton', () => {
    expect(wrapper.find('button').props()).toHaveProperty(
      'className',
      'icon_button',
    );
  });
});
