import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { TextField } from './TextField';

configure({ adapter: new Adapter() });

describe('TextField with no Props', () => {
  const wrapper = shallow(<TextField>Text</TextField>);

  it('should have proper props for Select', () => {
    expect(wrapper.find('span').props()).toHaveProperty(
      'className',
      'text_field',
    );
  });

  it('should have rendered children', () => {
    expect(wrapper.find('span').props()).toHaveProperty('children', 'Text');
  });
});

describe('TextField with Props', () => {
  const initialValue = {
    fullWidth: true,
  };

  const wrapper = shallow(<TextField {...initialValue}>Text</TextField>);

  it('should have rendered TextField with flex 1', () => {
    expect(wrapper.find('span').get(0).props.style).toHaveProperty('flex', 1);
  });
});
